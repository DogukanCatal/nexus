"use client";
import { House } from "lucide-react";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";

const Home = () => {
  const useMediaQuery = (width: number) => {
    const [targetReached, setTargetReached] = useState(false);

    const updateTarget = useCallback((e: MediaQueryListEvent) => {
      if (e.matches) {
        setTargetReached(true);
      } else {
        setTargetReached(false);
      }
    }, []);

    useEffect(() => {
      const media = window.matchMedia(`(max-width: ${width}px)`);
      media.addEventListener("change", updateTarget);

      if (media.matches) {
        setTargetReached(true);
      }

      return () => media.removeEventListener("change", updateTarget);
    }, []);

    return targetReached;
  };

  const isBreakPoint = useMediaQuery(768);
  return (
    <div>
      {isBreakPoint ? (
        <Link href={"/"}>
          <House />
        </Link>
      ) : (
        <Link href={"/"} className="font-semibold text-sm">
          Home
        </Link>
      )}
    </div>
  );
};

export default Home;
