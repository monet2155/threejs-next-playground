"use client";
import React from "react";
import * as THREE from "three";

const Donut = () => {
  const parameters = {
    wireframe: true,
    color: 0x008080,
    radius: 10,
    tube: 3,
    radialSegments: 20,
    tubularSegments: 20,
    arc: Math.PI * 2,
  };

  const canvasRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const currentCanvasRef = canvasRef.current;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    currentCanvasRef?.appendChild(renderer.domElement);

    const geometry = new THREE.TorusGeometry(
      parameters.radius,
      parameters.tube,
      parameters.radialSegments,
      parameters.tubularSegments,
      parameters.arc
    );

    const material = new THREE.MeshBasicMaterial({
      color: parameters.color,
      wireframe: parameters.wireframe,
    });

    const mesh = new THREE.Mesh(geometry, material);

    scene.add(mesh);

    camera.position.z = 30;

    const animate = () => {
      requestAnimationFrame(animate);
      mesh.rotation.x += 0.01;
      mesh.rotation.y += 0.01;
      mesh.rotation.z += 0.005;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      currentCanvasRef?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={canvasRef} />;
};
export default Donut;
