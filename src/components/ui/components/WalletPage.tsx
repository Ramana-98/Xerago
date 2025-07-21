import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHead, TableRow, TableCell, TableBody } from "@/components/ui/table";
import { Line } from "react-chartjs-2"; // If you want a chart, install chart.js and react-chartjs-2
import WalletPage from "./WalletPage";

// Mock data
const balance = {
  available: 12000,
  pending: 2500,
  currency: "INR",
};

const transactions = [
  { id: 1, date: "2024-06-01", type: "Payment Received", amount: 5000, status: "Completed" },
  { id: 2, date: "2024-05-28", type: "Withdrawal", amount: -3000, status: "Completed" },
  { id: 3, date: "2024-05-25", type: "Bonus", amount: 1000, status: "Completed" },
  { id: 4, date: "2024-05-20", type: "Payment Received", amount: 7000, status: "Pending" },
];

const paymentSchedule = [
  { project: "UI Redesign", nextRelease: "2024-06-07", status: "Scheduled" },
  { project: "API Integration", nextRelease: "2024-06-10", status: "Pending" },
];

export default function Dashboard() {
  const [showWallet, setShowWallet] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [uplift, setUplift] = useState(false);
  // Add state for linked accounts, settings, etc.

  if (showWallet) {
    return (
      <div className="min-h-screen bg-gray-200 ">
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
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Account Balance */}
      <Card
        onClick={() => setUplift((prev) => !prev)}
        className={`transition-all duration-300 cursor-pointer ${
          uplift ? "shadow-2xl -translate-y-4 scale-105" : "shadow"
        }`}
      >
        <CardHeader>Account Balance</CardHeader>
        <CardContent className="flex gap-8">
          <div>
            <div className="text-2xl font-bold">₹{balance.available.toLocaleString()}</div>
            <div className="text-sm text-gray-500">Available</div>
          </div>
          <div>
            <div className="text-xl font-semibold">₹{balance.pending.toLocaleString()}</div>
            <div className="text-sm text-gray-500">Pending</div>
          </div>
        </CardContent>
      </Card>

      {/* Withdrawal Options */}
      <Card>
        <CardHeader>Withdraw Funds</CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Input
            type="number"
            placeholder="Enter amount"
            value={withdrawAmount}
            onChange={e => setWithdrawAmount(e.target.value)}
            className="max-w-xs"
          />
          <Button>Withdraw to Bank</Button>
          <Button variant="outline">Link New Account</Button>
          <div className="text-xs text-gray-500">Minimum withdrawal: ₹500</div>
        </CardContent>
      </Card>

      {/* Transaction History */}
      <Card>
        <CardHeader>Transaction History</CardHeader>
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map(tx => (
                <TableRow key={tx.id}>
                  <TableCell>{tx.date}</TableCell>
                  <TableCell>{tx.type}</TableCell>
                  <TableCell className={tx.amount < 0 ? "text-red-500" : "text-green-600"}>
                    {tx.amount < 0 ? "-" : "+"}₹{Math.abs(tx.amount).toLocaleString()}
                  </TableCell>
                  <TableCell>{tx.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Payment Schedule */}
      <Card>
        <CardHeader>Payment Schedule</CardHeader>
        <CardContent>
          <ul>
            {paymentSchedule.map((p, i) => (
              <li key={i} className="mb-2">
                <span className="font-medium">{p.project}</span>: Next release on <span className="text-blue-600">{p.nextRelease}</span> ({p.status})
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Payment Settings */}
      <Card>
        <CardHeader>Payment Settings</CardHeader>
        <CardContent>
          <div>Bank: <span className="font-medium">HDFC Bank</span></div>
          <div>UPI: <span className="font-medium">yourname@upi</span></div>
          <div>Preferred Currency: <span className="font-medium">INR</span></div>
          <Button variant="outline" className="mt-2">Edit Payment Settings</Button>
        </CardContent>
      </Card>
    </div>
  );
}
