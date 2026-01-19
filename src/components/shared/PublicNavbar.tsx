/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/static-components */
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
import { usePathname, useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { LayoutDashboard, User } from "lucide-react";
import { logoutUser } from "@/services/auth/logoutUser";

const PublicNavbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const [scrolled, setScrolled] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [role, setRole] = useState<Role | null>(null);
  const [userPicture, setUserPicture] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);

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

        // Fetch user profile picture from your API
        try {
          const response = await fetch("/api/user/profile", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            setUserPicture(data?.picture || null);
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      } else {
        // If no token, reset all states
        setRole(null);
        setUserPicture(null);
        setImageError(false);
      }
    };
    fetchToken();
  }, [pathname]); // Re-run when pathname changes

  const handleLogout = async () => {
    // Reset states before logout
    setAccessToken(null);
    setRole(null);
    setUserPicture(null);
    setImageError(false);

    // Call the logout function (it will redirect to /login)
    await logoutUser();
  };

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/allTours", label: "Tours" },
    { href: "/about-us", label: "About" },
    { href: "/contact-us", label: "Contact Us" },
    { href: "/privacy-terms", label: "Privacy Policy" },
  ];

  if (role === "USER" || role === null) {
    navItems.push({ href: "/register-guide", label: "Become a Guide" });
  }

  // Profile Image Component
  const ProfileImage = ({ size = 40 }: { size?: number }) => {
    if (userPicture && !imageError) {
      return (
        <Image
          src={userPicture}
          alt="User Profile"
          width={size}
          height={size}
          className="rounded-full object-cover w-full h-full"
          onError={() => setImageError(true)}
        />
      );
    }

    // Fallback to User icon from lucide-react
    return (
      
      <div className="w-full h-full flex items-center justify-center bg-linear-to-r from-yellow-400 via-orange-500 to-rose-600 rounded-full">
        <User className="w-1/2 h-1/2 text-white" />
      </div>
    );
  };

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
        </nav>

        <div className="hidden md:flex items-center space-x-2">
          {accessToken && role ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full border-white text-white hover:bg-white/10 p-0 overflow-hidden w-10 h-10">
                  <ProfileImage size={40} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">User Account</p>
                    <p className="text-xs text-primary capitalize">
                      {role.toLowerCase()}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={getDefaultDashboardRoute(role)} className="cursor-pointer">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/my-profile" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer text-red-600"
                >
                  <LogoutButton />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button className="bg-linear-to-r from-yellow-400 via-orange-500 to-rose-600 text-white font-semibold shadow-md hover:scale-105 transition">
                Login
              </Button>
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

              {/* Mobile User Profile Section */}
              {accessToken && role && (
                <div className="flex items-center gap-3 pb-4 border-b mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200">
                    <ProfileImage size={48} />
                  </div>
                  <div>
                    <p className="font-medium">User Account</p>
                    <p className="text-xs text-gray-500 capitalize">
                      {role.toLowerCase()}
                    </p>
                  </div>
                </div>
              )}

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
                  <>
                    <Link
                      href={getDefaultDashboardRoute(role)}
                      className={`text-lg font-medium ${pathname.startsWith("/dashboard") ? "text-yellow-500" : ""
                        }`}
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/my-profile"
                      className="text-lg font-medium"
                    >
                      Profile
                    </Link>
                    <Link
                      href="/change-password"
                      className="text-lg font-medium"
                    >
                      Change Password
                    </Link>
                  </>
                )}

                <div className="border-t pt-4 flex flex-col space-y-4">
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







