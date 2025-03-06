import { GUI } from 'dat.gui';

/**REQUISITOS FUNDAMENTALES (80%)
 * 1. Al iniciar la simulación un objeto se moverá
 * siguiendo una trayectoria parabólica real.
 * 
 * 2. La interfaz debe incluir la posibilidad de modificar
 * los parámetros cinemáticos asociados, de modo que se
 * puedan simular distitas trayectorias.
 *      - Los parámetros modificables deben ser definidos
 *        por los estudiantes.
 * 
 * 3. Debe mostrarse en pantalla el valor, en tiempo real,
 * de las cantitdades físicas involucradas.
 *      - La posición debe considerarse, por separado,
 *        en cada eje de coordenadas (x, y, z).
 * 
 * 4. La simulación debe visualizarse de una manera natural,
 * de modo que cada segundo debe corresponder a un segundo real.
 * 
 * 5. NO USAR LIBRERIAS QUE APLIQUE LA FÍSICA.
 */

const gui = new GUI();
const gravity = 9.81;

export class physics {
    /**Cinemática 1D */
    //Movimiento Rectilíneo Uniforme
    static MRU({ delta = null, time = null, velocity = null }) {
        if (delta === null) {
            gui.add(this, 'time', 0, 100).name('Time');
            gui.add(this, 'velocity', 0, 100).name('Velocity');
            return time * velocity;
        } else if (time === null) {
            gui.add(this, 'delta', 0, 100).name('Delta');
            gui.add(this, 'velocity', 0, 100).name('Velocity');
            return delta / velocity;
        } else if (velocity === null) {
            gui.add(this, 'delta', 0, 100).name('Delta');
            gui.add(this, 'time', 0, 100).name('Time');
            return delta / time;
        } else {
            throw new Error("One of the parameters must be null");
        }
    }

    //Movimiento Rectilíneo Uniformemente Acelerado FORMULAS
    static MRUA_Final_Velocity(fVelocity = null, iVelocity = null, acceleration = null, time = null){
        if(acceleration === null){
            // Acceleration Formula
            gui.add(this, 'fVelocity', 0, 100).name('Final Velocity');
            gui.add(this, 'iVelocity', 0, 100).name('Initial Velocity');
            gui.add(this, 'time', 0, 100).name('Time');
            return (fVelocity - iVelocity) / time;
        }else if(fVelocity === null){
            // Final Velocity Formula
            gui.add(this, 'acceleration', 0, 100).name('Acceleration');
            gui.add(this, 'iVelocity', 0, 100).name('Initial Velocity');
            gui.add(this, 'time', 0, 100).name('Time');
            return iVelocity + acceleration * time;
        }else if(iVelocity === null){
            // Initial Velocity Formula
            gui.add(this, 'acceleration', 0, 100).name('Acceleration');
            gui.add(this, 'fVelocity', 0, 100).name('Final Velocity');
            gui.add(this, 'time', 0, 100).name('Time');
            return -(fVelocity - acceleration * time);
        }else if(time === null){
            // Time Formula
            gui.add(this, 'acceleration', 0, 100).name('Acceleration');
            gui.add(this, 'fVelocity', 0, 100).name('Final Velocity');
            gui.add(this, 'iVelocity', 0, 100).name('Initial Velocity');
            return (fVelocity - iVelocity) / acceleration;
        }else{
            throw new Error("One of the parameters must be null");
        }
    }
    static MRUA_Square_Final_Velocity(fVelocity = null, iVelocity = null, acceleration = null, delta = null){
        if(fVelocity === null){
            // Final Velocity Formula
            gui.add(this, 'acceleration', 0, 100).name('Acceleration');
            gui.add(this, 'iVelocity', 0, 100).name('Initial Velocity');
            gui.add(this, 'delta', 0, 100).name('Delta');
            return Math.pow(iVelocity, 2) + 2 * acceleration * delta;
        }else if (acceleration === null){
            // Acceleration Formula
            gui.add(this, 'fVelocity', 0, 100).name('Final Velocity');
            gui.add(this, 'iVelocity', 0, 100).name('Initial Velocity');
            gui.add(this, 'delta', 0, 100).name('Delta');
            return ((Math.pow(fVelocity, 2) - Math.pow(iVelocity, 2)) / 2) / delta;
        }else if (delta === null){
            // Delta Formula
            gui.add(this, 'acceleration', 0, 100).name('Acceleration');
            gui.add(this, 'fVelocity', 0, 100).name('Final Velocity');
            gui.add(this, 'iVelocity', 0, 100).name('Initial Velocity');
            return ((Math.pow(fVelocity, 2) - Math.pow(iVelocity, 2)) / 2) / acceleration;
        }else if (iVelocity === null){
            // Initial Velocity Formula
            gui.add(this, 'acceleration', 0, 100).name('Acceleration');
            gui.add(this, 'fVelocity', 0, 100).name('Final Velocity');
            gui.add(this, 'delta', 0, 100).name('Delta');
            return -(Math.pow(2 * acceleration * delta - Math.pow(fVelocity, 2), 2));
        }else{
            throw new Error("One of the parameters must be null");
        }
    }
    static MRUA_Delta(iVelocity = null, acceleration = null, time = null, delta = null){
        if(delta === null){
            // Delta Formula
            gui.add(this, 'acceleration', 0, 100).name('Acceleration');
            gui.add(this, 'fVelocity', 0, 100).name('Final Velocity');
            gui.add(this, 'iVelocity', 0, 100).name('Initial Velocity');
            return iVelocity * time + acceleration * Math.pow(time, 2) / 2;
        }else if (iVelocity === null){
            // Initial Velocity Formula
            gui.add(this, 'acceleration', 0, 100).name('Acceleration');
            gui.add(this, 'fVelocity', 0, 100).name('Final Velocity');
            gui.add(this, 'delta', 0, 100).name('Delta');
            return (-(acceleration * Math.pow(time, 2) / 2) + delta) / time;
        }else if (acceleration === null){
            // Acceleration Formula
            gui.add(this, 'fVelocity', 0, 100).name('Final Velocity');
            gui.add(this, 'iVelocity', 0, 100).name('Initial Velocity');
            gui.add(this, 'delta', 0, 100).name('Delta');
            return -(-2 * delta + 2 * time * iVelocity) / Math.pow(time, 2);
        }
        /**else if (time === null){
            // Time Formula
            return 
        }*/
        else{
            throw new Error("One of the parameters must be null");
        }
    }
    static resta_Delta(iDelta, fDelta){
        gui.add(this, 'iDelta', 0, 100).name('Initial Delta');
        gui.add(this, 'fDelta', 0, 100).name('Final Delta');
        return fDelta - iDelta;
    }

    //Gravedad
    static applyGravity(object, deltaTime) {
        object.velocity.y -= gravity * deltaTime;
    }

    /**Cinemática 2D*/
    //Movimiento Parabólico | Proyectiles | Caida libre
    static parabolic_Final_Velocity(fVelocity = null, iVelocity = null, time = null){
        if(fVelocity === null){
            // Final Velocity Formula
            gui.add(this, 'iVelocity', 0, 100).name('Initial Velocity');
            gui.add(this, 'time', 0, 100).name('Time');
            return iVelocity + gravity * time;
        }else if(iVelocity === null){
            // Initial Velocity Formula
            gui.add(this, 'fVelocity', 0, 100).name('Final Velocity');
            gui.add(this, 'time', 0, 100).name('Time');
            return (gravity * -time + fVelocity);
        }else if(time === null){
            // Time Formula
            gui.add(this, 'fVelocity', 0, 100).name('Final Velocity');
            gui.add(this, 'iVelocity', 0, 100).name('Initial Velocity');
            return -((fVelocity - iVelocity) / gravity);
        }else{
            throw new Error("One of the parameters must be null");
        }
    }

    static delta_y(iVelocity = null, time = null, delta_y = null){
        if(delta_y === null){
            // Vertical Delta Formula
            gui.add(this, 'time', 0, 100).name('Time');
            gui.add(this, 'iVelocity', 0, 100).name('Initial Velocity');
            return gravity * Math.pow(time, 2) / 2;
        }else if(iVelocity === null){
            // Initial Velocity Formula
            gui.add(this, 'time', 0, 100).name('Time');
            gui.add(this, 'delta_y', 0, 100).name('Delta Y');
            return gravity * Math.pow(time, 2) / 2;
        }else if(time === null){
            // Time Formula
            gui.add(this, 'iVelocity', 0, 100).name('Initial Velocity');
            gui.add(this, 'delta_y', 0, 100).name('Delta Y');
            return Math.sqrt(2 * iVelocity / gravity);
        }else{
            throw new Error("One of the parameters must be null");
        }
    }
    //Trayectorias

    //Colisiones
    static detectCollision(objectA, objectB) {
        const distance = objectA.position.distanceTo(objectB.position);
        return distance < (objectA.size + objectB.size);
    }

    //Friccion

    //Angulo

}