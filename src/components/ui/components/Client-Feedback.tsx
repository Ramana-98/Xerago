import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const feedbacks = [
  {
    name: "Emily Johnson",
    role: "UI Designer",
    message: "Amazing work! The project exceeded my expectations.",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "James Carter",
    role: "Software Engineer",
    message: "Great communication and excellent delivery. Highly recommend!",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Sophia Lee",
    role: "Product Manager",
    message: "The attention to detail was top-notch. Will hire again.",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Daniel Kim",
    role: "Tech Lead",
    message: "Delivered exactly what we needed under tight deadlines.",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
  },
  {
    name: "Ava Smith",
    role: "Marketing Strategist",
    message: "Creative and thoughtful approach to problem-solving!",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
  },
];

const CARD_WIDTH = 220; // px (card + gap)

export default function ClientFeedback() {
  const [centerIdx, setCenterIdx] = useState(2); // Start with Sophia Lee centered
  const total = feedbacks.length;

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCenterIdx((prev) => (prev + 1) % total);
    }, 3000);
    return () => clearInterval(interval);
  }, [total]);

  // Get visible cards: previous, center, next
  const getVisibleCards = () => {
    const prevIdx = (centerIdx - 1 + total) % total;
    const nextIdx = (centerIdx + 1) % total;
    return [feedbacks[prevIdx], feedbacks[centerIdx], feedbacks[nextIdx]];
  };
  const visibleCards = getVisibleCards();

  return (
    <section className="rounded-2xl w-full sm:w-[795px] mx-auto py-2 px-2 sm:px-6 bg-gradient-to-r from-pink-50 via-blue-50 to-purple-50 font-sans overflow-hidden">
      <div className="max-w-5xl mx-auto overflow-hidden">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800 tracking-tight">Client Feedback</h2>
        {/* Centered carousel: previous, center, next */}
        <div className="flex justify-center items-center relative h-[240px]">
          {/* Previous card (left, faded, slides out) */}
          <div
            className="absolute left-0 top-1/2 -translate-y-1/2 transition-all duration-500"
            style={{ width: CARD_WIDTH, opacity: 0.3, zIndex: 1, transform: 'translateY(-50%) scale(0.92)' }}
          >
            <Card className="min-w-[200px] max-w-[200px] mx-auto bg-white rounded-2xl shadow border-0 px-3 py-4 flex flex-col items-center">
              <CardHeader className="flex flex-col items-center p-0 mb-1">
                <img
                  src={visibleCards[0].avatar}
                  alt={visibleCards[0].name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-blue-100 shadow mb-1"
                />
                <CardTitle className="text-sm font-semibold text-gray-800 mb-0.5 text-center">
                  {visibleCards[0].name}
                </CardTitle>
                <div className="text-xs text-gray-500 text-center leading-tight">{visibleCards[0].role}</div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-center items-center p-0">
                <p className="italic text-gray-600 text-center text-xs">“{visibleCards[0].message}”</p>
              </CardContent>
            </Card>
          </div>
          {/* Center card (highlighted) */}
          <div
            className="relative z-10 transition-all duration-500"
            style={{ width: CARD_WIDTH, transform: 'scale(1.08)' }}
          >
            <Card className="min-w-[200px] max-w-[200px] mx-auto bg-white rounded-2xl shadow-2xl border-0 px-3 py-4 flex flex-col items-center scale-100">
              <CardHeader className="flex flex-col items-center p-0 mb-1">
                <img
                  src={visibleCards[1].avatar}
                  alt={visibleCards[1].name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-blue-100 shadow mb-1"
                />
                <CardTitle className="text-sm font-semibold text-gray-800 mb-0.5 text-center">
                  {visibleCards[1].name}
                </CardTitle>
                <div className="text-xs text-gray-500 text-center leading-tight">{visibleCards[1].role}</div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-center items-center p-0">
                <p className="italic text-gray-600 text-center text-xs">“{visibleCards[1].message}”</p>
              </CardContent>
            </Card>
          </div>
          {/* Next card (right, faded, slides in) */}
          <div
            className="absolute right-0 top-1/2 -translate-y-1/2 transition-all duration-500"
            style={{ width: CARD_WIDTH, opacity: 0.3, zIndex: 1, transform: 'translateY(-50%) scale(0.92)' }}
          >
            <Card className="min-w-[200px] max-w-[200px] mx-auto bg-white rounded-2xl shadow border-0 px-3 py-4 flex flex-col items-center">
              <CardHeader className="flex flex-col items-center p-0 mb-1">
                <img
                  src={visibleCards[2].avatar}
                  alt={visibleCards[2].name}
                  className="w-10 h-10 rounded-full object-cover border-2 border-blue-100 shadow mb-1"
                />
                <CardTitle className="text-sm font-semibold text-gray-800 mb-0.5 text-center">
                  {visibleCards[2].name}
                </CardTitle>
                <div className="text-xs text-gray-500 text-center leading-tight">{visibleCards[2].role}</div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-center items-center p-0">
                <p className="italic text-gray-600 text-center text-xs">“{visibleCards[2].message}”</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
