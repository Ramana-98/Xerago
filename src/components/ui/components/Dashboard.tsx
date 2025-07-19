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
      <main className="container mx-auto px-6 py-8">
        {/* Row 2: Income Tracker (60%) + Recent Projects (40%) */}
        <div className="grid grid-cols-5 gap-8 mb-8">
          {/* Income Tracker - 60% (3/5 columns) */}
          <div className="col-span-3">
            <IncomeTracker />
          </div>
          
          {/* Recent Projects - 40% (2/5 columns) */}
          <div className="col-span-2">
            <YourRecentProjects />
          </div>
        </div>

        {/* Row 3: Three columns layout with equal height */}
        <div className="grid grid-cols-10 gap-8 h-full">
          {/* Let's Connect - 30% (3/10 columns) */}
          <div className="col-span-3">
            <LetsConnect />
          </div>
          
          {/* Upgrade Premium - 30% (3/10 columns) */}
          <div className="col-span-3">
            <UpgradePremium />
          </div>
          
          {/* Proposal Progress - 40% (4/10 columns) */}
          <div className="col-span-4">
            <ProposalProgress />
          </div>
        </div>
      </main>
    </div>
  );
}
