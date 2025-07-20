import React, { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, Search, Star, Archive, Plus, CheckCircle, Circle } from "lucide-react";

// Mock data
const contacts = [
  { id: 1, name: "John Doe", lastMessage: "See you soon!", unread: 2, project: "UI Design" },
  { id: 2, name: "Jane Smith", lastMessage: "Thanks for the update.", unread: 0, project: "Web Dashboard" },
  { id: 3, name: "Alex Lee", lastMessage: "Let's connect tomorrow.", unread: 1, project: "API Integration" },
  { id: 4, name: "Team Alpha", lastMessage: "Meeting at 3pm.", unread: 0, project: "SaaS App" },
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

  return (
    <div className="flex flex-col sm:flex-row h-screen bg-gray-100">
      {/* Sidebar/Contacts */}
      {( !mobileChatOpen || window.innerWidth >= 640 ) && (
        <div className="w-full sm:w-80 bg-white border-r flex-shrink-0 flex flex-col">
          <div className="p-4 border-b flex items-center gap-2">
            <span className="font-bold text-lg flex-1">Messages</span>
            <Button variant="ghost" size="icon"><Plus className="w-5 h-5" /></Button>
          </div>
          <div className="p-2">
            <Input
              placeholder="Search messages..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="mb-2"
            />
            <div className="flex gap-2 mb-2">
              {filters.map((f) => (
                <Button
                  key={f}
                  size="sm"
                  variant={activeFilter === f ? "default" : "outline"}
                  onClick={() => setActiveFilter(f)}
                  className="text-xs"
                >
                  {f === "Starred" ? <Star className="w-3 h-3 mr-1" /> : null}
                  {f === "Archived" ? <Archive className="w-3 h-3 mr-1" /> : null}
                  {f}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {filteredContacts.map((c: typeof contacts[0]) => (
              <div
                key={c.id}
                className={`flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 border-b ${selectedContact.id === c.id ? "bg-blue-50" : ""}`}
                onClick={() => {
                  setSelectedContact(c);
                  if (window.innerWidth < 640) setMobileChatOpen(true);
                }}
              >
                <User className="w-8 h-8 text-gray-400 bg-gray-100 rounded-full p-1" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium truncate">{c.name}</span>
                    {unreadCounts[c.id] > 0 && <Badge className="bg-blue-500 text-white ml-1">{unreadCounts[c.id]}</Badge>}
                  </div>
                  <div className="text-xs text-gray-500 truncate">{c.project}</div>
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
              <Button variant="ghost" size="sm" onClick={() => setMobileChatOpen(false)}>
                ← Back
              </Button>
            </div>
          )}
          <div className="p-4 border-b flex items-center gap-2">
            <span className="font-bold text-lg flex-1">{selectedContact.name}</span>
            <span className="text-xs text-gray-500">{selectedContact.project}</span>
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
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">Send</Button>
          </form>
        </div>
      )}
    </div>
  );
}
