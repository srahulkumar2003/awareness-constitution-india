import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function IntroVideo({ onComplete }) {
  const [visible, setVisible] = useState(() => sessionStorage.getItem("introSeen") !== "true");

  const finish = () => {
    sessionStorage.setItem("introSeen", "true");
    setVisible(false);
    onComplete?.();
  };

  useEffect(() => {
    if (!visible) onComplete?.();
    const timer = setTimeout(finish, 10000);
    return () => clearTimeout(timer);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.section
          className="intro-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <video
            className="intro-video"
            src="/videos/intro.mp4"
            autoPlay
            muted
            playsInline
            onEnded={finish}
          />
          <div className="intro-cinematic-overlay" />
          <button className="skip-button" onClick={finish}>Skip Intro</button>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
