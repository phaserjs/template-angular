import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PhaserGame } from '../game/phaser-game.component';
import { MainMenu } from '../game/scenes/MainMenu';
import { CommonModule } from '@angular/common';
import { EventBus } from '../game/EventBus';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterOutlet, PhaserGame],
    templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewInit
{

    public spritePosition = { x: 0, y: 0 };
    public canMoveSprite = false;

    // This is a reference from the PhaserGame component
    @ViewChild(PhaserGame) phaserRef!: PhaserGame;

    ngAfterViewInit()
    {
        EventBus.on('current-scene-ready', (scene: Phaser.Scene) => {
            this.canMoveSprite = scene.scene.key !== 'MainMenu';
        });
    }

    // These methods are called from the template
    public changeScene()
    {

        if (this.phaserRef.scene)
        {

            const scene = this.phaserRef.scene as MainMenu;
            scene.changeScene();

        }

    }

    public moveSprite()
    {

        if (this.phaserRef.scene)
        {

            const scene = this.phaserRef.scene as MainMenu;

            // Get the update logo position
            scene.moveLogo(({ x, y }) => {

                this.spritePosition = { x, y };

            });

        }

    }

    public addSprite()
    {

        if (this.phaserRef.scene)
        {

            const scene = this.phaserRef.scene;
            // Add more stars
            const x = Phaser.Math.Between(64, scene.scale.width - 64);
            const y = Phaser.Math.Between(64, scene.scale.height - 64);

            //  `add.sprite` is a Phaser GameObjectFactory method and it returns a Sprite Game Object instance
            const star = scene.add.sprite(x, y, 'star');

            //  ... which you can then act upon. Here we create a Phaser Tween to fade the star sprite in and out.
            //  You could, of course, do this from within the Phaser Scene code, but this is just an example
            //  showing that Phaser objects and systems can be acted upon from outside of Phaser itself.
            scene.add.tween({
                targets: star,
                duration: 500 + Math.random() * 1000,
                alpha: 0,
                yoyo: true,
                repeat: -1
            });

        }

    }

}
