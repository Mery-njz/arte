
    const canvas = document.getElementById('heartCanvas');
    const ctx = canvas.getContext('2d');

    const phrase = "i love you ";
    const particles = [];
    const count = 170;

    let time = 0;

    function resizeCanvas() {
      const size = Math.min(window.innerWidth * 0.9, 560);
      canvas.style.width = size + 'px';
      canvas.style.height = size + 'px';
    }

    function heartPoint(t, scale = 14) {
      const x = 16 * Math.pow(Math.sin(t), 3);
      const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
      return {
        x: x * scale,
        y: y * scale
      };
    }

    function createParticles() {
      particles.length = 0;

      for (let i = 0; i < count; i++) {
        const t = (Math.PI * 2 * i) / count;
        particles.push({
          t,
          offset: Math.random() * Math.PI * 2,
          size: 12 + Math.random() * 8,
          speed: 0.008 + Math.random() * 0.012
        });
      }
    }

    function drawBackgroundGlow(cx, cy, pulse) {
      const grad = ctx.createRadialGradient(cx, cy, 20, cx, cy, 180 + pulse * 20);
      grad.addColorStop(0, 'rgba(255, 120, 170, 0.22)');
      grad.addColorStop(0.45, 'rgba(255, 120, 170, 0.10)');
      grad.addColorStop(1, 'rgba(255, 120, 170, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, 200 + pulse * 20, 0, Math.PI * 2);
      ctx.fill();
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2 + 10;
      const pulse = Math.sin(time * 2) * 0.08 + 1;

      drawBackgroundGlow(cx, cy, pulse);

      particles.forEach((p, index) => {
        const currentT = p.t + time * (0.35 + p.speed);
        const point = heartPoint(currentT, 11.5 * pulse);

        const x = cx + point.x;
        const y = cy + point.y;

        const hueShift = 330 + Math.sin(time + index * 0.08) * 12;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(Math.sin(time + p.offset) * 0.18);

        ctx.font = `${p.size}px "Quicksand", sans-serif`;
        ctx.font = `600 ${p.size}px "Quicksand", sans-serif`;
        ctx.fillStyle = `hsl(${hueShift} 95% 62%)`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.globalAlpha = 0.82 + Math.sin(time * 2 + index * 0.2) * 0.18;
        ctx.fillText(phrase, 0, 0);

        ctx.restore();
      });

      time += 0.02;
      requestAnimationFrame(animate);
    }

    resizeCanvas();
    createParticles();
    animate();

    window.addEventListener('resize', resizeCanvas);

