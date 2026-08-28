export class EnergyNode {
    constructor({
        size = 34,
        margin = 80
    } = {}) {
        this.size =
            size;

        this.margin =
            margin;

        this.x =
            0;

        this.y =
            0;

        this.element =
            document.createElement(
                "div"
            );

        this.element.className =
            "entity energyNode";

        this.element.setAttribute(
            "aria-label",
            "Energy node"
        );

        this.relocate();
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

    relocate() {
        const width =
            window.innerWidth;

        const height =
            window.innerHeight;

        this.x =
            this.margin
            + Math.random()
            * (
                width
                - this.margin * 2
            );

        this.y =
            this.margin
            + Math.random()
            * (
                height
                - this.margin * 2
            );

        this.#render();
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