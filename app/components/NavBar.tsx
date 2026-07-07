"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import { cn } from "@/lib/utils";

const navItems = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Students", href: "/students" },
  { label: "Clients", href: "/clients" },
];

export default function NavBar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const measure = () => {
    const activeEl = itemRefs.current[pathname];
    const container = containerRef.current;
    if (activeEl && container) {
      const c = container.getBoundingClientRect();
      const a = activeEl.getBoundingClientRect();
      setIndicator({ left: a.left - c.left, width: a.width });
    } else {
      setIndicator(null);
    }
  };

  useEffect(measure, [pathname]);
  useEffect(() => {
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-[--brand-white]/80 backdrop-blur-md transition-shadow duration-300",
        scrolled
          ? "border-b border-black/10 shadow-[0_1px_0_rgba(0,0,0,0.04)]"
          : "border-b border-transparent"
      )}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-6"
      >
        <Link href="/" className="group flex items-center gap-2 py-1.5">
          <span className="text-[15px] font-semibold leading-none tracking-tight text-[--brand-black] transition-colors group-hover:text-[--brand-red]">
            Software Practicum
          </span>
        </Link>

        {/* Desktop nav */}
        <div
          ref={containerRef}
          className="relative hidden items-center gap-0.5 rounded-full border border-black/8 bg-[--brand-white-soft]/90 p-1 shadow-[0_10px_30px_rgba(0,0,0,0.05)] md:flex"
        >
          {indicator && (
            <div
              aria-hidden
              className="absolute inset-y-1 rounded-full bg-linear-to-b from-[--brand-black-soft] to-[--brand-black] shadow-[0_4px_12px_rgba(0,0,0,0.18)] transition-[left,width] duration-300 ease-out"
              style={{ left: indicator.left, width: indicator.width }}
            />
          )}
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                ref={(el) => {
                  itemRefs.current[item.href] = el;
                }}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative z-10 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200",
                  "focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[--brand-red]",
                  active
                    ? "text-[--brand-white]"
                    : "text-black/55 hover:bg-[--brand-red-light] hover:text-[--brand-black]"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-[--brand-white-soft]/90 text-[--brand-black] md:hidden"
        >
          {open ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
        </button>
      </nav>

      {/* Mobile panel */}
      <div
        className={cn(
          "grid overflow-hidden border-t border-black/10 bg-[--brand-white]/95 backdrop-blur-md transition-[grid-template-rows] duration-300 ease-out md:hidden",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <div className="mx-auto flex max-w-6xl flex-col px-5 py-2 sm:px-6">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-lg px-3 py-3 text-base font-medium transition-colors",
                    active ? "text-[--brand-black]" : "text-black/60 hover:text-[--brand-black]"
                  )}
                >
                  <span className="flex items-center">
                    {active && <span className="h-1.5 w-1.5 rounded-full bg-[--brand-red]" />}
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
}