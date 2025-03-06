import * as THREE from 'three';
import { Timer } from 'three/addons/misc/Timer.js';

export class Engine{
    constructor(container){
        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(
            50,
            window.innerWidth / window.innerHeight,
            0.1,
            100
        );
        
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(
            window.innerWidth,
            window.innerHeight
        );
        renderer.setPixelRatio(
            Math.min(window.devicePixelRatio, 2)
        );

        container.appendChild(
            this.renderer.domElement
        );

        this.timer = new Timer();
    }

    update(){
        requestAnimationFrame(() => this.update());
        
        this.camera.updateProjectionMatrix();

        this.renderer.render(this.scene, this.camera);

        this.timer.update();
    }

    addObject(object){
        this.scene.add(object);
    }
}
