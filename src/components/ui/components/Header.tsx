import React from "react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Bell, Settings, Menu, X, Home, MessageCircle, Compass, Wallet as WalletIcon, Folder } from "lucide-react";

export default function Header() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <header className="w-full flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 sm:py-4 bg-white shadow-sm border-b">
      {/* Left: Hamburger (mobile) + Logo */}
      <div className="flex items-center gap-3">
        {/* Hamburger Icon (only on small screens, left side) */}
        <button
          className="block sm:hidden mr-2"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open menu"
        >
          <Menu className="w-7 h-7" />
        </button>
        {/* Logo */}
        <div className="font-bold text-xl text-orange-600 flex items-center">
          <span className="mr-2">{/* Logo SVG or image here */}</span>
          TWISTY
        </div>
      </div>
      {/* Nav Items (hidden on small screens) */}
      <div className="hidden sm:flex gap-6">
        <a href="#" className="hover:text-blue-600">Home</a>
        <a href="#" className="hover:text-blue-600">Messages</a>
        <a href="#" className="hover:text-blue-600">Discover</a>
        <a href="#" className="hover:text-blue-600">Wallet</a>
        <a href="#" className="hover:text-blue-600">Projects</a>
      </div>
      {/* Right side icons */}
      <div className="flex items-center gap-4">
        {/* Search bar (only on small screens) */}
        <div className="relative block sm:hidden">
          <Input
            type="text"
            placeholder="Search..."
            className="w-32 pl-8 pr-3 py-1.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        </div>
        
        <div className="relative hidden sm:block">
          <Input
            type="text"
            placeholder="Enter your search request..."
            className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        </div>
        
        {/* Settings and Bell icons (hidden on small screens) */}
        <div className="hidden sm:flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Settings className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        
        {/* Avatar (visible on all screens) */}
        <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
          <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
          <AvatarFallback className="bg-blue-600 text-white font-semibold text-sm">
            U
          </AvatarFallback>
        </Avatar>
      </div>

      {/* Sidebar Drawer (only on small screens) */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex">
          <div className="w-64 bg-white h-full shadow-lg p-6 flex flex-col items-start">
            <button
              className="mb-6 ml-auto"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
            <a href="#" className="mb-4 font-medium text-lg hover:text-blue-600 text-left w-full flex items-center gap-3" onClick={() => setSidebarOpen(false)}><Home className="w-5 h-5" /> Home</a>
            <a href="#" className="mb-4 font-medium text-lg hover:text-blue-600 text-left w-full flex items-center gap-3" onClick={() => setSidebarOpen(false)}><MessageCircle className="w-5 h-5" /> Messages</a>
            <a href="#" className="mb-4 font-medium text-lg hover:text-blue-600 text-left w-full flex items-center gap-3" onClick={() => setSidebarOpen(false)}><Compass className="w-5 h-5" /> Discover</a>
            <a href="#" className="mb-4 font-medium text-lg hover:text-blue-600 text-left w-full flex items-center gap-3" onClick={() => setSidebarOpen(false)}><WalletIcon className="w-5 h-5" /> Wallet</a>
            <a href="#" className="mb-4 font-medium text-lg hover:text-blue-600 text-left w-full flex items-center gap-3" onClick={() => setSidebarOpen(false)}><Folder className="w-5 h-5" /> Projects</a>
            {/* Settings and Bell icons (only on small screens) */}
            <div className="sm:hidden mt-4 pt-4 border-t border-gray-200">
              <a href="#" className="mb-4 font-medium text-lg hover:text-blue-600 text-left w-full flex items-center gap-3" onClick={() => setSidebarOpen(false)}><Settings className="w-5 h-5" /> Settings</a>
              <a href="#" className="mb-4 font-medium text-lg hover:text-blue-600 text-left w-full flex items-center gap-3" onClick={() => setSidebarOpen(false)}><Bell className="w-5 h-5" /> Notifications</a>
            </div>
          </div>
          {/* Click outside to close */}
          <div className="flex-1" onClick={() => setSidebarOpen(false)} />
        </div>
      )}
    </header>
  );
}
