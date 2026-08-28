export class Player {
    constructor({
        element,
        speed = 320
    }) {
        this.element =
            element;

        this.speed =
            speed;

        this.x =
            window.innerWidth / 2;

        this.y =
            window.innerHeight / 2;

        this.keys =
            new Set();

        this.lastTime =
            performance.now();

        this.frameId =
            null;

        this.#bindEvents();

        this.#render();
    }

    get radius() {
        return (
            this.element.offsetWidth
            / 2
        );
    }

    start() {
        if (
            this.frameId !== null
        ) {
            return;
        }

        this.lastTime =
            performance.now();

        this.frameId =
            requestAnimationFrame(
                this.#frame
            );
    }

    stop() {
        if (
            this.frameId === null
        ) {
            return;
        }

        cancelAnimationFrame(
            this.frameId
        );

        this.frameId =
            null;
    }

    #bindEvents() {
        window.addEventListener(
            "keydown",
            event => {
                this.keys.add(
                    event.key.toLowerCase()
                );
            }
        );

        window.addEventListener(
            "keyup",
            event => {
                this.keys.delete(
                    event.key.toLowerCase()
                );
            }
        );
    }

    #frame = time => {
        const delta =
            Math.min(
                (
                    time
                    - this.lastTime
                ) / 1000,
                0.05
            );

        this.lastTime =
            time;

        this.#update(
            delta
        );

        this.#render();

        this.frameId =
            requestAnimationFrame(
                this.#frame
            );
    };

    #update(
        delta
    ) {
        let directionX =
            0;

        let directionY =
            0;

        if (
            this.keys.has("a")
            || this.keys.has(
                "arrowleft"
            )
        ) {
            directionX -= 1;
        }

        if (
            this.keys.has("d")
            || this.keys.has(
                "arrowright"
            )
        ) {
            directionX += 1;
        }

        if (
            this.keys.has("w")
            || this.keys.has(
                "arrowup"
            )
        ) {
            directionY -= 1;
        }

        if (
            this.keys.has("s")
            || this.keys.has(
                "arrowdown"
            )
        ) {
            directionY += 1;
        }

        if (
            directionX !== 0
            && directionY !== 0
        ) {
            directionX *=
                Math.SQRT1_2;

            directionY *=
                Math.SQRT1_2;
        }

        this.x +=
            directionX
            * this.speed
            * delta;

        this.y +=
            directionY
            * this.speed
            * delta;

        const radius =
            this.element.offsetWidth
            / 2;

        this.x =
            Math.max(
                radius,
                Math.min(
                    window.innerWidth
                    - radius,
                    this.x
                )
            );

        this.y =
            Math.max(
                radius,
                Math.min(
                    window.innerHeight
                    - radius,
                    this.y
                )
            );
    }

    #render() {
        this.element.style.transform =
            `translate3d(${this.x}px, ${this.y}px, 0) translate(-50%, -50%)`;
    }
}