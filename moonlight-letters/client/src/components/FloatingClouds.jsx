import { useEffect, useRef } from 'react';

export default function FloatingClouds() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const clouds = Array.from({ length: 6 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height * 0.6,
      radius: 80 + Math.random() * 120,
      speed: 0.15 + Math.random() * 0.25,
      opacity: 0.03 + Math.random() * 0.04,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      clouds.forEach((cloud) => {
        const gradient = ctx.createRadialGradient(
          cloud.x, cloud.y, 0,
          cloud.x, cloud.y, cloud.radius
        );
        gradient.addColorStop(0, `rgba(244, 166, 181, ${cloud.opacity})`);
        gradient.addColorStop(0.5, `rgba(232, 230, 255, ${cloud.opacity * 0.6})`);
        gradient.addColorStop(1, `rgba(255, 248, 242, 0)`);

        ctx.beginPath();
        ctx.arc(cloud.x, cloud.y, cloud.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        cloud.x += cloud.speed;
        if (cloud.x > canvas.width + cloud.radius) {
          cloud.x = -cloud.radius;
          cloud.y = Math.random() * canvas.height * 0.6;
        }
      });
      animationId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.8 }}
    />
  );
}
