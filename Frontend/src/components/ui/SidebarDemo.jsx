import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/Sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { UserButton, useUser } from "@clerk/clerk-react";

export function SidebarDemo() {
  const links = [
    { label: "Dashboard", href: "/", icon: <IconBrandTabler className="h-5 w-5 text-neutral-700 dark:text-neutral-200" /> },
    { label: "Profile", href: "/profile", icon: <IconUserBolt className="h-5 w-5 text-neutral-700 dark:text-neutral-200" /> },
    { label: "Settings", href: "/settings", icon: <IconSettings className="h-5 w-5 text-neutral-700 dark:text-neutral-200" /> },
    
  ];

  const [open, setOpen] = useState(false);
  const {user} = useUser();

  return (
    <Sidebar open={open} setOpen={setOpen} animate={true}>
      <SidebarBody className="justify-between gap-10">
        <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
          <Logo />
          <div className="mt-8 flex flex-col gap-2">
            {links.map((link, idx) => (
              <SidebarLink key={idx} link={link} />
            ))}
          </div>
        </div>
        <UserButton/>
        {/* <SidebarLink/> */}
      </SidebarBody>
    </Sidebar>
  );
}

export const Logo = () => { return ( <a href="#" className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"> <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" /> <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-medium whitespace-pre text-black dark:text-white"> Eternal Threads  </motion.span> </a> ); }; export const LogoIcon = () => { return ( <a href="#" className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"> <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" /> </a> ); };
