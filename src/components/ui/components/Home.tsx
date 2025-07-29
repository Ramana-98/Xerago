import React, { useRef, useState, useEffect } from "react";
import IncomeTracker from "./Incometracker";
import LetsConnect from "./Let'sConnect";
import ProposalProgress from "./ProposalProgress";
import UpgradePremium from "./UpgradePremium";
import YourRecentProjects from "./YourRecentProject";
import EarningBreakdown from "./Earning-Breakdown";
import ClientFeedback from "./Client-Feedback";
import { EllipsisIcon } from "lucide-react";
 

const normalize = (str: string) => str.replace(/['']/g, "").toLowerCase();

interface HomeProps {
  searchValue: string;
}

export default function Home({ searchValue }: HomeProps) {
  const letsConnectRef = useRef<HTMLDivElement>(null);
  const upgradePremiumRef = useRef<HTMLDivElement>(null);
  const incomeTrackerRef = useRef<HTMLDivElement>(null);
  const yourRecentProjectsRef = useRef<HTMLDivElement>(null);
  const proposalProgressRef = useRef<HTMLDivElement>(null);
  const earningBreakdownRef = useRef<HTMLDivElement>(null);
  const clientFeedbackRef = useRef<HTMLDivElement>(null);

  // Function to scroll to highlighted card
  const scrollToCard = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
      // Add a temporary highlight effect
      ref.current.style.transition = 'all 0.3s ease';
      ref.current.style.transform = 'scale(1.02)';
      ref.current.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
      
      setTimeout(() => {
        if (ref.current) {
          ref.current.style.transform = 'scale(1)';
          ref.current.style.boxShadow = '';
        }
      }, 2000);
    }
  };

  // Check if search matches any card and scroll to it
  useEffect(() => {
    const normalizedSearch = normalize(searchValue);
    
    if (normalizedSearch.includes(normalize("income tracker"))) {
      scrollToCard(incomeTrackerRef);
    } else if (normalizedSearch.includes(normalize("your recent project"))) {
      scrollToCard(yourRecentProjectsRef);
    } else if (normalizedSearch.includes(normalize("let's connect"))) {
      scrollToCard(letsConnectRef);
    } else if (normalizedSearch.includes(normalize("upgrade premium"))) {
      scrollToCard(upgradePremiumRef);
    } else if (normalizedSearch.includes(normalize("proposal progress"))) {
      scrollToCard(proposalProgressRef);
    } else if (normalizedSearch.includes(normalize("earning breakdown"))) {
      scrollToCard(earningBreakdownRef);
    } else if (normalizedSearch.includes(normalize("client feedback"))) {
      scrollToCard(clientFeedbackRef);
    } 
  }, [searchValue]);

  return (
    <>
    
    <main className="w-full bg-gray-200 px-4 sm:px-6 py-6 lg:py-8 max-w-[1400px] mx-auto">
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
        <EarningBreakdown 
          ref={earningBreakdownRef}
          highlight={normalize(searchValue).includes(normalize("Earning Breakdown"))}
        />
        {/* Client Feedback - Row 3, below Proposal Progress */}
        <ClientFeedback 
          ref={clientFeedbackRef}
          highlight={normalize(searchValue).includes(normalize("Client Feedback"))}
        />
      </div>
    </main>
    </>
  );
}
