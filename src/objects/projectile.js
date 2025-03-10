import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import * as THREE from 'three'

const gltfLoader = new GLTFLoader();

export class Projectile{
    constructor(scene){
        this.scene = scene;
        this.model = null;
        this.gravity = -9.81;
        this.inMovement = false;
        this.isValid = true;
        this.velocityZ = 0;
        this.velocityY = 0;
        this.startTime = 0;
    }

    //MODEL LOADING METHOD
    loadModel(url){
        return new Promise((resolve, reject) => {
            gltfLoader.load(url, (gltf) => {
                this.model = gltf.scene;
                this.model.position.set(0, 0, 0);
                this.scene.add(this.model);
                resolve(this.model);
            }, undefined, reject);
        });
    }

    //SHOOT PROYECTILE METHOD
    shoot(clock){
        if (!this.model) {
            console.error('Model not loaded');
            return;
        }
        if (!clock) return;
        
        let angle = parseFloat(document.getElementById('angle').value);
        let initialVelocity = parseFloat(document.getElementById('velocity').value);

        this.resetErrorMessages();
        this.validataAngle(angle);
        this.validateVelocity(initialVelocity);

        if (!this.isValid) {return;}

        angle = THREE.MathUtils.degToRad(angle);

        this.velocityZ = -initialVelocity * Math.cos(angle);
        this.velocityY = initialVelocity * Math.sin(angle);

        this.model.position.set(0, 1, 0);
        this.inMovement = true;
        this.startTime = clock.getElapsedTime();
    }

    update(clock){
        if (!this.model || !this.inMovement) return;

        const elapsedTime = clock.getElapsedTime() - this.startTime;
        
        // Ecuaciones de posición
        let positionZ = this.velocityZ * elapsedTime;
        let positionY = this.velocityY * elapsedTime + 0.5 * this.gravity * Math.pow(elapsedTime, 2);

        if (positionY <= 0) {
            positionY = 0;
            this.inMovement = false;
            console.log(`Impacto: Velocidad final en Y = ${(this.velocityY + this.gravity * elapsedTime).toFixed(2)} m/s`);
        }

        this.model.position.set(0, positionY, positionZ);
        this.updateData(elapsedTime, 0, positionY, positionZ, 0, this.velocityY + this.gravity * elapsedTime);
    }

    updateData(time, positionX, positionY, positionZ, initialVelocityX, finalVelocityY){
        document.getElementById('data').innerHTML = `
        Tiempo: ${time.toFixed(2)} s | 
        Posición: ${positionX.toFixed(2)} en X, ${positionY.toFixed(2)} en Y, ${positionZ.toFixed(2)} en Z | 
        Velocidad: ${initialVelocityX.toFixed(2)} m/s en X, ${finalVelocityY.toFixed(2)} m/s en Y`;
    }

    resetErrorMessages(){	
        document.getElementById('error-velocidad').textContent = '';
        document.getElementById('velocidad').textContent = '';
        document.getElementById('error-angulo').textContent = '';        
    }

    validateVelocity(velocity){
        let valueVi = parseFloat(velocity).toFixed(2);
        if (isNaN(valueVi) || valueVi <= 0) {
            document.getElementById('error-velocidad').textContent = 'La velocidad debe ser positiva.';
            this.isValid = false;
        }
    }

    validataAngle(angle){
        let valueAngle = parseInt(angle);

        if (isNaN(valueAngle) || valueAngle < 0 || valueAngle > 180) {
            document.getElementById('error-angulo').textContent = 'El ángulo debe estar entre 0 y 180 grados.';
            this.isValid = false;
        }
    }

    getModel() {
        return this.model;
    }

    setModel(model) {
        this.model = model;
    }

    getScene() {
        return this.scene;
    }

    setScene(scene) {
        this.scene = scene;
    }

    getIsValid() {
        return this.isValid;
    }

    setIsValid(value) {
        this.isValid = value;
    }

    getInMovement() {
        return this.inMovement;
    }

    setInMovement(value) {
        this.inMovement = value;
    }

    getGravity() {
        return this.gravity;
    }

    setGravity(value) {
        this.gravity = value;
    }

    getVelocityX() {
        return this.velocityX;
    }

    setVelocityX(value) {
        this.velocityX = value;
    }

    getVelocityY() {
        return this.velocityY;
    }

    setVelocityY(value) {
        this.velocityY = value;
    }

    getStartTime() {
        return this.startTime;
    }

    setStartTime(value) {
        this.startTime = value;
    }
}

export default Projectile;