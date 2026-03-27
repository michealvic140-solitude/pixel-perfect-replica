import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Wallet, Users, AlertTriangle, CheckCircle2, Info } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const notifications = [
  { id: 1, title: "Payment Reminder", desc: "Your ₦50,000 contribution to Prosperity Group is due tomorrow.", time: "5 min ago", type: "warning", read: false },
  { id: 2, title: "Payout Received", desc: "You received ₦200,000 from Unity Savers group.", time: "2 hours ago", type: "success", read: false },
  { id: 3, title: "New Member Joined", desc: "Fatima B. joined Diamond Circle group.", time: "5 hours ago", type: "info", read: false },
  { id: 4, title: "Payment Confirmed", desc: "Your ₦100,000 contribution to Diamond Circle was confirmed.", time: "1 day ago", type: "success", read: true },
  { id: 5, title: "Late Payment Warning", desc: "Member Ibrahim K. has a late payment in Prosperity Group.", time: "2 days ago", type: "warning", read: true },
  { id: 6, title: "Group Created", desc: "You successfully created 'Golden Harvest' group.", time: "1 week ago", type: "info", read: true },
];

const typeConfig: Record<string, { icon: any; bg: string; text: string }> = {
  warning: { icon: AlertTriangle, bg: "bg-accent/10", text: "text-accent" },
  success: { icon: CheckCircle2, bg: "bg-primary/10", text: "text-primary" },
  info: { icon: Info, bg: "bg-muted", text: "text-muted-foreground" },
};

const Notifications = () => {
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl md:text-3xl font-bold">Notifications</h1>
            <p className="text-muted-foreground mt-1">{unreadCount} unread notifications</p>
          </div>
          <Button variant="outline" size="sm">Mark all as read</Button>
        </div>

        <Card className="border-border/50">
          <CardContent className="p-0 divide-y divide-border">
            {notifications.map(n => {
              const config = typeConfig[n.type];
              const Icon = config.icon;
              return (
                <div key={n.id} className={`p-4 flex gap-4 items-start hover:bg-muted/30 transition-colors ${!n.read ? "bg-primary/5" : ""}`}>
                  <div className={`w-10 h-10 rounded-full ${config.bg} flex items-center justify-center shrink-0`}>
                    <Icon className={`w-5 h-5 ${config.text}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-sm">{n.title}</h4>
                      {!n.read && <div className="w-2 h-2 rounded-full bg-primary" />}
                    </div>
                    <p className="text-sm text-muted-foreground mt-0.5">{n.desc}</p>
                    <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Notifications;
