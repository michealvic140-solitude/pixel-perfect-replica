import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Wallet, Users, TrendingUp, Calendar, ArrowUpRight, ArrowDownRight,
  Plus, Clock, CheckCircle2, AlertTriangle
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const stats = [
  { label: "Total Contributions", value: "₦2,450,000", icon: Wallet, change: "+12%", up: true, color: "text-primary" },
  { label: "Active Groups", value: "3", icon: Users, change: "+1", up: true, color: "text-accent" },
  { label: "Next Payout", value: "₦500,000", icon: TrendingUp, change: "In 5 days", up: true, color: "text-primary" },
  { label: "Pending Payments", value: "₦50,000", icon: Calendar, change: "Due tomorrow", up: false, color: "text-destructive" },
];

const recentActivity = [
  { type: "contribution", desc: "Contributed ₦50,000 to Prosperity Group", time: "2 hours ago", icon: CheckCircle2, status: "success" },
  { type: "payout", desc: "Received ₦500,000 from Unity Savers", time: "2 days ago", icon: ArrowDownRight, status: "success" },
  { type: "reminder", desc: "Payment due for Diamond Circle", time: "Tomorrow", icon: AlertTriangle, status: "warning" },
  { type: "joined", desc: "Joined New Year Savings Group", time: "1 week ago", icon: Users, status: "info" },
];

const myGroups = [
  { name: "Prosperity Group", members: 15, contributed: 350000, total: 500000, nextPayout: "Mar 15", seat: 5 },
  { name: "Unity Savers", members: 10, contributed: 200000, total: 200000, nextPayout: "Completed", seat: 3 },
  { name: "Diamond Circle", members: 20, contributed: 100000, total: 1000000, nextPayout: "Apr 1", seat: 12 },
];

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">Welcome back, John! 👋</h1>
            <p className="text-muted-foreground mt-1">Here's what's happening with your savings</p>
          </div>
          <Button asChild className="gradient-primary border-0">
            <Link to="/dashboard/groups"><Plus className="w-4 h-4 mr-2" /> Join a Group</Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="border-border/50">
              <CardContent className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-display font-bold mt-1">{stat.value}</p>
                  </div>
                  <div className={`w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                </div>
                <div className="flex items-center gap-1 mt-3 text-sm">
                  {stat.up ? (
                    <ArrowUpRight className="w-4 h-4 text-primary" />
                  ) : (
                    <Clock className="w-4 h-4 text-destructive" />
                  )}
                  <span className={stat.up ? "text-primary" : "text-destructive"}>{stat.change}</span>
                </div>
              </CardContent>
            </Card>
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
                {myGroups.map((group) => (
                  <div key={group.name} className="p-4 rounded-lg bg-muted/30 border border-border/50">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-foreground">{group.name}</h4>
                        <p className="text-sm text-muted-foreground">{group.members} members · Seat #{group.seat}</p>
                      </div>
                      <Badge variant={group.nextPayout === "Completed" ? "secondary" : "default"} className={group.nextPayout === "Completed" ? "" : "gradient-primary border-0"}>
                        {group.nextPayout === "Completed" ? "Completed" : `Next: ${group.nextPayout}`}
                      </Badge>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Contributed</span>
                        <span className="font-medium">₦{group.contributed.toLocaleString()} / ₦{group.total.toLocaleString()}</span>
                      </div>
                      <Progress value={(group.contributed / group.total) * 100} className="h-2" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="border-border/50">
            <CardHeader className="pb-3">
              <CardTitle className="font-display text-lg">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((activity, i) => (
                <div key={i} className="flex gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    activity.status === "success" ? "bg-primary/10 text-primary" :
                    activity.status === "warning" ? "bg-accent/10 text-accent" :
                    "bg-muted text-muted-foreground"
                  }`}>
                    <activity.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">{activity.desc}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{activity.time}</p>
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
