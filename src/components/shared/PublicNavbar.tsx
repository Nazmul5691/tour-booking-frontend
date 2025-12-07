"use client";
// import { getCookie } from "@/services/auth/tokenHandlers";
import { Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { useEffect, useState } from "react";
import Image from "next/image";
import LogoutButton from "./LogoutButton";
import { getCookie } from "@/services/auth/tokenHandlers";

// const PublicNavbar = async () => {
const PublicNavbar = () => {
  const navItems = [
    { href: "/", label: "Home" },
    { href: "/allTours", label: "Tours" },
    { href: "/destination", label: "Destination" },
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
    // { href: "/admin", label: "Dashboard" },
    // { href: "/admin", label: "Dashboard" },
    // { href: "/user", label: "Dashboard" },
  ];


  const [scrolled, setScrolled] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const headerClass = scrolled
    ? "bg-black/80 backdrop-blur-md shadow-md"
    : "bg-gradient-to-b from-black/60 to-transparent backdrop-blur-sm";


  useEffect(() => {
    // Define an async function inside useEffect
    const fetchToken = async () => {
      // ✅ Await is now safe inside this function
      const token = await getCookie("accessToken");
      setAccessToken(token);
    };

    fetchToken();
  }, []); // Run only once on mount
  // const accessToken = await getCookie("accessToken");

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

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navItems.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-white/90 hover:text-yellow-400 py-1.5 font-medium transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-2">
          {accessToken ? (
            <LogoutButton />
          ) : (
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          )}
          {/* <Button> login</Button> */}
        </div>

        {/* Mobile Menu */}

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">
                {" "}
                <Menu />{" "}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] p-4">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <nav className="flex flex-col space-y-4 mt-8">
                {navItems.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-lg font-medium"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="border-t pt-4 flex flex-col space-y-4">
                  <div className="flex justify-center"></div>
                  <Link href="/login" className="text-lg font-medium">
                    <Button>Login</Button>
                  </Link>
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
