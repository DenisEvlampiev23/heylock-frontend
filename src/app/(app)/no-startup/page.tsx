export default function NoStartupPage() {
    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="text-center">
                <h1 className="text-2xl font-bold mb-4">No Organization Found</h1>
                <p className="text-muted-foreground">
                    You need to be part of an organization to access this page.
                </p>
            </div>
        </div>
    );
}
