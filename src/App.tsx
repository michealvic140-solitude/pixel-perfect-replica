import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Groups from "./pages/Groups";
import Contributions from "./pages/Contributions";
import Payouts from "./pages/Payouts";
import Messages from "./pages/Messages";
import Notifications from "./pages/Notifications";
import Support from "./pages/Support";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/groups" element={<Groups />} />
          <Route path="/dashboard/contributions" element={<Contributions />} />
          <Route path="/dashboard/payouts" element={<Payouts />} />
          <Route path="/dashboard/messages" element={<Messages />} />
          <Route path="/dashboard/notifications" element={<Notifications />} />
          <Route path="/dashboard/support" element={<Support />} />
          <Route path="/dashboard/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
