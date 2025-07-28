import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, Star, Archive, Plus, CheckCircle, Phone, Mail, MapPin, Clock, MessageCircle, ExternalLink } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";


// Mock data
const contacts = [
  { 
    id: 1, 
    name: "John Doe", 
    lastMessage: "See you soon!", 
    unread: 2, 
    project: "UI Design", 
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    role: "UI Designer",
    status: "Available",
    email: "john.doe@example.com",
    location: "San Francisco, CA",
    timezone: "PST (UTC-8)",
    phone: "+1 (555) 123-4567"
  },
  { 
    id: 2, 
    name: "Jane Smith", 
    lastMessage: "Thanks for the update.", 
    unread: 0, 
    project: "Web Dashboard", 
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    role: "Frontend Developer",
    status: "Busy",
    email: "jane.smith@example.com",
    location: "New York, NY",
    timezone: "EST (UTC-5)",
    phone: "+1 (555) 234-5678"
  },
  { 
    id: 3, 
    name: "Alex Lee", 
    lastMessage: "Let's connect tomorrow.", 
    unread: 1, 
    project: "API Integration", 
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    role: "Backend Developer",
    status: "Available",
    email: "alex.lee@example.com",
    location: "Austin, TX",
    timezone: "CST (UTC-6)",
    phone: "+1 (555) 345-6789"
  },
  { 
    id: 4, 
    name: "Team Alpha", 
    lastMessage: "Meeting at 3pm.", 
    unread: 0, 
    project: "SaaS App", 
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    role: "Project Manager",
    status: "In Meeting",
    email: "team.alpha@example.com",
    location: "Seattle, WA",
    timezone: "PST (UTC-8)",
    phone: "+1 (555) 456-7890"
  },
  // New contacts
  { 
    id: 5, 
    name: "Priya Kumar", 
    lastMessage: "I'll send the files soon.", 
    unread: 3, 
    project: "Mobile App", 
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    role: "Mobile Developer",
    status: "Available",
    email: "priya.kumar@example.com",
    location: "Mumbai, India",
    timezone: "IST (UTC+5:30)",
    phone: "+91 98765 43210"
  },
  { 
    id: 6, 
    name: "Carlos Rivera", 
    lastMessage: "Can we reschedule?", 
    unread: 0, 
    project: "E-commerce", 
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    role: "UX Designer",
    status: "Away",
    email: "carlos.rivera@example.com",
    location: "Barcelona, Spain",
    timezone: "CET (UTC+1)",
    phone: "+34 612 345 678"
  },
  { 
    id: 7, 
    name: "Emily Chen", 
    lastMessage: "Great job on the demo!", 
    unread: 1, 
    project: "AI Research", 
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    role: "Data Scientist",
    status: "Available",
    email: "emily.chen@example.com",
    location: "Toronto, Canada",
    timezone: "EST (UTC-5)",
    phone: "+1 (555) 567-8901"
  },
  { 
    id: 8, 
    name: "Liam O'Brien", 
    lastMessage: "See you at the meeting.", 
    unread: 0, 
    project: "HR Portal", 
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    role: "Product Manager",
    status: "Busy",
    email: "liam.obrien@example.com",
    location: "Dublin, Ireland",
    timezone: "GMT (UTC+0)",
    phone: "+353 87 123 4567"
  },
  { 
    id: 9, 
    name: "Sophia Rossi", 
    lastMessage: "Invoice sent.", 
    unread: 2, 
    project: "Finance", 
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    role: "Financial Analyst",
    status: "Available",
    email: "sophia.rossi@example.com",
    location: "Milan, Italy",
    timezone: "CET (UTC+1)",
    phone: "+39 333 123 4567"
  },
  { 
    id: 10, 
    name: "Mia Müller", 
    lastMessage: "Danke!", 
    unread: 0, 
    project: "Localization", 
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    role: "Translator",
    status: "Available",
    email: "mia.mueller@example.com",
    location: "Berlin, Germany",
    timezone: "CET (UTC+1)",
    phone: "+49 30 123 45678"
  },
];

const mockMessages: { [key: number]: { fromMe: boolean; text: string; time: string }[] } = {
  1: [
    { fromMe: false, text: "Hey! Are you available for a quick call?", time: "09:00" },
    { fromMe: true, text: "Sure, give me 5 minutes.", time: "09:01" },
    { fromMe: false, text: "See you soon!", time: "09:02" },
  ],
  2: [
    { fromMe: false, text: "Thanks for the update.", time: "Yesterday" },
  ],
  3: [
    { fromMe: false, text: "Let's connect tomorrow.", time: "2 days ago" },
    { fromMe: true, text: "Sounds good!", time: "2 days ago" },
  ],
  4: [
    { fromMe: false, text: "Meeting at 3pm.", time: "3 days ago" },
  ],
  // New contacts' messages
  5: [
    { fromMe: false, text: "Hi, are you there?", time: "08:00" },
    { fromMe: true, text: "Yes, what's up?", time: "08:01" },
    { fromMe: false, text: "I'll send the files soon.", time: "08:05" },
    { fromMe: false, text: "Did you get my email?", time: "08:10" },
    { fromMe: false, text: "Let me know if you need anything else.", time: "08:15" },
  ],
  6: [
    { fromMe: false, text: "Can we reschedule?", time: "Yesterday" },
    { fromMe: true, text: "Sure, what time works for you?", time: "Yesterday" },
  ],
  7: [
    { fromMe: false, text: "Great job on the demo!", time: "Today" },
    { fromMe: true, text: "Thank you!", time: "Today" },
  ],
  8: [
    { fromMe: false, text: "See you at the meeting.", time: "Tomorrow" },
  ],
  9: [
    { fromMe: false, text: "Invoice sent.", time: "Today" },
    { fromMe: false, text: "Please confirm receipt.", time: "Today" },
    { fromMe: true, text: "Received, thanks!", time: "Today" },
  ],
  10: [
    { fromMe: false, text: "Danke!", time: "Yesterday" },
    { fromMe: true, text: "Gern geschehen!", time: "Yesterday" },
  ],
};

const filters = ["All", "Unread", "Starred", "Archived"];

export default function Messages() {
  const [selectedContact, setSelectedContact] = useState(contacts[0]);
  const [messages, setMessages] = useState(mockMessages[selectedContact.id]);
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [unreadCounts, setUnreadCounts] = useState<{ [key: number]: number }>(
    contacts.reduce((acc, c) => ({ ...acc, [c.id]: c.unread }), {} as { [key: number]: number })
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [mobileChatOpen, setMobileChatOpen] = useState(false);
  const [newMessageOpen, setNewMessageOpen] = useState(false);
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [messageBody, setMessageBody] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, selectedContact]);

  // Mark messages as read when contact is selected
  useEffect(() => {
    setMessages(mockMessages[selectedContact.id]);
    setUnreadCounts((prev) => ({ ...prev, [selectedContact.id]: 0 }));
  }, [selectedContact]);

  // Filter contacts
  const filteredContacts = contacts.filter((c) => {
    if (activeFilter === "Unread") return unreadCounts[c.id] > 0;
    if (activeFilter === "Starred") return c.name === "Jane Smith"; // Example
    if (activeFilter === "Archived") return c.name === "Team Alpha"; // Example
    return c.name.toLowerCase().includes(search.toLowerCase()) || c.project.toLowerCase().includes(search.toLowerCase());
  });

  // Send message
  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { fromMe: true, text: input, time: "Now" }]);
    setInput("");
  };

  const handleEmojiSelect = (emoji: { native: string }) => {
    setInput(prev => prev + emoji.native);
    setShowEmojiPicker(false);
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available": return "bg-green-500";
      case "Busy": return "bg-yellow-500";
      case "Away": return "bg-gray-500";
      case "In Meeting": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="flex flex-col sm:flex-row h-screen bg-gray-200">
      {/* Sidebar/Contacts */}
      {( !mobileChatOpen || window.innerWidth >= 640 ) && (
        <div className="w-full sm:w-80 bg-gray-200 border-r flex-shrink-0 flex flex-col">
          <div className="p-4 border-b flex flex-col gap-2">
            <button
              className="back-btn self-start mb-2"
              aria-label="Back to Dashboard"
              onClick={() => {
                // Replace with your navigation logic, e.g., navigate("/dashboard")
                window.location.href = "/"; // or use your router
              }}
            >
              ←
            </button>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg flex-1">Messages</span>
              <Dialog open={newMessageOpen} onOpenChange={setNewMessageOpen}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="hover:scale-105 hover:shadow-md transition-all duration-200"><Plus className="w-5 h-5" /></Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>New Message</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-3">
                    <Input
                      placeholder="Recipient name"
                      value={recipient}
                      onChange={e => setRecipient(e.target.value)}
                    />
                    <Input
                      placeholder="Subject or Project (optional)"
                      value={subject}
                      onChange={e => setSubject(e.target.value)}
                    />
                    <Textarea
                      placeholder="Type your message..."
                      value={messageBody}
                      onChange={e => setMessageBody(e.target.value)}
                      className="min-h-[80px]"
                    />
                  </div>
                  <DialogFooter className="mt-4 flex gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setNewMessageOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() => {
                        // Here you would handle sending the message
                        setNewMessageOpen(false);
                        setRecipient("");
                        setSubject("");
                        setMessageBody("");
                      }}
                      disabled={!recipient.trim() || !messageBody.trim()}
                    >
                      Send
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <div className="p-2 ">
            <div className="relative">
              <Input
                placeholder="Search messages..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="mb-2"
                style={{ backgroundColor: "white", }}
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
              
            </div>
            <div className="flex gap-2 mb-2 ">
              {filters.map((f) => (
                <Button
                  key={f}
                  size="sm"
                  variant={activeFilter === f ? "default" : "outline"}
                  onClick={() => setActiveFilter(f)}
                  className="text-xs hover:scale-105 hover:shadow-md transition-all duration-200 "
                  style={{ backgroundColor: activeFilter === f ? "blue" : "white", }}
                >
                  {f === "Starred" ? <Star className="w-3 h-3 mr-1" /> : null}
                  {f === "Archived" ? <Archive className="w-3 h-3 mr-1" /> : null}
                  {f}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex-1 overflow-y-auto hide-scrollbar">
            {filteredContacts.map((c: typeof contacts[0]) => (
              <div
                key={c.id}
                className={`flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-300 border-b ${selectedContact.id === c.id ? "bg-blue-50" : ""}`}
                onClick={() => {
                  setSelectedContact(c);
                  if (window.innerWidth < 640) setMobileChatOpen(true);
                }}
              >
                <Popover>
                  <PopoverTrigger asChild>
                    <div className="cursor-pointer">
                      <Avatar className="w-8 h-8 hover:scale-105 transition-transform duration-200">
                        <AvatarImage src={c.avatar} alt={c.name} />
                        <AvatarFallback className="bg-gray-300 text-gray-600 text-xs">
                          {c.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-0 bg-white/95 backdrop-blur-md border-0 shadow-xl rounded-2xl">
                    <div className="p-6 space-y-4">
                      {/* Profile Header */}
                      <div className="flex items-center gap-4">
                        <Avatar className="w-16 h-16">
                          <AvatarImage src={c.avatar} alt={c.name} />
                          <AvatarFallback className="bg-gray-300 text-gray-600 text-lg">
                            {c.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-800">{c.name}</h3>
                          <p className="text-gray-600">{c.role}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <div className={`w-2 h-2 rounded-full ${getStatusColor(c.status)}`}></div>
                            <span className="text-sm text-gray-500">{c.status}</span>
                          </div>
                        </div>
                      </div>

                      {/* Contact Details */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-3 text-sm">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-700">{c.email}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-700">{c.phone}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-700">{c.location}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-700">{c.timezone}</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 pt-2">
                        <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Message
                        </Button>
                        <Button variant="outline" className="flex-1">
                          <Phone className="w-4 h-4 mr-2" />
                          Call
                        </Button>
                      </div>
                      <Button variant="ghost" className="w-full text-gray-600 hover:text-gray-800">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Full Profile
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
                <div className="flex-1 min-w-0 ">
                  <div className="flex items-center gap-2">
                    <span className="font-medium truncate">{c.name}</span>
                    {unreadCounts[c.id] > 0 && <Badge className="bg-blue-500 text-white ml-1">{unreadCounts[c.id]}</Badge>}
                  </div>
                  <div className="text-xs text-gray-900 truncate">{c.project}</div>
                  <div className="text-xs text-gray-400 truncate">{c.lastMessage}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Chat Area */}
      {( mobileChatOpen || window.innerWidth >= 640 ) && (
        <div className="flex-1 flex flex-col h-full">
          {/* Mobile back button */}
          {window.innerWidth < 640 && (
            <div className="p-2 border-b">
              <Button variant="ghost" size="sm" onClick={() => setMobileChatOpen(false)} className="hover:scale-105 hover:shadow-md transition-all duration-200">
                ← Back
              </Button>
            </div>
          )}
          <div className="p-4 border-b flex items-center gap-3 bg-white">
            <Avatar className="w-10 h-10">
              <AvatarImage src={selectedContact.avatar} alt={selectedContact.name} />
              <AvatarFallback className="bg-gray-300 text-gray-600">
                {selectedContact.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <span className="font-bold text-lg">{selectedContact.name}</span>
              <div className="text-xs text-gray-500">{selectedContact.project}</div>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50">
            {messages.map((m: { fromMe: boolean; text: string; time: string }, idx: number) => (
              <div
                key={idx}
                className={`flex ${m.fromMe ? "justify-end" : "justify-start"}`}
              >
                <div className={`rounded-lg px-3 py-2 max-w-xs ${m.fromMe ? "bg-blue-500 text-white" : "bg-white border"}`}>
                  <div>{m.text}</div>
                  <div className="text-xs mt-1 text-right opacity-70">{m.time} {m.fromMe && <CheckCircle className="inline w-3 h-3 ml-1" />}</div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form
            className="flex gap-2 p-4 border-t bg-white"
            onSubmit={e => {
              e.preventDefault();
              sendMessage();
            }}
          >
            <Input
              placeholder="Type a message..."
              value={input}
              onChange={e => setInput(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 hover:scale-105 hover:shadow-md transition-all duration-200">Send</Button>
          </form>
        </div>
      )}
    </div>
  );
}
