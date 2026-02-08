"use client";

import { Menu, X, User, Smartphone, Search, User2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import ApiClient from "@/lib/API";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser]: any = useState(null);

  const getSignedUser = async () => {
    const user = await ApiClient.get("me")
      .then((response) => {
        setUser(response.data?.user);
      })
      .catch((error) => {
        // console.log(error)
      });
  };

  useEffect(() => {
    getSignedUser();
  }, []);

  return (
    <header className="bg-[#14213D] shadow-sm sticky top-0 z-50 h-[70px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-[70px] ">
          {/* Logo */}
          <div className="flex items-center gap-0">
            
            <img src="/logo.png" className="w-20" alt="" />
            <span className="hidden md:block text-2xl bg-gradient-to-r from-[#FCA311] to-indigo-600 bg-clip-text text-transparent -ml-2">
              Celes Store
            </span>
          </div>

         

          {/* Desktop Actions */}
          {user === null && (
            <div className="hidden md:flex items-center gap-4">
              <Link href="/auth/login">
                <button className="text-gray-700 hover:text-purple-600 transition-colors flex items-center gap-2">
                  <User className="w-5 h-5" />
                  <span>Login</span>
                </button>
              </Link>
              <Link href="/auth/register">
              
                <Button>Sign Up</Button>
              </Link>
            </div>
          )}

          {user && (
            <div className="hidden md:flex  gap-3 items-center ">
              <div className="flex items-center justify-center w-10 h-10 bg-black rounded-full">
                <User2 size={16} className="text-primary" />
              </div>
              <h1 className="capitalize font-semibold text-primary">{user?.name}</h1>
            </div>
          )}
          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-100" />
            ) : (
              <Menu className="w-6 h-6 text-gray-100" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t bg-white px-6 border-gray-100">
            
            <nav className="flex flex-col gap-4">
              {user === null && (
                <div className="flex flex-col gap-2 pt-4 border-t border-gray-100">
                  <Link href={"/auth/login"}>
                    <Button
                      variant={"outline"}
                      className="w-full text-black bg-primary"
                    >
                      Login
                    </Button>
                  </Link>

                  <Link href={"/auth/register"}>
                    <Button variant={"outline"} className="w-full text-primary bg-black ">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
              {user && (
                <div className="flex mt-3 gap-3 items-center ">
                  <div className="flex items-center justify-center w-10 h-10 bg-black rounded-full">
                    <User2 size={16} />
                  </div>
                  <h1 className="capitalize font-semibold text-primary ">{user?.name}</h1>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
