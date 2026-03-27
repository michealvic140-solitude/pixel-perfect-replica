import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Wallet, ArrowUpRight, Clock, CheckCircle2, XCircle } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const contributions = [
  { id: 1, group: "Prosperity Group", amount: 50000, date: "2026-03-20", status: "paid", method: "Bank Transfer" },
  { id: 2, group: "Diamond Circle", amount: 100000, date: "2026-03-18", status: "paid", method: "Card" },
  { id: 3, group: "Golden Harvest", amount: 30000, date: "2026-03-15", status: "paid", method: "USSD" },
  { id: 4, group: "Prosperity Group", amount: 50000, date: "2026-03-28", status: "pending", method: "-" },
  { id: 5, group: "Diamond Circle", amount: 100000, date: "2026-04-01", status: "upcoming", method: "-" },
  { id: 6, group: "Prosperity Group", amount: 50000, date: "2026-02-20", status: "late", method: "Card" },
];

const statusConfig: Record<string, { icon: any; color: string; label: string }> = {
  paid: { icon: CheckCircle2, color: "text-primary", label: "Paid" },
  pending: { icon: Clock, color: "text-accent", label: "Pending" },
  upcoming: { icon: ArrowUpRight, color: "text-muted-foreground", label: "Upcoming" },
  late: { icon: XCircle, color: "text-destructive", label: "Late" },
};

const Contributions = () => {
  const totalPaid = contributions.filter(c => c.status === "paid").reduce((sum, c) => sum + c.amount, 0);
  const totalPending = contributions.filter(c => c.status === "pending").reduce((sum, c) => sum + c.amount, 0);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold">Contributions</h1>
          <p className="text-muted-foreground mt-1">Track all your Ajo contributions</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <Card className="border-border/50">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Paid</p>
                  <p className="text-xl font-display font-bold">₦{totalPaid.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-xl font-display font-bold">₦{totalPending.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border/50">
            <CardContent className="p-5 flex items-center justify-center">
              <Button className="gradient-primary border-0">Make a Payment</Button>
            </CardContent>
          </Card>
        </div>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="font-display text-lg">Contribution History</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Group</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contributions.map((c) => {
                  const config = statusConfig[c.status];
                  const Icon = config.icon;
                  return (
                    <TableRow key={c.id}>
                      <TableCell className="font-medium">{c.group}</TableCell>
                      <TableCell>₦{c.amount.toLocaleString()}</TableCell>
                      <TableCell>{new Date(c.date).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" })}</TableCell>
                      <TableCell>{c.method}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="gap-1">
                          <Icon className={`w-3 h-3 ${config.color}`} />
                          {config.label}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Contributions;
