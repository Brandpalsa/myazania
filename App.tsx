import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Toaster } from './components/ui/sonner';
import { AuthProvider } from './utils/auth';
import { ThemeProvider } from './components/providers/ThemeProvider';
import { RouteHandler } from './components/navigation/RouteHandler';
import { PageLayout } from './components/layout/PageLayout';
import { router } from './utils/router';

function AppContent() {
  const [currentComponent, setCurrentComponent] = useState<React.ComponentType | null>(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  const handleComponentChange = useCallback((component: React.ComponentType | null) => {
    console.log('Component changed:', component?.name || 'null');
    setCurrentComponent(() => component); // Use function form to ensure React gets the component, not a function
    
    // If we get a component, we're no longer loading
    if (component && loading) {
      console.log('Component received, setting loading to false');
      setLoading(false);
    }
    
    if (!initialized) {
      console.log('App initialized');
      setInitialized(true);
    }
  }, [loading, initialized]);

  const handleLoadingChange = useCallback((isLoading: boolean) => {
    console.log('Loading state changed:', isLoading);
    setLoading(isLoading);
    
    // If loading becomes false and we haven't initialized yet, mark as initialized
    if (!isLoading && !initialized) {
      console.log('Loading finished, marking as initialized');
      setInitialized(true);
    }
  }, [initialized]);

  // Emergency fallback to prevent infinite loading
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!initialized) {
        console.log('Emergency timeout: forcing app initialization');
        setLoading(false);
        setInitialized(true);
        
        // Try to get current route component as fallback
        const route = router.getCurrentRoute();
        if (route && !currentComponent) {
          console.log('Emergency fallback: trying to load home component');
          import('./components/pages/HomePage').then(module => {
            setCurrentComponent(() => module.HomePage);
          });
        }
      }
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [initialized, currentComponent]);

  // Loading screen with better UX
  if (loading || !initialized) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
          <div className="text-center">
            <h2 className="font-montserrat font-medium text-lg mb-2">Loading Azania Academy...</h2>
            <p className="text-sm text-muted-foreground">
              {loading ? 'Initializing application...' : 'Preparing your experience...'}
            </p>
          </div>
          {/* Progress indicator */}
          <div className="w-48 h-1 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-gold animate-pulse rounded-full" style={{ width: '60%' }}></div>
          </div>
          <div className="text-xs text-muted-foreground max-w-md text-center">
            If this takes longer than expected, please refresh your browser
          </div>
        </div>
      </div>
    );
  }

  const CurrentComponent = currentComponent;
  const currentPath = router.getCurrentRoute()?.path;

  console.log('App render - Component:', CurrentComponent?.name, 'Path:', currentPath);

  return (
    <>
      <RouteHandler 
        onComponentChange={handleComponentChange}
        onLoadingChange={handleLoadingChange}
      />
      
      <PageLayout currentPath={currentPath}>
        <AnimatePresence mode="wait">
          {CurrentComponent ? (
            <motion.div
              key={currentPath || 'component'}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="page-transition"
            >
              <CurrentComponent />
            </motion.div>
          ) : (
            <motion.div
              key="fallback"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="min-h-screen bg-background flex items-center justify-center"
            >
              <div className="text-center max-w-md">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🏫</span>
                </div>
                <h1 className="text-2xl font-montserrat font-semibold mb-4">Page Not Found</h1>
                <p className="text-muted-foreground mb-6">
                  The page you're looking for doesn't exist or there was an error loading it.
                </p>
                <div className="space-y-3">
                  <button 
                    onClick={() => router.navigate('/')}
                    className="w-full bg-gold hover:bg-gold-600 text-black px-6 py-3 rounded-lg font-montserrat transition-colors"
                  >
                    Go to Homepage
                  </button>
                  <button 
                    onClick={() => window.location.reload()}
                    className="w-full border border-border hover:bg-muted text-foreground px-6 py-3 rounded-lg font-montserrat transition-colors"
                  >
                    Refresh Page
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </PageLayout>
      
      <Toaster 
        position="top-right" 
        toastOptions={{
          duration: 4000,
          style: {
            background: 'var(--card)',
            color: 'var(--card-foreground)',
            border: '1px solid var(--border)',
          },
        }}
      />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}