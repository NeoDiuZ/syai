"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const redirectMap = {
  aimm: "https://forms.gle/hakB9A23qGEiYPYW6",
  ustalk: "https://forms.gle/PCWesZPoncD5S2bF7",
  ustalkfeedback: "https://forms.gle/AHnzSCMxPHNCa46P8",
  "aimm-signup": "https://forms.gle/EHgjNzUxf4dcvvoF7"
};

export default function Page({ params }) {
  const { eventName } = params;
  const router = useRouter();

  useEffect(() => {
    const key = eventName.toLowerCase();
    const destination = redirectMap[key];

    if (!destination) {
      router.replace("/404");
    } else if (destination.startsWith("http")) {
      window.location.href = destination;
    } else {
      router.replace(destination);
    }
  }, [eventName, router]);

  return (
    <div className="h-[100svh] w-full flex items-center justify-center text-2xl">
      Redirecting...
    </div>
  );
}
