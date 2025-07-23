import React, { useState, useEffect } from "react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { Bell, MessageCircle, Briefcase, Eye, UserPlus, CreditCard, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";

const notificationIcons = {
  message: <MessageCircle className="w-5 h-5 text-blue-500" />,
  job: <Briefcase className="w-5 h-5 text-gray-500" />,
  proposal: <Eye className="w-5 h-5 text-purple-500" />,
  connection: <UserPlus className="w-5 h-5 text-green-500" />,
  payment: <CreditCard className="w-5 h-5 text-emerald-500" />,
  upgrade: <Rocket className="w-5 h-5 text-orange-500" />,
};

type Notification = {
  id: number;
  type: "message" | "job" | "proposal" | "connection" | "payment" | "upgrade";
  text: string;
  meta?: string;
  time: string;
  unread: boolean;
};

export function NotificationsDropdown() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch notifications (mocked for demo)
  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      setNotifications([
        { id: 1, type: "message", text: "You have a new message from John", meta: "UI Design", time: "2 mins ago", unread: true },
        { id: 2, type: "job" as const, text: "New job posted: Web Dashboard", time: "1 hour ago", unread: true },
        { id: 3, type: "proposal" as const, text: "Your proposal was viewed by the client", time: "3 hours ago", unread: false },
        { id: 4, type: "payment" as const, text: "₹1,200 INR received for ‘SaaS App Project’", time: "1 day ago", unread: false },
        { id: 5, type: "upgrade" as const, text: "Upgrade to premium for unlimited proposals", time: "2 days ago", unread: false },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative px-3 py-5 rounded-full bg-white hover:bg-gray-300 transition">
          <Bell className="w-5 h-5 text-gray-600" />
          {notifications.some((n) => n.unread) && (
            <span className="absolute top-1 right-1 w-2 h-2  bg-blue-500 rounded-full" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-96 p-0 rounded-xl shadow-lg">
        {/* Only notification content below, no bell icon */}
        <div className="p-4 border-b flex items-center justify-between">
          <span className="font-semibold text-lg">Notifications</span>
          <button
            className="text-xs text-blue-600 hover:underline"
            onClick={markAllAsRead}
          >
            Mark all as read
          </button>
        </div>
        <div className="max-h-80 overflow-y-auto">
          {loading ? (
            <div className="p-4 text-center text-gray-400">Loading...</div>
          ) : notifications.length === 0 ? (
            <div className="p-4 text-center text-gray-400">No notifications</div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                className={`flex items-start gap-3 px-4 py-3 border-b last:border-b-0 ${
                  n.unread ? "bg-blue-50 font-semibold" : "bg-white"
                }`}
              >
                <div className="mt-1">{notificationIcons[n.type]}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm truncate">{n.text}</div>
                  {n.meta && (
                    <span className="inline-block bg-gray-100 text-xs text-gray-600 rounded px-2 py-0.5 mt-1 mr-2">
                      {n.meta}
                    </span>
                  )}
                  <div className="text-xs text-gray-400 mt-0.5">{n.time}</div>
                </div>
                {n.unread && <span className="w-2 h-2 bg-blue-500 rounded-full mt-2" />}
              </div>
            ))
          )}
        </div>
        <div className="p-3 border-t text-center">
          <Button variant="ghost" className="w-full text-blue-600 hover:underline">
            View all notifications
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
