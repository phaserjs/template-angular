# Phaser Angular Template

This is a Phaser 3 project template that uses the Angular framework. It includes a bridge for Angular to Phaser game communication, hot-reloading for quick development workflow and scripts to generate production-ready builds.

### Versions

This template has been updated for:

- [Phaser 3.80.1](https://github.com/phaserjs/phaser)
- [Angular 17.2.0](https://github.com/angular)
- [TypeScript 5.3.2](https://github.com/microsoft/TypeScript)

![screenshot](screenshot.png)

## Requirements

[Node.js](https://nodejs.org) is required to install dependencies and run scripts via `npm`.
[ng cli](https://angular.io/cli) is required to run the project.

## Available Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install project dependencies |
| `npm run dev` | Launch a development web server |
| `npm run build` | Create a production build in the `build` folder |

## Writing Code

After cloning the repo, run `npm install` from your project directory. Install ng cli with `npm install -g @angular/cli`. Then, you can start the local development server by running `npm run dev`.

The local development server runs on `http://localhost:8080` by default. Please see the Angular documentation if you wish to change this, or add SSL support.

Once the server is running you can edit any of the files in the `src` folder. Angular will automatically recompile your code and then reload the browser.

## Template Project Structure

We have provided a default project structure to get you started. This is as follows:

- `index.html` - The HTML Angular entry point.
- `src` - Contains the Angular source code.
- `src/main.ts` - The main **Angular** entry point. This bootstraps the Angular application.
- `src/app/app.component.ts` - The main Angular component.
- `src/app/app.component.html` - The main HTML Angular component.
- `src/game/phaser-game.component.ts` - The Angular component that initializes the Phaser Game and serve like a bridge between Angular and Phaser.
- `src/game/EventBus.ts` - A simple event bus to communicate between Angular and Phaser.
- `src/game` - Contains the game source code.
- `src/game/main.ts` - The main **game** entry point. This contains the game configuration and start the game.
- `src/game/scenes/` - The Phaser Scenes are in this folder.
- `src/style.css` - Some simple CSS rules to help with page layout.
- `src/assets` - Contains the static assets used by the game.

## Angular Bridge

The `phaser-game.component.ts` component is the bridge between Angular and Phaser. It initializes the Phaser game and passes events between the two.

To communicate between Angular and Phaser, you can use the **EventBus.ts** file. This is a simple event bus that allows you to emit and listen for events from both Angular and Phaser.

```js
// In Angular
import { EventBus } from './EventBus';

// In any Angular component method
// Emit an event
EventBus.emit('event-name', data);

// In Phaser
// Listen for an event
EventBus.on('event-name', (data) => {
    // Do something with the data
});
```

In addition to this, the `phaser-game` component exposes the Phaser game instance along with the most recently active Phaser Scene. You can pick these up from Angular via `@ViewChild(PhaserGame) phaserRef!: PhaserGame;` (we explain this later).

## Phaser Scene Handling

In Phaser, the Scene is the lifeblood of your game. It is where you sprites, game logic and all of the Phaser systems live. You can also have multiple scenes running at the same time. This template provides a way to obtain the current active scene from Vue.

You can get the current Phaser Scene from the component event `"current-active-scene"`. In order to do this, you need to emit the event `"current-scene-ready"` from the Phaser Scene class. This event should be emitted when the scene is ready to be used. You can see this done in all of the Scenes in our template.

**Important**: When you add a new Scene to your game, make sure you expose to Angular by emitting the `"current-scene-ready"` event via the `EventBus`, like this:


```js
class MyScene extends Phaser.Scene
{
    constructor ()
    {
        super('MyScene');
    }

    create ()
    {
        // Your Game Objects and logic here

        // At the end of create method:
        EventBus.emit('current-scene-ready', this);
    }
}
```

You don't have to emit this event if you don't need to access the specific scene from Angular. Also, you don't have to emit it at the end of `create`, you can emit it at any point. For example, should your Scene be waiting for a network request or API call to complete, it could emit the event once that data is ready.

### Angular Component Example

Here's an example of how to access Phaser data for use in a Angular Component:

```ts
import { PhaserGame } from '../game/phaser-game.component';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [ PhaserGame],
    templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewInit {

    // This is a reference from the PhaserGame component
    @ViewChild(PhaserGame) phaserRef!: PhaserGame;

    ngAfterViewInit() {

        // This is the Phaser Game instance
        const game = this.phaserRef.game;

        // This is the most recently active Scene
        const scene = this.phaserRef.scene;

        // Listen for the current active ready scene
        EventBus.on('current-scene-ready', (scene: Phaser.Scene) => {
            
        });
    }
}
```

In the code above, you can get a reference to the current Phaser Game instance and the current Scene by calling `@ViewChild(PhaserGame) phaserRef!: PhaserGame`.

From this component reference, the game instance is available via `this.phaserRef.game` and the most recently active Scene via `this.phaserRef.scene`

The `EventBus.on('current-scene-ready')` callback will also be invoked whenever the the Phaser Scene changes, as long as you emit the event via the EventBus, as outlined above.

## Handling Assets

To load static files such as audio files, videos, etc place them into the `public/assets` folder. Then you can use this path in the Loader calls within Phaser:

```js
preload ()
{
    //  This is an example of an imported bundled image.
    //  Remember to import it at the top of this file
    this.load.image('logo', logoImg);

    //  This is an example of loading a static image
    //  from the public/assets folder:
    this.load.image('background', 'assets/bg.png');
}
```

When you issue the `npm run build` command, all static assets are automatically copied to the `dist/assets` folder.

## Deploying to Production

After you run the `npm run build` command, your code will be built into a single bundle and saved to the `dist` folder, along with any other assets your project imported, or stored in the public assets folder.

In order to deploy your game, you will need to upload *all* of the contents of the `dist/browser` folder to a public facing web server.

## Customizing the Template

### Angular

If you want to customize your build, such as adding plugin (i.e. for loading CSS or fonts), you can modify the `angular.json` file for cross-project changes, or you can modify and/or create new configuration files and target them in specific npm tasks inside of `package.json`. Please see the [Angular documentation](https://angular.io/guide/workspace-config) for more information.

## Join the Phaser Community!

We love to see what developers like you create with Phaser! It really motivates us to keep improving. So please join our community and show-off your work 😄

**Visit:** The [Phaser website](https://phaser.io) and follow on [Phaser Twitter](https://twitter.com/phaser_)<br />
**Play:** Some of the amazing games [#madewithphaser](https://twitter.com/search?q=%23madewithphaser&src=typed_query&f=live)<br />
**Learn:** [API Docs](https://newdocs.phaser.io), [Support Forum](https://phaser.discourse.group/) and [StackOverflow](https://stackoverflow.com/questions/tagged/phaser-framework)<br />
**Discord:** Join us on [Discord](https://discord.gg/phaser)<br />
**Code:** 2000+ [Examples](https://labs.phaser.io)<br />
**Read:** The [Phaser World](https://phaser.io/community/newsletter) Newsletter<br />

Created by [Phaser Studio](mailto:support@phaser.io). Powered by coffee, anime, pixels and love.

The Phaser logo and characters are &copy; 2011 - 2024 Phaser Studio Inc.

All rights reserved.
