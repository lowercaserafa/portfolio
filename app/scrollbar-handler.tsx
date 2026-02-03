"use client";
import { useEffect } from "react";

export default function ScrollbarHandler() {
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const handleScroll = () => {
      document.body.style.setProperty("--scrollbar-opacity", "1");
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        document.body.style.setProperty("--scrollbar-opacity", "0");
      }, 1000);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return null;
}
