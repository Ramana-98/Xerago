import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Mock data
const initialBalance = {
  available: 12000,
  pending: 2500,
  currency: "INR",
};

const initialTransactions = [
  {
    date: "2024-06-01",
    type: "Payment Received",
    amount: "+₹5,000",
    status: "Completed",
  },
  {
    date: "2024-05-28",
    type: "Withdrawal",
    amount: "+₹3,000",
    status: "Completed",
  },
  {
    date: "2024-05-25",
    type: "Bonus",
    amount: "+₹1,000",
    status: "Completed",
  },
  {
    date: "2024-05-20",
    type: "Payment Received",
    amount: "+₹7,000",
    status: "Pending",
  },
];

const paymentSchedule = [
  { project: "UI Redesign", nextRelease: "2024-06-07", status: "Scheduled" },
  { project: "API Integration", nextRelease: "2024-06-10", status: "Pending" },
];

export default function WalletPage() {
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [balance, setBalance] = useState(initialBalance);
  const [transactions, setTransactions] = useState(initialTransactions);
  const [isLoading, setIsLoading] = useState(false);

  // Link New Account dialog state
  const [openDialog, setOpenDialog] = useState(false);
  const [bankName, setBankName] = useState("");
  const [upiId, setUpiId] = useState("");
  const [currency, setCurrency] = useState("INR");
  const [isSaving, setIsSaving] = useState(false);

  const handleWithdraw = async () => {
    const amount = parseInt(withdrawAmount, 10);
    if (!withdrawAmount || isNaN(amount)) {
      toast.error("Please enter a withdrawal amount.");
      return;
    }
    if (amount < 500) {
      toast.error("Minimum withdrawal amount is ₹500.");
      return;
    }
    if (amount > balance.available) {
      toast.error("Insufficient balance.");
      return;
    }
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Success: update balance and transactions
      setBalance(prev => ({ ...prev, available: prev.available - amount }));
      setTransactions(prev => [
        {
          date: new Date().toISOString().slice(0, 10),
          type: "Withdrawal",
          amount: `+₹${amount.toLocaleString()}`,
          status: "Completed",
        },
        ...prev,
      ]);
      setWithdrawAmount("");
      toast.success("Withdrawal successful!");
    }, 1500);
  };

  // UPI validation: must be in the format 'name@bank'
  const isValidUpi = (id: string) => /^[\w.-]+@[\w.-]+$/.test(id);

  const handleSaveAccount = () => {
    if (!bankName.trim() || !upiId.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (!isValidUpi(upiId)) {
      toast.error("Please enter a valid UPI ID (e.g., yourname@bank).\n");
      return;
    }
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setOpenDialog(false);
      setBankName("");
      setUpiId("");
      setCurrency("INR");
      toast.success("Account linked successfully!");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gray-200 flex justify-center items-start py-8 px-2">
      <div className="w-full max-w-3xl flex flex-col gap-6">
        {/* Account Balance */}
        <Card className="rounded-xl transition-all duration-200 hover:-translate-y-2 hover:bg-amber-50">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl font-bold">Account Balance</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col sm:flex-row gap-6 sm:gap-12 items-center sm:items-start">
            <div>
              <div className="text-3xl font-extrabold">₹{balance.available.toLocaleString()}</div>
              <div className="text-sm text-gray-500 font-medium">Available</div>
            </div>
            <div>
              <div className="text-xl font-bold">₹{balance.pending.toLocaleString()}</div>
              <div className="text-sm text-gray-500 font-medium">Pending</div>
            </div>
          </CardContent>
        </Card>

        {/* Withdraw Funds */}
        <Card className="rounded-xl transition-all duration-200 hover:-translate-y-2 hover:bg-amber-50">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl font-bold">Withdraw Funds</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              {/* Left: Form */}
              <div className="flex-1 w-full max-w-xs">
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={withdrawAmount}
                  onChange={e => setWithdrawAmount(e.target.value)}
                  className="mb-2"
                  min={500}
                />
                <Button
                  variant="default"
                  className="bg-black text-white w-full mb-2"
                  onClick={handleWithdraw}
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Withdraw to Bank"}
                </Button>
                {/* Link New Account Dialog Trigger */}
                <Button
                  variant="outline"
                  className="w-full mb-2"
                  onClick={() => setOpenDialog(true)}
                >
                  Link New Account
                </Button>
                <div className="text-xs text-gray-500 mt-1">Minimum withdrawal: ₹500</div>
              </div>
              {/* Right: Image */}
              <div className="flex-1 flex justify-center items-center">
                <img
                  src="src/atm-image.jpg"
                  alt="ATM Withdrawal"
                  className="max-w-[240px] max-h-[120px] rounded-md object-cover"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Link New Account Dialog */}
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Link New Account</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-2">
              <Input
                placeholder="Bank Name"
                value={bankName}
                onChange={e => setBankName(e.target.value)}
                disabled={isSaving}
              />
              <Input
                placeholder="UPI ID (e.g., yourname@bank)"
                value={upiId}
                onChange={e => setUpiId(e.target.value)}
                disabled={isSaving}
              />
              <Input
                placeholder="Preferred Currency (default: INR)"
                value={currency}
                onChange={e => setCurrency(e.target.value)}
                disabled={isSaving}
              />
              <Button
                className="w-full bg-black text-white"
                onClick={handleSaveAccount}
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save Account"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Transaction History */}
        <Card className="rounded-xl transition-all duration-200 hover:-translate-y-2 hover:bg-amber-50">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl font-bold">Transaction History</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <table className="min-w-full text-left border rounded-lg overflow-hidden bg-white">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 border-b font-semibold text-gray-700">Date</th>
                  <th className="px-4 py-2 border-b font-semibold text-gray-700">Type</th>
                  <th className="px-4 py-2 border-b font-semibold text-gray-700">Amount</th>
                  <th className="px-4 py-2 border-b font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((txn, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border-b text-center">{txn.date}</td>
                    <td className="px-4 py-2 border-b">{txn.type}</td>
                    <td className={`px-4 py-2 border-b font-semibold ${txn.amount.startsWith('+') ? 'text-green-600' : 'text-gray-800'}`}>{txn.amount}</td>
                    <td className="px-4 py-2 border-b">{txn.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Payment Schedule */}
        <Card className="rounded-xl transition-all duration-200 hover:-translate-y-2 hover:bg-amber-50">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl font-bold">Payment Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-center">
              {paymentSchedule.map((p, i) => (
                <li
                  key={i}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-1 sm:gap-2 text-center"
                >
                  <span className="font-medium">{p.project}:</span>
                  <a href="#" className="text-blue-600 hover:underline font-medium">{p.nextRelease}</a>
                  <span className="text-gray-500">({p.status})</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Payment Settings */}
        <Card className="rounded-xl transition-all duration-200 hover:-translate-y-2 hover:bg-amber-50">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl font-bold">Payment Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>Bank: <span className="font-medium">HDFC Bank</span></div>
            <div>UPI: <span className="font-medium">yourname@upi</span></div>
            <div>Preferred Currency: <span className="font-medium">INR</span></div>
            <Button variant="outline" className="mt-2">Edit Payment Settings</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
