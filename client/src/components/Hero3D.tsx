/**
 * 2911Rx 3D hero object.
 * A refined crystalline form (icosahedron) in a brushed teal/navy material,
 * slowly rotating with gentle mouse parallax and a soft orbiting accent node.
 * Three.js is dynamically imported so it ships as a separate chunk and never
 * blocks first paint. Falls back to the static SVG art on reduced-motion or
 * when WebGL is unavailable.
 */
import { useEffect, useRef, useState } from "react";
import HeroArt from "@/components/HeroArt";

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")));
  } catch {
    return false;
  }
}

export default function Hero3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !supportsWebGL()) {
      setUseFallback(true);
      return;
    }

    let cleanup = () => {};
    let cancelled = false;

    import("three")
      .then((THREE) => {
        if (cancelled || !mountRef.current) return;
        const mount = mountRef.current;
        const width = mount.clientWidth;
        const height = mount.clientHeight;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
        camera.position.set(0, 0, 7);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        mount.appendChild(renderer.domElement);

        // Group so we can parallax the whole composition
        const group = new THREE.Group();
        scene.add(group);

        // Core crystalline form
        const geo = new THREE.IcosahedronGeometry(1.85, 0);
        const mat = new THREE.MeshStandardMaterial({
          color: new THREE.Color("hsl(174, 60%, 30%)"),
          metalness: 0.55,
          roughness: 0.25,
          flatShading: true,
          emissive: new THREE.Color("hsl(172, 70%, 18%)"),
          emissiveIntensity: 0.5,
        });
        const crystal = new THREE.Mesh(geo, mat);
        group.add(crystal);

        // Wireframe overlay for a precise, engineered edge
        const wire = new THREE.LineSegments(
          new THREE.EdgesGeometry(geo),
          new THREE.LineBasicMaterial({ color: new THREE.Color("hsl(170, 65%, 60%)"), transparent: true, opacity: 0.55 }),
        );
        crystal.add(wire);

        // Orbiting accent node
        const node = new THREE.Mesh(
          new THREE.SphereGeometry(0.16, 24, 24),
          new THREE.MeshStandardMaterial({
            color: new THREE.Color("hsl(170, 70%, 65%)"),
            emissive: new THREE.Color("hsl(170, 70%, 50%)"),
            emissiveIntensity: 0.9,
            metalness: 0.3,
            roughness: 0.4,
          }),
        );
        group.add(node);

        // Faint orbit ring
        const ring = new THREE.Mesh(
          new THREE.TorusGeometry(2.9, 0.012, 12, 120),
          new THREE.MeshBasicMaterial({ color: new THREE.Color("hsl(170, 50%, 70%)"), transparent: true, opacity: 0.18 }),
        );
        ring.rotation.x = Math.PI / 2.3;
        group.add(ring);

        // Lighting
        const key = new THREE.DirectionalLight(0xffffff, 2.1);
        key.position.set(4, 5, 5);
        scene.add(key);
        const rim = new THREE.DirectionalLight(new THREE.Color("hsl(170, 70%, 55%)"), 2.4);
        rim.position.set(-5, -2, 2);
        scene.add(rim);
        scene.add(new THREE.AmbientLight(0x223344, 1.2));

        // Mouse parallax
        const target = { x: 0, y: 0 };
        const onMove = (e: MouseEvent) => {
          target.x = (e.clientX / window.innerWidth - 0.5) * 0.5;
          target.y = (e.clientY / window.innerHeight - 0.5) * 0.5;
        };
        window.addEventListener("mousemove", onMove);

        const onResize = () => {
          const w = mount.clientWidth;
          const h = mount.clientHeight;
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        };
        window.addEventListener("resize", onResize);

        let raf = 0;
        const start = performance.now();
        const animate = () => {
          raf = requestAnimationFrame(animate);
          const t = (performance.now() - start) / 1000;
          crystal.rotation.y += 0.0035;
          crystal.rotation.x = Math.sin(t * 0.3) * 0.18;
          group.position.y = Math.sin(t * 0.7) * 0.12;
          // ease group rotation toward mouse
          group.rotation.y += (target.x - group.rotation.y) * 0.04;
          group.rotation.x += (-target.y - group.rotation.x) * 0.04;
          // orbiting node
          node.position.set(Math.cos(t * 0.9) * 2.9, Math.sin(t * 0.9) * 1.2, Math.sin(t * 0.9) * 2.9);
          ring.rotation.z += 0.001;
          renderer.render(scene, camera);
        };
        animate();

        cleanup = () => {
          cancelAnimationFrame(raf);
          window.removeEventListener("mousemove", onMove);
          window.removeEventListener("resize", onResize);
          renderer.dispose();
          geo.dispose();
          mat.dispose();
          if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
        };
      })
      .catch(() => setUseFallback(true));

    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  if (useFallback) return <HeroArt />;

  return (
    <div className="relative mx-auto w-full max-w-[34rem]" aria-hidden="true">
      {/* ambient glow behind the canvas */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 blur-3xl"
        style={{ background: "radial-gradient(40% 40% at 55% 45%, hsl(172 60% 35% / 0.5), transparent 70%)" }}
      />
      <div ref={mountRef} className="aspect-square w-full" />
    </div>
  );
}
