import { k } from "../kaplayCtx"

export function makeMotobug(pos) {
    return k.add([
        k.sprite("motobug", {anim: "run"}),
        k.scale(4),
        // Rect is creating a rectangle but on seen, more for hitboxes
        k.area({ shape: new k.Rect(k.vec2(-5, 0), 32, 32) }),
        k.pos(pos),
        k.anchor("center"),
        k.offscreen(),
        // tag used to define object -> used in onColliders
        "enemy"
    ]);
}