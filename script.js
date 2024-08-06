function locomotiveAnimation() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });
    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

}
function cursonanimation() {
    document.addEventListener("mousemove", function (dets) {
        gsap.to("#crsr", {
            left: dets.x,
            top: dets.y
        })
    })
    Shery.makeMagnet("#nav-2 h6", {
        ease: "cubic-bezier(0.23, 1, 0.320, 1)",
        duration: 0.5,
        skew: true,
    });
    const navElement = document.querySelector("#nav-2");
    const cursorElement = document.querySelector("#crsr");

    navElement.addEventListener("mouseenter", () => {
        const navBounds = navElement.getBoundingClientRect();
        const scaleX = navBounds.width / cursorElement.offsetWidth;
        const scaleY = navBounds.height / cursorElement.offsetHeight;

        gsap.to("#crsr", {
            scaleX: 5,
            scaleY: 5,
            duration: 0.5,
            ease: "cubic-bezier(0.23, 1, 0.32, 1)"
        });
    });

    navElement.addEventListener("mouseleave", () => {
        gsap.to("#crsr", {
            scaleX: 1,
            scaleY: 1,
            duration: 0.5,
            ease: "cubic-bezier(0.23, 1, 0.32, 1)"
        });
    });
}
function SheryAnimation() {
    Shery.imageEffect("#vid", {
        style: 6,
        // debug: true,
        config: { "noiseDetail": { "value": 7.44, "range": [0, 100] }, "distortionAmount": { "value": 0, "range": [0, 10] }, "scale": { "value": 54.96, "range": [0, 100] }, "speed": { "value": 0.5, "range": [0, 1] }, "zindex": { "value": -9996999, "range": [-9999999, 9999999] }, "aspect": { "value": 1.7735927313377275 }, "ignoreShapeAspect": { "value": true }, "shapePosition": { "value": { "x": 0, "y": 0 } }, "shapeScale": { "value": { "x": 0.5, "y": 0.5 } }, "shapeEdgeSoftness": { "value": 0, "range": [0, 0.5] }, "shapeRadius": { "value": 0, "range": [0, 2] }, "currentScroll": { "value": 0 }, "scrollLerp": { "value": 0.07 }, "gooey": { "value": true }, "infiniteGooey": { "value": true }, "growSize": { "value": 11.58, "range": [1, 15] }, "durationOut": { "value": 1.82, "range": [0.1, 5] }, "durationIn": { "value": 1.9, "range": [0.1, 5] }, "displaceAmount": { "value": 0.5 }, "masker": { "value": false }, "maskVal": { "value": 1, "range": [1, 5] }, "scrollType": { "value": 0 }, "geoVertex": { "range": [1, 64], "value": 1 }, "noEffectGooey": { "value": true }, "onMouse": { "value": 0 }, "noise_speed": { "value": 1.37, "range": [0, 10] }, "metaball": { "value": 0.2, "range": [0, 2] }, "discard_threshold": { "value": 0.59, "range": [0, 1] }, "antialias_threshold": { "value": 0, "range": [0, 0.1] }, "noise_height": { "value": 0, "range": [0, 2] }, "noise_scale": { "value": 10, "range": [0, 100] } },
        gooey: true,
    });
}
function allanimation() {
    gsap.from("#heading h1", {
        duration: 3,
        delay: 0.7,
        opacity: 0,
        x: -50,
        ease: "elastic.out(1, 0.3)",
        stagger: 0.05,
    });
    Shery.hoverWithMediaCircle(".img-div", {
        images: ["img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg", "img5.jpg", "img6.jpg", "img7.jpg", "img8.jpg",],
        borderRadius: '16px',
        boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
        imageOpacity: '0.5',
        imageScale: '1.1',
        imageFilter: 'blur(2px)',
        overlayOpacity: '0.4',
        overlayHoverOpacity: '0.7'
    });
    const button = document.getElementById('button');
    const svg = button.querySelector('svg');

    button.addEventListener('mouseenter', () => {
        gsap.to(svg, {
            scale: 1.2, // Scale the SVG to 120% of its size
            rotation: 500, // Rotate the SVG by 20 degrees
            duration: 0.3, // Duration of the animation
            ease: 'power2.out' // Easing function for smooth animation
        });
    });

    button.addEventListener('mouseleave', () => {
        gsap.to(svg, {
            scale: 1, // Return to original size
            rotation: 230, // Return to original rotation
            duration: 0.3, // Duration of the animation
            ease: 'power2.out' // Easing function for smooth animation
        });
    });
    gsap.registerPlugin(ScrollTrigger);

    const buttons = document.querySelector("#button");

    // Create a timeline for hover animation
    const hoverTimeline = gsap.timeline({ paused: true });

    hoverTimeline.to("#button", {
        duration: 0.3,
        scale: 0.9,
        ease: "power1.out",
    });
    // Add hover event listeners
    buttons.addEventListener("mouseenter", () => hoverTimeline.play());
    buttons.addEventListener("mouseleave", () => hoverTimeline.reverse());

}

cursonanimation();
SheryAnimation();
allanimation();
locomotiveAnimation();
