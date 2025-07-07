import { k } from "../kaplayCtx.js"

export function addRings(pos) {
   return k.add([
         k.sprite("ring", {anim: "spin"}),
         k.scale(4),
         k.area(),
         k.pos(pos),
         k.anchor("center"),
         k.offscreen(),
         "ring"
    ]);
}