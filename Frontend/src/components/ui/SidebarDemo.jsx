import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/Sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
  IconHome,
  IconCategory,
  IconSearch,
  IconHeart,
  IconUser,
  IconFriends,
  IconCalendar,
  IconMessageCircle,
  IconBrandInstagram,
  IconPencil,
  IconCamera,
  
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { UserButton, useUser } from "@clerk/clerk-react";

export function SidebarDemo() {
  
const links = [
  { label: "Home", href: "/home", icon: <IconHome className="h-8 w-8 text-neutral-700 dark:text-neutral-200" /> },
  { label: "Trending", href: "/trending", icon: <IconSearch className="h-8 w-8 text-neutral-700 dark:text-neutral-200" /> },
  { label: "FriendZone", href: "/friends", icon: <IconFriends className="h-8 w-8 text-neutral-700 dark:text-neutral-200" /> },
  { label: "Occasional", href: "/occasional", icon: <IconCalendar className="h-8 w-8 text-neutral-700 dark:text-neutral-200" /> },
  { label: "Brands", href: "/brands", icon: <IconBrandInstagram className="h-8 w-8 text-neutral-700 dark:text-neutral-200" /> },
  { label: "Wishlist", href: "/wishlist", icon: <IconHeart className="h-8 w-8 text-neutral-700 dark:text-neutral-200" /> },
  { label: "Face Recommend", href: "/face-recommend", icon: <IconCamera className="h-8 w-8 text-neutral-700 dark:text-neutral-200" /> },
  { label: "Profile", href: "/profile", icon: <IconUser className="h-8 w-8 text-neutral-700 dark:text-neutral-200" /> },
  { label: "Chatbot", href: "/chatbot", icon: <IconMessageCircle className="h-8 w-8 text-neutral-700 dark:text-neutral-200" /> },
  { label: "Designers", href: "/designers", icon: <IconPencil className="h-8 w-8 text-neutral-700 dark:text-neutral-200" /> },
];

  const [open, setOpen] = useState(false);
  const { user } = useUser();

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
        <UserButton />
      </SidebarBody>
    </Sidebar>
  );
}

export const Logo = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-black dark:text-white"
      >
        Eternal Threads
      </motion.span>
    </a>
  );
};

export const LogoIcon = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-black dark:bg-white" />
    </a>
  );
};
