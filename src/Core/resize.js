class Resize {
    constructor(width, height, camera, renderer) {
        this.width = width;
        this.height = height;
        this.camera = camera;
        this.renderer = renderer;

        this.sizes = {
            width: window.innerWidth,
            height: window.innerHeight
        };

        window.addEventListener('resize', this.onWindowResize.bind(this));
    }

    setWidth(width) {
        this.width = width;
    }

    setHeight(height) {
        this.height = height;
    }

    getWidth() {
        return this.width;
    }

    getHeight() {
        return this.height;
    }

    resize(newWidth, newHeight) {
        this.width = newWidth;
        this.height = newHeight;
    }

    onWindowResize() {
        this.sizes.width = window.innerWidth;
        this.sizes.height = window.innerHeight;

        this.camera.aspect = this.sizes.width / this.sizes.height;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }
}

export default Resize;