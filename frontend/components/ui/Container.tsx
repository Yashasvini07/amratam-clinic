type ContainerPropos = {
    children: React.ReactNode;
    className?: string;
};

export default function Container({ children, className = "" }: ContainerPropos) {
    return (
        <div className= {`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`} >
            {children}
        </div>
    );
}