import React from "react";
import Header from "./Header";
import IncomeTracker from "./Incometracker";
import LetsConnect from "./Let'sConnect";
import ProposalProgress from "./ProposalProgress";
import UpgradePremium from "./UpgradePremium";
import YourRecentProjects from "./YourRecentProject";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Row 1: Header */}
      <Header />
      
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

