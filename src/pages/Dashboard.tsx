import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Wallet, Users, TrendingUp, Calendar, ArrowUpRight,
  Plus, Clock, CheckCircle2, AlertTriangle
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";

const Dashboard = () => {
  const { user, profile } = useAuth();
  const [myGroups, setMyGroups] = useState<any[]>([]);
  const [contributions, setContributions] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;
    
    const fetchData = async () => {
      const [groupMembersRes, contribRes, notifsRes] = await Promise.all([
        supabase.from("group_members").select("*, groups(*)").eq("user_id", user.id),
        supabase.from("contributions").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(5),
        supabase.from("notifications").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(5),
      ]);
      
      setMyGroups(groupMembersRes.data || []);
      setContributions(contribRes.data || []);
      setNotifications(notifsRes.data || []);
    };
    
    fetchData();
  }, [user]);

  const totalContributed = contributions
    .filter(c => c.status === "confirmed")
    .reduce((s, c) => s + Number(c.amount), 0);

  const firstName = profile?.first_name || user?.email?.split("@")[0] || "User";

  const stats = [
    { label: "Total Contributions", value: `₦${totalContributed.toLocaleString()}`, icon: Wallet, color: "text-primary" },
    { label: "Active Groups", value: myGroups.length.toString(), icon: Users, color: "text-accent" },
    { label: "Contributions Made", value: contributions.length.toString(), icon: TrendingUp, color: "text-primary" },
    { label: "Pending", value: contributions.filter(c => c.status === "pending").length.toString(), icon: Calendar, color: "text-destructive" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              Welcome back, {firstName}! 👋
            </h1>
            <p className="text-muted-foreground mt-1">Here's what's happening with your savings</p>
          </motion.div>
          <Button asChild className="gradient-primary border-0">
            <Link to="/dashboard/groups"><Plus className="w-4 h-4 mr-2" /> Join a Group</Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card className="border-border/50 hover:shadow-md transition-shadow">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-2xl font-display font-bold mt-1">{stat.value}</p>
                    </div>
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <stat.icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* My Groups */}
          <div className="lg:col-span-2">
            <Card className="border-border/50">
              <CardHeader className="flex flex-row items-center justify-between pb-3">
                <CardTitle className="font-display text-lg">My Groups</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/dashboard/groups">View All</Link>
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                {myGroups.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p>You haven't joined any groups yet.</p>
                    <Button asChild className="mt-3 gradient-primary border-0">
                      <Link to="/dashboard/groups">Browse Groups</Link>
                    </Button>
                  </div>
                ) : myGroups.map((gm: any) => (
                  <div key={gm.id} className="p-4 rounded-lg bg-muted/30 border border-border/50">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-foreground">{gm.groups?.name || "Group"}</h4>
                        <p className="text-sm text-muted-foreground">Seat #{gm.seat_number}</p>
                      </div>
                      <Badge className="gradient-primary border-0">Active</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      ₦{Number(gm.groups?.contribution_amount || 0).toLocaleString()} / {gm.groups?.cycle || "monthly"}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Recent Notifications */}
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="font-display text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {notifications.length === 0 ? (
                <p className="text-center text-muted-foreground py-6">No recent activity</p>
              ) : notifications.map((n: any) => (
                <div key={n.id} className="flex gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    n.type === "success" ? "bg-primary/10 text-primary" :
                    n.type === "warning" ? "bg-accent/10 text-accent" :
                    "bg-muted text-muted-foreground"
                  }`}>
                    {n.type === "success" ? <CheckCircle2 className="w-4 h-4" /> :
                     n.type === "warning" ? <AlertTriangle className="w-4 h-4" /> :
                     <Clock className="w-4 h-4" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">{n.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{n.message}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
