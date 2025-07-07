import { makeMotobug } from "../entities/motobug";
import { addRings } from "../entities/ring";
import { makeSonic } from "../entities/sonic";
import {k} from "../kaplayCtx"

export default function game() {
    k.setGravity(3100);

    const citySfx = k.play("city", {volume: 0.2, loop: true});
    
    const bgPieceWidth = 1920;
    const bgPieces = [
        k.add([k.sprite("chemical-bg"), k.pos(0, 0), k.scale(2), k.opacity(0.8)]),
        k.add([
        k.sprite("chemical-bg"),
        k.pos(bgPieceWidth, 0),
        k.scale(2),
        k.opacity(0.8),
        ]),
    ];

    const platformWidth = 1280;
    const platforms = [
        k.add([k.sprite("platforms"), k.pos(0, 450), k.scale(4)]),
        k.add([k.sprite("platforms"), k.pos(384, 450), k.scale(4)]),
    ];

    let score = 0;
    let scoreMultiplier = 0;

    const scoreText = k.add([
        k.text("Score : 0",  {font: "mania", size: 72}),
        k.pos(20, 20)
    ]);

    const sonic = makeSonic(k.vec2(200, 747));
    sonic.setControl();
    sonic.setEvent();
    sonic.onCollide("enemy", (enemy) => {
        if(!sonic.isGrounded()) {
            k.play("destory", {volume: 0.5});
            k.play("hyper-ring", {volume: 0.5});
            k.destroy(enemy);
            sonic.play("jump");
            sonic.jump();

            scoreMultiplier += 1;

            score += 10 * scoreMultiplier;
            scoreText.text = `SCORE: ${score}`;

            if(scoreMultiplier === 1) sonic.ringCollectUI.text = `+10`;
            if(scoreMultiplier > 1) sonic.ringCollectUI.text = `x${scoreMultiplier}`;

            k.wait(1, () => {
                sonic.ringCollectUI.text = "";
            });
            return;
        }

        k.play("hurt", {volume: 0.5});
        k.setData("current-score", score);
        k.go("game-over", { citySfx });
    });

    sonic.onCollide("ring", (ring) => {
        k.play("hyper-ring", {volume: 0.5});
        k.destroy(ring);

        score++;
        scoreText.text = `SCORE: ${score}`;
        sonic.ringCollectUI.text = "+1";
        k.wait(1, () => {
            sonic.ringCollectUI.text = "";
        });
    });

    // inital game speed, how fast it moves
    let gameSpeed = 300;

     const spawnMotoBug = () => {
        const motobug = makeMotobug(k.vec2(1950, 773));
        motobug.onUpdate(() => {
            // makes motobug move faster than game speed if less than 3000
            if(gameSpeed < 3000) {
                motobug.move(-(gameSpeed + 300), 0);
                return;
            }
            // but if over move it at normal game speed
            motobug.move(-gameSpeed, 0);
        });

        motobug.onExitScreen(() => {
            if(motobug.pos.x < 0) k.destroy(motobug)
        });

        // infinite motot=bug spawn
        const waitTime = k.rand(0.5, 2.5);
        k.wait(waitTime, spawnMotoBug);
    };

    spawnMotoBug();

    const spawnRing = () => {
        const ring = addRings(k.vec2(1950, 745));

        ring.onUpdate(() => {
            ring.move(-gameSpeed, 0)
        });

        ring.onExitScreen(() => {
            if(ring.pos.x < 0) k.destroy(ring)
        });

        const waitTime = k.rand(0.5, 3);
        k.wait(waitTime, spawnRing);
    };

    spawnRing();

    k.loop(1, () => {
        gameSpeed += 50;
    });

    k.add([
        k.rect(1920, 300),
        k.opacity(0),
        k.area(),
        k.pos(0, 832),
        k.body({isStatic: true})
    ]);
    
    k.onUpdate(() => {
    
        if(sonic.isGrounded()) scoreMultiplier = 0;
    
        bgPieces[0].move(-100, 0);
        bgPieces[1].moveTo(bgPieces[0].pos.x + bgPieceWidth * 2, 0);

        // background moves according to sonics jump
        bgPieces[0].moveTo(bgPieces[0].pos.x, -sonic.pos.y / 10 - 50);
        bgPieces[1].moveTo(bgPieces[1].pos.x, -sonic.pos.y / 10 - 50);

        if (bgPieces[1].pos.x < 0) {
            bgPieces[0].moveTo(bgPieces[1].pos.x + bgPieceWidth * 2, 0);
            bgPieces.push(bgPieces.shift());
        }

        platforms[0].move(-gameSpeed, 0);
        platforms[1].moveTo(platforms[0].pos.x + platformWidth * 2, 450);

        if (platforms[1].pos.x < 0) {
            platforms[0].moveTo(platforms[1].pos.x + platformWidth * 4, 450);
            platforms.push(platforms.shift());
        }
});

    
}