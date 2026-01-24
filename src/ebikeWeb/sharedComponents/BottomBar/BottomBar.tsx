"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./bottomBar.module.scss";
import { isLoginUser } from '@/genericFunctions/geneFunc';
import { useRouter } from 'next/navigation';

type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

export default function BottomBar() {
  const pathname = usePathname();
   const router = useRouter()

  const items: NavItem[] = [
    {
      label: "Used Bike",
      href: "/used-bikes",
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 16.5a3.5 3.5 0 1 1 3.4-4.4h2.2l2.3-4h3.7v2H14l-1.6 2.8h2.3A3.5 3.5 0 1 1 19 20a3.5 3.5 0 0 1-3.2-5h-6A3.5 3.5 0 0 1 5 16.5Zm0 1.5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm14 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
        </svg>
      ),
    },
    {
      label: "New Bike",
      href: "/new-bikes",
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2 3 6v6c0 5 3.8 9.7 9 10 5.2-.3 9-5 9-10V6l-9-4Zm0 2.2 7 3.1V12c0 3.9-2.9 7.6-7 8-4.1-.4-7-4.1-7-8V7.3l7-3.1Zm-.9 4.3h1.8v4.2l3 1.8-.9 1.5-3.9-2.3V8.5Z" />
        </svg>
      ),
    },
    {
      label: "Sell Bike",
      href: "/used-bikes/sell-used-bike",
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2a1 1 0 0 1 1 1v7h7a1 1 0 1 1 0 2h-7v7a1 1 0 1 1-2 0v-7H4a1 1 0 1 1 0-2h7V3a1 1 0 0 1 1-1Z" />
        </svg>
      ),
    },
    {
      label: "Electric",
      href: "/new-bikes?tab=2",
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M13 2 6 14h6l-1 8 7-12h-6l1-8Z" />
        </svg>
      ),
    },
  ];

  const isActive = (href: string) => {
    // exact match OR route starts with it (for subpages)
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  const onClickItem = (item:any) => {
   if(item.href?.indexOf("sell-used-bike") > -1) {
    let _isLoginUser = isLoginUser()
    if(_isLoginUser?.login) {
      router.push("/used-bikes/sell-used-bike")
    }
    else {
      alert("Please Login to sell your bike")
    }
   }
  };

  
let _isLoginUser = isLoginUser()

  return (
    <nav className={styles.bottomBar} aria-label="Bottom navigation">
      <div className={styles.inner}>
        {items.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href?.indexOf("sell-used-bike") > -1 ? (_isLoginUser?.login ? item.href : "") : item.href}
              className={`${styles.item} ${active ? styles.active : ""}`}
              aria-current={active ? "page" : undefined}
              onClick={() => onClickItem(item)}
            >
              <span className={styles.icon}>{item.icon}</span>
              <span className={styles.label}>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
