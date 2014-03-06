declare module Game {
    class GenericArea {
        public x: any;
        public y: any;
        public velocity: any;
        public mx: any;
        public my: any;
        public dia: any;
        constructor(ctx: any, w: any);
        public update(): void;
        public render(context: any): void;
        public objectClick: (x: any, y: any, obj: any) => void;
    }
}
declare module Game {
    class Dialogue {
        public dialogueObject: any;
        public lines: any[];
        public canvasWidth: any;
        public ctx: any;
        public linePos: number;
        public time: number;
        public currentTime: number;
        public prevName: any;
        public lineHeight: number;
        constructor(ctx: any, cwidth: any);
        public startScene: (key: any, tagName: any, index: any) => void;
        public updateScene: () => void;
        public setStyle(font: any, size: any, color: any, bold?: any, italic?: any, align?: any): void;
    }
}
declare var GAME_OBJECTS: any[];
declare module Game {
    class GameObject {
        public x: number;
        public y: number;
        public W: number;
        public H: number;
        public img: HTMLImageElement;
        public scale: number;
        constructor(img: any, x: any, y: any, w: any, h: any, scale?: any);
        public update(): void;
        public render(context: any, x: any, y: any): void;
    }
}
declare module Game {
    class Sprite extends GameObject {
        public a: any;
        constructor(img: any, x: any, y: any, w: any, h: any, a: any, scale?: any);
    }
}
declare module Game {
    class input {
        public keys: any;
        public click: any;
        public canvas: any;
        public mEvent: any;
        constructor(canvas: any);
        public keydown(key: any): any;
        public keyup(key: any): boolean;
        public mousedown(): any;
    }
}
declare var ANIM_CACHE: any[];
declare var IMAGE_CACHE: any[];
declare var SPRITE_CACHE: any[];
declare var TILESET_CACHE: any[];
declare var TILEDATA_CACHE: any[];
declare var XML_CACHE: any[];
declare var SOUND_CACHE: any[];
declare var MUSIC_CACHE: any[];
declare module Game {
    class Preloader {
        public animData: any;
        public animSource: HTMLImageElement;
        public animkey: any[];
        public animPos: number;
        public height: number;
        public isError: number;
        public isLoaded: number;
        public numTilesX: number;
        public numTilesY: number;
        public pixelSizeX: number;
        public pixelSizeY: number;
        public scale: number;
        public sprite: HTMLImageElement;
        public spriteData: any;
        public spritekey: any[];
        public spritePos: number;
        public spriteSource: HTMLImageElement;
        public tileKey: any;
        public isFilesLoaded: boolean;
        public tilesetPos: number;
        public tileSizeX: number;
        public tileSizeY: number;
        public tiledData: any;
        public timerid: any;
        public totalAssets: number;
        public width: number;
        public x: number;
        public xmlKey: any;
        public y: number;
        public queueAssets(Assets: any, load: any): void;
        public genericLoader(url: any, isImage: any, key?: any, onLoad?: any, typeOfFile?: any): void;
        public soundloader(sounds: any, type: any): void;
        public soundFormat(audioElement: any): string;
        public loadfile(key: any, url: any, onLoad: any, type: any): void;
        public onAnimJSONLoad: (key: any, response: any) => void;
        public onSpriteJSONLoad: (key: any, response: any) => void;
        public onTileJSONLoad: (key: any, response: any) => void;
        public onXMLLoad: (key: any, response: any) => void;
    }
}
declare var objects: any[];
declare module Game {
    class Tilemap {
        public key: any;
        public Init(): void;
        public getObjects: (context: any, index: any) => void;
        public getTile(tileIndex: any): {
            "img": any;
            "px": number;
            "py": number;
        };
        public drawTiles: (context: any, index: any) => void;
    }
}
declare var control: any;
declare var tiles: any;
declare module Game {
    class Loop {
        public canvas: any;
        public context: any;
        public asset: any;
        public currentArea: any;
        constructor(canvasid: any, width: any, height: any, preloader: any);
        public update(): void;
        public render: () => void;
        public playerInput(): void;
    }
}
declare var pos: number;
declare var audioElement: HTMLAudioElement;
declare module Game {
    class Init {
        public preloader: any;
        public world: any;
        constructor();
        public onComplete: () => void;
        public GameLoop: () => void;
    }
}
declare function wrap(ctx: any, cwidth: any, text: any): any[];
