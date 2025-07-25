import { makeSonic } from "../entities/sonic";
import {k} from "../kaplayCtx"

export default function mainMenu() {
    if(!k.getData("best-score")) {
        k.setData("best-score", 0);
    }
    
    k.onButtonPress("jump", () => {
        k.go("game");
    });

    // will swap images to have infinite movemenet affect
    const bgPieceWidth = 1920;
    const bgPieces = [
        k.add([
            k.sprite("chemical-bg"), 
            // default of top left
            k.pos(0, 0), 
            k.scale(2), 
            k.opacity(0.8)
        ]),
        k.add([
            k.sprite("chemical-bg"), 
            // canvas in 1920 x 1080 (same as our image), so we need to multiple by 2 because of scale 2: thats why you multiple ny 2
            k.pos(bgPieceWidth * 2, 0), 
            k.scale(2), 
            k.opacity(0.8)
        ]),
    ];

    const platformWidth = 1280;

    const platforms = [
        k.add([
            k.sprite("platforms"),
            k.pos(0, 450),
            k.scale(4)
        ]),
        k.add([
            k.sprite("platforms"),
            k.pos(platformWidth * 4, 450),
            k.scale(4)
        ])
    ];

    k.add([
        k.text("SONIC RING RUN", {
            font: "mania",
            size: 96
        }),
        k.pos(k.center().x, 200),
        k.anchor("center")
    ]);

    k.add([
        k.text("Press Space/Click/Touch to play", {
            font: "mania",
            size: 32
        }),
        k.pos(k.center().x, k.center().y -200),
        k.anchor("center")
    ])

    makeSonic(k.vec2(200, 745));

    k.onUpdate(() => {
        // chckes if 2nd backround piece is behind (< 0), take 1st piece and put it in front
        // background
        if(bgPieces[1].pos.x < 0) {
            bgPieces[0].moveTo(bgPieces[1].pos.x + bgPieceWidth * 2, 0);
            // This swaps the two background pieces in the array, - shift() removes the first one, - push() adds it to the end.
            bgPieces.push(bgPieces.shift());
        }

        bgPieces[0].move(-100, 0);
        // 0 is the y element
        bgPieces[1].moveTo(bgPieces[0].pos.x + bgPieceWidth * 2, 0);

        //platform 
        if(platforms[1].pos.x < 0) {
            platforms[0].moveTo(platforms[1].pos.x + platformWidth * 4, 450);
            platforms.push(platforms.shift());
        }

        platforms[0].move(-4000, 0);
        platforms[1].moveTo(platforms[0].pos.x + platformWidth, 450);
    });
}