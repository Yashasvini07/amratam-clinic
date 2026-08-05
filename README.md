# Amratam Clinic

Web platform for Amratam Clinic (Dr. Abhilasha Chourasiya — Electrohomeopathy & Bachflower, Indore). Public site plus an appointment booking system with a lightweight admin panel.

## Structure

- **`frontend/`** — Next.js 16 (App Router) + Tailwind. Public site, booking form, and the `/admin` panel. See `frontend/package.json` for scripts.
- **`backend/`** — .NET 10 API (Clean Architecture: Domain/Application/Infrastructure/Api) backed by Azure Table Storage. See `backend/Amratam.slnx`.

## Local development

**Backend** (requires the [Azurite](https://github.com/Azure/Azurite) storage emulator running locally):

```bash
cd backend
dotnet run --project src/Amratam.Api --urls http://localhost:5080
```

**Frontend**:

```bash
cd frontend
npm install
npm run dev
```

Set `NEXT_PUBLIC_API_BASE_URL` (defaults to `http://localhost:5080`) to point the frontend at a different API instance.

## Deployment

Both apps deploy to Azure App Service (see resource group `amratam-rg`) — the API to `amratam-api`, the frontend (built with `output: "standalone"`) to `amratam-web`, sharing one App Service Plan.
