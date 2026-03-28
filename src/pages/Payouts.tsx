import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TrendingUp, Calendar, CheckCircle2, Clock, AlertTriangle } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Payouts = () => {
  const { user } = useAuth();
  const [payouts, setPayouts] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;
    supabase.from("payouts").select("*, groups(name)").eq("recipient_id", user.id)
      .order("created_at", { ascending: false })
      .then(({ data }) => setPayouts(data || []));
  }, [user]);

  const totalReceived = payouts.filter(p => p.status === "disbursed").reduce((s, p) => s + Number(p.amount), 0);
  const totalUpcoming = payouts.filter(p => p.status === "pending" || p.status === "approved").reduce((s, p) => s + Number(p.amount), 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold">Payouts</h1>
          <p className="text-muted-foreground mt-1">View your payout schedule and history</p>
        </div>

        <div className="flex items-center gap-2 p-3 rounded-lg bg-accent/10 border border-accent/20">
          <AlertTriangle className="w-5 h-5 text-accent shrink-0" />
          <p className="text-sm text-foreground">Payouts are <strong>manually disbursed</strong> by the platform admin after verification.</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="border-border/50">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Received</p>
                  <p className="text-2xl font-display font-bold">₦{totalReceived.toLocaleString()}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="border-border/50">
              <CardContent className="p-5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Pending Payouts</p>
                  <p className="text-2xl font-display font-bold">₦{totalUpcoming.toLocaleString()}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="font-display text-lg">Payout History</CardTitle>
          </CardHeader>
          <CardContent>
            {payouts.length === 0 ? (
              <div className="text-center py-10 text-muted-foreground">
                <Calendar className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p>No payouts yet. Join a group and contribute to receive payouts.</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Group</TableHead>
                    <TableHead>Seat</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payouts.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell className="font-medium">{p.groups?.name || "N/A"}</TableCell>
                      <TableCell>#{p.seat_number}</TableCell>
                      <TableCell className="font-semibold">₦{Number(p.amount).toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant={p.status === "disbursed" ? "default" : "outline"} className={p.status === "disbursed" ? "gradient-primary border-0" : ""}>
                          {p.status === "disbursed" ? <><CheckCircle2 className="w-3 h-3 mr-1" /> Received</> : <><Clock className="w-3 h-3 mr-1" /> {p.status}</>}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(p.created_at).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Payouts;
