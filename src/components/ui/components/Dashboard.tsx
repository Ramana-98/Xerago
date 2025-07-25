import React, { useState, useRef,} from "react";
import Header from "./Header";

import Settings from "./Settings";
import { NotificationsDropdown }   from "./Notification";
import Messages from "./Messages";
import Discover from "./Discover";
import WalletPage from "./WalletPage";
import ProjectsPage from "./ProjectsPage";
import { Toaster } from "sonner";

import Home from "./Home";

const normalize = (str: string) => str.replace(/['’]/g, "").toLowerCase();

export default function Dashboard() {
  const [showSettings, setShowSettings] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [showDiscover, setShowDiscover] = useState(false);
  const [showWallet, setShowWallet] = useState(false);
  const [showProjects, setShowProjects] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const letsConnectRef = useRef<HTMLDivElement>(null);
  const upgradePremiumRef = useRef<HTMLDivElement>(null);
  const incomeTrackerRef = useRef<HTMLDivElement>(null);
  const yourRecentProjectsRef = useRef<HTMLDivElement>(null);
  const proposalProgressRef = useRef<HTMLDivElement>(null);

  const handleSearchTrigger = () => {
    const value = normalize(searchValue);
    if (value.includes(normalize("Let's Connect")) && letsConnectRef.current) {
      letsConnectRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    } else if (value.includes(normalize("Upgrade Premium")) && upgradePremiumRef.current) {
      upgradePremiumRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    } else if (value.includes(normalize("Income Tracker")) && incomeTrackerRef.current) {
      incomeTrackerRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    } else if (value.includes(normalize("Your Recent Project")) && yourRecentProjectsRef.current) {
      yourRecentProjectsRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    } else if (value.includes(normalize("Proposal Progress")) && proposalProgressRef.current) {
      proposalProgressRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

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

  if (showProjects) {
    return (
      <div className="min-h-screen bg-gray-200">
        <ProjectsPage onBack={() => setShowProjects(false)} />
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
        onOpenProjects={() => setShowProjects(true)}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        onSearchTrigger={handleSearchTrigger}
      />
      {/* Main Dashboard Content */}
      <Home />
      <Toaster />
    </div>
  );
}

