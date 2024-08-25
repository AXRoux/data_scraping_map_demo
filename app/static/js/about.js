document.addEventListener('DOMContentLoaded', function() {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // Animate sections on scroll
        gsap.utils.toArray('section').forEach(section => {
            gsap.fromTo(section, 
                { opacity: 0, y: 20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 80%',
                        end: 'top 20%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });

        // Typing effect for code demos
        const codeDemos = document.querySelectorAll('.code-demo code, .ai-demo code');
        codeDemos.forEach(demo => {
            const text = demo.textContent;
            demo.textContent = '';
            let i = 0;
            const typeWriter = () => {
                if (i < text.length) {
                    demo.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 20);
                }
            };
            ScrollTrigger.create({
                trigger: demo,
                start: 'top 80%',
                onEnter: typeWriter
            });
        });
    } else {
        console.warn('GSAP or ScrollTrigger not loaded. Animations disabled.');
    }

    // Highlight syntax
    if (typeof hljs !== 'undefined') {
        hljs.highlightAll();
    } else {
        console.warn('highlight.js not loaded. Syntax highlighting disabled.');
    }
});