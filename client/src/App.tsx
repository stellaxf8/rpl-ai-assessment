import { Switch, Route, Router } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import KnowledgeCenter from "@/pages/knowledge-center";
import NotFound from "@/pages/not-found";

function AppRouter() {
  return (
    <Router base="/rpl-ai-assessment">
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/knowledge-center" component={KnowledgeCenter} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppRouter />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;