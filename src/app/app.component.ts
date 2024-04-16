import { JsonPipe } from '@angular/common';
import type { OnInit } from '@angular/core';
import {
    ChangeDetectionStrategy,
    Component,
    signal,
    viewChild,
} from '@angular/core';
import type { Scene } from 'phaser';
import { Math as PhaserMath } from 'phaser';
import { EventBus } from '../game/EventBus';
import { PhaserGameComponent } from '../game/phaser-game.component';
import { isGameScene } from '../game/scenes/GameScene.abstract';
import type { MainMenu } from '../game/scenes/MainMenu';
@Component({
    selector: 'app-root',
    standalone: true,
    imports: [PhaserGameComponent, JsonPipe],
    templateUrl: './app.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
    spritePosition = signal({ x: 0, y: 0 });
    canMoveSprite = signal(false);
    phaserRef = viewChild.required(PhaserGameComponent);

    ngOnInit() {
        EventBus.on('current-scene-ready', (scene: Scene) => {
            this.canMoveSprite.set(scene.scene.key !== 'MainMenu');
        });
    }

    // These methods are called from the template
    public changeScene() {
        const scene = this.phaserRef().scene;
        if (isGameScene(scene)) {
            scene.changeScene();
        }
    }

    public moveSprite() {
        const scene = this.phaserRef().scene as MainMenu;

        // Get the update logo position
        scene.moveLogo(({ x, y }) => {
            this.spritePosition.set({ x, y });
        });
    }

    public addSprite() {
        const scene = this.phaserRef().scene;
        // Add more stars
        const x = PhaserMath.Between(64, scene.scale.width - 64);
        const y = PhaserMath.Between(64, scene.scale.height - 64);

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
            repeat: -1,
        });
    }
}
