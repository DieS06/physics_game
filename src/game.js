import {mainScene} from './scenes/mainScene.js';


document.addEventListener('DOMContentLoaded', () => {
    const game = document.querySelector('containerGame');
    const scene = new mainScene(game);
    scene.update();

    //document.addEventListener("click", () => scene.shootProjectile());
});