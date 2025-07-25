import React, { useRef, useState } from "react";
import IncomeTracker from "./Incometracker";
import LetsConnect from "./Let'sConnect";
import ProposalProgress from "./ProposalProgress";
import UpgradePremium from "./UpgradePremium";
import YourRecentProjects from "./YourRecentProject";
import EarningBreakdown from "./Earning-Breakdown";
import ClientFeedback from "./Client-Feedback";
import Header from "./Header";  

const normalize = (str: string) => str.replace(/['’]/g, "").toLowerCase();

export default function Home() {
  const letsConnectRef = useRef<HTMLDivElement>(null);
  const upgradePremiumRef = useRef<HTMLDivElement>(null);
  const incomeTrackerRef = useRef<HTMLDivElement>(null);
  const yourRecentProjectsRef = useRef<HTMLDivElement>(null);
  const proposalProgressRef = useRef<HTMLDivElement>(null);
  const [searchValue] = useState("");

  return (
    <>
    
    <main className="w-full px-4 sm:px-6 py-6 lg:py-8 max-w-[1400px] mx-auto">
      {/* Main Grid Layout: Left (2/3) + Right (1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Left Section - 2/3 width */}
        <div className="lg:col-span-2 space-y-6 lg:space-y-8">
          {/* Income Tracker - Top full width */}
          <IncomeTracker
            ref={incomeTrackerRef}
            highlight={normalize(searchValue).includes(normalize("Income Tracker"))}
          />
          {/* Bottom row: Let's Connect + Upgrade Premium */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <LetsConnect
              ref={letsConnectRef}
              highlight={normalize(searchValue).includes(normalize("Let's Connect"))}
            />
            <UpgradePremium
              ref={upgradePremiumRef}
              highlight={normalize(searchValue).includes(normalize("Upgrade Premium"))}
            />
          </div>
        </div>
        {/* Right Section - 1/3 width */}
        <div className="flex flex-col h-full ">
          {/* Your Recent Projects - Scrollable container */}
          <div className="flex-1 overflow-y-auto h-full w-full scrollbar-hide">
            <YourRecentProjects
              ref={yourRecentProjectsRef}
              highlight={normalize(searchValue).includes(normalize("Your Recent Project"))}
            />
          </div>
          {/* Proposal Progress - Fixed at bottom */}
          <div className="flex-shrink-0 mt-6 lg:mt-8">
            <ProposalProgress
              ref={proposalProgressRef}
              highlight={normalize(searchValue).includes(normalize("Proposal Progress"))}
            />
          </div>
        </div>
        {/* Earnings Breakdown - Row 3, below Let's Connect */}
        <EarningBreakdown />
        {/* Client Feedback - Row 3, below Proposal Progress */}
        <ClientFeedback />
      </div>
    </main>
    </>
  );
}
