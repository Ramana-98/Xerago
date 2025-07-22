import React from 'react';
import './App.css';
import Dashboard from './components/ui/components/Dashboard';
import { Toaster } from "sonner";
function App() {
  return (
    <div className="App">
      <Dashboard />
      <Toaster />
    </div>
  );
}

export default App;
