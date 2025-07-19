import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export default function UpgradePremium() {
  const [popoverOpen, setPopoverOpen] = React.useState(false);
  const handleUpgradeClick = () => {
    setPopoverOpen(true);
    setTimeout(() => setPopoverOpen(false), 3000); // Auto-close after 3s
  };
  return (
    <Card className="bg-[#f5f7fa] rounded-2xl shadow-md relative overflow-hidden border-0">
      {/* Dotted background pattern */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle, #d1d5db 1.2px, transparent 1.2px)`,
            backgroundSize: '18px 18px'
          }}
        ></div>
      </div>
      <CardContent className="relative z-10 flex flex-col items-start p-6 space-y-4">
        <h4 className="text-2xl font-bold text-gray-900 mb-1">Unlock Premium Features</h4>
        <p className="text-gray-700 text-base mb-2">
          Get access to exclusive benefits and expand your freelancing opportunities
        </p>
        <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
          <PopoverTrigger asChild>
            <Button
              className="bg-white text-blue-700 hover:bg-blue-50 rounded-full px-6 py-3 text-lg font-semibold shadow transition-all flex items-center mx-auto mt-auto"
              style={{ boxShadow: "0 2px 16px 0 rgba(16,30,54,0.08)" }}
              onClick={handleUpgradeClick}
            >
              Upgrade now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </PopoverTrigger>
          <PopoverContent side="top" align="center" className="text-gray-800 text-base font-medium space-y-2 w-72">
            <div className="font-semibold mb-1">Premium Features:</div>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-1 mb-2">
              <li>Priority project support</li>
              <li>Advanced analytics dashboard</li>
              <li>Unlimited proposals</li>
              <li>Early access to new features</li>
            </ul>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between text-sm">
                <span>Premium Plan</span>
                <span className="font-bold text-blue-700">$19/month</span>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Billing cycle</span>
                <span>Monthly</span>
              </div>
            </div>
            <div className="mt-3">
              <input className="w-full rounded border px-2 py-1 mb-2 text-sm" placeholder="Promo code (optional)" disabled />
              <button className="w-full bg-blue-600 text-white rounded-full py-2 font-semibold text-base cursor-pointer opacity-90 hover:opacity-100 transition disabled:opacity-60" disabled>
                Pay with Card
              </button>
            </div>
          </PopoverContent>
        </Popover>
      </CardContent>
    </Card>
  );
}
