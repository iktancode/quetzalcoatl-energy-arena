export class Enemy {
    constructor({
        x,
        y,
        size = 42,
        speed = 90
    }) {
        this.x =
            x;

        this.y =
            y;

        this.size =
            size;

        this.speed =
            speed;

        this.element =
            document.createElement(
                "div"
            );

        this.element.className =
            "entity enemy";

        this.element.setAttribute(
            "aria-label",
            "Enemy"
        );

        this.#render();
    }

    mount(
        container
    ) {
        container.appendChild(
            this.element
        );
    }

    update(
        targetX,
        targetY,
        delta
    ) {
        const dx =
            targetX - this.x;

        const dy =
            targetY - this.y;

        const distance =
            Math.hypot(
                dx,
                dy
            );

        if (distance <= 0) {
            return;
        }

        const directionX =
            dx / distance;

        const directionY =
            dy / distance;

        this.x +=
            directionX
            * this.speed
            * delta;

        this.y +=
            directionY
            * this.speed
            * delta;

        this.#render();
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