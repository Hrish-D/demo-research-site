'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigation, PageId } from '@/lib/navigation-state';
import { ELECTRONS, NUCLEUS_CONFIG } from '@/lib/electron-config';

// ─── Nucleus SVG ────────────────────────────────────────────
function Nucleus({ scale = 1, onClick }: { scale?: number; onClick?: () => void }) {
  const { radius, innerRadius, color, innerColor } = NUCLEUS_CONFIG;

  return (
    <g
      className="cursor-pointer"
      onClick={onClick}
      style={{ transform: `scale(${scale})`, transformOrigin: 'center' }}
    >
      {/* Outer glow */}
      <circle cx="0" cy="0" r={radius + 30} fill="url(#nucleusGlow)" opacity={0.5} />

      {/* Nucleus body */}
      <circle cx="0" cy="0" r={radius} fill="url(#nucleusGradient)" className="nucleus-pulse" />

      {/* Inner core */}
      <circle cx="0" cy="0" r={innerRadius} fill="url(#nucleusInner)" opacity={0.9} />

      {/* Hotspot glints */}
      <circle cx="-12" cy="-15" r="8" fill="white" opacity={0.15} />
      <circle cx="8" cy="-20" r="5" fill="white" opacity={0.1} />

      {/* Label */}
      <text
        y="2"
        textAnchor="middle"
        fill="white"
        fontSize="11"
        fontFamily="var(--font-inter), system-ui, sans-serif"
        fontWeight="600"
        letterSpacing="0.1em"
        style={{ textTransform: 'uppercase' }}
      >
        HOME
      </text>

      {/* SVG Defs for nucleus gradients */}
      <defs>
        <radialGradient id="nucleusGradient" cx="35%" cy="35%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="40%" stopColor={color} />
          <stop offset="100%" stopColor="#c2410c" />
        </radialGradient>
        <radialGradient id="nucleusInner" cx="40%" cy="40%">
          <stop offset="0%" stopColor="#fef3c7" />
          <stop offset="60%" stopColor={innerColor} />
          <stop offset="100%" stopColor={color} />
        </radialGradient>
        <radialGradient id="nucleusGlow" cx="50%" cy="50%">
          <stop offset="0%" stopColor={color} stopOpacity="0.4" />
          <stop offset="70%" stopColor={color} stopOpacity="0.1" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
    </g>
  );
}

// ─── Single Electron ────────────────────────────────────────
function Electron({
  config,
  onClick,
  isPaused,
}: {
  config: typeof ELECTRONS[0];
  onClick: () => void;
  isPaused: boolean;
}) {
  const { orbitRadius, speed, startAngle, color, glowColor, label } = config;
  const tiltDeg = (ELECTRONS.indexOf(config) * 15) - 30;
  const ry = orbitRadius * 0.38;

  return (
    <g style={{ transform: `rotateZ(${tiltDeg}deg)`, transformOrigin: 'center' }}>
      {/* Orbit */}
      <ellipse
        cx="0"
        cy="0"
        rx={orbitRadius}
        ry={ry}
        fill="none"
        stroke="rgba(255,255,255,0.06)"
        strokeWidth="1"
        strokeDasharray="6 8"
      />

      {/* Electron group – animated via CSS */}
      <g
        className="electron-orbit"
        style={{
          animationDuration: `${speed}s`,
          animationDelay: `${-(startAngle / 360) * speed}s`,
          animationPlayState: isPaused ? 'paused' : 'running',
          ['--orbit-rx' as string]: `${orbitRadius}px`,
          ['--orbit-ry' as string]: `${ry}px`,
        }}
      >
        {/* Electron glow */}
        <circle cx="0" cy="0" r="18" fill={glowColor} opacity={0.3} />

        {/* Electron body */}
        <circle
          cx="0"
          cy="0"
          r="10"
          fill={color}
          className="cursor-pointer electron-body"
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
        />

        {/* Electron inner */}
        <circle cx="-2" cy="-2" r="4" fill="white" opacity={0.3} />

        {/* Label */}
        <text
          y="28"
          textAnchor="middle"
          fill={color}
          fontSize="10"
          fontFamily="var(--font-inter), system-ui, sans-serif"
          fontWeight="500"
          letterSpacing="0.05em"
          className="pointer-events-none select-none"
          opacity={0.9}
        >
          {label}
        </text>
      </g>
    </g>
  );
}

// ─── Background particles ───────────────────────────────────
function BackgroundParticles() {
  const particles = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.4 + 0.1,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 5,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-teal-400/50"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{ opacity: [p.opacity, p.opacity * 0.3, p.opacity] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay }}
        />
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// AtomicScene — Main component
// ═══════════════════════════════════════════════════════════════
export default function AtomicScene() {
  const { state, transitionTo } = useNavigation();
  const [viewBox, setViewBox] = useState('0 0 1000 1000');
  const containerRef = useRef<HTMLDivElement>(null);

  // Responsively size SVG viewBox
  useEffect(() => {
    function handleResize() {
      const w = window.innerWidth;
      const size = w < 640 ? 700 : w < 1024 ? 900 : 1000;
      setViewBox(`${-size / 2} ${-size / 2} ${size} ${size}`);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleElectronClick = useCallback(
    (pageId: PageId) => {
      transitionTo('page-transition', pageId);
    },
    [transitionTo],
  );

  const handleNucleusClick = useCallback(() => {
    transitionTo('zooming-into-nucleus');
  }, [transitionTo]);

  // Only show in atomic-model state
  const isVisible = state === 'atomic-model';

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          ref={containerRef}
          className="fixed inset-0 z-40 bg-black flex items-center justify-center overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Background particles */}
          <BackgroundParticles />

          {/* Radial ambient glow */}
          <div className="absolute inset-0 bg-gradient-radial from-orange-900/10 via-transparent to-transparent" />

          {/* Lab name at top */}
          <motion.div
            className="absolute top-8 left-0 right-0 text-center z-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h1 className="text-sm tracking-[0.3em] text-white/40 uppercase font-sans">
              Advanced Materials & Systems Lab
            </h1>
          </motion.div>

          {/* SVG Atomic Model */}
          <motion.svg
            viewBox={viewBox}
            className="w-full h-full max-w-[900px] max-h-[900px]"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 3, opacity: 0 }}
            transition={{ duration: 1, ease: [0.32, 0, 0.67, 0] }}
          >
            {/* Electrons with orbits */}
            {ELECTRONS.map((electron) => (
              <Electron
                key={electron.id}
                config={electron}
                onClick={() => handleElectronClick(electron.id)}
                isPaused={false}
              />
            ))}

            {/* Nucleus */}
            <Nucleus onClick={handleNucleusClick} />
          </motion.svg>

          {/* Bottom hint */}
          <motion.p
            className="absolute bottom-8 left-0 right-0 text-center text-white/30 text-xs tracking-wider font-sans"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            Click the nucleus to explore &bull; Click electrons to navigate
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
