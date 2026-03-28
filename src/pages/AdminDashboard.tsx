import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Users, Wallet, TrendingUp, ShieldCheck, Search, CheckCircle2, Clock,
  XCircle, Eye, AlertTriangle, DollarSign, BarChart3, UserCheck, Ban
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const AdminDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [stats, setStats] = useState({ members: 0, groups: 0, totalContributions: 0, pendingPayouts: 0 });
  const [members, setMembers] = useState<any[]>([]);
  const [groups, setGroups] = useState<any[]>([]);
  const [contributions, setContributions] = useState<any[]>([]);
  const [payouts, setPayouts] = useState<any[]>([]);
  const [searchMembers, setSearchMembers] = useState("");
  const [selectedPayout, setSelectedPayout] = useState<any>(null);
  const [disburseNotes, setDisburseNotes] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const [profilesRes, groupsRes, contribRes, payoutsRes] = await Promise.all([
      supabase.from("profiles").select("*"),
      supabase.from("groups").select("*"),
      supabase.from("contributions").select("*"),
      supabase.from("payouts").select("*"),
    ]);

    const profilesData = profilesRes.data || [];
    const groupsData = groupsRes.data || [];
    const contribData = contribRes.data || [];
    const payoutsData = payoutsRes.data || [];

    setMembers(profilesData);
    setGroups(groupsData);
    setContributions(contribData);
    setPayouts(payoutsData);

    const totalContrib = contribData
      .filter(c => c.status === "confirmed")
      .reduce((s: number, c: any) => s + Number(c.amount), 0);
    const pendingPay = payoutsData.filter(p => p.status === "pending" || p.status === "approved").length;

    setStats({
      members: profilesData.length,
      groups: groupsData.length,
      totalContributions: totalContrib,
      pendingPayouts: pendingPay,
    });
    setLoading(false);
  };

  const handleDisbursePayout = async (payout: any) => {
    const { error } = await supabase.from("payouts").update({
      status: "disbursed",
      disbursed_by: user?.id,
      disbursed_at: new Date().toISOString(),
      notes: disburseNotes,
    }).eq("id", payout.id);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Payout disbursed!", description: `₦${payout.amount.toLocaleString()} sent successfully.` });
      setSelectedPayout(null);
      setDisburseNotes("");
      fetchData();
    }
  };

  const handleConfirmContribution = async (id: string) => {
    const { error } = await supabase.from("contributions").update({
      status: "confirmed",
      confirmed_by: user?.id,
      confirmed_at: new Date().toISOString(),
    }).eq("id", id);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Contribution confirmed!" });
      fetchData();
    }
  };

  const handleToggleKyc = async (profileId: string, current: boolean) => {
    const { error } = await supabase.from("profiles").update({ kyc_verified: !current }).eq("id", profileId);
    if (!error) {
      toast({ title: current ? "KYC revoked" : "KYC verified!" });
      fetchData();
    }
  };

  const filteredMembers = members.filter(m =>
    `${m.first_name} ${m.last_name} ${m.email}`.toLowerCase().includes(searchMembers.toLowerCase())
  );

  const statCards = [
    { label: "Total Members", value: stats.members, icon: Users, color: "text-primary" },
    { label: "Active Groups", value: stats.groups, icon: BarChart3, color: "text-accent" },
    { label: "Total Contributions", value: `₦${stats.totalContributions.toLocaleString()}`, icon: Wallet, color: "text-primary" },
    { label: "Pending Payouts", value: stats.pendingPayouts, icon: Clock, color: "text-destructive" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold flex items-center gap-3">
            <ShieldCheck className="w-7 h-7 text-primary" /> Admin Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">Platform oversight and management</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card className="border-border/50">
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

        <Tabs defaultValue="members">
          <TabsList>
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="groups">Groups</TabsTrigger>
            <TabsTrigger value="contributions">Contributions</TabsTrigger>
            <TabsTrigger value="payouts">Payouts</TabsTrigger>
          </TabsList>

          {/* MEMBERS TAB */}
          <TabsContent value="members" className="mt-6 space-y-4">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search members..." className="pl-9" value={searchMembers} onChange={e => setSearchMembers(e.target.value)} />
            </div>
            <Card className="border-border/50">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>KYC</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMembers.length === 0 ? (
                      <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No members found</TableCell></TableRow>
                    ) : filteredMembers.map(m => (
                      <TableRow key={m.id}>
                        <TableCell className="font-medium">{m.first_name} {m.last_name}</TableCell>
                        <TableCell>{m.email}</TableCell>
                        <TableCell>{m.phone || "-"}</TableCell>
                        <TableCell>
                          <Badge variant={m.kyc_verified ? "default" : "outline"} className={m.kyc_verified ? "gradient-primary border-0" : ""}>
                            {m.kyc_verified ? <><CheckCircle2 className="w-3 h-3 mr-1" /> Verified</> : "Pending"}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(m.created_at).toLocaleDateString("en-NG")}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline" onClick={() => handleToggleKyc(m.id, m.kyc_verified)}>
                              {m.kyc_verified ? <XCircle className="w-3 h-3 mr-1" /> : <UserCheck className="w-3 h-3 mr-1" />}
                              {m.kyc_verified ? "Revoke" : "Verify"}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* GROUPS TAB */}
          <TabsContent value="groups" className="mt-6">
            <Card className="border-border/50">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Group Name</TableHead>
                      <TableHead>Contribution</TableHead>
                      <TableHead>Cycle</TableHead>
                      <TableHead>Members</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {groups.length === 0 ? (
                      <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No groups yet</TableCell></TableRow>
                    ) : groups.map(g => (
                      <TableRow key={g.id}>
                        <TableCell className="font-medium">{g.name}</TableCell>
                        <TableCell>₦{Number(g.contribution_amount).toLocaleString()}</TableCell>
                        <TableCell className="capitalize">{g.cycle}</TableCell>
                        <TableCell>{g.current_members}/{g.max_members}</TableCell>
                        <TableCell>
                          <Badge variant={g.status === "active" ? "default" : "outline"} className={g.status === "active" ? "gradient-primary border-0" : ""}>
                            {g.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(g.created_at).toLocaleDateString("en-NG")}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* CONTRIBUTIONS TAB */}
          <TabsContent value="contributions" className="mt-6">
            <Card className="border-border/50">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Member</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Cycle</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contributions.length === 0 ? (
                      <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No contributions yet</TableCell></TableRow>
                    ) : contributions.map(c => {
                      const member = members.find(m => m.user_id === c.user_id);
                      return (
                        <TableRow key={c.id}>
                          <TableCell className="font-medium">{member ? `${member.first_name} ${member.last_name}` : "Unknown"}</TableCell>
                          <TableCell>₦{Number(c.amount).toLocaleString()}</TableCell>
                          <TableCell>#{c.cycle_number}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={
                              c.status === "confirmed" ? "text-primary border-primary/30" :
                              c.status === "pending" ? "text-accent border-accent/30" :
                              "text-destructive border-destructive/30"
                            }>
                              {c.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{new Date(c.created_at).toLocaleDateString("en-NG")}</TableCell>
                          <TableCell>
                            {c.status === "pending" && (
                              <Button size="sm" className="gradient-primary border-0" onClick={() => handleConfirmContribution(c.id)}>
                                <CheckCircle2 className="w-3 h-3 mr-1" /> Confirm
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* PAYOUTS TAB - MANUAL DISBURSEMENT */}
          <TabsContent value="payouts" className="mt-6 space-y-4">
            <div className="flex items-center gap-2 p-3 rounded-lg bg-accent/10 border border-accent/20">
              <AlertTriangle className="w-5 h-5 text-accent shrink-0" />
              <p className="text-sm text-foreground">Payouts are <strong>manually disbursed</strong> by admin. Review and confirm each payout before sending funds.</p>
            </div>
            <Card className="border-border/50">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Recipient</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Seat</TableHead>
                      <TableHead>Bank</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payouts.length === 0 ? (
                      <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">No payouts scheduled yet</TableCell></TableRow>
                    ) : payouts.map(p => {
                      const recipient = members.find(m => m.user_id === p.recipient_id);
                      return (
                        <TableRow key={p.id}>
                          <TableCell className="font-medium">{recipient ? `${recipient.first_name} ${recipient.last_name}` : "Unknown"}</TableCell>
                          <TableCell className="font-semibold">₦{Number(p.amount).toLocaleString()}</TableCell>
                          <TableCell>#{p.seat_number}</TableCell>
                          <TableCell>{p.bank_name || recipient?.bank_name || "-"} {p.account_number || recipient?.account_number || ""}</TableCell>
                          <TableCell>
                            <Badge variant={p.status === "disbursed" ? "default" : "outline"} className={
                              p.status === "disbursed" ? "gradient-primary border-0" :
                              p.status === "approved" ? "text-accent border-accent/30" : ""
                            }>
                              {p.status === "disbursed" && <CheckCircle2 className="w-3 h-3 mr-1" />}
                              {p.status === "pending" && <Clock className="w-3 h-3 mr-1" />}
                              {p.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {(p.status === "pending" || p.status === "approved") && (
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button size="sm" className="gradient-primary border-0" onClick={() => setSelectedPayout(p)}>
                                    <DollarSign className="w-3 h-3 mr-1" /> Disburse
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle className="font-display">Confirm Manual Disbursement</DialogTitle>
                                  </DialogHeader>
                                  <div className="space-y-4 mt-4">
                                    <div className="p-4 rounded-lg bg-muted/50 space-y-2">
                                      <p className="text-sm"><strong>Recipient:</strong> {recipient ? `${recipient.first_name} ${recipient.last_name}` : "Unknown"}</p>
                                      <p className="text-sm"><strong>Amount:</strong> ₦{Number(p.amount).toLocaleString()}</p>
                                      <p className="text-sm"><strong>Bank:</strong> {p.bank_name || recipient?.bank_name || "-"}</p>
                                      <p className="text-sm"><strong>Account:</strong> {p.account_number || recipient?.account_number || "-"}</p>
                                    </div>
                                    <div className="space-y-2">
                                      <Label>Notes (optional)</Label>
                                      <Textarea
                                        placeholder="Transaction reference, notes..."
                                        value={disburseNotes}
                                        onChange={e => setDisburseNotes(e.target.value)}
                                      />
                                    </div>
                                    <Button className="w-full gradient-primary border-0" onClick={() => handleDisbursePayout(p)}>
                                      Confirm Disbursement
                                    </Button>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
