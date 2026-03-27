import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Users, Plus, Search, Clock, CheckCircle2, Shield } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { useToast } from "@/hooks/use-toast";

const allGroups = [
  { id: 1, name: "Prosperity Group", admin: "Adebayo O.", members: 15, maxMembers: 20, contribution: 50000, cycle: "Monthly", seatsAvailable: 5, status: "active", totalPool: 1000000 },
  { id: 2, name: "Unity Savers", admin: "Chinwe A.", members: 10, maxMembers: 10, contribution: 20000, cycle: "Weekly", seatsAvailable: 0, status: "completed", totalPool: 200000 },
  { id: 3, name: "Diamond Circle", admin: "Emeka N.", members: 18, maxMembers: 30, contribution: 100000, cycle: "Monthly", seatsAvailable: 12, status: "active", totalPool: 3000000 },
  { id: 4, name: "Golden Harvest", admin: "Fatima B.", members: 8, maxMembers: 15, contribution: 30000, cycle: "Bi-Weekly", seatsAvailable: 7, status: "active", totalPool: 450000 },
  { id: 5, name: "Eagle Wings", admin: "Ibrahim K.", members: 25, maxMembers: 25, contribution: 75000, cycle: "Monthly", seatsAvailable: 0, status: "active", totalPool: 1875000 },
];

const Groups = () => {
  const [search, setSearch] = useState("");
  const { toast } = useToast();
  const filtered = allGroups.filter(g => g.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl md:text-3xl font-bold">Ajo Groups</h1>
            <p className="text-muted-foreground mt-1">Browse, join, or create savings groups</p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gradient-primary border-0"><Plus className="w-4 h-4 mr-2" /> Create Group</Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="font-display">Create New Ajo Group</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div className="space-y-2"><Label>Group Name</Label><Input placeholder="e.g. Prosperity Circle" /></div>
                <div className="space-y-2">
                  <Label>Contribution Amount (₦)</Label>
                  <Input type="number" placeholder="50000" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Cycle</Label>
                    <Select><SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="biweekly">Bi-Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Max Members</Label>
                    <Input type="number" placeholder="20" min={5} max={30} />
                  </div>
                </div>
                <div className="space-y-2"><Label>Description</Label><Input placeholder="Brief description of your group" /></div>
                <Button className="w-full gradient-primary border-0" onClick={() => toast({ title: "Group created!", description: "Share the invite link with members." })}>
                  Create Group
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search groups..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
        </div>

        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger value="all">All Groups</TabsTrigger>
            <TabsTrigger value="my">My Groups</TabsTrigger>
            <TabsTrigger value="open">Open to Join</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map(group => (
                <Card key={group.id} className="border-border/50 hover:border-primary/30 transition-colors">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="font-display text-lg">{group.name}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">by {group.admin}</p>
                      </div>
                      <Badge variant={group.status === "active" ? "default" : "secondary"} className={group.status === "active" ? "gradient-primary border-0" : ""}>
                        {group.status === "active" ? "Active" : "Completed"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-y-3 text-sm">
                      <div>
                        <span className="text-muted-foreground">Contribution</span>
                        <p className="font-semibold">₦{group.contribution.toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Cycle</span>
                        <p className="font-semibold">{group.cycle}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Members</span>
                        <p className="font-semibold">{group.members}/{group.maxMembers}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Pool</span>
                        <p className="font-semibold">₦{group.totalPool.toLocaleString()}</p>
                      </div>
                    </div>
                    <Progress value={(group.members / group.maxMembers) * 100} className="h-1.5" />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        {group.seatsAvailable > 0 ? (
                          <><Clock className="w-3 h-3" /> {group.seatsAvailable} seats available</>
                        ) : (
                          <><CheckCircle2 className="w-3 h-3" /> Full</>
                        )}
                      </div>
                      <Button size="sm" disabled={group.seatsAvailable === 0} className={group.seatsAvailable > 0 ? "gradient-primary border-0" : ""}>
                        {group.seatsAvailable > 0 ? "Join" : "Full"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="my" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.slice(0, 3).map(group => (
                <Card key={group.id} className="border-border/50 hover:border-primary/30 transition-colors">
                  <CardContent className="p-5">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Users className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold">{group.name}</h4>
                        <p className="text-xs text-muted-foreground">{group.cycle} · ₦{group.contribution.toLocaleString()}</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">View Details</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="open" className="mt-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.filter(g => g.seatsAvailable > 0).map(group => (
                <Card key={group.id} className="border-border/50 hover:border-primary/30 transition-colors">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold font-display">{group.name}</h4>
                      <Badge className="gradient-primary border-0">{group.seatsAvailable} seats</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground space-y-1 mb-4">
                      <p>₦{group.contribution.toLocaleString()} / {group.cycle}</p>
                      <p>{group.members}/{group.maxMembers} members</p>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                      <Shield className="w-3 h-3" /> KYC verified members only
                    </div>
                    <Button size="sm" className="w-full gradient-primary border-0">Join Group</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Groups;
