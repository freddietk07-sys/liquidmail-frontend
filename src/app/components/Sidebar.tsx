"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiMail, FiSettings, FiHome, FiDollarSign } from "react-icons/fi";
import { getGmailStatus } from "@/lib/api";

export default function Sidebar() {
  const pathname = usePathname();
  const [gmailConnected, setGmailConnected] = useState<boolean | null>(null);

  // Fetch Gmail connection status
  useEffect(() => {
    async function loadStatus() {
      try {
        const res = await getGmailStatus();
        setGmailConnected(res.gmailConnected);
      } catch {
        setGmailConnected(false);
      }
    }

    loadStatus();
  }, []);

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: <FiHome /> },
    { name: "Connect Gmail", href: "/connect", icon: <FiMail /> },
    { name: "Settings", href: "/settings", icon: <FiSettings /> },
    { name: "Pricing", href: "/pricing", icon: <FiDollarSign /> },
  ];

  return (
    <aside className="w-64 h-screen bg-[#0F1117] text-white p-6 flex flex-col gap-6 border-r border-gray-800">
      <h1 className="text-2xl font-bold">LiquidMail</h1>

      {/* Gmail status indicator */}
      <div className="flex items-center gap-2 text-sm">
        <div
          className={`w-3 h-3 rounded-full ${
            gmailConnected === null
              ? "bg-gray-400"
              : gmailConnected
              ? "bg-green-500"
              : "bg-red-500"
          }`}
        ></div>

        <span className="text-gray-300">
          {gmailConnected === null
            ? "Checking Gmail…"
            : gmailConnected
            ? "Gmail Connected"
            : "Not Connected"}
        </span>
      </div>

      <nav className="flex flex-col gap-2">
        {navItems.map((item) => {
          const active = pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3 py-2 rounded-md transition ${
                active
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-800"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{item.icon}</span>
                {item.name}
              </div>

              {/* Little green dot only for connect gmail item */}
              {item.href === "/connect" && gmailConnected && (
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
