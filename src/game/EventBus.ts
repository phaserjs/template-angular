import { Events } from 'phaser';

// Used to emit events between Angular components and Phaser scenes
// https://newdocs.phaser.io/docs/3.70.0/Phaser.Events.EventEmitter
export const EventBus = new Events.EventEmitter();
