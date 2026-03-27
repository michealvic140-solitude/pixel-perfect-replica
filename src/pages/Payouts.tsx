import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TrendingUp, Calendar, CheckCircle2, Clock } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const payouts = [
  { id: 1, group: "Unity Savers", amount: 200000, date: "2026-03-10", status: "received", seat: 3 },
  { id: 2, group: "Prosperity Group", amount: 1000000, date: "2026-04-15", status: "upcoming", seat: 5 },
  { id: 3, group: "Diamond Circle", amount: 3000000, date: "2026-08-01", status: "upcoming", seat: 12 },
  { id: 4, group: "Golden Harvest", amount: 450000, date: "2026-06-01", status: "upcoming", seat: 8 },
];

const Payouts = () => {
  const totalReceived = payouts.filter(p => p.status === "received").reduce((s, p) => s + p.amount, 0);
  const totalUpcoming = payouts.filter(p => p.status === "upcoming").reduce((s, p) => s + p.amount, 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold">Payouts</h1>
          <p className="text-muted-foreground mt-1">View your payout schedule and history</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
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
          <Card className="border-border/50">
            <CardContent className="p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Upcoming Payouts</p>
                <p className="text-2xl font-display font-bold">₦{totalUpcoming.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="font-display text-lg">Payout Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Group</TableHead>
                  <TableHead>Seat</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Expected Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payouts.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="font-medium">{p.group}</TableCell>
                    <TableCell>#{p.seat}</TableCell>
                    <TableCell className="font-semibold">₦{p.amount.toLocaleString()}</TableCell>
                    <TableCell>{new Date(p.date).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}</TableCell>
                    <TableCell>
                      <Badge variant={p.status === "received" ? "default" : "outline"} className={p.status === "received" ? "gradient-primary border-0" : ""}>
                        {p.status === "received" ? <><CheckCircle2 className="w-3 h-3 mr-1" /> Received</> : <><Clock className="w-3 h-3 mr-1" /> Upcoming</>}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Payouts;
