import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Engine from './Core/engine';
import Resize from './Core/resize';
import Utils from './Core/utils';
import Projectile from './Objects/projectile';
import Basic_Scene from './Objects/basic_Scene';

//SCENE CONFIGURATION
const canvas = document.querySelector('canvas.webGL');
const game = new Engine(canvas);
const scene = game.scene;
//CAMERA
const camera = game.camera;
camera.position.set(23, 12, 25);//(23, 12, 25)
camera.setFocalLength(60);

//RENDERING
const renderer = game.renderer;
const size = new Resize(window.innerWidth, window.innerHeight, camera, renderer);
//CLOCK
const clock = game.clock;
//CONTROLS
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
//LIGHTS
const ambientLight = new THREE.AmbientLight(0xffffff, 2.4)
scene.add(ambientLight)
//BALL GEOMETRY
const ball = new Projectile(scene);
ball.loadModel('./models/Ball-GLTF/Ball.gltf').then(() => {
    ball.model.scale.set(0.2, 0.2, 0.2);
    ball.setColor("red");
    camera.lookAt(ball.model.position);
    document.getElementById('shoot-btn').addEventListener('click', () => {
        ball.shoot(clock);
    });

    animate();
}).catch(error => {
    console.error('Error loading:', error);
});



//FLOOR AND SKY
const basicScene = new Basic_Scene();
const floor = basicScene.addFloor(40, 40, 40, 40);
floor.position.set(0, -0.19, 0);
const sky = basicScene.load_Sky(20000, 10, 3, 0.1, 0.95, 0.3, -0.038, -0.95);
if(floor && sky){
    basicScene.load_TX('./textures/alpha.webp').then((texture) => {
        floor.material.alphaMap = texture;
        floor.material.transparent = true;
        floor.material.needsUpdate = true;  
    }).catch(error => {
        console.error('Texture failed loading:', error);
    });
}
scene.add(floor, sky);
//KEYBOARD CAMERA MOVEMENT
const pressedKeys = {};
const utility = new Utils();
//KEYBOARD CAPTURE EVENTS
document.addEventListener("keydown", (event) => {
    pressedKeys[event.key] = true;
});
document.addEventListener("keyup", (event) => {
    pressedKeys[event.key] = false;
});
// INIT ANIMATION FUNCTION
const animate = () => 
{
    if (ball.model && ball.getInMovement()) {
        ball.update(clock);
    }
    //Update Controls
    controls.update();
    
    utility.wasdMovementCamera(0.6, pressedKeys, camera);
    //Render
    renderer.render(scene, camera);
    //Refresh Next Animated Frame
    window.requestAnimationFrame(animate);
}

animate();