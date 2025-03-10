import * as THREE from 'three';

export class Engine {
    constructor(container) {
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x87CEEB);

        this.camera = new THREE.PerspectiveCamera(
            75, 
            window.innerWidth / window.innerHeight, 
            0.1, 1000);
        
        this.renderer = new THREE.WebGLRenderer({canvas: container});
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        
        this.grid = new THREE.GridHelper(20, 20);

        this.clock = new THREE.Clock();

        this.scene.add(this.grid, this.camera);
    }

    addObject(object) {
        this.scene.add(object);
    }
}

export default Engine;