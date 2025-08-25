import React from "react";
import { IconHome, IconCategory, IconSearch, IconHeart, IconUser } from "@tabler/icons-react";
import { FloatingNav } from "./FloatingNav";

export function FloatingNavDemo() {
  const navItems = [
    {
      name: "Home",
      link: "/home",
      icon: <IconHome className="h-5 w-5 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Trending",
      link: "/trending",
      icon: <IconSearch className="h-5 w-5 text-neutral-500 dark:text-white" />,
    },
    {
      name: "FriendZone",
      link: "/friends",
      icon: <IconCategory className="h-5 w-5 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Occasional",
      link: "/occasional",
      icon: <IconCategory className="h-5 w-5 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Brands",
      link: "/brands",
      icon: <IconHeart className="h-5 w-5 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Wishlist",
      link: "/wishlist",
      icon: <IconHeart className="h-5 w-5 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Profile",
      link: "/profile",
      icon: <IconUser className="h-5 w-5 text-neutral-500 dark:text-white" />,
    },
  ];

  return (
    <div className="relative w-full">
      <FloatingNav navItems={navItems} />
    </div>
  );
}
