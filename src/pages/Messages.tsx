import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Send, Search } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const conversations = [
  { id: 1, name: "Prosperity Group", lastMsg: "Admin: Next payout is March 15th", time: "2m ago", unread: 2, isGroup: true },
  { id: 2, name: "Adebayo O.", lastMsg: "Thanks for the reminder!", time: "1h ago", unread: 0, isGroup: false },
  { id: 3, name: "Diamond Circle", lastMsg: "Welcome new member Fatima!", time: "3h ago", unread: 1, isGroup: true },
  { id: 4, name: "Support Team", lastMsg: "Your ticket has been resolved", time: "1d ago", unread: 0, isGroup: false },
];

const messages = [
  { id: 1, sender: "Admin", text: "Good morning everyone! Just a reminder that contributions are due by Friday.", time: "9:00 AM", isMe: false },
  { id: 2, sender: "You", text: "Thanks for the reminder. I'll make my payment today.", time: "9:15 AM", isMe: true },
  { id: 3, sender: "Chinwe A.", text: "Already paid mine! 🎉", time: "9:20 AM", isMe: false },
  { id: 4, sender: "Admin", text: "Next payout is March 15th for Seat #5 (John D.)", time: "9:30 AM", isMe: false },
];

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState(conversations[0]);
  const [newMessage, setNewMessage] = useState("");
  const [search, setSearch] = useState("");

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <h1 className="font-display text-2xl md:text-3xl font-bold">Messages</h1>

        <div className="grid lg:grid-cols-3 gap-4 h-[calc(100vh-220px)]">
          {/* Conversation List */}
          <Card className="border-border/50 lg:col-span-1 flex flex-col">
            <CardHeader className="pb-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search conversations..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} />
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto space-y-1 p-2">
              {conversations.map(conv => (
                <button
                  key={conv.id}
                  onClick={() => setSelectedChat(conv)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedChat.id === conv.id ? "bg-primary/10" : "hover:bg-muted/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm">{conv.name}</span>
                    <span className="text-xs text-muted-foreground">{conv.time}</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-muted-foreground truncate pr-2">{conv.lastMsg}</span>
                    {conv.unread > 0 && (
                      <Badge className="gradient-primary border-0 text-[10px] h-5 min-w-5">{conv.unread}</Badge>
                    )}
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>

          {/* Chat Area */}
          <Card className="border-border/50 lg:col-span-2 flex flex-col">
            <CardHeader className="border-b border-border py-3">
              <CardTitle className="font-display text-base">{selectedChat.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[70%] rounded-2xl px-4 py-2.5 ${
                    msg.isMe ? "gradient-primary text-white" : "bg-muted"
                  }`}>
                    {!msg.isMe && <p className="text-xs font-semibold mb-1 text-primary">{msg.sender}</p>}
                    <p className="text-sm">{msg.text}</p>
                    <p className={`text-[10px] mt-1 ${msg.isMe ? "text-white/70" : "text-muted-foreground"}`}>{msg.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={e => setNewMessage(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && setNewMessage("")}
                />
                <Button className="gradient-primary border-0" size="icon" onClick={() => setNewMessage("")}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Messages;
