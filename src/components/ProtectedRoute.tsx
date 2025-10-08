import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Loader2, Shield, LogIn } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, isAdmin, loading, signInWithGoogle, logout } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-hero bg-grid flex items-center justify-center">
        <Card className="p-8 glass text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading...</p>
        </Card>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-hero bg-grid flex items-center justify-center">
        <Card className="p-8 glass max-w-md w-full mx-4">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <Shield className="h-12 w-12 text-primary" />
            </div>
            <div>
              <h1 className="font-heading text-2xl font-bold text-foreground mb-2">
                Admin Access Required
              </h1>
              <p className="text-muted-foreground">
                Please sign in with an authorized Google account to access the admin panel.
              </p>
            </div>
            <Button 
              onClick={signInWithGoogle}
              className="w-full bg-gradient-primary neon-ring hover:shadow-glow"
            >
              <LogIn className="mr-2 h-4 w-4" />
              Sign in with Google
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-hero bg-grid flex items-center justify-center">
        <Card className="p-8 glass max-w-md w-full mx-4">
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <Shield className="h-12 w-12 text-destructive" />
            </div>
            <div>
              <h1 className="font-heading text-2xl font-bold text-foreground mb-2">
                Access Denied
              </h1>
              <p className="text-muted-foreground">
                Your account ({user.email}) is not authorized to access the admin panel.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button 
                onClick={() => window.location.href = '/'}
                variant="outline"
                className="w-full"
              >
                Return to Home
              </Button>
              <Button 
                onClick={logout}
                className="w-full"
                variant="secondary"
              >
                Log out
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;


