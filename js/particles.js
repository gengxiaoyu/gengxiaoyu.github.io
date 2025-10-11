// 粒子系统配置和初始化
class ParticleSystem {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.init();
    }

    init() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.zIndex = '-1';
        document.getElementById('particles-js').appendChild(this.canvas);

        this.createParticles();
        this.animate();
        this.addEventListeners();
    }

    createParticles() {
        const particleCount = Math.min(100, Math.floor(window.innerWidth * window.innerHeight / 10000));
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 2 + 0.5,
                speedX: Math.random() * 1 - 0.5,
                speedY: Math.random() * 1 - 0.5,
                color: this.getRandomColor(),
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }

    getRandomColor() {
        const colors = [
            'rgba(255, 107, 107, OPACITY)', // 红色
            'rgba(78, 205, 196, OPACITY)',   // 青色
            'rgba(69, 183, 209, OPACITY)',   // 蓝色
            'rgba(150, 206, 180, OPACITY)'   // 绿色
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];
        return color.replace('OPACITY', Math.random() * 0.5 + 0.2);
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 更新和绘制粒子
        this.particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // 边界检查
            if (particle.x < 0 || particle.x > this.canvas.width) particle.speedX *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.speedY *= -1;
            
            // 鼠标引力
            const dx = particle.x - this.mouse.x;
            const dy = particle.y - this.mouse.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                particle.speedX -= dx * 0.001;
                particle.speedY -= dy * 0.001;
            }
            
            // 绘制粒子
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color.replace('OPACITY', particle.opacity);
            this.ctx.fill();
        });
        
        // 绘制连接线
        this.drawConnections();
        
        requestAnimationFrame(() => this.animate());
    }

    drawConnections() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    const opacity = 1 - distance / 150;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.2})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.stroke();
                }
            }
        }
    }

    addEventListeners() {
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });

        window.addEventListener('resize', () => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        });
    }
}

// 初始化粒子系统
document.addEventListener('DOMContentLoaded', () => {
    new ParticleSystem();
});