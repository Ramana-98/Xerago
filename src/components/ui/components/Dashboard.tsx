import React, { useState } from "react";
import Header from "./Header";
import IncomeTracker from "./Incometracker";
import LetsConnect from "./Let'sConnect";
import ProposalProgress from "./ProposalProgress";
import UpgradePremium from "./UpgradePremium";
import YourRecentProjects from "./YourRecentProject";
import Settings from "./Settings";
import { NotificationsDropdown } from "./Notification";
import Messages from "./Messages";
import Discover from "./Discover";
import WalletPage from "./WalletPage";

export default function Dashboard() {
  const [showSettings, setShowSettings] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showDiscover, setShowDiscover] = useState(false);
  const [showWallet, setShowWallet] = useState(false);

  if (showSettings) {
    return (
      <div className="min-h-screen bg-gray-200">
        <div className="flex justify-end p-4">
          <button
            className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
            onClick={() => setShowSettings(false)}
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
        </div>
        <Settings />
      </div>
    );
  }

  if (showNotifications) {
    return (
      <div className="min-h-screen bg-gray-200">
        <div className="flex justify-end p-4">
          <button
            className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
            onClick={() => setShowNotifications(false)}
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
        </div>
        <NotificationsDropdown />
      </div>
    );
  }

  if (showMessages) {
    return (
      <div className="min-h-screen bg-gray-200">
        
        <Messages />
      </div>
    );
  }

  if (showDiscover) {
    return (
      <div className="min-h-screen bg-gray-200">
        <Discover onBack={() => setShowDiscover(false)} />
      </div>
    );
  }

  if (showWallet) {
    return (
      <div className="min-h-screen bg-gray-200">
        <div className="flex justify-end p-4">
          <button
            className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
            onClick={() => setShowWallet(false)}
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
        </div>
        <WalletPage />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-200">
      {/* Row 1: Header */}
      <Header
        onOpenSettings={() => setShowSettings(true)}
        onOpenNotifications={() => setShowNotifications(true)}
        onOpenMessages={() => setShowMessages(true)}
        onOpenDiscover={() => setShowDiscover(true)}
        onOpenWallet={() => setShowWallet(true)}
      />
      {/* Main Dashboard Content */}
      <main className="container mx-auto px-4 sm:px-6 py-6 lg:py-8">
        {/* Main Grid Layout: Left (2/3) + Right (1/3) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Section - 2/3 width */}
          <div className="lg:col-span-2 space-y-6 lg:space-y-8">
            {/* Income Tracker - Top full width */}
            <IncomeTracker />
            {/* Bottom row: Let's Connect + Upgrade Premium */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              <LetsConnect />
              <UpgradePremium />
            </div>
          </div>
          {/* Right Section - 1/3 width */}
          <div className="flex flex-col h-full">
            {/* Your Recent Projects - Scrollable container */}
            <div className="flex-1 overflow-y-auto scrollbar-hide">
              <YourRecentProjects />
            </div>
            {/* Proposal Progress - Fixed at bottom */}
            <div className="flex-shrink-0 mt-6 lg:mt-8">
              <ProposalProgress />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

