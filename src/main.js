import "./style.css";

import {
  QuetzalcoatlCore
} from "quetzalcoatl-core";

import {
  Player
} from "./game/Player.js";

import {
  Enemy
} from "./game/Enemy.js";

const app =
  document.querySelector(
    "#app"
  );

app.innerHTML = `
    <main class="game">
        <section
            class="arena"
            aria-label="Quetzalcoatl Energy Arena"
        >
            <div
                class="entity player"
                aria-label="Player"
            ></div>
            <div
                class="entity obstacle"
                aria-label="Obstacle"
            ></div>
        </section>

        <aside
            class="hud"
            noqc
        >
            <div>
                <span>
                    QUETZALCOATL CORE
                </span>

                <strong>
                    ENERGY ARENA
                </strong>
            </div>

            <div class="status">
                <span>
                    GPU
                </span>

                <strong>
                    WebGL2
                </strong>
            </div>
        </aside>
    </main>
`;

await new Promise(
  resolve => {
    requestAnimationFrame(
      resolve
    );
  }
);

const core =
  new QuetzalcoatlCore({
    root: app,
    intensity: 0.65
  });

await core.start();

const playerElement =
  document.querySelector(
    ".player"
  );

const player =
  new Player({
    element:
      playerElement
  });

player.start();

console.log(
  "[Energy Arena] Ready"
);

const arena =
  document.querySelector(
    ".arena"
  );

const enemyPositions = [
  [180, 160],
  [420, 130],
  [760, 190],
  [980, 320],
  [850, 600],
  [520, 700],
  [220, 620],
  [130, 390]
];

const enemies =
  enemyPositions.map(
    ([x, y]) => {
      const enemy =
        new Enemy({
          x,
          y,
          speed:
            70
            + Math.random()
            * 55
        });

      enemy.mount(
        arena
      );

      return enemy;
    }
  );

console.log(
  `[Energy Arena] ${enemies.length} enemies mounted`
);

let lastGameTime =
  performance.now();

function updateGame(
  time
) {
  const delta =
    Math.min(
      (
        time
        - lastGameTime
      ) / 1000,
      0.05
    );

  lastGameTime =
    time;

  for (
    const enemy
    of enemies
  ) {
    enemy.update(
      player.x,
      player.y,
      delta
    );
  }

  requestAnimationFrame(
    updateGame
  );
}

requestAnimationFrame(
  updateGame
);