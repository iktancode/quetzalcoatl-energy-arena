import {
    Enemy
} from "./Enemy.js";

export class WaveManager {
    constructor({
        arena,
        enemies
    }) {
        this.arena =
            arena;

        this.enemies =
            enemies;

        this.wave =
            0;
    }

    spawnNextWave() {
        this.wave +=
            1;

        const count =
            8
            + this.wave * 4;

        for (
            let i = 0;
            i < count;
            i++
        ) {
            const position =
                this.#randomEdgePosition();

            const enemy =
                new Enemy({
                    x:
                        position.x,

                    y:
                        position.y,

                    speed:
                        70
                        + Math.random()
                        * 55
                        + this.wave * 4
                });

            enemy.mount(
                this.arena
            );

            this.enemies.push(
                enemy
            );
        }

        return this.wave;
    }

    #randomEdgePosition() {
        const side =
            Math.floor(
                Math.random()
                * 4
            );

        const margin =
            60;

        if (side === 0) {
            return {
                x:
                    Math.random()
                    * window.innerWidth,

                y:
                    margin
            };
        }

        if (side === 1) {
            return {
                x:
                    window.innerWidth
                    - margin,

                y:
                    Math.random()
                    * window.innerHeight
            };
        }

        if (side === 2) {
            return {
                x:
                    Math.random()
                    * window.innerWidth,

                y:
                    window.innerHeight
                    - margin
            };
        }

        return {
            x:
                margin,

            y:
                Math.random()
                * window.innerHeight
        };
    }
}