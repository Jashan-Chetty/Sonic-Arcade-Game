import { k } from "../kaplayCtx.js"

export function makeSonic(pos) {
    const sonic = k.add([
        k.sprite("sonic", {anim: "run"}),
        k.scale(4),
        k.area(),
        // positioning of sonic
        k.anchor("center"),
        k.pos(pos)
    ]);

    return sonic;
}