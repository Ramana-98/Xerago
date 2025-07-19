import React from "react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Bell, Settings } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3 sm:py-4 bg-white shadow-sm border-b">
      {/* Left Section: Logo + Nav */}
      <div className="flex items-center space-x-4 lg:space-x-8">
        {/* TWISTY Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xs sm:text-sm">T</span>
          </div>
          <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            TWISTY
          </span>
        </div>
        
        {/* Navigation */}
        <nav className="hidden lg:flex items-center space-x-6 xl:space-x-10 text-sm">
          <a href="#" className="text-blue-600 font-semibold border-b-2 border-blue-600 pb-1">Home</a>
          <a href="#" className="text-gray-600 hover:text-gray-800">Messages</a>
          <a href="#" className="text-gray-600 hover:text-gray-800">Discover</a>
          <a href="#" className="text-gray-600 hover:text-gray-800">Wallet</a>
          <a href="#" className="text-gray-600 hover:text-gray-800">Projects</a>
        </nav>
      </div>

      {/* Right Section: Search + Icons + Avatar */}
      <div className="flex items-center space-x-2 sm:space-x-4">
        <div className="relative hidden sm:block">
          <Input
            placeholder="Enter your search request..."
            className="w-40 sm:w-48 lg:w-64 pl-8 sm:pl-10 pr-3 sm:pr-4 text-sm"
          />
          <Search className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
        </div>
        
        <div className="flex items-center space-x-2 sm:space-x-3">
          <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 cursor-pointer hover:text-gray-800" />
          <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 cursor-pointer hover:text-gray-800" />
          <Avatar className="w-6 h-6 sm:w-8 sm:h-8">
            <AvatarImage src="/avatar.jpg" />
            <AvatarFallback className="bg-gray-200 text-gray-600 text-xs sm:text-sm">U</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
