import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Header from './components/ui/components/Header';
import Home from './components/ui/components/Home';
import Messages from './components/ui/components/Messages';
import Discover from './components/ui/components/Discover';
import WalletPage from './components/ui/components/WalletPage';
import ProjectsPage from './components/ui/components/ProjectsPage';
import Settings from './components/ui/components/Settings';
import { NotificationsDropdown } from './components/ui/components/Notification';
import NotificationPage from './components/ui/components/NotificationPage';
import { Toaster } from "sonner";
import './App.css';

function App() {
  // Header state and handlers
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  return (
    <Router>
      <Header
        onOpenSettings={() => { window.location.href = "/settings"; }}
        onOpenNotifications={() => { window.location.href = "/notifications"; }}
        onOpenMessages={() => { window.location.href = "/messages"; }}
        onOpenDiscover={() => { window.location.href = "/discover"; }}
        onOpenWallet={() => { window.location.href = "/wallet"; }}
        onOpenProjects={() => { window.location.href = "/projects"; }}
        onOpenHome={() => { window.location.href = "/Home"; }}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        onSearchTrigger={() => {}}
      />
      {/* Modals */}
      {showNotifications && <NotificationsDropdown />}
      {/* Main Routes */}
      <Routes>
        <Route path="/" element={<Navigate to="/Home" replace />} />
        <Route path="/Home" element={<Home searchValue={searchValue} />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/discover" element={<Discover onBack={() => { window.location.href = "/Home"; }} />} />
        <Route path="/wallet" element={<WalletPage />} />
        <Route path="/projects" element={<ProjectsPage onBack={() => { window.location.href = "/Home"; }} />} />
        <Route path="/notifications" element={<NotificationPage />} />
        {/* Add more routes as needed */}
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;

