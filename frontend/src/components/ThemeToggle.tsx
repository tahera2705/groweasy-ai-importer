"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { resolvedTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggle = () => {
    console.log({
      theme,
      resolvedTheme,
      nextTheme: resolvedTheme === "dark" ? "light" : "dark",
    });

    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <button onClick={toggle}>
      {resolvedTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}