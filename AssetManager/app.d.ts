declare var SCENE: any;
declare var EX: any;
declare var startScene: any;
declare module Game {
    class GenericArea {
        public x: any;
        public y: any;
        public velocity: any;
        public mx: any;
        public my: any;
        public cut: any;
        public explore: any;
        public prevState: number;
        public ctx: any;
        constructor(ctx: any, w: any, loop: any);
        public update: () => void;
        public render(context: any): void;
        public endLevel(ctx?: any): void;
    }
}
declare module Game {
    class Area1 {
        constructor(ctx: any, w: any, loop: any);
        public update: () => void;
    }
}
declare module Game {
    class Area2 {
        constructor(ctx: any, w: any, loop: any);
        public update: () => void;
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
    class Equipable {
        public Name: any;
        public Desc: any;
        public Type: any;
        public HP: any;
        public MP: any;
        public Atk: any;
        public Def: any;
        public Spd: any;
        public MDef: any;
        public Luc: any;
        constructor(name: any, desc: any, type: any, hp: any, mp: any, atk: any, def: any, mdef: any, spd: any, luc: any);
    }
}
declare module Game {
    class Accessory extends Equipable {
        constructor(name: any, desc: any, type: any, hp: any, mp: any, atk: any, def: any, mdef: any, spd: any, luc: any);
    }
}
declare module Game {
    class Body extends Equipable {
        constructor(name: any, desc: any, type: any, hp: any, mp: any, atk: any, def: any, mdef: any, spd: any, luc: any);
    }
}
declare module Game {
    class Feet extends Equipable {
        constructor(name: any, desc: any, type: any, hp: any, mp: any, atk: any, def: any, mdef: any, spd: any, luc: any);
    }
}
declare module Game {
    class Helm extends Equipable {
        constructor(name: any, desc: any, type: any, hp: any, mp: any, atk: any, def: any, mdef: any, spd: any, luc: any);
    }
}
declare module Game {
    class Weapon extends Equipable {
        constructor(name: any, desc: any, type: any, hp: any, mp: any, atk: any, def: any, mdef: any, spd: any, luc: any);
    }
}
declare module Game {
    class Sprite extends GameObject {
        public ID: any;
        public HP: any;
        public MP: any;
        public Atk: any;
        public Def: any;
        public Spd: any;
        public MDef: any;
        public Luc: any;
        public Type: any;
        public Equipment: Object;
        constructor(img: any, x: any, y: any, w: any, h: any, scale?: any);
        public setAttributes(id: any, hp: any, mp: any, atk: any, def: any, mdef: any, spd: any, luc: any, type: any): void;
        public equipItem(equipment: Equipable, type: any): void;
        public unequipItem(equipment: Equipable, type: any): void;
    }
}
declare var that: any;
declare var keys: any[];
declare var click: boolean;
declare var canvas: any;
declare var mEvent: any;
declare function mousedown(): boolean;
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
declare module Game {
    class StateManager {
        public gameStates: any;
        public stateStack: State[];
        constructor();
        public addState(key: any, state: any): void;
        public pushState(state: any): void;
        public popState(): void;
        public updateStack(): void;
        public renderStack(): void;
    }
}
declare var objects: any[];
declare module Game {
    class Tilemap {
        public tileimg: any;
        public tilepx: any;
        public tilepy: any;
        public tilewidth: any;
        public tileheight: any;
        public worldx: any;
        public worldy: any;
        public objimg: any;
        public objpx: any;
        public objpy: any;
        public objw: any;
        public objh: any;
        public objx: any;
        public objy: any;
        public key: any;
        public Init(): void;
        public getTile(tileIndex: any): {
            "img": any;
            "px": number;
            "py": number;
        };
        public setTileset: (context: any, index: any) => void;
        public drawMap: (mapcontext: any, objcontext: any) => void;
        public addObject(obj: any): void;
        public updateObject(objName: any, obj: any): void;
        public removeObject(objName: any): void;
    }
}
declare var control: any;
declare var tiles: any;
declare module Game {
    class Loop {
        public canvas: any;
        public context: any;
        public canvas2: any;
        public context2: any;
        public asset: any;
        public currentArea: any;
        public width: any;
        public battle: any;
        constructor();
        public update(): void;
        public render: () => void;
        public playerInput(): void;
    }
}
declare var pos: number;
declare var audioElement: HTMLAudioElement;
declare var WORLD: number;
declare var sManager: any;
declare module Game {
    class Init {
        public preloader: any;
        public world: any;
        public dialog: any;
        constructor();
        public onComplete: () => void;
        public GameLoop: () => void;
    }
}
declare module Game {
    class State {
        constructor();
        public init(): void;
        public update(): void;
        public render(): void;
        public pause(): void;
        public resume(): void;
        public destroy(): void;
    }
}
declare var BattleQ: any[];
declare var battleList: any[];
declare var menuOptions: any[];
declare module Game {
    class Battle extends State {
        public ctx: CanvasRenderingContext2D;
        public ctx2: CanvasRenderingContext2D;
        public p1: Sprite;
        public p2: Sprite;
        public e1: Sprite;
        public e2: Sprite;
        public mx: any;
        public my: any;
        public menuOptions: Object[];
        public currentPlayer: Sprite;
        public target: Sprite;
        public newTime: number;
        public battleKeys: any;
        public currentkey: number;
        public enemySelect: any;
        public drawCommands: any;
        constructor(ctx: any, ctx2: any);
        public statusGUI(): void;
        public newTurn(): void;
        public PlayerMenuInit(): void;
        public renderActors(): void;
        public battleOver(): boolean;
        public init(): void;
        public update(): void;
        public render(): void;
        public pause(): void;
        public resume(): void;
        public destroy(): void;
    }
}
declare module Game {
    class Cutscene extends State {
        public dia: any;
        public canvas: any;
        public context: any;
        public ctl: any;
        public xmlID: any;
        constructor(id: any, width: any, height: any, ctx: any, xmlID: any);
        public init(): void;
        public update(): void;
        public render(): void;
        public pause(): void;
        public resume(): void;
        public destroy(): void;
    }
}
declare var equips: any[];
declare module Game {
    class EquipShop extends State {
        public ctx: CanvasRenderingContext2D;
        public ctx2: CanvasRenderingContext2D;
        public mx: any;
        public my: any;
        constructor(ctx: any, ctx2: any);
        public drawEquip(): void;
        public addEquipPos(): void;
        public changeEquip(): void;
        public init(): void;
        public update(): void;
        public render(): void;
        public pause(): void;
        public resume(): void;
        public destroy(): void;
    }
}
declare module Game {
    class Explore extends State {
        public x: any;
        public y: any;
        public velocity: any;
        public mx: any;
        public my: any;
        public layer1ctx: any;
        public layer2ctx: any;
        public currentArea: any;
        public mapID: any;
        public game: any;
        constructor(ctx: any, w: any, mapID: any, area: any, game: any);
        public init(): void;
        public update(): void;
        public render(): void;
        public pause(): void;
        public resume(): void;
        public destroy(): void;
    }
}
declare module Game {
    class SelectEquip extends State {
        public ctx2: CanvasRenderingContext2D;
        constructor(ctx2: any);
        public init(): void;
        public update(): void;
        public render(): void;
        public pause(): void;
        public resume(): void;
        public destroy(): void;
    }
}
declare module Game {
    class StatusMenu extends State {
        public mx: any;
        public my: any;
        constructor(ctx: any);
        public init(): void;
        public update(): void;
        public render(): void;
        public pause(): void;
        public resume(): void;
        public destroy(): void;
    }
}
declare function getRandomInt(min: any, max: any): any;
declare function setStyle(ctx: any, font: any, size: any, color: any, bold?: any, italic?: any, align?: any): void;
declare function wrap(ctx: any, cwidth: any, text: any): any[];
