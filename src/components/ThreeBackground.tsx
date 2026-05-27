"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeBackground() {
  const containerRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const canvas = containerRef.current;
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });

    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Particles configuration
    const particlesCount = 120;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);
    const randomSpeeds = new Float32Array(particlesCount * 3);

    // Initialize particles randomly
    for (let i = 0; i < particlesCount * 3; i += 3) {
      // X
      positions[i] = (Math.random() - 0.5) * 10;
      // Y
      positions[i + 1] = (Math.random() - 0.5) * 10;
      // Z (depth layout)
      positions[i + 2] = (Math.random() - 0.5) * 8;

      // Speeds
      randomSpeeds[i] = (Math.random() - 0.5) * 0.003;
      randomSpeeds[i + 1] = (Math.random() - 0.5) * 0.003;
      randomSpeeds[i + 2] = (Math.random() - 0.5) * 0.003;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // Custom Particle Material with soft glowing circles
    const material = new THREE.PointsMaterial({
      size: 0.045,
      color: 0x8b5cf6, // Violet accent
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    // Create secondary cyan/teal particles for visual complexity
    const particlesTealCount = 60;
    const geometryTeal = new THREE.BufferGeometry();
    const positionsTeal = new Float32Array(particlesTealCount * 3);
    const randomSpeedsTeal = new Float32Array(particlesTealCount * 3);

    for (let i = 0; i < particlesTealCount * 3; i += 3) {
      positionsTeal[i] = (Math.random() - 0.5) * 10;
      positionsTeal[i + 1] = (Math.random() - 0.5) * 10;
      positionsTeal[i + 2] = (Math.random() - 0.5) * 8;

      randomSpeedsTeal[i] = (Math.random() - 0.5) * 0.004;
      randomSpeedsTeal[i + 1] = (Math.random() - 0.5) * 0.004;
      randomSpeedsTeal[i + 2] = (Math.random() - 0.5) * 0.004;
    }

    geometryTeal.setAttribute("position", new THREE.BufferAttribute(positionsTeal, 3));

    const materialTeal = new THREE.PointsMaterial({
      size: 0.035,
      color: 0x14b8a6, // Teal accent
      transparent: true,
      opacity: 0.4,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geometry, material);
    const pointsTeal = new THREE.Points(geometryTeal, materialTeal);
    scene.add(points);
    scene.add(pointsTeal);

    // Mouse tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      targetX = (event.clientX / window.innerWidth - 0.5) * 1.5;
      targetY = (event.clientY / window.innerHeight - 0.5) * 1.5;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Resize handling
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Set initial size

    // Animation Loop
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Dampen mouse move for premium buttery lag effect
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      // Apply subtle scene rotations reflecting the cursor position
      scene.rotation.y = mouseX * 0.3;
      scene.rotation.x = -mouseY * 0.3;

      // Animate purple particles positions
      const positionsArray = geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particlesCount * 3; i += 3) {
        positionsArray[i] += randomSpeeds[i];
        positionsArray[i + 1] += randomSpeeds[i + 1];
        positionsArray[i + 2] += randomSpeeds[i + 2];

        // Boundary resetting
        if (Math.abs(positionsArray[i]) > 5) positionsArray[i] *= -0.98;
        if (Math.abs(positionsArray[i + 1]) > 5) positionsArray[i + 1] *= -0.98;
        if (Math.abs(positionsArray[i + 2]) > 4) positionsArray[i + 2] *= -0.98;
      }
      geometry.attributes.position.needsUpdate = true;

      // Animate teal particles positions
      const positionsTealArray = geometryTeal.attributes.position.array as Float32Array;
      for (let i = 0; i < particlesTealCount * 3; i += 3) {
        positionsTealArray[i] += randomSpeedsTeal[i];
        positionsTealArray[i + 1] += randomSpeedsTeal[i + 1];
        positionsTealArray[i + 2] += randomSpeedsTeal[i + 2];

        if (Math.abs(positionsTealArray[i]) > 5) positionsTealArray[i] *= -0.98;
        if (Math.abs(positionsTealArray[i + 1]) > 5) positionsTealArray[i + 1] *= -0.98;
        if (Math.abs(positionsTealArray[i + 2]) > 4) positionsTealArray[i + 2] *= -0.98;
      }
      geometryTeal.attributes.position.needsUpdate = true;

      // Slowly rotate systems independently
      points.rotation.y += 0.0006;
      pointsTeal.rotation.y -= 0.0009;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup on unmount
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      
      geometry.dispose();
      material.dispose();
      geometryTeal.dispose();
      materialTeal.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas id="three-canvas" ref={containerRef} />;
}
