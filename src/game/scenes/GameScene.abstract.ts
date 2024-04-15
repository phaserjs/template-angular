import { Scene } from "phaser";

export abstract class GameScene extends Scene {
  abstract changeScene(): void;
}

export function isGameScene(scene: Scene): scene is GameScene {
  return "changeScene" in scene && typeof scene.changeScene === "function";
}
