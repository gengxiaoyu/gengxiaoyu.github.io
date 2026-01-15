/*
 * @Description  : 烟花特效脚本
 * @Version      : V1.0.0
 * @Date         : 2026-01-15
 * @FilePath     : fireworks.js
 */

// 等待 DOM 加载完成
document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('canvas');
  if (!canvas) {
    console.error('Canvas element not found');
    return;
  }

  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = [];
  let rockets = [];
  let currentColor = '#FF5A6E';
  let currentType = 'burst';
  let autoShowInterval = null;

  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  // 颜色选择
  document.querySelectorAll('.color-option').forEach(option => {
    option.addEventListener('click', () => {
      document.querySelectorAll('.color-option').forEach(o => o.classList.remove('active'));
      option.classList.add('active');
      currentColor = option.dataset.color;
    });
  });

  // 样式选择
  document.querySelectorAll('.type-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.type-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentType = btn.dataset.type;
    });
  });

  // 粒子类
  class Particle {
    constructor(x, y, color, type) {
      this.x = x;
      this.y = y;
      this.color = color;
      this.type = type;
      this.life = 1;
      this.decay = Math.random() * 0.011 + 0.0037;

      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4 + 2;

      switch (type) {
        case 'burst':
          this.vx = Math.cos(angle) * speed;
          this.vy = Math.sin(angle) * speed;
          break;
        case 'ring':
          const ringSpeed = 3;
          this.vx = Math.cos(angle) * ringSpeed;
          this.vy = Math.sin(angle) * ringSpeed;
          this.decay = 0.005;
          break;
        case 'willow':
          this.vx = Math.cos(angle) * speed * 0.5;
          this.vy = Math.sin(angle) * speed * 0.3;
          this.gravity = 0.15;
          break;
        case 'spiral':
          this.angle = angle;
          this.radius = 0;
          this.radiusSpeed = 3;
          this.angleSpeed = 0.1;
          break;
      }

      this.size = Math.random() * 1.5 + 1;
      this.sparkle = Math.random() * Math.PI * 2;
      this.sparkleSpeed = Math.random() * 0.1 + 0.05;
      this.rotation = Math.random() * Math.PI * 2;
      this.rotationSpeed = (Math.random() - 0.5) * 0.2;
      this.brightness = Math.random() * 0.3 + 0.7;
      this.lastX = x;
      this.lastY = y;
    }

    update() {
      this.lastX = this.x;
      this.lastY = this.y;

      if (this.type === 'spiral') {
        this.angle += this.angleSpeed;
        this.radius += this.radiusSpeed;
        this.x += Math.cos(this.angle) * this.radiusSpeed;
        this.y += Math.sin(this.angle) * this.radiusSpeed;
      } else {
        this.x += this.vx;
        this.y += this.vy;

        if (this.type === 'willow') {
          this.vy += this.gravity;
        } else {
          this.vy += 0.05;
        }
      }

      this.life -= this.decay;
      this.size *= 0.985;
      this.sparkle += this.sparkleSpeed;
      this.rotation += this.rotationSpeed;
    }

    draw() {
      const twinkle = Math.sin(this.sparkle) * 0.5 + 0.5;
      const currentSize = this.size * (0.8 + twinkle * 0.4);

      let alpha;
      if (this.life > 0.25) {
        alpha = Math.min(1, (1 - this.life) / 0.25 + 0.3) * this.brightness;
      } else {
        alpha = (this.life / 0.25) * this.brightness;
      }

      ctx.globalAlpha = alpha * 0.3;
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 12;
      ctx.shadowColor = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, currentSize * 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.globalAlpha = alpha;

      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(0, 0, currentSize * 0.3, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = this.color;
      ctx.fillRect(-currentSize, -currentSize * 0.2, currentSize * 2, currentSize * 0.4);
      ctx.fillRect(-currentSize * 0.2, -currentSize, currentSize * 0.4, currentSize * 2);

      if (twinkle > 0.7) {
        ctx.globalAlpha = alpha * (twinkle - 0.7) * 1.5;
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(-currentSize * 1.5, -currentSize * 0.1, currentSize * 3, currentSize * 0.2);
        ctx.fillRect(-currentSize * 0.1, -currentSize * 1.5, currentSize * 0.2, currentSize * 3);
      }

      ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
  }

  // 火箭类
  class Rocket {
    constructor(targetX, targetY, color, type) {
      this.x = targetX;
      this.y = canvas.height;
      this.targetX = targetX;
      this.targetY = targetY;
      this.color = color;
      this.type = type;

      const distance = Math.sqrt(Math.pow(targetX - this.x, 2) + Math.pow(targetY - this.y, 2));
      const duration = 40;
      this.vx = (targetX - this.x) / duration;
      this.vy = (targetY - this.y) / duration;

      this.life = 1;
      this.trail = [];
    }

    update() {
      this.trail.push({
        x: this.x,
        y: this.y
      });
      if (this.trail.length > 25) {
        this.trail.shift();
      }

      this.x += this.vx;
      this.y += this.vy;

      const distanceToTarget = Math.sqrt(Math.pow(this.targetX - this.x, 2) + Math.pow(this.targetY - this.y, 2));
      if (distanceToTarget < 5) {
        this.life = 0;
        createFireworkExplosion(this.x, this.y, this.type);
      }
    }

    draw() {
      if (this.trail.length > 1) {
        for (let i = 0; i < this.trail.length - 1; i++) {
          const fadeAlpha = (i / this.trail.length) * 0.22;
          ctx.globalAlpha = fadeAlpha;
          ctx.strokeStyle = currentColor;
          ctx.lineWidth = 1;
          ctx.shadowBlur = 3;
          ctx.shadowColor = currentColor;
          ctx.beginPath();
          ctx.moveTo(this.trail[i].x, this.trail[i].y);
          ctx.lineTo(this.trail[i + 1].x, this.trail[i + 1].y);
          ctx.stroke();
        }
        ctx.shadowBlur = 0;
      }

      ctx.globalAlpha = 1;
      ctx.fillStyle = '#FFFFFF';
      ctx.shadowBlur = 10;
      ctx.shadowColor = currentColor;
      ctx.beginPath();
      ctx.arc(this.x, this.y, 1.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  // 火花类
  class Spark {
    constructor(x, y, color) {
      this.x = x;
      this.y = y;
      this.color = color;
      this.life = 1;
      this.decay = Math.random() * 0.014 + 0.007;

      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 2 + 0.5;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.size = Math.random() * 0.7 + 0.3;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vy += 0.08;
      this.life -= this.decay;
    }

    draw() {
      ctx.globalAlpha = this.life;
      ctx.fillStyle = '#FFFFFF';
      ctx.shadowBlur = 6;
      ctx.shadowColor = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  // 创建烟花爆炸效果
  function createFireworkExplosion(x, y, type) {
    const particleCount = type === 'ring' ? 16 : type === 'spiral' ? 12 : 32;
    const colors = ['#FF5A6E', '#FFD700', '#3FE0A0', '#B377FF', '#FFFEF7'];

    for (let i = 0; i < particleCount; i++) {
      const useSelectedColor = Math.random() < 0.5;
      const particleColor = useSelectedColor ? currentColor : colors[Math.floor(Math.random() * colors.length)];
      particles.push(new Particle(x, y, particleColor, type));
    }

    const sparkCount = Math.floor(Math.random() * 4) + 2;
    for (let i = 0; i < sparkCount; i++) {
      const useSelectedColor = Math.random() < 0.5;
      const sparkColor = useSelectedColor ? currentColor : colors[Math.floor(Math.random() * colors.length)];
      particles.push(new Spark(x, y, sparkColor));
    }
  }

  // 创建烟花
  function createFirework(x, y) {
    rockets.push(new Rocket(x, y, currentColor, currentType));
  }

  canvas.addEventListener('click', (e) => {
    createFirework(e.clientX, e.clientY);
  });

  canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    createFirework(touch.clientX, touch.clientY);
  });

  // 自动播放
  let fireworkCount = 0;

  const launchFirework = () => {
    fireworkCount++;

    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height * 0.6 + 50;
    const colors = ['#FF5A6E', '#FFD700', '#3FE0A0', '#B377FF', '#FFFEF7'];
    const types = ['burst', 'ring', 'willow', 'spiral'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomType = types[Math.floor(Math.random() * types.length)];

    const prevColor = currentColor;
    const prevType = currentType;

    currentColor = randomColor;
    currentType = randomType;

    rockets.push(new Rocket(x, y, currentColor, currentType));

    currentColor = prevColor;
    currentType = prevType;

    if (fireworkCount % 15 === 0) {
      clearInterval(autoShowInterval);
      setTimeout(() => {
        const autoShowBtn = document.getElementById('autoShow');
        if (autoShowBtn && autoShowBtn.classList.contains('playing')) {
          autoShowInterval = setInterval(launchFirework, 600);
        }
      }, 2000);
    }
  };

  document.getElementById('autoShow').addEventListener('click', function () {
    if (autoShowInterval) {
      clearInterval(autoShowInterval);
      autoShowInterval = null;
      fireworkCount = 0;
      this.classList.remove('playing');
      this.querySelector('.button-text').textContent = '自动播放';
    } else {
      this.classList.add('playing');
      this.querySelector('.button-text').textContent = '停止播放';
      autoShowInterval = setInterval(launchFirework, 600);
    }
  });

  // 切换UI可见性
  document.getElementById('toggleUI').addEventListener('click', () => {
    document.body.classList.toggle('hide-ui');
  });

  // 全屏切换
  document.getElementById('fullscreenBtn').addEventListener('click', () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  });

  // 动画循环
  function animate() {
    ctx.fillStyle = 'rgba(10, 10, 15, 0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.globalAlpha = 1;

    for (let i = rockets.length - 1; i >= 0; i--) {
      rockets[i].update();
      if (rockets[i].life <= 0) {
        rockets.splice(i, 1);
      } else {
        rockets[i].draw();
      }
    }

    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update();
      if (particles[i].life <= 0) {
        particles.splice(i, 1);
      }
    }

    for (let i = 0; i < particles.length; i++) {
      particles[i].draw();
    }

    if (particles.length > 3000) {
      particles = particles.slice(-2000);
    }

    requestAnimationFrame(animate);
  }

  animate();

  // 防止标签页隐藏时自动播放队列堆积
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (autoShowInterval) {
        clearInterval(autoShowInterval);
      }
    } else {
      const autoShowBtn = document.getElementById('autoShow');
      if (autoShowBtn && autoShowBtn.classList.contains('playing')) {
        fireworkCount = 0;
        autoShowInterval = setInterval(launchFirework, 600);
      }
    }
  });
});