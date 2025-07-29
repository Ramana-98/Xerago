import React, { useState, useMemo } from "react";
import { Bell, MessageCircle, Briefcase, Eye, UserPlus, CreditCard, Rocket, Search, Check, Trash2, ArrowLeft, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useNotifications } from "@/context/NotificationContext";

const notificationIcons = {
  message: <MessageCircle className="w-5 h-5 text-blue-500" />,
  job: <Briefcase className="w-5 h-5 text-gray-500" />,
  proposal: <Eye className="w-5 h-5 text-purple-500" />,
  connection: <UserPlus className="w-5 h-5 text-green-500" />,
  payment: <CreditCard className="w-5 h-5 text-emerald-500" />,
  upgrade: <Rocket className="w-5 h-5 text-orange-500" />,
};

const getNotificationType = (type: string) => {
  switch (type) {
    case 'payment':
      return 'Payments';
    case 'connection':
    case 'message':
      return 'Requests';
    default:
      return 'All';
  }
};

export default function NotificationPage() {
  const { notifications, loading, markAllAsRead, markAsRead, clearAll } = useNotifications();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filteredNotifications = useMemo(() => {
    let filtered = notifications;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(notification =>
        notification.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (notification.meta && notification.meta.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Filter by tab
    switch (activeTab) {
      case "unread":
        filtered = filtered.filter(notification => notification.unread);
        break;
      case "payments":
        filtered = filtered.filter(notification => notification.type === "payment");
        break;
      case "requests":
        filtered = filtered.filter(notification => 
          notification.type === "connection" || notification.type === "message"
        );
        break;
      default:
        // "all" tab - no additional filtering
        break;
    }

    return filtered;
  }, [notifications, searchQuery, activeTab]);

  const handleMarkAllAsRead = () => {
    markAllAsRead();
  };

  const handleClearAll = () => {
    clearAll();
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white border-b px-4 sm:px-6 py-3 sm:py-4 flex items-center gap-3 sm:gap-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBack}
          className="hover:bg-gray-100"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {notifications.length} total notifications
          </p>
        </div>
        <div className="flex gap-1 sm:gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleMarkAllAsRead}
            className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2"
          >
            <Check className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Mark all as read</span>
            <span className="sm:hidden">Read</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearAll}
            className="flex items-center gap-1 sm:gap-2 text-red-600 hover:text-red-700 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2"
          >
            <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Clear all</span>
            <span className="sm:hidden">Clear</span>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-4 sm:p-6">
        <Card className="shadow-lg">
          <CardHeader className="border-b bg-gray-50 p-4 sm:p-6">
            <div className="flex flex-col gap-4">
              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search notifications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white"
                />
              </div>

              {/* Desktop Tabs */}
              <div className="hidden sm:block">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-4 bg-white">
                    <TabsTrigger value="all" className="flex items-center gap-2">
                      <Bell className="w-4 h-4" />
                      All
                      <Badge variant="secondary" className="ml-1">
                        {notifications.length}
                      </Badge>
                    </TabsTrigger>
                    <TabsTrigger value="unread" className="flex items-center gap-2">
                      <div className="w-4 h-4 relative">
                        <Bell className="w-4 h-4" />
                        {notifications.some(n => n.unread) && (
                          <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full" />
                        )}
                      </div>
                      Unread
                      <Badge variant="secondary" className="ml-1">
                        {notifications.filter(n => n.unread).length}
                      </Badge>
                    </TabsTrigger>
                    <TabsTrigger value="payments" className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4" />
                      Payments
                      <Badge variant="secondary" className="ml-1">
                        {notifications.filter(n => n.type === "payment").length}
                      </Badge>
                    </TabsTrigger>
                    <TabsTrigger value="requests" className="flex items-center gap-2">
                      <UserPlus className="w-4 h-4" />
                      Requests
                      <Badge variant="secondary" className="ml-1">
                        {notifications.filter(n => n.type === "connection" || n.type === "message").length}
                      </Badge>
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {/* Mobile Filter Dropdown */}
              <div className="sm:hidden">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="w-full justify-between">
                      <span className="flex items-center gap-2">
                        {activeTab === "all" && <Bell className="w-4 h-4" />}
                        {activeTab === "unread" && <Bell className="w-4 h-4" />}
                        {activeTab === "payments" && <CreditCard className="w-4 h-4" />}
                        {activeTab === "requests" && <UserPlus className="w-4 h-4" />}
                        {activeTab === "all" && "All"}
                        {activeTab === "unread" && "Unread"}
                        {activeTab === "payments" && "Payments"}
                        {activeTab === "requests" && "Requests"}
                      </span>
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full">
                    <DropdownMenuItem onClick={() => setActiveTab("all")} className="flex items-center gap-2">
                      <Bell className="w-4 h-4" />
                      All
                      <Badge variant="secondary" className="ml-auto">
                        {notifications.length}
                      </Badge>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setActiveTab("unread")} className="flex items-center gap-2">
                      <div className="w-4 h-4 relative">
                        <Bell className="w-4 h-4" />
                        {notifications.some(n => n.unread) && (
                          <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full" />
                        )}
                      </div>
                      Unread
                      <Badge variant="secondary" className="ml-auto">
                        {notifications.filter(n => n.unread).length}
                      </Badge>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setActiveTab("payments")} className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4" />
                      Payments
                      <Badge variant="secondary" className="ml-auto">
                        {notifications.filter(n => n.type === "payment").length}
                      </Badge>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setActiveTab("requests")} className="flex items-center gap-2">
                      <UserPlus className="w-4 h-4" />
                      Requests
                      <Badge variant="secondary" className="ml-auto">
                        {notifications.filter(n => n.type === "connection" || n.type === "message").length}
                      </Badge>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <div className="max-h-[500px] sm:max-h-[600px] overflow-y-auto">
              {loading ? (
                <div className="p-8 text-center text-gray-500">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
                  Loading notifications...
                </div>
              ) : filteredNotifications.length === 0 ? (
                <div className="p-8 text-center text-gray-500">
                  <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications found</h3>
                  <p className="text-sm text-gray-500">
                    {searchQuery ? "Try adjusting your search terms." : "You're all caught up!"}
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`py-3 px-3 sm:px-4 hover:bg-gray-50 transition-colors duration-200 flex items-center gap-2 sm:gap-3 ${notification.unread ? "bg-blue-50" : "bg-white"}`}
                    >
                      {/* Icon */}
                      <div className="flex-shrink-0 flex items-center justify-center">{notificationIcons[notification.type]}</div>
                      {/* Content and time in a single line */}
                      <div className="flex-1 min-w-0 flex items-center gap-2">
                        <span className={`text-xs sm:text-sm font-medium truncate ${notification.unread ? "text-gray-900" : "text-gray-700"}`}>{notification.text}</span>
                        {notification.meta && (
                          <Badge variant="outline" className="text-xs ml-2 whitespace-nowrap">{notification.meta}</Badge>
                        )}
                      </div>
                      {/* Time and badges at the end */}
                      <div className="flex items-center gap-2 flex-shrink-0 ml-auto">
                        <span className="text-xs text-gray-400 whitespace-nowrap">{notification.time}</span>
                        {notification.unread && (
                          <Badge variant="default" className="bg-blue-500 text-white text-xs">New</Badge>
                        )}
                        <Badge variant="outline" className="text-xs">{getNotificationType(notification.type)}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 