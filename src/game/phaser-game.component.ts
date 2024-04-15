import type { AfterViewInit, ElementRef } from '@angular/core';
import
    {
        ChangeDetectionStrategy,
        Component,
        DestroyRef,
        inject,
        viewChild,
    } from '@angular/core';
import type { Game, Scene } from 'phaser';
import { EventBus } from './EventBus';
import { StartGame } from './main';
import type { GameScene } from './scenes/GameScene.abstract';

@Component({
    selector: 'app-phaser-game',
    template: `<div #game></div>`,
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PhaserGameComponent implements AfterViewInit {
    scene: Scene;
    game: Game;
    gameContainer = viewChild.required<ElementRef<HTMLDivElement>>('game');

    private detroyRef = inject(DestroyRef);

    sceneCallback: (scene: Scene) => void;

    ngAfterViewInit(): void {
        this.game = StartGame(this.gameContainer().nativeElement);

        EventBus.on('current-scene-ready', (scene: GameScene) => {
            this.scene = scene;
            if (this.sceneCallback) {
                this.sceneCallback(scene);
            }
        });

        this.detroyRef.onDestroy(() => this.game?.destroy(true));
    }
}
