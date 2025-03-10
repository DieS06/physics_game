import * as THREE from 'three'
import {Sky} from 'three/addons/objects/Sky'

const textureLoader = new THREE.TextureLoader()

export class Basic_Scene{
    constructor(){
        this.model
        this.material
        this.texture
        this.floor
        this.sky
    }

    addFloor(width, height, wSegements, hSegments){
        this.model = new THREE.PlaneGeometry(width, height, wSegements, hSegments);
        this.material = new THREE.MeshStandardMaterial({ 
            side: THREE.DoubleSide,
        });

        this.floor = new THREE.Mesh(this.model, this.material);
        if(!this.floor instanceof THREE.Mesh){
            throw new Error('Floor creation failed!');
        }else{	
            this.floor.rotation.x = Math.PI / 2;
            return this.floor;
        }
    }

    load_TX(url){
        return new Promise((resolve, reject) => {
            textureLoader.load(url, (texture) => {
                resolve(texture)
            }, undefined, reject)
        })
    }

    load_Sky(scale, turbidity, rayleigh, mieCoefficient, mieDirectionalG, sunPositionX, sunPositionY, sunPositionZ){
        this.sky = new Sky()
        this.sky.scale.setScalar(scale)

        this.sky.material.uniforms['turbidity'].value = turbidity
        this.sky.material.uniforms['rayleigh'].value = rayleigh
        this.sky.material.uniforms['mieCoefficient'].value = mieCoefficient
        this.sky.material.uniforms['mieDirectionalG'].value = mieDirectionalG
        this.sky.material.uniforms['sunPosition'].value.set(sunPositionX, sunPositionY, -sunPositionZ)

        return this.sky
    }
}

export default Basic_Scene;