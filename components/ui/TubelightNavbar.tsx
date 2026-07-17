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
  CreditCard,
  MapPin,
} from "lucide-react"

type IconName = "home" | "user" | "briefcase" | "filetext" | "phone" | "info" | "menu" | "x" | "arrowright" | "creditcard" | "mappin"

/* `tone` describes the background the navbar sits on, not the text:
   "dark" = light background (default), "light" = dark background (the hero gradient). */
type Tone = "dark" | "light"

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
  tone?: Tone
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
  creditcard: <CreditCard size={18} strokeWidth={2.5} />,
  mappin: <MapPin size={18} strokeWidth={2.5} />,
}

/* The travelling highlight behind the active tab. */
function Lamp({ onDark }: { onDark: boolean }) {
  const glow = onDark ? "bg-white" : "bg-green-primary"

  return (
    <motion.div
      layoutId="tubelight-lamp"
      className={cn(
        "absolute inset-0 rounded-full -z-10",
        onDark ? "bg-white/20" : "bg-green-primary/15",
      )}
      initial={false}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className={cn("absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 rounded-t-full", glow)}>
        <div className={cn("absolute w-12 h-6 rounded-full blur-md -top-2 -left-2 opacity-25", glow)} />
        <div className={cn("absolute w-8 h-6 rounded-full blur-md -top-1 opacity-20", glow)} />
        <div className={cn("absolute w-4 h-4 rounded-full blur-sm top-0 left-2 opacity-15", glow)} />
      </div>
    </motion.div>
  )
}

export function TubelightNavbar({
  items,
  className,
  activeTab: controlledActiveTab,
  tone = "dark",
  onActiveChange,
}: TubelightNavbarProps) {
  const [activeTab, setActiveTab] = useState(controlledActiveTab ?? "")
  const onDark = tone === "light"

  // Update controlled active tab (respect an explicitly empty value)
  useEffect(() => {
    if (controlledActiveTab !== undefined) {
      setActiveTab(controlledActiveTab)
    }
  }, [controlledActiveTab])

  const handleTabChange = (name: string, callback?: () => void) => {
    setActiveTab(name)
    onActiveChange?.(name)
    callback?.()
  }

  const linkClasses = (item: NavItem, isActive: boolean) =>
    item.icon === undefined
      ? // CTA buttons
        item.showArrow
        ? "inline-flex items-center justify-center font-body font-medium rounded-full transition-all duration-150 active:scale-[0.97] whitespace-nowrap bg-green-primary text-white hover:bg-green-dark px-4 py-2 text-xs"
        : "inline-flex items-center justify-center font-body font-medium rounded-full transition-all duration-150 bg-white text-brand-gray border border-brand-border hover:bg-brand-off px-4 py-2 text-xs whitespace-nowrap"
      : // Navigation links
        cn(
          "relative cursor-pointer px-3 py-2 rounded-full transition-all duration-150 whitespace-nowrap bg-transparent border-none",
          isActive
            ? onDark
              ? "text-white font-semibold"
              : "text-green-primary font-semibold"
            : onDark
              ? "text-white/70 hover:text-white"
              : "text-brand-sub hover:text-brand-gray",
        )

  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      {items.map((item) => {
        const isActive = activeTab === item.name
        const isNavLink = item.icon !== undefined

        const content =
          item.icon === undefined ? (
            <span className="font-medium inline-flex items-center gap-2">
              {item.name}
              {item.showArrow && iconMap.arrowright}
            </span>
          ) : (
            <>
              <span className="hidden md:inline text-sm font-medium">{item.name}</span>
              <span className="md:hidden">{iconMap[item.icon]}</span>
            </>
          )

        const inner = (
          <>
            {content}
            {isActive && isNavLink && <Lamp onDark={onDark} />}
          </>
        )

        return item.url ? (
          <Link
            key={item.name}
            href={item.url}
            onClick={() => handleTabChange(item.name, item.onClick)}
            className={linkClasses(item, isActive)}
          >
            {inner}
          </Link>
        ) : (
          <button
            key={item.name}
            onClick={() => handleTabChange(item.name, item.onClick)}
            className={linkClasses(item, isActive)}
          >
            {inner}
          </button>
        )
      })}
    </div>
  )
}
