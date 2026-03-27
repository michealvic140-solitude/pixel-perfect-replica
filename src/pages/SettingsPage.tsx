import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Lock, Bell, CreditCard } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { useToast } from "@/hooks/use-toast";

const SettingsPage = () => {
  const { toast } = useToast();

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-3xl">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your account preferences</p>
        </div>

        <Tabs defaultValue="profile">
          <TabsList>
            <TabsTrigger value="profile"><User className="w-4 h-4 mr-1.5" /> Profile</TabsTrigger>
            <TabsTrigger value="security"><Lock className="w-4 h-4 mr-1.5" /> Security</TabsTrigger>
            <TabsTrigger value="notifications"><Bell className="w-4 h-4 mr-1.5" /> Notifications</TabsTrigger>
            <TabsTrigger value="bank"><CreditCard className="w-4 h-4 mr-1.5" /> Bank</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="font-display text-lg">Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center">
                    <span className="text-white font-display text-2xl font-bold">JD</span>
                  </div>
                  <Button variant="outline" size="sm">Change Photo</Button>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2"><Label>First Name</Label><Input defaultValue="John" /></div>
                  <div className="space-y-2"><Label>Last Name</Label><Input defaultValue="Doe" /></div>
                </div>
                <div className="space-y-2"><Label>Email</Label><Input defaultValue="john@example.com" type="email" /></div>
                <div className="space-y-2"><Label>Phone</Label><Input defaultValue="+234 800 000 0000" /></div>
                <div className="space-y-2"><Label>Address</Label><Input defaultValue="123 Main Street, Ikeja, Lagos" /></div>
                <Button className="gradient-primary border-0" onClick={() => toast({ title: "Profile updated!" })}>Save Changes</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="mt-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="font-display text-lg">Change Password</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2"><Label>Current Password</Label><Input type="password" /></div>
                <div className="space-y-2"><Label>New Password</Label><Input type="password" /></div>
                <div className="space-y-2"><Label>Confirm New Password</Label><Input type="password" /></div>
                <Button className="gradient-primary border-0" onClick={() => toast({ title: "Password updated!" })}>Update Password</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="mt-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="font-display text-lg">Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  { label: "Payment Reminders", desc: "Get notified before contributions are due" },
                  { label: "Payout Alerts", desc: "Notification when you receive a payout" },
                  { label: "Group Updates", desc: "New members, admin announcements" },
                  { label: "Email Notifications", desc: "Receive notifications via email" },
                  { label: "SMS Notifications", desc: "Receive notifications via SMS" },
                ].map((pref) => (
                  <div key={pref.label} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{pref.label}</p>
                      <p className="text-xs text-muted-foreground">{pref.desc}</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bank" className="mt-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="font-display text-lg">Bank Account</CardTitle>
                <CardDescription>This is where your payouts will be sent</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2"><Label>Bank Name</Label><Input defaultValue="GTBank" /></div>
                <div className="space-y-2"><Label>Account Number</Label><Input defaultValue="0123456789" /></div>
                <div className="space-y-2"><Label>Account Name</Label><Input defaultValue="John Doe" disabled /></div>
                <Button className="gradient-primary border-0" onClick={() => toast({ title: "Bank details updated!" })}>Update Bank Details</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
