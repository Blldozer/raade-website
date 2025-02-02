// src/scenes/webgl.ts
import * as THREE from 'three';
import { gsap } from 'gsap';

class WebGLScene {
    private scene: THREE.Scene;
    private camera: THREE.PerspectiveCamera;
    private renderer: THREE.WebGLRenderer;
    private shapes: THREE.Mesh[] = [];
    private clock: THREE.Clock;
    private initialized: boolean = false;

    constructor(container: HTMLDivElement) {
        this.clock = new THREE.Clock();
        this.scene = new THREE.Scene();
        
        this.camera = new THREE.PerspectiveCamera(
            60,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });
        
        this.renderer.setSize(container.clientWidth, container.clientHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(this.renderer.domElement);
        
        this.camera.position.z = 15;

        // Lighting setup
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 5, 5);
        
        this.scene.add(ambientLight);
        this.scene.add(directionalLight);

        this.createShapes();
        this.animate();
    }

    private createShapes(): void {
        // Define more architectural shapes
        const shapeConfigs = [
            {
                geometry: new THREE.BoxGeometry(3, 1.5, 1.5),
                material: new THREE.MeshPhongMaterial({
                    color: 0x1A365D,
                    flatShading: true
                }),
                startPosition: { x: -10, y: 2, z: 0 },
                endPosition: { x: -3, y: 2, z: 0 }
            },
            {
                geometry: new THREE.BoxGeometry(2, 2, 2),
                material: new THREE.MeshPhongMaterial({
                    color: 0xFBB03B,
                    flatShading: true
                }),
                startPosition: { x: 10, y: -2, z: 0 },
                endPosition: { x: 3, y: -2, z: 0 }
            },
            {
                geometry: new THREE.BoxGeometry(1.5, 3, 1.5),
                material: new THREE.MeshPhongMaterial({
                    color: 0x1A365D,
                    flatShading: true
                }),
                startPosition: { x: -10, y: -3, z: 0 },
                endPosition: { x: 0, y: -3, z: 0 }
            }
        ];

        shapeConfigs.forEach(config => {
            const mesh = new THREE.Mesh(config.geometry, config.material);
            mesh.position.set(
                config.startPosition.x, 
                config.startPosition.y, 
                config.startPosition.z
            );
            mesh.userData = {
                endPosition: config.endPosition
            };
            this.scene.add(mesh);
            this.shapes.push(mesh);
        });
    }

    public initializeAnimations(): void {
        if (this.initialized) return;
        
        this.shapes.forEach((mesh, index) => {
            const endPosition = mesh.userData.endPosition;
            
            gsap.to(mesh.position, {
                x: endPosition.x,
                duration: 1.5,
                ease: "power2.out",
                delay: index * 0.2
            });

            gsap.to(mesh.rotation, {
                y: Math.PI * 2,
                duration: 2,
                ease: "power2.inOut",
                delay: index * 0.2
            });
        });

        this.initialized = true;
    }
    
    private animate = (): void => {
        requestAnimationFrame(this.animate);

        const elapsedTime = this.clock.getElapsedTime();

        // Subtle floating motion
        this.shapes.forEach((mesh, index) => {
            if (this.initialized) {
                mesh.position.y += Math.sin(elapsedTime + index) * 0.002;
                mesh.rotation.y += 0.001; // Very subtle continuous rotation
            }
        });

        this.renderer.render(this.scene, this.camera);
    }
    
    public onWindowResize = (): void => {
        if (!this.camera || !this.renderer) return;
        
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    public cleanup(): void {
        // Cleanup method for proper disposal
        this.shapes.forEach(mesh => {
            mesh.geometry.dispose();
            (mesh.material as THREE.Material).dispose();
        });
        this.renderer.dispose();
    }
}

export default WebGLScene;
