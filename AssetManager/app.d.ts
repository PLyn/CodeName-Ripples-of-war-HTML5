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
    class Animation {
        public context: any;
        public animHolder: any;
        public finishPlaying: boolean;
        public counter: number;
        constructor(context: any);
        public queueAnimation(anim: any): void;
        public play: () => void;
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
declare var JSON_CACHE: any[];
declare module Game {
    class Preloader {
        public animData: any;
        public animSource: HTMLImageElement;
        public animkey: any[];
        public animPos: number;
        public height: number;
        public isError: number;
        public isLoaded: number;
        public jsonKey: any[];
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
        public loadfile(key: any, url: any, onLoad: any, type: any, pos?: any): void;
        public onAnimJSONLoad: (key: any, response: any) => void;
        public onSpriteJSONLoad: (key: any, response: any) => void;
        public onTileJSONLoad: (key: any, response: any) => void;
        public onXMLLoad: (key: any, response: any, pos: any) => void;
        public onJSONLoad: (key: any, response: any, pos: any) => void;
    }
}
declare var FORMATION: any;
declare module Game {
    class BattleFormation {
        public positions: any;
        public bonus: any;
        public current: any;
        public formKey: any;
        public battleKeys: any;
        public positionLength: number;
        constructor();
        public setFormation(formation: String): void;
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
        public sx: number;
        public sy: number;
        public dx: number;
        public dy: number;
        public W: number;
        public H: number;
        public img: HTMLImageElement;
        public scale: number;
        constructor(img: any, dx?: any, dy?: any, sx?: any, sy?: any, w?: any, h?: any, scale?: any);
        public update(): void;
        public render(context: any): void;
        public setPos(x: any, y: any): void;
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
declare var statusEffects: {
    "normal": number;
    "dead": number;
    "poison": number;
    "sleep": number;
    "paralyze": number;
};
declare module Game {
    class Sprite extends GameObject {
        public Level: any;
        public ID: any;
        public Base: any;
        public Modified: any;
        public Equipment: Object;
        public Current: any;
        public dead: boolean;
        public Spells: any;
        public currentState: any;
        public growth: any;
        public mox: any;
        public moy: any;
        public context: any;
        public interval: any;
        constructor(img: any, dx?: any, dy?: any, sx?: any, sy?: any, w?: any, h?: any, scale?: any);
        public setBaseAttributes(id: any, hp: any, mp: any, atk: any, def: any, mdef: any, spd: any, luc: any, type: any): void;
        public setModifiedAttributes(id?: any, hp?: any, mp?: any, atk?: any, def?: any, mdef?: any, spd?: any, luc?: any, type?: any): void;
        public equipItem(name: any, equipment: Equipable, type: any): void;
        public unequipItem(type: any): void;
        public getTotalStats(): {
            "ID": any;
            "HP": any;
            "MP": any;
            "Atk": any;
            "Def": any;
            "Spd": any;
            "MDef": any;
            "Luc": any;
            "Type": any;
        };
        public levelUp(): void;
    }
}
declare var that: any;
declare var keys: any[];
declare var mousedown: boolean;
declare var canvas: any;
declare var mEvent: any;
declare var clickTime: number;
declare function mouseClicked(): boolean;
declare var ITEM: any;
declare module Game {
    class ItemManager {
        public consumable: Object[];
        public quest: Object[];
        public itemSource: any;
        public itemKeys: any;
        constructor();
        public add(name: any, amt: any, type: any): void;
    }
}
declare var PARTY: any;
declare module Game {
    class PartyManager {
        public character: any;
        constructor();
        public add(char: any, type: any, x?: any, y?: any): void;
        public remove(char: any, type: any): void;
    }
}
declare var QUEST: any;
declare module Game {
    class QuestManager {
        public Switch: boolean[];
        constructor();
    }
}
declare var SAVE: any;
declare module Game {
    class SaveSystem {
        public MapID: any;
        public PartyMembers: Sprite[];
        public QuestItems: Object[];
        public cName: any;
        public cAmt: any;
        public qName: any;
        public qAmt: any;
        public switches: any;
        public context: any;
        public ctx: any;
        public ctx2: any;
        constructor(ctx: any);
        public save(): void;
        public load(w: any): void;
    }
}
declare var SPELL: any;
declare module Game {
    class SpellManager {
        public SpellKeys: any;
        constructor();
        public AddSpell(character: any, SpellName: any): void;
        public RemoveSpell(character: any, SpellName: any): void;
    }
}
declare module Game {
    class StateManager {
        public gameStates: any;
        public stateStack: State[];
        public time: number;
        constructor();
        public addState(key: any, state: any): void;
        public pushState(state: any): void;
        public popState(): void;
        public restart(): void;
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
        public currentIndex: any;
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
declare var TileMap: any;
declare module Game {
    class Loop {
        public canvas: any;
        public context: any;
        public canvas2: any;
        public context2: any;
        public width: any;
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
declare var GAME_VERSION: string;
declare var PARTY_SIZE: number;
declare var GAME_WIDTH: number;
declare var GAME_HEIGHT: number;
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
declare var battleList: any[];
declare module Game {
    class BattleRewrite extends State {
        public nextState: any;
        public queue: Sprite[];
        public menu: any;
        public context: CanvasRenderingContext2D;
        public context2: CanvasRenderingContext2D;
        public states: any;
        public cTurn: any;
        public cState: any;
        public mx: any;
        public my: any;
        public newTime: any;
        constructor(EnemyID: any);
        public drawLayer1(): void;
        public drawLayer2(): void;
        public init(): void;
        public update(): void;
        public render(): void;
        public pause(): void;
        public resume(): void;
        public destroy(): void;
    }
}
declare function initializeBattlePositions(enemyID: any): void;
declare function initializeMenuBounds(): any[];
declare function input_template(len: any, bounds: any, f: any): void;
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
        public endTime: number;
        public currentHP: any;
        public formation: any;
        public command: any;
        public spellList: any;
        public currentSpell: any;
        public spellSelect: boolean;
        public status: any;
        public applyStatus: boolean;
        public EnemyID: any;
        public nextState: any;
        constructor(ctx: any, ctx2: any, EnemyID: any);
        public Action(): void;
        public SelectSpell(): void;
        public Target(time: any): void;
        public statusGUI(): void;
        public newTurn(): void;
        public PlayerMenuInit(): void;
        public renderActors(): void;
        public battleOver(): boolean;
        public playerAttack(attacker: any, target: any): void;
        public playerSpell(caster: any, spell: any, target: any): void;
        public checkSpriteState(target: any): void;
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
        public canvas2: any;
        public context: any;
        public context2: any;
        public ctl: any;
        public xmlID: any;
        public node: any;
        public currentNode: any;
        public lines: any[];
        public canvasWidth: any;
        public ctx: any;
        public linePos: number;
        public time: number;
        public currentTime: number;
        public prevName: any;
        public lineHeight: number;
        public initNode: boolean;
        public nCounter: number;
        public nodeCount: number;
        public textNodes: any[];
        public sfx: any;
        public anim: any;
        public animate: any;
        constructor(id: any, width: any, height: any, ctx: any, xmlID: any);
        public init(): void;
        public nextNode(): void;
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
        public mapID: any;
        public width: any;
        public map: any;
        constructor(ctx: any, w: any, mapID: any);
        public init(): void;
        public update(): void;
        public nextState(i: any): void;
        public render(): void;
        public pause(): void;
        public resume(): void;
        public destroy(): void;
    }
}
declare var equips: any[];
declare module Game {
    class Equip extends State {
        public context: CanvasRenderingContext2D;
        public mx: any;
        public my: any;
        public time: number;
        public back: boolean;
        public stats: any;
        public objects: any;
        public battler: any;
        constructor(context: any);
        public drawEquip(): void;
        public addEquipPos(): void;
        public changeEquip(): void;
        public drawPC(): void;
        public reload(name: any): void;
        public checkCurrentChar(): void;
        public init(): void;
        public update(): void;
        public render(): void;
        public pause(): void;
        public resume(): void;
        public destroy(): void;
    }
}
declare module Game {
    class Formation extends State {
        public ctx: CanvasRenderingContext2D;
        public ctx2: CanvasRenderingContext2D;
        public mx: any;
        public my: any;
        public time: number;
        public back: boolean;
        public forms: any;
        public keys: any;
        public battleKeys: any;
        public formation: any;
        constructor(ctx2: any);
        public draw(): void;
        public addObjects(): void;
        public changeFormation(): void;
        public init(): void;
        public update(): void;
        public render(): void;
        public pause(): void;
        public resume(): void;
        public destroy(): void;
    }
}
declare module Game {
    class Inventory extends State {
        public context: any;
        public items: any;
        public mx: any;
        public my: any;
        constructor(ctx2: any);
        public init(): void;
        public reload(type: String): void;
        public update(): void;
        public render(): void;
        public pause(): void;
        public resume(): void;
        public destroy(): void;
    }
}
declare module Game {
    class ItemDetails extends State {
        public context: any;
        public item: any;
        public clickBounds: any;
        public mx: any;
        public my: any;
        constructor(item: any, ctx: any);
        public init(): void;
        public update(): void;
        public render(): void;
        public pause(): void;
        public resume(): void;
        public destroy(): void;
    }
}
declare module Game {
    class Save extends State {
        public context: any;
        public mx: any;
        public my: any;
        public objects: any;
        public time: number;
        public saveTime: number;
        public type: any;
        public initBool: boolean;
        constructor(context: any);
        public init(): void;
        public action(type: any): void;
        public update(): void;
        public render(): void;
        public pause(): void;
        public resume(): void;
        public destroy(): void;
    }
}
declare var currentEquips: any[];
declare module Game {
    class SelectEquip extends State {
        public ctx2: CanvasRenderingContext2D;
        public mx: any;
        public my: any;
        public hKeys: any;
        public bKeys: any;
        public wKeys: any;
        public fKeys: any;
        public item: any;
        public itemSelected: boolean;
        public time: number;
        public type: any;
        public battler: any;
        constructor(ctx2: any, type: any, battler: any);
        public init(): void;
        public update(): void;
        public render(): void;
        public pause(): void;
        public resume(): void;
        public destroy(): void;
    }
}
declare module Game {
    class Setting extends State {
        public context: CanvasRenderingContext2D;
        public mx: any;
        public my: any;
        public objects: any;
        public soundBool: boolean;
        public musicBool: boolean;
        public time: number;
        constructor(context: any);
        public init(): void;
        public update(): void;
        public soundBox(): void;
        public musicBox(): void;
        public render(): void;
        public pause(): void;
        public resume(): void;
        public destroy(): void;
    }
}
declare module Game {
    class Status extends State {
        public context: any;
        public battler: Sprite;
        public objects: any;
        public mx: any;
        public my: any;
        constructor(context: any);
        public init(): void;
        public reload(name: any): void;
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
        public menuItems: any;
        public context: CanvasRenderingContext2D;
        constructor(ctx: any);
        public init(): void;
        public update(): void;
        public render(): void;
        public pause(): void;
        public resume(): void;
        public destroy(): void;
    }
}
declare module Game {
    class Title extends State {
        public context: CanvasRenderingContext2D;
        public MenuItems: any;
        public mx: any;
        public my: any;
        public width: any;
        constructor(ctx: any, w: any);
        public init(): void;
        public update(): void;
        public render(): void;
        public pause(): void;
        public resume(): void;
        public destroy(): void;
    }
}
declare function quickWindow(x: any, y: any, w: any, h: any, fcolor: any, scolor: any): void;
declare function LevelUp(sprite: Game.Sprite, context: any): void;
declare function LevelUpDisplay(context: CanvasRenderingContext2D, growth: any, base: any, name: any, spells: any): void;
declare function moveSprite(context: any, dx: any, dy: any, sprite: Game.Sprite): void;
declare function ObjLength(obj: any): number;
declare function findPath(world: any, pathStart: any, pathEnd: any): any[];
declare function getRandomInt(min: any, max: any): any;
declare function setStyle(ctx: any, font: any, size: any, color: any, bold?: any, italic?: any, align?: any): void;
declare function FormatTilemap(mapID: any): any[];
declare function wrap(ctx: any, cwidth: any, text: any): any[];
