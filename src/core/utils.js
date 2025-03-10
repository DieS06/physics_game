
const showMenuBtn = document.getElementById('show');
const hideMenuBtn = document.getElementById('hidden');
const sideMenu = document.getElementById('sideMenu');

export class Utils {
    constructor() {
    
    }
    
    wasdMovementCamera(velocity = 0.5, pressedKeys = {}, camera) {
        const KEY_W = "w";
        const KEY_S = "s";
        const KEY_A = "a";
        const KEY_D = "d";
        const KEY_Q = "q";
        const KEY_E = "e";
    
        if (pressedKeys[KEY_W]) {
            camera.position.y -= velocity;
        } else if (pressedKeys[KEY_S]) {
            camera.position.y += velocity;
        } else if (pressedKeys[KEY_A]) {
            camera.position.x -= velocity;
        } else if (pressedKeys[KEY_D]) {
            camera.position.x += velocity;
        } else if (pressedKeys[KEY_Q]) {
            camera.position.z -= velocity;
        }else if (pressedKeys[KEY_E]) {
            camera.position.z += velocity;
        }
    
        camera.lookAt(0, 1, 0);
    }

    // initMenuButtons() {
    //     showMenuBtn.addEventListener('click', () => {
    //         sideMenu.classList.add('show');
    //         showMenuBtn.classList.add('hidden');
    //     });

    //     hideMenuBtn.addEventListener('click', () => {
    //         sideMenu.classList.remove('show');
    //         showMenuBtn.classList.remove('hidden');
    //     });
    // }

    // camera_menu(camera, option, target){
    //     if (option === 1) {
    //         document.getElementById('inicio').addEventListener('click', () => {
    //             alert('Cámara de inicio.');
    //         });
    //         camera.position.set(0.5, 0.2, 4.3);
    //         camera.setFocalLength(55);
    //         camera.lookAt(0, 0, 0);
    //         camera.updateProjectionMatrix();
    //     } else if (option === 2) {
    //         document.getElementById('lateral').addEventListener('click', () => {
    //             alert('Cámara Lateral.');
    //         });
    //         camera.position.set(9,1, 0.3);
    //         camera.rotation.set(8.5, 1.5, -0.3);
    //         camera.setFocalLength(20);
    //         camera.lookAt(target);
    //         camera.updateProjectionMatrix();
    //     } else if (option === 3) {
    //         document.getElementById('libre').addEventListener('click', () => {
    //             alert('Cámara libre.');
    //         });
    //         camera.position.set(0, 8, 0);
    //         camera.lookAt(0, 0, 0);
    //         camera.updateProjectionMatrix();
    //     }
    // }
}

export default Utils;