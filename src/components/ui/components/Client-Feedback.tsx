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
    message: "Great communication and excellent delivery.Prescribe!",
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
  const [centerIdx, setCenterIdx] = useState(0); // Start with first card centered
  const total = feedbacks.length;

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCenterIdx((prev) => (prev + 1) % total);
    }, 3000);
    return () => clearInterval(interval);
  }, [total]);

  // For transition: get previous, center, next
  const getCardPosition = (idx: number) => {
    if (idx === centerIdx) return 'center';
    if ((idx + 1) % total === centerIdx) return 'left';
    if ((idx - 1 + total) % total === centerIdx) return 'right';
    return 'hidden';
  };

  return (
    <section
      className="
        rounded-2xl
        w-full
        h-[335px]
        mx-auto
        py-2 px-2 sm:px-6
        bg-gray-300 hover:bg-gradient-to-r from-pink-50 via-blue-50 to-purple-50
        font-sans overflow-hidden
        transition-all duration-200 hover:-translate-y-2
        md:w-[795px] md:max-w-[90vw] md:mx-auto
        "
    >
      <div className="max-w-5xl mx-auto overflow-hidden -mt-1">
        <h2 className="text-2xl sm:text-2xl font-bold mb-6 text-center text-gray-800 tracking-tight">Client Feedback</h2>
        <div className="flex justify-center items-center relative h-[260px]">
          {feedbacks.map((fb, idx: number) => {
            const pos = getCardPosition(idx);
            let style = { width: CARD_WIDTH };
            let className =
              "absolute top-1/2 left-1/2 transition-all duration-700 flex flex-col items-center";
            if (pos === 'center') {
              className +=
                " z-20 -translate-x-1/2 -translate-y-[60%] scale-110 shadow-2xl bg-white opacity-100";
            } else if (pos === 'left') {
              className +=
                " z-10 -translate-x-[170%] -translate-y-1/2 scale-95 opacity-60 bg-white";
            } else if (pos === 'right') {
              className +=
                " z-10 translate-x-[70%] -translate-y-1/2 scale-95 opacity-60 bg-white";
            } else {
              className += " opacity-0 pointer-events-none";
            }
            return (
              <div key={idx} className={className} style={style}>
                <Card className="min-w-[220px] max-w-[200px] mx-auto rounded-1xl border-0 px-3 py-4 bg-gradient-to-r from-pink-50 via-blue-50 to-purple-50 flex flex-col items-center">
                  <CardHeader className="flex flex-col items-center p-0 mb-1">
                    <img
                      src={fb.avatar || `/avatars/default.png`}
                      alt={fb.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-blue-100 shadow mb-1"
                      onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = `/avatars/default.png`; }}
                    />
                    <CardTitle className="text-sm font-semibold text-gray-800 mb-0.5 text-center">
                      {fb.name}
                    </CardTitle>
                    <div className="text-xs text-gray-500 text-center leading-tight">{fb.role}</div>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col justify-center items-center p-0">
                    <p className="italic text-gray-600 text-center text-xs">“{fb.message}”</p>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
