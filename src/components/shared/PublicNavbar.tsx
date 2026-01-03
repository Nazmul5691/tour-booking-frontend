

"use client";
import { Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { useEffect, useState } from "react";
import Image from "next/image";
import LogoutButton from "./LogoutButton";
import { getCookie } from "@/services/auth/tokenHandlers";
import { getRoleFromAccessToken } from "@/lib/getRoleFromAccessToken";
import { getDefaultDashboardRoute } from "@/lib/auth-utils";
import { Role } from "@/types/user.interface";
import { usePathname } from "next/navigation";

const PublicNavbar = () => {
  const pathname = usePathname(); // ✅ get current route

  const [scrolled, setScrolled] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [role, setRole] = useState<Role | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerClass = scrolled
    ? "bg-black/80 backdrop-blur-md shadow-md"
    : "bg-gradient-to-b from-black/60 to-transparent backdrop-blur-sm";

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getCookie("accessToken");
      setAccessToken(token);

      if (token) {
        const extractedRole = getRoleFromAccessToken(token) as Role;
        setRole(extractedRole);
      }
    };
    fetchToken();
  }, []);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/allTours", label: "Tours" },
    { href: "/about-us", label: "About" },
    { href: "/contact-us", label: "Contact Us" },
    // { href: "/blog", label: "Blog" },
  ];

  if (role === "USER" || role === null) {
    navItems.push({ href: "/register-guide", label: "Become a Guide" });
  }

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${headerClass}`}>
      <div className="container mx-auto px-4 flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/images/dream-tour.png"
            alt="Dream Tour Logo"
            className="h-10 w-auto"
            height={10}
            width={100}
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navItems.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.label}
                href={link.href}
                className={`py-1.5 font-medium transition-colors ${isActive ? "text-yellow-400" : "text-white/90 hover:text-yellow-400"
                  }`}
              >
                {link.label}
              </Link>
            );
          })}

          {accessToken && role && (
            <Link
              href={getDefaultDashboardRoute(role)}
              className={`py-1.5 font-medium transition-colors ${pathname.startsWith("/dashboard")
                ? "text-yellow-400"
                : "text-white/90 hover:text-yellow-400"
                }`}
            >
              Dashboard
            </Link>
          )}
        </nav>

        <div className="hidden md:flex items-center space-x-2">
          {accessToken ? (
            <LogoutButton />
          ) : (
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] p-4">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <nav className="flex flex-col space-y-4 mt-8">
                {navItems.map((link) => {
                  const isActive = pathname === link.href;

                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      className={`text-lg font-medium ${isActive ? "text-yellow-500" : ""
                        }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}

                {accessToken && role && (
                  <Link
                    href={getDefaultDashboardRoute(role)}
                    className={`text-lg font-medium ${pathname.startsWith("/dashboard") ? "text-yellow-500" : ""
                      }`}
                  >
                    Dashboard
                  </Link>
                )}

                <div className="border-t pt-4 flex flex-col space-y-4">
                  {/* <Link href="/login" className="text-lg font-medium">
                    <Button>Login</Button>
                  </Link> */}
                  {accessToken ? (
                    <LogoutButton />
                  ) : (
                    <Link href="/login" className="text-lg font-medium">
                      <Button>Login</Button>
                    </Link>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default PublicNavbar;
