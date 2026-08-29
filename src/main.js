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

import {
  EnergyNode
} from "./game/EnergyNode.js";

import {
  Projectile
} from "./game/Projectile.js";

import {
  WaveManager
} from "./game/WaveManager.js";

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

                <span>
                    ENERGY
                </span>

                <strong id="health">
                    100%
                </strong>

                <span>
                    SCORE
                </span>

                <strong id="score">
                    0
                </strong>

                <span>
                    WAVE
                </span>

                <strong id="wave">
                    1
                </strong>

                <span>
                    FPS
                </span>

                <strong id="fps">
                    0
                </strong>

                <span>
                    ENTITIES
                </span>

                <strong id="entities">
                    0
                </strong>

                <span>
                    ENEMIES
                </span>

                <strong id="enemy-count">
                    0
                </strong>

                <span>
                    PROJECTILES
                </span>

                <strong id="projectile-count">
                    0
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
)

app.setAttribute(
    "data-qc",
    "on"
);

const core =
    new QuetzalcoatlCore({
        root:
            app,
        intensity:
            0.65,
        participation:
            "explicit"
    });

await core.start();

console.log(
    "[Arena QC Universe]",
    core.universe.getAll().length
);

const arena =
  document.querySelector(
    ".arena"
  );

const playerElement =
  document.querySelector(
    ".player"
  );

const healthElement =
  document.querySelector(
    "#health"
  );

const scoreElement =
  document.querySelector(
    "#score"
  );

const waveElement =
  document.querySelector(
    "#wave"
  );

const fpsElement =
  document.querySelector(
    "#fps"
  );

const entitiesElement =
  document.querySelector(
    "#entities"
  );

const enemyCountElement =
  document.querySelector(
    "#enemy-count"
  );

const projectileCountElement =
  document.querySelector(
    "#projectile-count"
  );

const player =
  new Player({
    element:
      playerElement
  });

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

const waveManager =
  new WaveManager({
    arena,
    enemies
  });

waveManager.wave =
  1;

const energyNode =
  new EnergyNode();

energyNode.mount(
  arena
);

const projectiles =
  [];

let pointerX =
  window.innerWidth / 2;

let pointerY =
  window.innerHeight / 2;

let lastShotTime =
  0;

const shotCooldown =
  140;

function fireProjectile(
  targetX,
  targetY
) {
  const now =
    performance.now();

  if (
    now - lastShotTime
    < shotCooldown
  ) {
    return;
  }

  lastShotTime =
    now;

  const projectile =
    new Projectile({
      x:
        player.x,

      y:
        player.y,

      targetX,

      targetY
    });

  projectile.mount(
    arena
  );

  projectiles.push(
    projectile
  );
}

let health =
  100;

let score =
  0;

let gameOver =
  false;

let lastHitTime =
  0;

const hitCooldown =
  500;

let lastGameTime =
  performance.now();

let fpsFrames =
  0;

let fpsLastTime =
  performance.now();

let currentFps =
  0;

player.start();

function updateGame(
  time
) {
  if (gameOver) {
    return;
  }

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

  fpsFrames +=
    1;

  if (
    time - fpsLastTime
    >= 1000
  ) {
    const elapsed =
      time - fpsLastTime;

    currentFps =
      Math.round(
        fpsFrames
        * 1000
        / elapsed
      );

    fpsFrames =
      0;

    fpsLastTime =
      time;

    fpsElement.textContent =
      currentFps;
  }

  for (
    const enemy
    of enemies
  ) {
    enemy.update(
      player.x,
      player.y,
      delta
    );

    const distance =
      Math.hypot(
        enemy.x
        - player.x,

        enemy.y
        - player.y
      );

    const collisionDistance =
      enemy.radius
      + player.radius;

    if (
      distance
      <= collisionDistance
      && time
      - lastHitTime
      >= hitCooldown
    ) {
      lastHitTime =
        time;

      health =
        Math.max(
          0,
          health - 10
        );

      healthElement.textContent =
        `${health}%`;

      if (
        health === 0
      ) {
        gameOver =
          true;

        player.stop();

        healthElement.textContent =
          "DEPLETED";

        console.log(
          "[Energy Arena] Game Over"
        );

        return;
      }
    }
  }

  for (
    let projectileIndex =
      projectiles.length - 1;

    projectileIndex >= 0;

    projectileIndex--
  ) {
    const projectile =
      projectiles[
      projectileIndex
      ];

    projectile.update(
      delta
    );

    let hit =
      false;

    for (
      let enemyIndex =
        enemies.length - 1;

      enemyIndex >= 0;

      enemyIndex--
    ) {
      const enemy =
        enemies[
        enemyIndex
        ];

      const distance =
        Math.hypot(
          projectile.x
          - enemy.x,

          projectile.y
          - enemy.y
        );

      const collisionDistance =
        projectile.radius
        + enemy.radius;

      if (
        distance
        > collisionDistance
      ) {
        continue;
      }

      enemy.destroy();

      enemies.splice(
        enemyIndex,
        1
      );

      projectile.destroy();

      projectiles.splice(
        projectileIndex,
        1
      );

      score +=
        250;

      scoreElement.textContent =
        score;

      hit =
        true;

      break;
    }

    if (hit) {
      continue;
    }

    if (
      projectile.isOutside()
    ) {
      projectile.destroy();

      projectiles.splice(
        projectileIndex,
        1
      );
    }
  }

  const energyDistance =
    Math.hypot(
      energyNode.x
      - player.x,

      energyNode.y
      - player.y
    );

  const collectDistance =
    energyNode.radius
    + player.radius;

  if (
    energyDistance
    <= collectDistance
  ) {
    score +=
      100;

    scoreElement.textContent =
      score;

    energyNode.relocate();

    console.log(
      `[Energy Arena] Energy collected: ${score}`
    );
  }

  if (
    enemies.length === 0
  ) {
    const wave =
      waveManager
        .spawnNextWave();

    waveElement.textContent =
      wave;

    console.log(
      `[Energy Arena] Wave ${wave} started`
    );
  }

  enemyCountElement.textContent =
    enemies.length;

  projectileCountElement.textContent =
    projectiles.length;

  entitiesElement.textContent =
    3
    + enemies.length
    + projectiles.length;

  requestAnimationFrame(
    updateGame
  );
}

requestAnimationFrame(
  updateGame
);

window.addEventListener(
  "pointermove",
  event => {
    pointerX =
      event.clientX;

    pointerY =
      event.clientY;
  }
);

window.addEventListener(
  "pointerdown",
  event => {
    fireProjectile(
      event.clientX,
      event.clientY
    );
  }
);

window.addEventListener(
  "keydown",
  event => {
    if (
      event.code !== "Space"
    ) {
      return;
    }

    event.preventDefault();

    fireProjectile(
      pointerX,
      pointerY
    );
  }
);

enemyCountElement.textContent =
  enemies.length;

projectileCountElement.textContent =
  projectiles.length;

entitiesElement.textContent =
  3
  + enemies.length
  + projectiles.length;

console.log(
  `[Energy Arena] ${enemies.length} enemies mounted`
);

console.log(
  "[Energy Arena] Ready"
);