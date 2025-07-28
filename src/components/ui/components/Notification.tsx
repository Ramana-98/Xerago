import React, { useState, useEffect } from "react";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { Bell, MessageCircle, Briefcase, Eye, UserPlus, CreditCard, Rocket, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
        { id: 4, type: "payment" as const, text: "₹1,200 INR received for 'SaaS App Project'", time: "1 day ago", unread: false },
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
        <div className="max-h-80 overflow-y-auto hide-scrollbar-mobile">
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

// Dedicated Notification Page for small screens
export function NotificationPage() {
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
        { id: 4, type: "payment" as const, text: "₹1,200 INR received for 'SaaS App Project'", time: "1 day ago", unread: false },
        { id: 5, type: "upgrade" as const, text: "Upgrade to premium for unlimited proposals", time: "2 days ago", unread: false },
        { id: 6, type: "connection" as const, text: "New connection request from Sarah", time: "3 days ago", unread: false },
        { id: 7, type: "message", text: "Project update from Team Alpha", meta: "SaaS App", time: "4 days ago", unread: false },
        { id: 8, type: "payment" as const, text: "₹800 INR received for 'Mobile App'", time: "5 days ago", unread: false },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const markAsRead = (id: number) => {
    setNotifications((prev) => 
      prev.map((n) => n.id === id ? { ...n, unread: false } : n)
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b px-4 py-3 flex items-center gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => window.location.href = "/"}
          className="hover:bg-gray-100"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-xl font-bold flex-1">Notifications</h1>
        <Button
          variant="ghost"
          size="sm"
          onClick={markAllAsRead}
          className="text-blue-600 hover:text-blue-700"
        >
          Mark all read
        </Button>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-500 mt-2">Loading notifications...</p>
          </div>
        ) : notifications.length === 0 ? (
          <Card className="text-center py-8">
            <CardContent>
              <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">No notifications</h3>
              <p className="text-gray-500">You're all caught up!</p>
            </CardContent>
          </Card>
        ) : (
          notifications.map((notification) => (
            <Card 
              key={notification.id} 
              className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
                notification.unread ? "ring-2 ring-blue-200 bg-blue-50" : ""
              }`}
              onClick={() => markAsRead(notification.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex-shrink-0">
                    {notificationIcons[notification.type]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`text-sm ${notification.unread ? "font-semibold" : ""}`}>
                      {notification.text}
                    </div>
                    {notification.meta && (
                      <span className="inline-block bg-gray-100 text-xs text-gray-600 rounded px-2 py-0.5 mt-2 mr-2">
                        {notification.meta}
                      </span>
                    )}
                    <div className="text-xs text-gray-400 mt-1">{notification.time}</div>
                  </div>
                  {notification.unread && (
                    <span className="w-3 h-3 bg-blue-500 rounded-full mt-1 flex-shrink-0" />
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
