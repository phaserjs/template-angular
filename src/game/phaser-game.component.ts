import type { OnInit } from "@angular/core";
import { Component } from "@angular/core";
import type Phaser from "phaser";
import { EventBus } from "./EventBus";
import StartGame from "./main";

@Component({
    selector: 'app-phaser-game',
    template: '<div id="game-container"></div>',
    standalone: true,
})
export class PhaserGameComponent implements OnInit
{

    scene: Phaser.Scene;
    game: Phaser.Game;

    sceneCallback: (scene: Phaser.Scene) => void;

    ngOnInit()
    {
        this.game = StartGame('game-container');

        EventBus.on('current-scene-ready', (scene: Phaser.Scene) => {

            this.scene = scene;

            if (this.sceneCallback)
            {

                this.sceneCallback(scene);

            }

        });
    }

    // Component unmounted
    ngOnDestroy()
    {

        if (this.game)
        {

            this.game.destroy(true);

        }
    }
}
