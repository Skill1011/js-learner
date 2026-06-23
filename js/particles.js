/* ==========================================================================
   particles.js — Vanilla-JS-Nachbau der ReactBits "Particles"-Komponente

   Canvas-basiertes, maus-interaktives Partikelfeld ohne Framework/Build-Schritt.
   API bewusst an die ReactBits-Props angelehnt, damit das Verhalten vertraut
   bleibt:
     new Particles(container, {
       particleColors, particleCount, particleSpread, speed,
       particleBaseSize, moveParticlesOnHover, alphaParticles,
       disableRotation, pixelRatio,
     });

   Respektiert prefers-reduced-motion: zeichnet dann ein statisches Bild
   statt einer Dauerschleife.
   ========================================================================== */

class Particles {
  constructor(container, options = {}) {
    this.container = container;
    this.options = Object.assign(
      {
        particleColors: ["#f7df1e"],
        particleCount: 120,
        particleSpread: 10,
        speed: 0.1,
        particleBaseSize: 80,
        moveParticlesOnHover: true,
        alphaParticles: true,
        disableRotation: false,
        pixelRatio: Math.min(window.devicePixelRatio || 1, 2),
      },
      options
    );

    this.canvas = document.createElement("canvas");
    this.canvas.style.position = "absolute";
    this.canvas.style.inset = "0";
    this.canvas.style.width = "100%";
    this.canvas.style.height = "100%";
    this.canvas.style.pointerEvents = "none";
    this.container.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");

    this.mouse = { x: 0, y: 0, active: false };
    this.particles = [];
    this.rafId = null;
    this.prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    this._onResize = this.resize.bind(this);
    this._onPointerMove = this.handlePointerMove.bind(this);
    this._onPointerLeave = () => (this.mouse.active = false);

    this.resize();
    this.createParticles();

    window.addEventListener("resize", this._onResize);
    if (this.options.moveParticlesOnHover) {
      this.container.addEventListener("pointermove", this._onPointerMove);
      this.container.addEventListener("pointerleave", this._onPointerLeave);
    }

    if (this.prefersReducedMotion) {
      this.draw();
    } else {
      this.loop();
    }
  }

  resize() {
    const rect = this.container.getBoundingClientRect();
    const ratio = this.options.pixelRatio;
    this.width = rect.width;
    this.height = rect.height;
    this.canvas.width = Math.max(1, rect.width * ratio);
    this.canvas.height = Math.max(1, rect.height * ratio);
    this.ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  handlePointerMove(e) {
    const rect = this.container.getBoundingClientRect();
    this.mouse.x = e.clientX - rect.left;
    this.mouse.y = e.clientY - rect.top;
    this.mouse.active = true;
  }

  createParticles() {
    const { particleCount, particleColors, particleBaseSize, particleSpread, alphaParticles, disableRotation } = this.options;
    this.particles = Array.from({ length: particleCount }, () => {
      const angle = Math.random() * Math.PI * 2;
      const drift = (Math.random() * particleSpread) / 10;
      return {
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: Math.cos(angle) * drift,
        vy: Math.sin(angle) * drift,
        size: (particleBaseSize / 100) * (4 + Math.random() * 6),
        color: particleColors[Math.floor(Math.random() * particleColors.length)],
        alpha: alphaParticles ? 0.25 + Math.random() * 0.55 : 0.85,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: disableRotation ? 0 : (Math.random() - 0.5) * 0.01,
      };
    });
  }

  step() {
    const { speed, moveParticlesOnHover } = this.options;
    this.particles.forEach((p) => {
      p.x += p.vx * speed * 6;
      p.y += p.vy * speed * 6;
      p.rotation += p.rotationSpeed;

      if (p.x < -10) p.x = this.width + 10;
      if (p.x > this.width + 10) p.x = -10;
      if (p.y < -10) p.y = this.height + 10;
      if (p.y > this.height + 10) p.y = -10;

      if (moveParticlesOnHover && this.mouse.active) {
        const dx = p.x - this.mouse.x;
        const dy = p.y - this.mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const radius = 90;
        if (dist < radius && dist > 0.01) {
          const force = (1 - dist / radius) * 1.6;
          p.x += (dx / dist) * force;
          p.y += (dy / dist) * force;
        }
      }
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.particles.forEach((p) => {
      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate(p.rotation);
      this.ctx.globalAlpha = p.alpha;
      this.ctx.fillStyle = p.color;
      this.ctx.beginPath();
      this.ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    });
  }

  loop() {
    this.step();
    this.draw();
    this.rafId = requestAnimationFrame(() => this.loop());
  }

  destroy() {
    if (this.rafId) cancelAnimationFrame(this.rafId);
    window.removeEventListener("resize", this._onResize);
    this.container.removeEventListener("pointermove", this._onPointerMove);
    this.container.removeEventListener("pointerleave", this._onPointerLeave);
    this.canvas.remove();
  }
}
