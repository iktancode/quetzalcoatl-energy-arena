export class Projectile {
    constructor({
        x,
        y,
        targetX,
        targetY,
        speed = 720,
        size = 12
    }) {
        this.x =
            x;

        this.y =
            y;

        this.speed =
            speed;

        this.size =
            size;

        const dx =
            targetX - x;

        const dy =
            targetY - y;

        const distance =
            Math.hypot(
                dx,
                dy
            ) || 1;

        this.velocityX =
            dx / distance;

        this.velocityY =
            dy / distance;

        this.element =
            document.createElement(
                "div"
            );

        this.element.className =
            "entity projectile";

        this.element.setAttribute(
            "aria-label",
            "Projectile"
        );

        this.#render();
    }

    get radius() {
        return (
            this.size
            / 2
        );
    }

    mount(
        container
    ) {
        container.appendChild(
            this.element
        );
    }

    update(
        delta
    ) {
        this.x +=
            this.velocityX
            * this.speed
            * delta;

        this.y +=
            this.velocityY
            * this.speed
            * delta;

        this.#render();
    }

    isOutside() {
        const margin =
            40;

        return (
            this.x < -margin
            || this.x
            > window.innerWidth
            + margin
            || this.y < -margin
            || this.y
            > window.innerHeight
            + margin
        );
    }

    destroy() {
        this.element.remove();
    }

    #render() {
        this.element.style.width =
            `${this.size}px`;

        this.element.style.height =
            `${this.size}px`;

        this.element.style.transform =
            `translate3d(${this.x}px, ${this.y}px, 0) translate(-50%, -50%)`;
    }
}