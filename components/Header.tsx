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

  const getSignedUser = async () =>{
    const user = await ApiClient.get("me")
    .then((response)=>{
      setUser(response.data?.user)
    })
    .catch((error)=>{
      console.log(error)
    })

  }

  useEffect(()=>{
    getSignedUser()
  },[])

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-400 rounded-xl flex items-center justify-center">
              <Smartphone className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Celes Store
            </span>
          </div>

          {/* Desktop Navigation */}
          <form className="gap-2 hidden md:flex">
            <Input required placeholder="Search Products..." />
            <Button className="text-xs py-2 bg-indigo-600">
              <Search />
              Search
            </Button>
          </form>

          {/* Desktop Actions */}
        {user === null &&  <div className="hidden md:flex items-center gap-4">
            <Link href="/auth/login">
              <button className="text-gray-700 hover:text-purple-600 transition-colors flex items-center gap-2">
                <User className="w-5 h-5" />
                <span>Login</span>
              </button>
            </Link>
            <Link href="/auth/register">
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all">
                Sign Up
              </button>
            </Link>
          </div>}

         {user && <div className="hidden md:flex  gap-3 items-center ">
            <div className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full">
              <User2 size={16} />
            </div>
            <h1 className="capitalize font-semibold ">{user?.name}</h1>
          </div>
}
          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <form className="gap-2 flex flex-col">
              <Input required placeholder="Search Products..." />
              <Button className="text-xs py-2 bg-indigo-600">
                <Search />
                Search
              </Button>
            </form>
            <nav className="flex flex-col gap-4">
             
          
             {user === null && <div className="flex flex-col gap-2 pt-4 border-t border-gray-100">
                <Link href={"/auth/login"}>
                  <Button variant={'outline'} className="w-full text-blue-700">
                    Login
                  </Button>
                </Link>

                <Link href={"/auth/register"}>
                  <Button variant={'outline'} className="w-full ">
                    Sign Up
                  </Button>
                </Link>
              </div>}
                  {user && <div className="flex mt-3 gap-3 items-center ">
            <div className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full">
              <User2 size={16} />
            </div>
            <h1 className="capitalize font-semibold ">{user?.name}</h1>
          </div>
}

            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
