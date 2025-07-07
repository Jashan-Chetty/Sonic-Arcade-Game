import kaplay from "kaplay";

export const k = kaplay({
  width: 1920,
  height: 1080,
  letterbox: true,
  background: [0,0,0],
  // not imported globally
  global: false,
  touchToMouse: true,
  buttons: {
    jump: {
        keyboard: ["space"],
        mouse: "left"
    }
  },
  debugKey: "d",
  debug: false,
});

