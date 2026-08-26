import React, { useEffect, useRef } from 'react';
import { Activity, Radio, Cpu, Zap, Compass, Crosshair, Dumbbell, Timer, Footprints, TrendingUp } from 'lucide-react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  pulsePhase: number;
  pulseSpeed: number;
  type: 'sensor' | 'beacon' | 'tracker';
  tag?: string;
}

export const SportTechBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let particles: Particle[] = [];

    const colors = [
      'rgba(37, 99, 235, 0.45)',  // Royal Blue
      'rgba(13, 98, 210, 0.4)',   // Deep Blue
      'rgba(249, 115, 22, 0.45)', // Tangerine Orange
      'rgba(59, 130, 246, 0.35)', // Light Blue
      'rgba(243, 121, 38, 0.4)',  // Brand Orange
    ];

    const tags = ['GPS 100Hz', 'HR 164 BPM', 'V 33.2 km/h', 'AI Optical', 'IMU 9-DOF', 'Load 8.4', 'Pitch Acc 98%'];

    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      // Initialize particles based on screen width
      const count = Math.floor(Math.min(width, 1400) / 28);
      particles = [];

      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 2 + 1.5,
          color: colors[Math.floor(Math.random() * colors.length)],
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.02 + Math.random() * 0.03,
          type: i % 5 === 0 ? 'beacon' : i % 3 === 0 ? 'tracker' : 'sensor',
          tag: i % 6 === 0 ? tags[i % tags.length] : undefined
        });
      }
    };

    handleResize();
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    // Animation Loop
    let time = 0;
    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Draw faint tactical pitch field telemetry lines
      ctx.save();
      ctx.strokeStyle = 'rgba(37, 99, 235, 0.04)';
      ctx.lineWidth = 1;

      // Draw abstract motion paths (Athletic movement simulation)
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.strokeStyle = i === 0 ? 'rgba(37, 99, 235, 0.03)' : 'rgba(249, 115, 22, 0.03)';
        const offset = i * 100;
        for (let x = -50; x < width + 50; x += 20) {
          const y = (height * 0.7) + Math.sin(x * 0.003 + time * 0.5 + i) * 60 + (i * 40);
          if (x === -50) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Isometric court arcs & telemetry guide grid
      const centerX = width / 2;
      const centerY = height * 0.45;

      // Center pitch circle
      ctx.beginPath();
      ctx.arc(centerX, centerY, Math.min(width * 0.22, 180), 0, Math.PI * 2);
      ctx.stroke();

      // Outer tactical radar sweep ring
      ctx.beginPath();
      ctx.setLineDash([4, 6]);
      ctx.arc(centerX, centerY, Math.min(width * 0.38, 320), 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);

      // Subtle dynamic kinematic sine trajectory path (simulating ball / player trajectory)
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(249, 115, 22, 0.08)';
      ctx.lineWidth = 1.5;
      for (let x = 0; x < width; x += 15) {
        const y = centerY + Math.sin(x * 0.005 + time * 0.8) * 45 + Math.cos(x * 0.002 - time * 0.4) * 20;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Second telemetry wave (Cobalt blue)
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(37, 99, 235, 0.07)';
      ctx.lineWidth = 1.2;
      for (let x = 0; x < width; x += 15) {
        const y = centerY - 30 + Math.cos(x * 0.006 - time * 0.6) * 55 + Math.sin(x * 0.003 + time * 0.5) * 25;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      ctx.restore();

      // Connect nearby particles (mesh sensor network)
      const maxDistance = 110;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.14;
            ctx.beginPath();
            ctx.strokeStyle = particles[i].color.replace(/[\d\.]+\)$/, `${alpha})`);
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw & Update Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.pulsePhase += p.pulseSpeed;

        // Position update
        p.x += p.vx;
        p.y += p.vy;

        // Bounce on boundaries
        if (p.x < 0) { p.x = 0; p.vx *= -1; }
        if (p.x > width) { p.x = width; p.vx *= -1; }
        if (p.y < 0) { p.y = 0; p.vy *= -1; }
        if (p.y > height) { p.y = height; p.vy *= -1; }

        // Mouse gentle interaction
        if (mouseRef.current.active) {
          const mdx = mouseRef.current.x - p.x;
          const mdy = mouseRef.current.y - p.y;
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mDist < 140 && mDist > 0) {
            const force = (1 - mDist / 140) * 0.6;
            p.x -= (mdx / mDist) * force;
            p.y -= (mdy / mDist) * force;
          }
        }

        // Draw particle node
        const pulse = Math.sin(p.pulsePhase) * 0.5 + 0.5;
        const currentRadius = p.radius + pulse * 1.2;

        ctx.beginPath();
        ctx.arc(p.x, p.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        // If beacon/tracker, draw faint telemetry ring
        if (p.type === 'beacon') {
          ctx.beginPath();
          ctx.arc(p.x, p.y, currentRadius + 5 + pulse * 4, 0, Math.PI * 2);
          ctx.strokeStyle = p.color.replace(/[\d\.]+\)$/, `${(1 - pulse) * 0.3})`);
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Draw micro telemetry data tag
        if (p.tag && p.x > 50 && p.x < width - 100 && p.y > 40 && p.y < height - 40) {
          ctx.font = '9px monospace';
          ctx.fillStyle = 'rgba(100, 116, 139, 0.45)';
          ctx.fillText(p.tag, p.x + 8, p.y + 3);
          
          ctx.beginPath();
          ctx.strokeStyle = 'rgba(148, 163, 184, 0.25)';
          ctx.moveTo(p.x + 3, p.y);
          ctx.lineTo(p.x + 6, p.y);
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Dynamic Animated Canvas Mesh */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full"
      />

      {/* Decorative SportTech Telemetry Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.035] bg-[linear-gradient(to_right,#0d62d2_1px,transparent_1px),linear-gradient(to_bottom,#0d62d2_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" 
      />

      {/* Subtle Soft Ambient Glows (Orange + Blue) */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[320px] bg-gradient-to-tr from-blue-400/10 via-orange-300/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 left-[8%] w-72 h-72 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-10 right-[8%] w-80 h-80 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Floating SportTech HUD Badges & Micro-Telemetry Accents */}
      <div className="hidden lg:block absolute top-[20%] right-[15%] opacity-20 rotate-12">
        <Dumbbell className="w-24 h-24 text-slate-400" />
      </div>

      <div className="hidden lg:block absolute bottom-[15%] left-[10%] opacity-10 -rotate-12">
        <Timer className="w-32 h-32 text-blue-500" />
      </div>

      <div className="hidden xl:block absolute top-28 left-8 xl:left-14 animate-pulse duration-2000">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/70 backdrop-blur-xs border border-slate-200/80 shadow-2xs text-[11px] text-slate-500 font-mono">
          <Activity className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
          <span>BIOMETRIC METRICS // LIVE</span>
        </div>
      </div>

      <div className="hidden xl:block absolute top-60 left-[5%] animate-bounce duration-[4000ms]">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/70 backdrop-blur-xs border border-slate-200/80 shadow-2xs text-[11px] text-slate-500 font-mono">
          <Dumbbell className="w-3.5 h-3.5 text-blue-500" />
          <span>LOAD SENSOR OPTIMIZED</span>
        </div>
      </div>

      <div className="hidden xl:block absolute top-40 right-8 xl:right-14">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/70 backdrop-blur-xs border border-slate-200/80 shadow-2xs text-[11px] text-slate-500 font-mono">
          <Radio className="w-3.5 h-3.5 text-orange-500" />
          <span>KINEMATIC TRACKING 120 FPS</span>
        </div>
      </div>

      <div className="hidden xl:block absolute top-80 right-[3%] animate-pulse">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/70 backdrop-blur-xs border border-slate-200/80 shadow-2xs text-[11px] text-slate-500 font-mono">
          <Timer className="w-3.5 h-3.5 text-emerald-500" />
          <span>REACTION TIME: 142ms</span>
        </div>
      </div>

      <div className="hidden lg:block absolute bottom-40 left-20 opacity-40">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/40 border border-slate-200/50 text-[10px] text-slate-400 font-mono">
          <Footprints className="w-3.5 h-3.5 text-slate-400" />
          <span>STRIDE LENGTH: 1.84m</span>
        </div>
      </div>

      <div className="hidden lg:block absolute bottom-60 right-20 opacity-40">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/40 border border-slate-200/50 text-[10px] text-slate-400 font-mono">
          <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
          <span>VO2 MAX PROJECTION</span>
        </div>
      </div>

      <div className="hidden lg:block absolute bottom-24 left-12">
        <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono">
          <Crosshair className="w-3 h-3 text-blue-500/70" />
          <span>POS: 41.0082°N, 28.9784°E • IOT NODE SYNC</span>
        </div>
      </div>

      <div className="hidden lg:block absolute bottom-24 right-12">
        <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono">
          <Cpu className="w-3 h-3 text-orange-500/70" />
          <span>AI ACCELERATION ENGINE v2.4</span>
        </div>
      </div>
    </div>
  );
};
