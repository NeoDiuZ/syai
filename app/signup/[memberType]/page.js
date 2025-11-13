"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const redirectMap = {
  membership: "https://forms.gle/vJdFYHK8dC4v84zo6",
  subcommittee: "https://forms.gle/z2rPPmrEQ7a3mrXd6",
};

export default function Page({ params }) {
  const { memberType } = params;
  const router = useRouter();

  useEffect(() => {
    const key = memberType.toLowerCase();
    const destination = redirectMap[key];

    if (!destination) {
      router.replace("/404");
    } else if (destination.startsWith("http")) {
      window.location.href = destination;
    } else {
      router.replace(destination);
    }
  }, [memberType, router]);

  return (
    <div className="h-[100svh] w-full flex items-center justify-center text-2xl">
      Redirecting...
    </div>
  );
}
