import { motion } from "framer-motion";

/**
 * Wraps any section/element and animates it into view as the user scrolls.
 * direction: "up" | "left" | "right" | "fade"
 */
export default function ScrollReveal({ children, direction = "up", delay = 0, className = "" }) {
  const offsets = {
    up: { y: 36, x: 0 },
    left: { y: 0, x: -36 },
    right: { y: 0, x: 36 },
    fade: { y: 0, x: 0 },
  };
  const offset = offsets[direction] || offsets.up;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
