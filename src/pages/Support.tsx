import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { HelpCircle, MessageSquare, Phone, Mail, Clock, CheckCircle2 } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { useToast } from "@/hooks/use-toast";

const tickets = [
  { id: "TKT-001", subject: "Payment not reflecting", status: "resolved", date: "2026-03-15" },
  { id: "TKT-002", subject: "Unable to join group", status: "open", date: "2026-03-20" },
  { id: "TKT-003", subject: "Wrong payout amount", status: "in-progress", date: "2026-03-22" },
];

const Support = () => {
  const { toast } = useToast();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold">Help & Support</h1>
          <p className="text-muted-foreground mt-1">Get help with your account or report issues</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <Card className="border-border/50 text-center">
            <CardContent className="p-6">
              <Phone className="w-8 h-8 mx-auto text-primary mb-3" />
              <h4 className="font-semibold mb-1">Call Us</h4>
              <p className="text-sm text-muted-foreground">+234 800 000 0000</p>
            </CardContent>
          </Card>
          <Card className="border-border/50 text-center">
            <CardContent className="p-6">
              <Mail className="w-8 h-8 mx-auto text-primary mb-3" />
              <h4 className="font-semibold mb-1">Email</h4>
              <p className="text-sm text-muted-foreground">help@rejoicetrust.com</p>
            </CardContent>
          </Card>
          <Card className="border-border/50 text-center">
            <CardContent className="p-6">
              <MessageSquare className="w-8 h-8 mx-auto text-primary mb-3" />
              <h4 className="font-semibold mb-1">Live Chat</h4>
              <p className="text-sm text-muted-foreground">Available 24/7</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Create Ticket */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="font-display text-lg">Submit a Ticket</CardTitle>
              <CardDescription>Describe your issue and we'll get back to you ASAP</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="payment">Payment Issue</SelectItem>
                    <SelectItem value="group">Group Issue</SelectItem>
                    <SelectItem value="account">Account Issue</SelectItem>
                    <SelectItem value="payout">Payout Issue</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Subject</Label>
                <Input placeholder="Brief description of your issue" />
              </div>
              <div className="space-y-2">
                <Label>Message</Label>
                <Textarea placeholder="Provide details about your issue..." rows={4} />
              </div>
              <Button className="w-full gradient-primary border-0" onClick={() => toast({ title: "Ticket submitted!", description: "We'll respond within 24 hours." })}>
                Submit Ticket
              </Button>
            </CardContent>
          </Card>

          {/* Ticket History */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="font-display text-lg">My Tickets</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {tickets.map(t => (
                <div key={t.id} className="p-3 rounded-lg bg-muted/30 border border-border/50">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-muted-foreground">{t.id}</span>
                    <Badge variant="outline" className={
                      t.status === "resolved" ? "text-primary border-primary/30" :
                      t.status === "open" ? "text-accent border-accent/30" :
                      "text-muted-foreground"
                    }>
                      {t.status === "resolved" && <CheckCircle2 className="w-3 h-3 mr-1" />}
                      {t.status === "open" && <Clock className="w-3 h-3 mr-1" />}
                      {t.status}
                    </Badge>
                  </div>
                  <p className="text-sm font-medium">{t.subject}</p>
                  <p className="text-xs text-muted-foreground mt-1">{new Date(t.date).toLocaleDateString("en-NG")}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Support;
