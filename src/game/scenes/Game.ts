import type { Cameras, GameObjects } from 'phaser';
import { EventBus } from '../EventBus';
import { GameScene } from './GameScene.abstract';
export class Game extends GameScene {
    camera: Cameras.Scene2D.Camera;
    background: GameObjects.Image;
    gameText: GameObjects.Text;

    constructor() {
        super('Game');
    }

    create() {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0x00ff00);

        this.background = this.add.image(512, 384, 'background');
        this.background.setAlpha(0.5);

        this.gameText = this.add
            .text(
                512,
                384,
                'Make something fun!\nand share it with us:\nsupport@phaser.io',
                {
                    fontFamily: 'Arial Black',
                    fontSize: 38,
                    color: '#ffffff',
                    stroke: '#000000',
                    strokeThickness: 8,
                    align: 'center',
                }
            )
            .setOrigin(0.5)
            .setDepth(100);

        EventBus.emit('current-scene-ready', this);
    }

    changeScene() {
        this.scene.start('GameOver');
    }
}
