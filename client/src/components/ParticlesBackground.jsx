import React from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const ParticlesBackground = () => {
    const particlesInit = async (main) => {
        await loadFull(main); // load all tsparticles features
    };

    return (
        <Particles
            id="tsparticles"
            init={particlesInit}
            options={{
                background: {
                    color: "#0d47a1" // base gradient background can be transparent
                },
                fpsLimit: 60,
                interactivity: {
                    events: {
                        onHover: { enable: true, mode: "repulse" },
                        onClick: { enable: true, mode: "push" },
                    },
                    modes: {
                        repulse: { distance: 100 },
                        push: { quantity: 4 },
                    },
                },
                particles: {
                    color: { value: ["#ff9a9e", "#fad0c4", "#a1c4fd", "#c2e9fb"] },
                    links: { enable: true, color: "#ffffff", distance: 150, opacity: 0.2 },
                    collisions: { enable: true },
                    move: { direction: "none", enable: true, outModes: { default: "bounce" }, speed: 1 },
                    number: { value: 50 },
                    opacity: { value: 0.7 },
                    shape: { type: "circle" },
                    size: { value: { min: 1, max: 5 } },
                },
                detectRetina: true,
            }}
            style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                zIndex: 0,
            }}
        />
    );
};

export default ParticlesBackground;
