using Azure.Data.Tables;
using Microsoft.Extensions.Diagnostics.HealthChecks;

namespace Amratam.Api.HealthChecks;

public class TableStorageHealthCheck(TableServiceClient tableServiceClient) : IHealthCheck
{
    public async Task<HealthCheckResult> CheckHealthAsync(HealthCheckContext context, CancellationToken cancellationToken = default)
    {
        try
        {
            await tableServiceClient.GetPropertiesAsync(cancellationToken);
            return HealthCheckResult.Healthy();
        }
        catch (Exception ex)
        {
            return HealthCheckResult.Unhealthy("Azure Table Storage is unreachable.", ex);
        }
    }
}
