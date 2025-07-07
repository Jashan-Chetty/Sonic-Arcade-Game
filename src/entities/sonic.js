import { k } from "../kaplayCtx.js"

export function makeSonic(pos) {
    const sonic = k.add([
        k.sprite("sonic", {anim: "run"}),
        k.scale(4),
        k.area(),
        // positioning of sonic
        k.anchor("center"),
        k.pos(pos),
        k.body({jumpForce: 1700}),
        {
            ringCollectUI: null,
            setControl() {
                k.onButtonPress("jump", () => {
                    // this is the sonic character
                    if(this.isGrounded()) {
                        // play animation
                        // this comes from main.js line 17
                        this.play("jump");
                        //active jump control
                        this.jump();
                        //play sound
                        k.play("jump", {volume: 0.5});
                    }
                });
            },
            setEvent() {
                // when sonic is on ground put back run animation
                this.onGround(() => {
                    this.play("run");
                });
            }
        },
    ]);

    // creating child game object
    sonic.ringCollectUI = sonic.add([
        k.text("", {font: "mania", size: 24}),
        k.color(255, 255, 0),
        k.anchor("center"),
        // reletive to sonic
        k.pos(30, -10)
    ]);

    return sonic;
}