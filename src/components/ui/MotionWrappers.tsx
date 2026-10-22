"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "motion/react";

const ease = [0.25, 0.1, 0.25, 1.0] as const;

interface FadeInProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
}

export function FadeIn({
  children,
  direction = "up",
  delay = 0,
  duration = 0.5,
  distance = 24,
  className,
}: FadeInProps) {
  const initial: { opacity: number; x?: number; y?: number } = { opacity: 0 };
  if (direction === "up") initial.y = distance;
  else if (direction === "down") initial.y = -distance;
  else if (direction === "left") initial.x = distance;
  else if (direction === "right") initial.x = -distance;

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerContainerProps {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}

export function StaggerContainer({
  children,
  staggerDelay = 0.08,
  className,
}: StaggerContainerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
      }}
    >
      {children}
    </motion.div>
  );
}

interface HoverCardProps {
  children: React.ReactNode;
  className?: string;
  lift?: number;
}

export function HoverCard({ children, className, lift = 6 }: HoverCardProps) {
  return (
    <motion.div
      className={className}
      whileHover={{ y: -lift, transition: { duration: 0.25, ease: "easeOut" } }}
    >
      {children}
    </motion.div>
  );
}

interface AnimatedNumberProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

export function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  duration = 1.8,
  className,
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState(0);
  const motionVal = useMotionValue(0);
  const springVal = useSpring(motionVal, { duration: duration * 1000, bounce: 0 });

  useEffect(() => {
    if (inView) motionVal.set(value);
  }, [inView, value, motionVal]);

  useEffect(() => {
    return springVal.on("change", (v) => setDisplay(Math.round(v)));
  }, [springVal]);

  return (
    <span ref={ref} className={className}>
      {prefix}{display}{suffix}
    </span>
  );
}

interface PulseBadgeProps {
  children: React.ReactNode;
  color?: string;
  className?: string;
}

export function PulseBadge({ children, color = "bg-emerald-500", className }: PulseBadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1.5 ${className ?? ""}`}>
      <span className="relative flex h-2 w-2">
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${color} opacity-75`} />
        <span className={`relative inline-flex rounded-full h-2 w-2 ${color}`} />
      </span>
      {children}
    </span>
  );
}
