import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Header from './components/ui/components/Header';
import Home from './components/ui/components/Home';
import Messages from './components/ui/components/Messages';
import Discover from './components/ui/components/Discover';
import WalletPage from './components/ui/components/WalletPage';
import ProjectsPage from './components/ui/components/ProjectsPage';
import Settings from './components/ui/components/Settings';
import { NotificationsDropdown } from './components/ui/components/Notification';
import { Toaster } from "sonner";
import './App.css';

function App() {
  // Header state and handlers
  const [showSettings, setShowSettings] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  // Navigation handlers (using useNavigate inside a wrapper)
  // You can also use <Link> in Header for navigation
  // For modals, use state as below

  return (
    <Router>
      <Header
        onOpenSettings={() => setShowSettings(true)}
        onOpenNotifications={() => setShowNotifications(true)}
        onOpenMessages={() => { window.location.href = "/messages"; }}
        onOpenDiscover={() => { window.location.href = "/discover"; }}
        onOpenWallet={() => { window.location.href = "/wallet"; }}
        onOpenProjects={() => { window.location.href = "/projects"; }}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        onSearchTrigger={() => {}}
      />
      <div className="bg-gray-200">
        {/* Modals */}
        {showSettings && <Settings />}
        {showNotifications && <NotificationsDropdown />}
        {/* Main Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/wallet" element={<WalletPage />} />
          <Route path="/projects" element={<ProjectsPage onBack={() => { window.location.href = "/"; }} />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
      <Toaster />
    </Router>
  );
}

export default App;

