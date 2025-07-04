import {k} from "./kaplayCtx"

k.loadSprite("chemical-bg", "graphics/chemical-bg.png");
k.loadSprite("platforms", "graphics/platforms.png");

// load sprite images
k.loadSprite("sonic", "graphics/sonic.png", {
  // identify frames per row and column -> look at sonic image
  sliceX: 8,
  sliceY: 2,
  anims: {
    // first frame is 0 -> like an array
    run: { from: 0, to: 7, loop: true, speed: 30},
    jump: { from: 8, to: 15, loop: true, speed: 100}
},
});

k.loadSprite("ring", "graphics/ring.png", {
  // identify frames per row and column -> look at ring image
  sliceX: 16,
  sliceY: 1,
  anims: {
    spin: { from: 0, to: 15, loop: true, speed: 30},
},
});

k.loadSprite("motobug", "graphics/motobug.png", {
  // identify frames per row and column -> look at motobug image
  sliceX: 5,
  sliceY: 1,
  anims: {
    // first frame is 0 -> like an array
    run: { from: 0, to: 4, loop: true, speed: 30},
},
});

//load text
k.loadFont("mania", "fonts/mania.ttf");

//load sound
k.loadSound("city", "sound/city.mp3");
k.loadSound("destory", "sound/Destory.wav");
k.loadSound("hurt", "sound/Hurt.wav");
k.loadSound("hyper-ring", "sound/HyperRing.wav");
k.loadSound("jump", "sound/Jump.wav");
k.loadSound("ring", "sound/Ring.wav");

k.scene("main")