import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-[#020617]">
      <div className="mx-auto max-w-6xl px-6 py-6 md:px-8 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-500">
        <p>Copyright {new Date().getFullYear()} LiquidMail. All rights reserved.</p>
        <div className="flex gap-4">
          <Link href="#" className="hover:text-slate-300">
            Privacy
          </Link>
          <Link href="#" className="hover:text-slate-300">
            Terms
          </Link>
          <Link
            href="mailto:freddiethomasknell@gmail.com"
            className="hover:text-slate-300"
          >
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
