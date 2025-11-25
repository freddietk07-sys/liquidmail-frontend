"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "./Button";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/connect", label: "Connect" },
  { href: "/dashboard", label: "Dashboard" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="border-b border-slate-800 bg-[#020617]/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 md:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-blue-500/20 border border-blue-500/50 flex items-center justify-center text-blue-300 text-sm font-bold">
            L
          </div>
          <span className="font-semibold tracking-tight">LiquidMail</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-300">
          {navItems.map((item) => {
            const active =
              item.href === "/"
                ? pathname === item.href
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={
                  "hover:text-white transition " +
                  (active ? "text-white" : "")
                }
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Link href="/connect">
            <Button size="sm">Get started</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
