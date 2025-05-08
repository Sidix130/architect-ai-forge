
import { Header } from "@/components/Header";
import { Dashboard } from "@/components/Dashboard";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-grow">
        <Dashboard />
      </main>
      <footer className="py-6 border-t">
        <div className="container flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            The Architect - AI Infrastructure System
          </p>
          <p className="text-sm text-muted-foreground">
            Version 0.1.0
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
