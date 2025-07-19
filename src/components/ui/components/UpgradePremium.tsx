import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function UpgradePremium() {
  return (
    <Card className="bg-gray-50 border-gray-200 relative overflow-hidden">
      {/* Dotted background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle, #d1d5db 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}></div>
      </div>
      
      <CardContent className="relative z-10 flex flex-col items-start p-6 space-y-4">
        <h4 className="text-lg font-semibold text-gray-800">Unlock Premium Features</h4>
        <p className="text-gray-600 text-sm leading-relaxed">
          Get access to exclusive benefits and expand your freelancing opportunities
        </p>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          Upgrade now
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
}
