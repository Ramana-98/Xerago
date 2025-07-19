import React from "react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Bell, Settings } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full flex items-center  justify-between px-8 py-4 bg-white  shadow-sm border-b">
      {/* Left Section: Logo + Nav */}
      <div className="flex items-center space-x-45">
        {/* TWISTY Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">T</span>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
            TWISTY
          </span>
        </div>
        
        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-10 text-sm">
          <a href="#" className="text-blue-600 font-semibold border-b-2 border-blue-600 pb-1">Home</a>
          <a href="#" className="text-gray-600 hover:text-gray-800">Messages</a>
          <a href="#" className="text-gray-600 hover:text-gray-800">Discover</a>
          <a href="#" className="text-gray-600 hover:text-gray-800">Wallet</a>
          <a href="#" className="text-gray-600 hover:text-gray-800">Projects</a>
        </nav>
      </div>

      {/* Right Section: Search + Icons + Avatar */}
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Input
            placeholder="Enter your search request..."
            className="w-64 pl-10 pr-4"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>
        
        <div className="flex items-center space-x-3">
          <Settings className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-800" />
          <Bell className="w-5 h-5 text-gray-600 cursor-pointer hover:text-gray-800" />
          <Avatar className="w-8 h-8">
            <AvatarImage src="/avatar.jpg" />
            <AvatarFallback className="bg-gray-200 text-gray-600">U</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
