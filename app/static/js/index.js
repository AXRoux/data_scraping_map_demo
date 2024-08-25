document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('dataVisualization');
    const ctx = canvas.getContext('2d');

    // Set canvas size
    function resizeCanvas() {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle system
    const particles = [];
    const particleCount = 100;
    const connectionDistance = 100;

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2 + 1,
            color: `rgba(0, 102, 204, ${Math.random() * 0.5 + 0.5})`,
            velocity: {
                x: (Math.random() - 0.5) * 2,
                y: (Math.random() - 0.5) * 2
            }
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();

            // Update position
            particle.x += particle.velocity.x;
            particle.y += particle.velocity.y;

            // Bounce off edges
            if (particle.x < 0 || particle.x > canvas.width) particle.velocity.x *= -1;
            if (particle.y < 0 || particle.y > canvas.height) particle.velocity.y *= -1;
        });

        // Draw connections
        ctx.strokeStyle = 'rgba(0, 102, 204, 0.1)';
        ctx.lineWidth = 0.5;
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < connectionDistance) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animate);
    }

    animate();

    // GSAP Animations
    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.hero-content', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power3.out'
    });

    gsap.from('.hero-visual', {
        duration: 1,
        x: 50,
        opacity: 0,
        ease: 'power3.out',
        delay: 0.3
    });

    gsap.from('.feature-card', {
        scrollTrigger: {
            trigger: '#features',
            start: 'top 80%'
        },
        duration: 0.8,
        y: 50,
        opacity: 0,
        stagger: 0.2,
        ease: 'power3.out'
    });
});