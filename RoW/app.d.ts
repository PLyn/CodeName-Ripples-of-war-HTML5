declare module Game {
    class Animation {
        public context: any;
        public animHolder: any;
        public finishPlaying: boolean;
        public counter: number;
        public delay: number;
        public timer: any;
        public x: any;
        public y: any;
        constructor(context: any);
        public queueAnimation(anim: any, x?: any, y?: any): void;
        public play: () => void;
    }
}
declare module Game {
    class BattleFormation {
        public positions: any;
        public bonus: any;
        public current: any;
        public formKey: any;
        public battleKeys: any;
        constructor();
        public setFormation(formation: String): void;
    }
}
declare module Game {
    class ItemManager {
        public consumable: Object[];
        public quest: Object[];
        public equipment: Object[];
        public itemSource: any;
        public itemKeys: any;
        constructor();
        public add(name: any, amt: any, type: any): void;
    }
}
declare module Game {
    class GameObject {
        public iKey: string;
        public sx: number;
        public sy: number;
        public dx: number;
        public dy: number;
        public W: number;
        public H: number;
        public img: HTMLImageElement;
        public scale: number;
        constructor(iKey: any, img: any, dx?: any, dy?: any, sx?: any, sy?: any, w?: any, h?: any, scale?: any);
        public render(context: any): void;
        public setPos(x: any, y: any): void;
    }
}
declare module Game {
    class Sprite extends GameObject {
        public Level: any;
        public ID: any;
        public Base: any;
        public Modified: any;
        public Equipment: Object;
        public Current: any;
        public dead: any;
        public Spells: any;
        public currentState: any;
        public growth: any;
        public defend: any;
        public ElementResist: any;
        public StatusResist: any;
        constructor(iKey: any, img: any, dx?: any, dy?: any, sx?: any, sy?: any, w?: any, h?: any, scale?: any);
        public setBaseAttributes(id: any, hp: any, mp: any, atk: any, def: any, spd: any, matk: any, mdef: any, luc: any, type: any): void;
        public setModifiedAttributes(id?: any, hp?: any, mp?: any, atk?: any, def?: any, spd?: any, matk?: any, mdef?: any, luc?: any, type?: any): void;
        public equipItem(name: any, equipment: any, type: any): void;
        public unequipItem(type: any): void;
        public getTotalStats(): {
            "ID": any;
            "HP": any;
            "MP": any;
            "Atk": any;
            "Def": any;
            "Spd": any;
            "MAtk": any;
            "MDef": any;
            "Luc": any;
            "Type": any;
        };
    }
}
declare module Game {
    class PartyManager {
        constructor();
        public add(char: any, x?: any, y?: any): void;
        public remove(char: any): void;
    }
}
declare module Game {
    class QuestManager {
        public Switch: boolean[];
        constructor();
    }
}
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
        public context2: any;
        constructor(ctx: any);
        public save(): void;
        public load(): void;
    }
}
declare module Game {
    class SpellManager {
        public SpellKeys: any;
        constructor();
        public AddSpell(character: any, SpellName: any): void;
        public RemoveSpell(character: any, SpellName: any): void;
    }
}
declare module Game {
    class Loop {
        public canvas: any;
        public context: any;
        constructor();
        public update(): void;
    }
}
declare var sManager: any;
declare var GAME_VERSION: string;
declare var PARTY_SIZE: number;
declare var GAME_WIDTH: number;
declare var GAME_HEIGHT: number;
declare var ITEM: any;
declare var PARTY: any;
declare var QUEST: any;
declare var FORMATION: any;
declare var SAVE: any;
declare var SPELL: any;
declare var TileMap: any;
declare var battleList: any[];
declare var equips: any[];
declare var objects: any[];
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
declare var that: any;
declare var mousedown: boolean;
declare var mEvent: any;
declare function mouseClicked(): boolean;
declare var ANIM_CACHE: any[];
declare var IMAGE_CACHE: any[];
declare var SPRITE_CACHE: any[];
declare var TILESET_CACHE: any[];
declare var TILEDATA_CACHE: any[];
declare var XML_CACHE: any[];
declare var SOUND_CACHE: any[];
declare var MUSIC_CACHE: any[];
declare var JSON_CACHE: any[];
declare var isLoaded: number;
declare var totalAssets: number;
declare var tilesetPos: number;
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
        public onTileJSONLoad: (key: any, response: any, pos: any) => void;
        public onXMLLoad: (key: any, response: any, pos: any) => void;
        public onJSONLoad: (key: any, response: any, pos: any) => void;
    }
}
declare module Game {
    class Tilemap {
        public currentIndex: any;
        public getTile(tileIndex: any, index: any): {
            "img": any;
            "px": number;
            "py": number;
        };
        public setTileset: (context: any, index: any) => void;
        public drawMapNoObjectReset: (context: any, mapID: any) => void;
    }
}
declare function Attack(context: CanvasRenderingContext2D, Attacker: Game.Sprite, Target: Game.Sprite): {
    "Atk": Game.Sprite;
    "Tar": Game.Sprite;
};
declare module Game {
    class State {
        constructor();
        public init(): void;
        public update(): void;
    }
}
declare module Game {
    class Battle extends State {
        public nextState: any;
        public nextID: any;
        public queue: Sprite[];
        public menu: any;
        public context: CanvasRenderingContext2D;
        public context2: CanvasRenderingContext2D;
        public states: any;
        public cTurn: any;
        public cState: any;
        public mx: any;
        public my: any;
        public newTime: number;
        public cTarget: any;
        public cSpell: any;
        public cSpellData: any;
        public turnDelay: any;
        public Anim: Animation;
        public playerCount: number;
        public mapID: any;
        public endCondition: any;
        public back: any;
        public items: any;
        public cItem: any;
        constructor(EnemyID: any, mapID: any);
        public drawLayer1(): void;
        public drawLayer2(): void;
        public init(): void;
        public update(): void;
        public drawLayers(): void;
        public CheckIfDead(): void;
        public isBattleOver(): void;
        public PlayerTurnInit(): void;
        public playerSelectCommand(): void;
        public playerSelectAttackTarget(): void;
        public playerAttack(): void;
        public playerDefend(): void;
        public spellCommandInit(): void;
        public selectSpell(): void;
        public spellTarget(): void;
        public spellCast(): void;
        public itemCommandInit(): void;
        public itemSelect(): void;
        public itemSelectTarget(): void;
        public enemyTurnInit(): void;
        public enemyAttack(): void;
        public endTurn(): void;
        public levelUpInit(): void;
        public levelUp(): void;
        public endBattle(): void;
    }
}
declare function getBattleStates(): {
    "PrePlayerTurn": number;
    "PSelectCommand": number;
    "PAtkSelectTarget": number;
    "PAtkAnim": number;
    "PAttack": number;
    "SpellDraw": number;
    "SpellSelect": number;
    "SpellTarget": number;
    "SpellAnim": number;
    "SpellCast": number;
    "PDefend": number;
    "ItemDraw": number;
    "ItemSelect": number;
    "ItemSelectTarget": number;
    "ItemAnim": number;
    "ItemUse": number;
    "PreEnemyTurn": number;
    "EAttack": number;
    "EAttackAnim": number;
    "ESpellAnim": number;
    "ESpellCast": number;
    "EDefend": number;
    "EndTurn": number;
    "PreLevelUp": number;
    "LevelUp": number;
    "BattleEnd": number;
};
declare function initializeItemBounds(): any[];
declare function applyStatus(effect: any, chance: any, sprite: Game.Sprite): Game.Sprite;
declare function applyStatusEffect(context: any, sprite: Game.Sprite): Game.Sprite;
declare function EnemyActionChooser(target: Game.Sprite, queue: Game.Sprite[]): any;
declare function EnemySpellCast(context: any, spell: any, queue: Game.Sprite[], target: number, caster: any): Game.Sprite[];
declare function initializeMenuBounds(): any[];
declare function SpellSelectDialog(sp: Game.Sprite, context: CanvasRenderingContext2D): any[];
declare function castSpellSingle(context: CanvasRenderingContext2D, spell: any, sp: Game.Sprite, caster: Game.Sprite): Game.Sprite;
declare function castSpellAll(context: CanvasRenderingContext2D, spell: any, queue: Game.Sprite[], caster: Game.Sprite): Game.Sprite[];
declare function StateDialogs(context: CanvasRenderingContext2D, state: any): void;
declare module Game {
    class Equip extends State {
        public context: CanvasRenderingContext2D;
        public mx: any;
        public my: any;
        public time: number;
        public back: boolean;
        public b: any;
        public m: any;
        public objects: any;
        public battler: Sprite;
        constructor(context: any);
        public drawEquip(): void;
        public addEquipPos(): void;
        public changeEquip(): void;
        public drawPC(): void;
        public reload(name: any): void;
        public checkCurrentChar(): void;
        public init(): void;
        public update(): void;
    }
}
declare module Game {
    class Explore extends State {
        public x: any;
        public y: any;
        public mx: any;
        public my: any;
        public layer1ctx: any;
        public layer2ctx: any;
        public mapID: any;
        public map: any;
        public startY: any;
        public startX: any;
        public time: any;
        constructor(ctx: any, mapID: any);
        public init(): void;
        public update(): void;
        public nextState(i: any): void;
    }
}
declare var equippedItem: boolean;
declare module Game {
    class EquipDetails extends State {
        public equip: any;
        public context: CanvasRenderingContext2D;
        public battler: Sprite;
        public equipType: any;
        public equipName: any;
        public e: any;
        public mx: any;
        public my: any;
        constructor(context: any, equip: any, equipName: any, type: any, battler: any);
        public init(): void;
        public update(): void;
    }
}
declare module Game {
    class Formation extends State {
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
        public addObjects(): void;
        public draw(): void;
        public changeFormation(): void;
        public init(): void;
        public update(): void;
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
    }
}
declare module Game {
    class ItemDetails extends State {
        public context: CanvasRenderingContext2D;
        public item: any;
        public clickBounds: any;
        public mx: any;
        public my: any;
        constructor(item: any, ctx: any);
        public init(): void;
        public update(): void;
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
        public keys: any;
        public item: any;
        public itemSelected: boolean;
        public time: number;
        public type: any;
        public battler: Sprite;
        constructor(ctx2: any, type: any, battler: any);
        public init(): void;
        public update(): void;
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
    }
}
declare module Game {
    class Cutscene extends State {
        public dia: any;
        public canvas: any;
        public canvas2: any;
        public context: any;
        public context2: any;
        public xmlID: any;
        public node: any;
        public currentNode: any;
        public lines: any[];
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
        public mapID: any;
        constructor(ctx: any, xmlID: any, mapID: any);
        public init(): void;
        public update(): void;
        public nextNode(): void;
        public renderDialog(): void;
        public renderBG(): void;
        public changeParty(): void;
        public editAbilities(): void;
        public editSwitch(): void;
        public playSFX(): void;
        public moveObject(): void;
        public changeObjects(): void;
        public playAnimation(): void;
        public playBGM(): void;
        public editItem(): void;
        public nextState(): void;
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
    }
}
declare module Game {
    class Title extends State {
        public context: CanvasRenderingContext2D;
        public MenuItems: any;
        public mx: any;
        public my: any;
        constructor(ctx: any);
        public init(): void;
        public update(): void;
    }
}
declare function initializeBattlePositions(enemyID: any): any[];
declare function quickWindow(context: any, x: any, y: any, w: any, h: any, fcolor: any, scolor: any, alpha?: any): void;
declare function LevelUp(sprite: Game.Sprite, context: any): void;
declare function LevelUpDisplay(context: CanvasRenderingContext2D, growth: any, base: any, sprite: Game.Sprite, spells: any): void;
declare function moveSprite(context: any, sx: any, sy: any, dx: any, dy: any): {
    "x": any;
    "y": any;
};
declare function ObjLength(obj: any): number;
declare function findPath(world: any, pathStart: any, pathEnd: any): any[];
declare function getRandomInt(min: any, max: any): any;
declare function setStyle(ctx: any, font: any, size: any, color: any, bold?: any, italic?: any, align?: any): void;
declare function FormatTilemap(mapID: any): any[];
declare function UseItem(context: CanvasRenderingContext2D, itemName: any, target: Game.Sprite): Game.Sprite;
declare function wrap(ctx: any, text: any): any[];
