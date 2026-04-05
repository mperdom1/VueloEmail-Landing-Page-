import React, { useEffect, useRef } from 'react';

export const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const particleCount = 400;
    const colors = ['#4285F4', '#EA4335', '#FBBC05', '#34A853', '#9333EA', '#2563EB'];
    const sphereRadius = Math.min(window.innerWidth, window.innerHeight) * 0.4;

    class Particle {
      x: number = 0;
      y: number = 0;
      z: number = 0;
      x2d: number = 0;
      y2d: number = 0;
      width: number;
      height: number;
      color: string;
      rotation: number;
      
      // 3D coordinates
      origX: number;
      origY: number;
      origZ: number;

      constructor() {
        // Distribute particles in a sphere-like volume
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos((Math.random() * 2) - 1);
        const r = sphereRadius * (0.5 + Math.random() * 0.5);

        this.origX = r * Math.sin(phi) * Math.cos(theta);
        this.origY = r * Math.sin(phi) * Math.sin(theta);
        this.origZ = r * Math.cos(phi);

        this.width = Math.random() * 4 + 2;
        this.height = Math.random() * 2 + 1;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.rotation = Math.random() * Math.PI * 2;
      }

      draw() {
        if (!ctx) return;
        
        // Scale based on Z for depth effect
        const scale = 600 / (600 + this.z);
        const alpha = Math.max(0.1, Math.min(0.8, (this.z + sphereRadius) / (2 * sphereRadius)));
        
        ctx.save();
        ctx.translate(this.x2d, this.y2d);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.roundRect(-this.width * scale / 2, -this.height * scale / 2, this.width * scale, this.height * scale, 2);
        ctx.fill();
        ctx.restore();
      }

      update(canvasWidth: number, canvasHeight: number, mouseX: number, mouseY: number, time: number) {
        // 3D Rotation
        const angleX = time * 0.0002;
        const angleY = time * 0.0003;

        // Rotate around Y
        let x = this.origX * Math.cos(angleY) - this.origZ * Math.sin(angleY);
        let z = this.origX * Math.sin(angleY) + this.origZ * Math.cos(angleY);
        
        // Rotate around X
        let y = this.origY * Math.cos(angleX) - z * Math.sin(angleX);
        z = this.origY * Math.sin(angleX) + z * Math.cos(angleX);

        this.x = x;
        this.y = y;
        this.z = z;

        // Mouse influence (subtle shift)
        const dx = mouseX - canvasWidth / 2;
        const dy = mouseY - canvasHeight / 2;
        this.x += dx * 0.1;
        this.y += dy * 0.1;

        // Project to 2D
        const scale = 600 / (600 + this.z);
        this.x2d = (this.x * scale) + canvasWidth / 2;
        this.y2d = (this.y * scale) + canvasHeight / 2;
        
        this.rotation += 0.01;
      }
    }

    const init = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    handleResize();

    const animate = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update(canvas.width, canvas.height, mouseX, mouseY, time);
        particles[i].draw();
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none opacity-40"
      id="particle-canvas"
    />
  );
};
