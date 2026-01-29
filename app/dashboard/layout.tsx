import {
  Headset,
  LayoutDashboard,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import DashboardHeader from "@/components/DashboardHeader";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const items = [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <LayoutDashboard size={25} className="text-2xl text-gray-800" />,
    },
   
  
    {
      title: "Contact Us",
      url: "#",
      icon: <Headset size={25} className="text-2xl text-gray-800" />,
    },
    {
      title: "Account",
      url: "/dashboard/account",
      icon: <User size={25} className="text-2xl text-gray-800" />,
    },
   
  ];
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>
              <span className="text-2xl  bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                ShuraimDataSub
              </span>
            </SidebarGroupLabel>

            <SidebarGroupContent className="mt-5">
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton className="bg-gray-50 py-5 px-3" asChild>
                      <Link className="text-lg h-16" href={item.url}>
                        <div className="">{item.icon}</div>
                        <span className="text-lg md:text-xl text-gray-800">
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 shadow-lg mb-5 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <DashboardHeader />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
