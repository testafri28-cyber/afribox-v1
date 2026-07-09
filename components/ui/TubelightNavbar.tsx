"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  Home,
  User,
  Briefcase,
  FileText,
  Phone,
  Info,
  Menu,
  X,
  ArrowRight,
} from "lucide-react"

type IconName = "home" | "user" | "briefcase" | "filetext" | "phone" | "info" | "menu" | "x" | "arrowright"

interface NavItem {
  name: string
  url: string
  icon?: IconName
  onClick?: () => void
  showArrow?: boolean
}

interface TubelightNavbarProps {
  items: NavItem[]
  className?: string
  activeTab?: string
  onActiveChange?: (name: string) => void
}

const iconMap: Record<IconName, React.ReactNode> = {
  home: <Home size={18} strokeWidth={2.5} />,
  user: <User size={18} strokeWidth={2.5} />,
  briefcase: <Briefcase size={18} strokeWidth={2.5} />,
  filetext: <FileText size={18} strokeWidth={2.5} />,
  phone: <Phone size={18} strokeWidth={2.5} />,
  info: <Info size={18} strokeWidth={2.5} />,
  menu: <Menu size={18} strokeWidth={2.5} />,
  x: <X size={18} strokeWidth={2.5} />,
  arrowright: <ArrowRight size={18} strokeWidth={2.5} />,
}

export function TubelightNavbar({
  items,
  className,
  activeTab: controlledActiveTab,
  onActiveChange,
}: TubelightNavbarProps) {
  const [activeTab, setActiveTab] = useState(controlledActiveTab || items[0]?.name || "")
  const [isMobile, setIsMobile] = useState(false)

  // Update controlled active tab
  useEffect(() => {
    if (controlledActiveTab) {
      setActiveTab(controlledActiveTab)
    }
  }, [controlledActiveTab])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleTabChange = (name: string, callback?: () => void) => {
    setActiveTab(name)
    onActiveChange?.(name)
    callback?.()
  }

  const getIcon = (iconName?: IconName) => {
    if (!iconName) return null
    return iconMap[iconName]
  }

  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      {items.map((item) => {
        const icon = getIcon(item.icon)
        const isActive = activeTab === item.name

        const content = (
          <>
            {item.icon === undefined ? (
              // CTA buttons - text + arrow on same line
              <span className="font-medium inline-flex items-center gap-2">
                {item.name}
                {item.showArrow && iconMap.arrowright}
              </span>
            ) : (
              // Navigation links
              <>
                <span className="hidden md:inline text-sm font-medium">{item.name}</span>
                {icon && <span className="md:hidden">{icon}</span>}
              </>
            )}
          </>
        )

        return item.url ? (
          <Link
            key={item.name}
            href={item.url}
            onClick={() => handleTabChange(item.name, item.onClick)}
            className={cn(
              item.icon === undefined ? (
                // CTA buttons styling
                item.showArrow
                  ? "inline-flex items-center justify-center font-body font-medium rounded-full transition-all duration-150 active:scale-[0.97] whitespace-nowrap bg-green-primary text-white hover:bg-green-dark px-6 py-3 text-sm"
                  : "inline-flex items-center justify-center font-body font-medium rounded-full transition-all duration-150 bg-white text-brand-gray border border-brand-border hover:bg-brand-off px-6 py-3 text-sm whitespace-nowrap"
              ) : (
                // Navigation links styling
                cn(
                  "relative cursor-pointer px-4 py-2 rounded-full transition-all duration-150 whitespace-nowrap",
                  isActive
                    ? "text-green-primary font-semibold"
                    : "text-brand-sub hover:text-brand-gray"
                )
              )
            )}
          >
            {content}
            {isActive && item.icon !== undefined && (
              <motion.div
                layoutId="tubelight-lamp"
                className="absolute inset-0 bg-green-primary/15 rounded-full -z-10"
                initial={false}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
              >
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-green-primary rounded-t-full">
                  <div className="absolute w-12 h-6 bg-green-primary/25 rounded-full blur-md -top-2 -left-2" />
                  <div className="absolute w-8 h-6 bg-green-primary/20 rounded-full blur-md -top-1" />
                  <div className="absolute w-4 h-4 bg-green-primary/15 rounded-full blur-sm top-0 left-2" />
                </div>
              </motion.div>
            )}
          </Link>
        ) : (
          <button
            key={item.name}
            onClick={() => handleTabChange(item.name, item.onClick)}
            className={cn(
              item.icon === undefined ? (
                // CTA buttons styling
                item.showArrow
                  ? "inline-flex items-center justify-center font-body font-medium rounded-full transition-all duration-150 active:scale-[0.97] whitespace-nowrap bg-green-primary text-white hover:bg-green-dark px-6 py-3 text-sm"
                  : "inline-flex items-center justify-center font-body font-medium rounded-full transition-all duration-150 bg-white text-brand-gray border border-brand-border hover:bg-brand-off px-6 py-3 text-sm whitespace-nowrap"
              ) : (
                // Navigation links styling
                cn(
                  "relative cursor-pointer px-4 py-2 rounded-full transition-all duration-150 bg-transparent border-none whitespace-nowrap",
                  isActive
                    ? "text-green-primary font-semibold"
                    : "text-brand-sub hover:text-brand-gray"
                )
              )
            )}
          >
            {content}
            {isActive && item.icon !== undefined && (
              <motion.div
                layoutId="tubelight-lamp"
                className="absolute inset-0 bg-green-primary/15 rounded-full -z-10"
                initial={false}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
              >
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-green-primary rounded-t-full">
                  <div className="absolute w-12 h-6 bg-green-primary/25 rounded-full blur-md -top-2 -left-2" />
                  <div className="absolute w-8 h-6 bg-green-primary/20 rounded-full blur-md -top-1" />
                  <div className="absolute w-4 h-4 bg-green-primary/15 rounded-full blur-sm top-0 left-2" />
                </div>
              </motion.div>
            )}
          </button>
        )
      })}
    </div>
  )
}
