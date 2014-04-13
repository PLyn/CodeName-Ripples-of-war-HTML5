window.onload = function () {
    var game = new Game.Init();
};
//deal with this function later to do proper coordinates for mouse position in canvas, not as important
//atm due to the fact that the entire game is on a empty page so the coordinates work so far but if there are
//more headers and divs or spans, the coordinates could become very inaccurate and have weird effects
//so keep this around for future reference when i need to tackle this issue
/*
function relMouseCoords(event) {
var totalOffsetX = 0;
var totalOffsetY = 0;
var canvasX = 0;
var canvasY = 0;
var currentElement = this;
do {
totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
}
while(currentElement === currentElement.offsetParent)
canvasX = event.pageX - totalOffsetX;
canvasY = event.pageY - totalOffsetY;
return { x: canvasX, y: canvasY }
}
*/
var SCENE;
var EX;
var startScene;
var Game;
(function (Game) {
    var GenericArea = (function () {
        //make this as the name suggests, a more generic class for other classes to build on
        //to create "scenes" physcially such as the palce, music etc for the dialogue scenes and exploration aspects
        //most of the specific code will be removed and put somewhere else like in the states
        function GenericArea(ctx, w, loop) {
            this.prevState = 0;
            this.update = function () {
                sManager.updateStack();
            };
            this.x = 0;
            this.y = 0;
            this.mx = 0;
            this.my = 0;
            this.velocity = 2.0;
            GAME_OBJECTS.push(SPRITE_CACHE[0]);

            /*SCENE = new Cutscene("scene", 800, 600, ctx);
            EX = new Explore(ctx, w);*/
            this.ctx = ctx;
            startScene = true;
            // sManager.pushState(new Explore(ctx, w, 'rpg', this, loop));
        }
        GenericArea.prototype.render = function (context) {
            /*ANIM_CACHE['at'][pos].render(context, 200, 150);
            pos = (pos + 1) % ANIM_CACHE['at'].length;*/
        };
        GenericArea.prototype.endLevel = function (ctx) {
        };
        return GenericArea;
    })();
    Game.GenericArea = GenericArea;
})(Game || (Game = {}));
///<reference path='genericArea.ts' />
var Game;
(function (Game) {
    var Area1 = (function () {
        function Area1(ctx, w, loop) {
            this.update = function () {
                sManager.updateStack();
            };
            //super(ctx, w, loop);
            sManager.pushState(new Game.Explore(ctx, w, 'rpg', this, loop));
        }
        return Area1;
    })();
    Game.Area1 = Area1;
})(Game || (Game = {}));
///<reference path='genericArea.ts' />
var Game;
(function (Game) {
    var Area2 = (function () {
        function Area2(ctx, w, loop) {
            this.update = function () {
                sManager.updateStack();
            };
            //super(ctx, w, loop);
            sManager.pushState(new Game.Explore(ctx, w, 'carpet', this, loop));
        }
        return Area2;
    })();
    Game.Area2 = Area2;
})(Game || (Game = {}));
var Game;
(function (Game) {
    var Dialogue = (function () {
        //only major issue or feature i can think of left for this module is the text appearing as time goes on
        //like i did in the phaser dialogue module, should be relatively easy to implement with the logic from
        //the phaser project
        //There is also the creation of a new canvas for the dialog to appear on but that will be taken
        //care of in the state system since the canvas should probably be created there
        function Dialogue(ctx, cwidth) {
            var _this = this;
            this.lines = [];
            this.linePos = 0;
            this.time = 0;
            this.currentTime = 0;
            this.lineHeight = 1;
            this.startScene = function (key, tagName, index) {
                _this.dialogueObject = XML_CACHE[key].getElementsByTagName(tagName)[index];
                _this.lines = wrap(_this.ctx, _this.canvasWidth, _this.dialogueObject);
                _this.prevName = _this.lines[_this.linePos].name;
                /*this.ctx.fillText(this.lines[this.linePos].message, 150, (300 + this.lineHeight));
                this.ctx.fillText(this.lines[this.linePos].name, 50, 250);
                this.linePos++;*/
            };
            this.updateScene = function () {
                _this.currentTime = Date.now();
                if (_this.linePos < _this.lines.length && _this.currentTime > _this.time) {
                    _this.time = _this.currentTime + 750;
                    if (_this.prevName !== _this.lines[_this.linePos].name) {
                        _this.ctx.clearRect(0, 0, 800, 600);
                        _this.prevName = _this.lines[_this.linePos].name;
                        _this.lineHeight = 1;
                    } else if (_this.linePos >= 1) {
                        _this.lineHeight += 25;
                    }
                    _this.ctx.drawImage(IMAGE_CACHE['dialog'], 25, 350);
                    _this.ctx.fillText(_this.lines[_this.linePos].message, 50, (425 + _this.lineHeight));
                    _this.ctx.fillText(_this.lines[_this.linePos].name, 30, 400);
                    _this.linePos++;
                } else if (_this.linePos >= _this.lines.length && _this.currentTime > _this.time) {
                    //this.area.endLevel();
                    _this.ctx.clearRect(0, 0, 800, 600);
                    sManager.popState();
                }
            };
            this.ctx = ctx;
            this.canvasWidth = cwidth;
            setStyle(this.ctx, 'Calibri', '16pt', 'white', 'bold', 'italic', 'left');
        }
        return Dialogue;
    })();
    Game.Dialogue = Dialogue;
})(Game || (Game = {}));
var Game;
(function (Game) {
    var Equipable = (function () {
        function Equipable(name, desc, type, hp, mp, atk, def, mdef, spd, luc) {
            this.Name = name;
            this.Desc = desc;
            this.Type = type;
            this.HP = hp || 1;
            this.MP = mp || 0;
            this.Atk = atk || 0;
            this.Def = def || 0;
            this.Spd = spd || 0;
            this.MDef = mdef || 0;
            this.Luc = luc || 0;
        }
        return Equipable;
    })();
    Game.Equipable = Equipable;
})(Game || (Game = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
///<reference path='equipable.ts' />
var Game;
(function (Game) {
    var Accessory = (function (_super) {
        __extends(Accessory, _super);
        function Accessory(name, desc, type, hp, mp, atk, def, mdef, spd, luc) {
            _super.call(this, name, desc, type, hp, mp, atk, def, mdef, spd, luc);
        }
        return Accessory;
    })(Game.Equipable);
    Game.Accessory = Accessory;
})(Game || (Game = {}));
///<reference path='equipable.ts' />
var Game;
(function (Game) {
    var Body = (function (_super) {
        __extends(Body, _super);
        function Body(name, desc, type, hp, mp, atk, def, mdef, spd, luc) {
            _super.call(this, name, desc, type, hp, mp, atk, def, mdef, spd, luc);
        }
        return Body;
    })(Game.Equipable);
    Game.Body = Body;
})(Game || (Game = {}));
///<reference path='equipable.ts' />
var Game;
(function (Game) {
    var Feet = (function (_super) {
        __extends(Feet, _super);
        function Feet(name, desc, type, hp, mp, atk, def, mdef, spd, luc) {
            _super.call(this, name, desc, type, hp, mp, atk, def, mdef, spd, luc);
        }
        return Feet;
    })(Game.Equipable);
    Game.Feet = Feet;
})(Game || (Game = {}));
///<reference path='equipable.ts' />
var Game;
(function (Game) {
    var Helm = (function (_super) {
        __extends(Helm, _super);
        function Helm(name, desc, type, hp, mp, atk, def, mdef, spd, luc) {
            _super.call(this, name, desc, type, hp, mp, atk, def, mdef, spd, luc);
        }
        return Helm;
    })(Game.Equipable);
    Game.Helm = Helm;
})(Game || (Game = {}));
///<reference path='equipable.ts' />
var Game;
(function (Game) {
    var Weapon = (function (_super) {
        __extends(Weapon, _super);
        function Weapon(name, desc, type, hp, mp, atk, def, mdef, spd, luc) {
            _super.call(this, name, desc, type, hp, mp, atk, def, mdef, spd, luc);
        }
        return Weapon;
    })(Game.Equipable);
    Game.Weapon = Weapon;
})(Game || (Game = {}));
var GAME_OBJECTS = [];
var Game;
(function (Game) {
    var GameObject = (function () {
        //pretty much complete imo, other classes such as sprite will extend the variables and functionality
        function GameObject(img, x, y, w, h, scale) {
            this.x = 0;
            this.y = 0;
            this.W = 0;
            this.H = 0;
            this.img = new Image();
            this.scale = 0;
            this.img = img;
            this.x = x || 0;
            this.y = y || 0;
            this.W = w;
            this.H = h;
            this.scale = scale || 1;
        }
        GameObject.prototype.update = function () {
        };
        GameObject.prototype.render = function (context, x, y) {
            //context.drawImage(this.img, this.x, this.y, this.W, this.H, x, y, this.W * this.scale, this.H * this.scale);
            context.drawImage(this.img, this.x, this.y);
        };
        return GameObject;
    })();
    Game.GameObject = GameObject;
})(Game || (Game = {}));
///<reference path='gameobject.ts' />
var Game;
(function (Game) {
    var Sprite = (function (_super) {
        __extends(Sprite, _super);
        //all the base attributes and methods are to be added here, this will come when
        //the battle system is being developed but for now it stays relatively empty i guess
        function Sprite(img, x, y, w, h, scale) {
            _super.call(this, img, x, y, w, h, scale);
            this.Equipment = {
                "Head": null,
                "Body": null,
                "Weapon": null,
                "Feet": null,
                "Accessory": null
            };
            this.Base = {
                "ID": null,
                "HP": 0,
                "MP": 0,
                "Atk": 0,
                "Def": 0,
                "Spd": 0,
                "MDef": 0,
                "Luc": 0,
                "Type": null
            };
            this.Modified = {
                "ID": null,
                "HP": 0,
                "MP": 0,
                "Atk": 0,
                "Def": 0,
                "Spd": 0,
                "MDef": 0,
                "Luc": 0,
                "Type": null
            };
        }
        Sprite.prototype.setBaseAttributes = function (id, hp, mp, atk, def, mdef, spd, luc, type) {
            this.Base = {
                "ID": id,
                "HP": hp || 1,
                "MP": mp || 0,
                "Atk": atk || 0,
                "Def": def || 0,
                "Spd": spd || 0,
                "MDef": mdef || 0,
                "Luc": luc || 0,
                "Type": type
            };
        };
        Sprite.prototype.setModifiedAttributes = function (id, hp, mp, atk, def, mdef, spd, luc, type) {
            this.Modified = {
                "ID": id,
                "HP": hp || 1,
                "MP": mp || 0,
                "Atk": atk || 0,
                "Def": def || 0,
                "Spd": spd || 0,
                "MDef": mdef || 0,
                "Luc": luc || 0,
                "Type": type
            };
        };

        Sprite.prototype.equipItem = function (name, equipment, type) {
            this.Equipment[type] = name;

            this.setModifiedAttributes(name, this.Modified['HP'] + equipment.HP, this.Modified['MP'] + equipment.MP, this.Modified['Atk'] + equipment.Atk, this.Modified['Def'] + equipment.Def, this.Modified['MDef'] + equipment.MDef, this.Modified['Spd'] + equipment.Spd, this.Modified['Luc'] + equipment.Luc, type);
        };
        Sprite.prototype.unequipItem = function (type) {
            if (this.Equipment[type] !== null) {
                var key;
                var item;
                if (type === "Head") {
                    key = Object.keys(JSON_CACHE['equip'].Head);
                    for (var x = 0; x <= ObjLength(JSON_CACHE['equip'].Head); x++) {
                        if (this.Equipment[type] === key[x]) {
                            item = JSON_CACHE['equip'].Head[key[x]];
                            break;
                        }
                    }
                } else if (type === "Body") {
                    key = Object.keys(JSON_CACHE['equip'].Body);
                    for (var x = 0; x <= ObjLength(JSON_CACHE['equip'].Body); x++) {
                        if (this.Equipment[type] === key[x]) {
                            item = JSON_CACHE['equip'].Body[key[x]];
                            break;
                        }
                    }
                } else if (type === "Weapon") {
                    key = Object.keys(JSON_CACHE['equip'].Weapon);
                    for (var x = 0; x <= ObjLength(JSON_CACHE['equip'].Weapon); x++) {
                        if (this.Equipment[type] === key[x]) {
                            item = JSON_CACHE['equip'].Weapon[key[x]];
                            break;
                        }
                    }
                } else if (type === "Feet") {
                    key = Object.keys(JSON_CACHE['equip'].Feet);
                    for (var x = 0; x <= ObjLength(JSON_CACHE['equip'].Feet); x++) {
                        if (this.Equipment[type] === key[x]) {
                            item = JSON_CACHE['equip'].Feet[key[x]];
                            break;
                        }
                    }
                }

                this.setModifiedAttributes(key, this.Modified['HP'] - item.HP, this.Modified['MP'] - item.MP, this.Modified['Atk'] - item.Atk, this.Modified['Def'] - item.Def, this.Modified['MDef'] - item.MDef, this.Modified['Spd'] - item.Spd, this.Modified['Luc'] - item.Luc, type);
                this.Equipment[type] = null;
            }
        };
        Sprite.prototype.getTotalStats = function () {
            return {
                "ID": this.Base['ID'],
                "HP": this.Base['HP'] + this.Modified['HP'],
                "MP": this.Base['MP'] + this.Modified['MP'],
                "Atk": this.Base['Atk'] + this.Modified['Atk'],
                "Def": this.Base['Def'] + this.Modified['Def'],
                "Spd": this.Base['Spd'] + this.Modified['Spd'],
                "MDef": this.Base['MDef'] + this.Modified['MDef'],
                "Luc": this.Base['Luc'] + this.Modified['Luc'],
                "Type": this.Base['Type']
            };
        };
        return Sprite;
    })(Game.GameObject);
    Game.Sprite = Sprite;
})(Game || (Game = {}));
var control;
var tiles;
var Game;
(function (Game) {
    var Loop = (function () {
        //remove alot of initialization code from here as it will go in the states
        //need to put the code in here to deal with the states as needed thoughs
        function Loop() {
            this.render = function () {
                //this.currentArea.render(this.context);
            };
            /*this.canvas = document.createElement('canvas');
            this.canvas.id = canvasid;
            this.canvas.width = width;
            this.canvas.height = height;
            this.canvas.tabindex = '1';
            document.body.appendChild(this.canvas);*/
            this.canvas = document.getElementById('layer1');
            this.context = this.canvas.getContext('2d');
            this.canvas2 = document.getElementById('layer2');
            this.context2 = this.canvas.getContext('2d');

            //control = new Game.input();
            tiles = new Game.Tilemap();
            tiles.Init();
            this.width = 800;
            this.currentArea = new Game.Area1(this.context, this.width, this);

            var p1 = new Game.Sprite(IMAGE_CACHE['D'], 400, 250, 35, 35);
            var p2 = new Game.Sprite(IMAGE_CACHE['D'], 400, 325, 35, 35);
            p1.setBaseAttributes('hero', 10, 0, 4, 1, 1, 1, 1, 0);
            p2.setBaseAttributes('ally', 5, 2, 1, 1, 1, 1, 1, 0);

            //var sword = new Weapon('hero', 'hero sword', 'Weapon', 10, 0, 4, 1, 1, 1, 1);
            //p1.equipItem(sword, sword.Type);
            battleList[0] = p1;
            battleList[1] = p2;
        }
        Loop.prototype.update = function () {
            this.currentArea.update();
        };

        Loop.prototype.playerInput = function () {
        };
        return Loop;
    })();
    Game.Loop = Loop;
})(Game || (Game = {}));
var pos = 0;
var audioElement = new Audio();
var WORLD = 0;
var sManager;

//State system core will most likely be here so read the book and figure out
//how to get it working and leading to each state as needed
var Game;
(function (Game) {
    var Init = (function () {
        function Init() {
            var _this = this;
            this.onComplete = function () {
                //this.dialog = new Game.Cutscene("dia", 800, 600);
                _this.world = new Game.Loop();
                setInterval(_this.GameLoop, 1000 / 30);
            };
            this.GameLoop = function () {
                _this.world.update();
                _this.world.render();
                //this.world.update();
                //this.world.render();
            };
            var source = {
                Images: {
                    D: 'Assets/Image/diamond.png',
                    S: 'Assets/Image/star.png',
                    menu: 'Assets/Image/menuButton.png',
                    back: 'Assets/Image/menuBack.png',
                    LArrow: 'Assets/Image/arrowLeft',
                    RArrow: 'Assets/Image/arrowRight',
                    dialog: 'Assets/Image/dialogWindow.png',
                    hero: 'Assets/Image/hero.png',
                    status: 'Assets/Image/status.png',
                    attack: 'Assets/Image/attack_button.png',
                    defend: 'Assets/Image/defend_button.png'
                },
                Anim: {
                    at: 'Assets/Atlas/test.json'
                },
                Sprite: {
                    spr: 'Assets/Atlas/test.json'
                },
                Tileset: {
                    rpg: 'Assets/Tilemap/newmap.json',
                    carpet: 'Assets/Tilemap/nextmap.json'
                },
                XML: {
                    chapter: 'Assets/XML/test.xml'
                },
                JSON: {
                    equip: 'Assets/XML/Equipment.json'
                },
                Sounds: {
                    car: 'Assets/Sound/car',
                    punch: 'Assets/Sound/punch',
                    wood: 'Assets/Sound/wood'
                },
                Music: {
                    theme: 'Assets/Music/theme'
                }
            };
            this.preloader = new Game.Preloader();
            this.preloader.queueAssets(source, this.onComplete);
            sManager = new Game.StateManager();
        }
        return Init;
    })();
    Game.Init = Init;
})(Game || (Game = {}));
var that = this;
var keys = [];
var click = false;
var canvas;
var mEvent = null;

document.addEventListener('mousedown', function (e) {
    e.stopPropagation();
    e.preventDefault();
    that.mEvent = e;
    that.click = true;
});
document.addEventListener('mouseup', function (e) {
    e.stopPropagation();
    e.preventDefault();
    that.click = false;
});

function mousedown() {
    return click;
}
/*module Game {
export class input {
keys;
click;
canvas;
mEvent;
constructor() {
//fairly complete for the tasks it need to do but might need some refining to the key functions to let it operate
//as accurately as i need. Not a high priority as it works but look at later on.
this.keys = [];
this.click = false;
this.mEvent = null;
var that = this;
document.addEventListener('keydown', function (e) {
e.stopPropagation();
e.preventDefault();
var letter = String.fromCharCode(e.keyCode);
that.keys[letter] = true;
console.log(letter);
});
document.addEventListener('keyup', function (e) {
e.stopPropagation();
e.preventDefault();
var letter = String.fromCharCode(e.keyCode);
that.keys[letter] = false;
});
document.addEventListener('mousedown', function (e) {
e.stopPropagation();
e.preventDefault();
that.mEvent = e;
that.click = true;
});
document.addEventListener('mouseup', function (e) {
e.stopPropagation();
e.preventDefault();
that.click = false;
});
}
keydown(key) {
return this.keys[key];
}
keyup(key) {
return !this.keys[key];
}
mousedown() {
console.log("clicked");
return this.click;
}
}
}*/
/*      HTML5 AssetManager V. 0.95
*   Currently supports images, Atlases(from texturepacker) for sprites or animation, tilesets, xmls and sounds for now
*   how to use:
*/
var ANIM_CACHE = [];
var IMAGE_CACHE = [];
var SPRITE_CACHE = [];
var TILESET_CACHE = [];
var TILEDATA_CACHE = [];
var XML_CACHE = [];
var SOUND_CACHE = [];
var MUSIC_CACHE = [];
var JSON_CACHE = [];

var Game;
(function (Game) {
    var Preloader = (function () {
        function Preloader() {
            var _this = this;
            this.animSource = new Image();
            this.animkey = [];
            this.animPos = 0;
            this.height = 0;
            this.isError = 0;
            this.isLoaded = 0;
            this.numTilesX = 0;
            this.numTilesY = 0;
            this.pixelSizeX = 0;
            this.pixelSizeY = 0;
            this.scale = 0;
            this.sprite = new Image();
            this.spritekey = [];
            this.spritePos = 0;
            this.spriteSource = new Image();
            this.isFilesLoaded = false;
            this.tilesetPos = 0;
            this.tileSizeX = 0;
            this.tileSizeY = 0;
            this.totalAssets = 0;
            this.width = 0;
            this.x = 0;
            this.y = 0;
            this.onAnimJSONLoad = function (key, response) {
                var holder = [];
                var frame;
                _this.animData = JSON.parse(response);

                _this.animSource.onload = function () {
                    _this.isLoaded++;
                };
                _this.animSource.src = 'Assets/Atlas/' + _this.animData.meta.image;
                for (var i = 0; i < _this.animData.frames.length; i++) {
                    frame = _this.animData.frames[i].frame;
                    holder[i] = new Game.GameObject(_this.spriteSource, frame.x, frame.y, frame.w, frame.h);
                }
                ANIM_CACHE[key[_this.animPos]] = holder; //Store the holder array into the key of the ANIM_CACHE
                _this.animPos++; //Move to the next key of the array
            };
            this.onSpriteJSONLoad = function (key, response) {
                var holder = [];

                _this.spriteData = JSON.parse(response);
                _this.spriteSource.onload = function () {
                    _this.isLoaded++;
                };
                _this.spriteSource.src = 'Assets/Atlas/' + _this.spriteData.meta.image;
                for (var i = 0; i < _this.spriteData.frames.length; i++) {
                    var frame = _this.spriteData.frames[i].frame;

                    //figure out whats wrong with the associative array
                    var indexes = _this.spriteData.frames[i].filename.substring(0, _this.spriteData.frames[i].filename.length - 4);
                    holder[i] = new Game.GameObject(_this.spriteSource, frame.x, frame.y, frame.w, frame.h);
                    SPRITE_CACHE[i] = holder[i];
                }
                _this.spritePos++;
            };
            this.onTileJSONLoad = function (key, response) {
                _this.tiledData = JSON.parse(response);
                _this.numTilesX = _this.tiledData.width;
                _this.numTilesY = _this.tiledData.height;
                _this.tileSizeX = _this.tiledData.tilewidth;
                _this.tileSizeY = _this.tiledData.tileheight;
                _this.pixelSizeX = _this.numTilesX * _this.tileSizeX;
                _this.pixelSizeY = _this.numTilesY * _this.tileSizeY;

                var tiledata = _this.tiledData.tilesets;
                for (var i = 0; i < tiledata.length; i++) {
                    var tilesetimage = new Image();
                    tilesetimage.onload = function () {
                        _this.isLoaded++;
                    };
                    tilesetimage.src = "Assets/Tilemap/" + _this.tiledData.tilesets[i].image.replace(/^.*[\\\/]/, '');
                    var tileData = {
                        "firstgid": tiledata[i].firstgid,
                        "image": tilesetimage,
                        "imageheight": tiledata[i].imageheight,
                        "imagewidth": tiledata[i].imagewidth,
                        "name": tiledata[i].name,
                        "numXTiles": Math.floor(tiledata[i].imagewidth / _this.tileSizeX),
                        "numYTiles": Math.floor(tiledata[i].imageheight / _this.tileSizeY)
                    };
                    TILESET_CACHE[key[_this.tilesetPos]] = tileData;
                    TILEDATA_CACHE[key[_this.tilesetPos]] = _this.tiledData;
                    _this.tilesetPos++;
                    _this.tileKey = key; //needed for getTile ()
                }
            };
            this.onXMLLoad = function (key, response) {
                XML_CACHE[key] = response;
                _this.isLoaded++;
                //rest to be implemented. not sure how to extract the info how i want yet...will do soon
                //saved xml file iin the global variable to be used later on as needed
            };
            this.onJSONLoad = function (key, response) {
                JSON_CACHE[key] = JSON.parse(response);
                _this.isLoaded++;
            };
        }
        Preloader.prototype.queueAssets = function (Assets, load) {
            var _this = this;
            var Assetkeys = Object.keys(Assets);
            for (var x = 0; x < Assetkeys.length; x++) {
                var itemkeys = Object.keys(Assets[Assetkeys[x]]);
                for (var y = 0; y < itemkeys.length; y++) {
                    this.totalAssets++;
                }
            }
            if (Assets.Images) {
                this.genericLoader(Assets.Images, true);
            }
            if (Assets.Anim) {
                this.genericLoader(Assets.Anim, false, this.animkey, this.onAnimJSONLoad, 'json');
            }
            if (Assets.Sprite) {
                this.genericLoader(Assets.Sprite, false, this.spritekey, this.onSpriteJSONLoad, 'json');
            }
            if (Assets.Tileset) {
                this.genericLoader(Assets.Tileset, false, this.tileKey, this.onTileJSONLoad, 'json');
            }
            if (Assets.XML) {
                this.genericLoader(Assets.XML, false, this.xmlKey, this.onXMLLoad, 'xml');
            }
            if (Assets.JSON) {
                this.genericLoader(Assets.JSON, false, this.jsonKey, this.onJSONLoad, 'json');
            }
            if (Assets.Sounds) {
                this.soundloader(Assets.Sounds, 'Sound');
            }
            if (Assets.Music) {
                this.soundloader(Assets.Music, 'Music');
            }
            this.timerid = setInterval(function () {
                if (_this.isLoaded === _this.totalAssets) {
                    clearInterval(_this.timerid);
                    _this.isFilesLoaded = true;
                    load();
                }
            }, 1000 / 2);
        };
        Preloader.prototype.genericLoader = function (url, isImage, key, onLoad, typeOfFile) {
            if (isImage) {
                for (var file in url) {
                    IMAGE_CACHE[file] = new Image();
                    IMAGE_CACHE[file].onload = this.isLoaded++;
                    IMAGE_CACHE[file].onerror = this.isError++;
                    IMAGE_CACHE[file].src = url[file];
                }
            } else {
                key = Object.keys(url);
                for (var i = 0; i < key.length; i++) {
                    this.loadfile(key, url[key[i]], onLoad, typeOfFile);
                }
            }
        };
        Preloader.prototype.soundloader = function (sounds, type) {
            var _this = this;
            var pos;
            var key = Object.keys(sounds);
            var audioType = '';
            for (pos = 0; pos < key.length; pos++) {
                if (type === 'Sound') {
                    SOUND_CACHE[key[pos]] = document.createElement("audio");
                    document.body.appendChild(SOUND_CACHE[key[pos]]);
                    audioType = this.soundFormat(SOUND_CACHE[key[pos]]);
                    SOUND_CACHE[key[pos]].setAttribute("src", sounds[key[pos]] + audioType);
                    SOUND_CACHE[key[pos]].load();
                    SOUND_CACHE[key[pos]].addEventListener('canplaythrough', function () {
                        _this.isLoaded++;
                    });
                } else if (type === 'Music') {
                    MUSIC_CACHE[key[pos]] = document.createElement("audio");
                    document.body.appendChild(MUSIC_CACHE[key[pos]]);
                    audioType = this.soundFormat(MUSIC_CACHE[key[pos]]);
                    MUSIC_CACHE[key[pos]].setAttribute("src", sounds[key[pos]] + audioType);
                    MUSIC_CACHE[key[pos]].load();
                    MUSIC_CACHE[key[pos]].addEventListener('canplaythrough', function () {
                        _this.isLoaded++;
                    });
                }
            }
        };
        Preloader.prototype.soundFormat = function (audioElement) {
            var ext = '';
            if (audioElement.canPlayType("audio/ogg") === "probably" || audioElement.canPlayType("audio/ogg") === "maybe") {
                ext = '.ogg';
            } else if (audioElement.canPlayType("audio/mp3") === "probably" || audioElement.canPlayType("audio/mp3") === "maybe") {
                ext = '.mp3';
            }
            return ext;
        };
        Preloader.prototype.loadfile = function (key, url, onLoad, type) {
            var xobj = new XMLHttpRequest();
            xobj.open('GET', url, true);
            xobj.onreadystatechange = function () {
                if (xobj.readyState == 4 && xobj.status == 200) {
                    if (type === 'json') {
                        onLoad(key, xobj.responseText);
                    } else if (type === 'xml') {
                        onLoad(key, xobj.responseXML);
                    } else if (type === 'mp3') {
                        onLoad(key, xobj.response);
                    }
                }
            };
            xobj.send(null);
        };
        return Preloader;
    })();
    Game.Preloader = Preloader;
})(Game || (Game = {}));
var objects = [];
var Game;
(function (Game) {
    var Tilemap = (function () {
        function Tilemap() {
            var _this = this;
            this.setTileset = function (context, index) {
                for (var layeridX = 0; layeridX < TILEDATA_CACHE[index].layers.length; layeridX++) {
                    if (TILEDATA_CACHE[index].layers[layeridX].type === "tilelayer") {
                        var data = TILEDATA_CACHE[index].layers[layeridX].data;
                        for (var tileidX = 0; tileidX < data.length; tileidX++) {
                            var ID = data[tileidX];
                            if (ID === 0) {
                                continue;
                            }
                            var tileloc = _this.getTile(ID);

                            var worldX = Math.floor(tileidX % TILEDATA_CACHE[index].width) * TILEDATA_CACHE[index].tilewidth;
                            var worldY = Math.floor(tileidX / TILEDATA_CACHE[index].width) * TILEDATA_CACHE[index].tileheight;

                            _this.tileimg = tileloc.img;
                            _this.tilepx = tileloc.px;
                            _this.tilepy = tileloc.py;
                            _this.tilewidth = TILEDATA_CACHE[index].tilewidth;
                            _this.tileheight = TILEDATA_CACHE[index].tileheight;
                            _this.worldx = worldX;
                            _this.worldy = worldY;

                            context.drawImage(tileloc.img, tileloc.px, tileloc.py, TILEDATA_CACHE[index].tilewidth, TILEDATA_CACHE[index].tileheight, worldX, worldY, TILEDATA_CACHE[index].tilewidth, TILEDATA_CACHE[index].tileheight);
                        }
                    } else if (TILEDATA_CACHE[index].layers[layeridX].type === "objectgroup") {
                        var tileObjects = TILEDATA_CACHE[index].layers[layeridX].objects;
                        var obj = {
                            "name": "",
                            "type": "",
                            "properties": {
                                "ID": 0
                            },
                            "width": 0,
                            "x": 0,
                            "y": 0
                        };

                        for (var x = 0; x < tileObjects.length; x++) {
                            var tile = _this.getTile(tileObjects[x].gid);
                            if (tileObjects[x].width !== 0) {
                                obj.width = tileObjects[x].width;
                            } else {
                                obj.width = 32; //TILEDATA_CACHE[index].tilesets.tilewidth;
                            }
                            obj.name = tileObjects[x].name;
                            obj.type = tileObjects[x].type;
                            obj.properties.ID = tileObjects[x].properties.ID;
                            obj.x = tileObjects[x].x;
                            obj.y = tileObjects[x].y;
                            objects[x] = {
                                "name": obj.name,
                                "type": obj.type,
                                "properties": {
                                    "ID": obj.properties.ID
                                },
                                "width": obj.width,
                                "x": obj.x,
                                "y": obj.y
                            };

                            var w = TILEDATA_CACHE[index].tilewidth;
                            var h = TILEDATA_CACHE[index].tileheight;
                            _this.objimg = tile.img;
                            _this.objpx = tile.px;
                            _this.objpy = tile.py;
                            _this.objx = obj.x;
                            _this.objy = obj.y;
                            setStyle(context, 'Calibri', '12pt', 'black', 'bold', 'italic', 'center');
                            context.fillText(obj.name, obj.x + 10, obj.y - 10);
                            context.drawImage(tile.img, tile.px, tile.py, w, h, obj.x, obj.y, w, h);
                        }
                    }
                }
            };
            this.drawMap = function (mapcontext, objcontext) {
                mapcontext.drawImage(_this.tileimg, _this.tilepx, _this.tilepy, _this.tilewidth, _this.tileheight, _this.worldx, _this.worldy, _this.tilewidth, _this.tileheight); //draw map
                objcontext.drawImage(_this.objimg, _this.objpx, _this.objpy, _this.objw, _this.objh, _this.objx, _this.objy, _this.objw, _this.objh); //draw objects
            };
        }
        Tilemap.prototype.Init = function () {
            this.key = [];
            this.key = Object.keys(TILESET_CACHE);
        };

        //ALOT OF WORK LEFT TO DO HERE TO MAKE OBJECTS EASILY ALTERED and removed as needed
        //Functions to test if file are loaded and can be rendered properly
        Tilemap.prototype.getTile = function (tileIndex) {
            var tile = {
                "img": null,
                "px": 0,
                "py": 0
            };

            var i = 0;
            for (i = 0; i < this.key.length; i--) {
                if (TILESET_CACHE[this.key[i]].firstgid <= tileIndex)
                    break;
            }
            tile.img = TILESET_CACHE[this.key[i]].image;
            var localIndex = tileIndex - TILESET_CACHE[this.key[i]].firstgid;
            var localtileX = Math.floor(localIndex % TILESET_CACHE[this.key[i]].numXTiles);
            var localtileY = Math.floor(localIndex / TILESET_CACHE[this.key[i]].numXTiles);
            tile.px = localtileX * TILEDATA_CACHE[this.key[i]].tilewidth;
            tile.py = localtileY * TILEDATA_CACHE[this.key[i]].tileheight;

            return tile;
        };

        //Object manipulation...UNTESTED ATM
        Tilemap.prototype.addObject = function (obj) {
            objects.push({
                "height": obj.h,
                "name": obj.name,
                "properties": obj.prop,
                "type": obj.type,
                "visible": obj.visible,
                "width": obj.w,
                "x": obj.x,
                "y": obj.y
            });
        };
        Tilemap.prototype.updateObject = function (objName, obj) {
            for (var i = 0; i < objects.length; i++) {
                if (objName === objects[i].name) {
                    objects.push({
                        "height": obj.h,
                        "name": obj.name,
                        "properties": obj.prop,
                        "type": obj.type,
                        "visible": obj.visible,
                        "width": obj.w,
                        "x": obj.x,
                        "y": obj.y
                    });
                    break;
                }
            }
        };
        Tilemap.prototype.removeObject = function (objName) {
            for (var i = 0; i < objects.length; i++) {
                if (objName === objects[i].name) {
                    delete objects[i];
                }
            }
        };
        return Tilemap;
    })();
    Game.Tilemap = Tilemap;
})(Game || (Game = {}));
var Game;
(function (Game) {
    var State = (function () {
        //used as the base class to be extended for each state
        //might need some initialization code to remove some clutter
        //from each state to make stuff look better
        function State() {
        }
        State.prototype.init = function () {
        };
        State.prototype.update = function () {
        };
        State.prototype.render = function () {
        };
        State.prototype.pause = function () {
        };
        State.prototype.resume = function () {
        };
        State.prototype.destroy = function () {
        };
        return State;
    })();
    Game.State = State;
})(Game || (Game = {}));
///<reference path='State.ts' />
var BattleQ = [];
var battleList = [];
var menuOptions = [];
var Game;
(function (Game) {
    var Battle = (function (_super) {
        __extends(Battle, _super);
        function Battle(ctx, ctx2) {
            _super.call(this);
            this.newTime = 0;
            this.currentkey = 0;
            this.ctx = ctx;
            this.ctx2 = ctx2;
            this.p1 = new Game.Sprite(IMAGE_CACHE['D'], 400, 250, 35, 35);
            this.p2 = new Game.Sprite(IMAGE_CACHE['D'], 400, 325, 35, 35);
            this.e1 = new Game.Sprite(IMAGE_CACHE['S'], 200, 250, 35, 35);
            this.e2 = new Game.Sprite(IMAGE_CACHE['S'], 200, 325, 35, 35);

            this.p1.setBaseAttributes('hero', 10, 0, 4, 1, 1, 1, 1, 0);
            this.p2.setBaseAttributes('ally', 5, 2, 1, 1, 1, 1, 1, 0);
            this.e1.setBaseAttributes('foe', 15, 0, 1, 0, 1, 1, 1, 1);
            this.e2.setBaseAttributes('foe2', 10, 0, 5, 1, 1, 1, 1, 1);

            var sword = new Game.Weapon('hero', 'hero sword', 'Weapon', 10, 0, 4, 1, 1, 1, 1);
            this.p1.equipItem(sword.Name, sword, 'Weapon');
            battleList[0] = this.p1;
            battleList[1] = this.p2;
            battleList[2] = this.e1;
            battleList[3] = this.e2;

            this.battleKeys = Object.keys(battleList);
            menuOptions.push({
                "Name": "attack",
                "x": 550,
                "y": 200
            });
            menuOptions.push({
                "Name": "defend",
                "x": 550,
                "y": 275
            });
        }
        Battle.prototype.statusGUI = function () {
            this.ctx.clearRect(0, 0, 800, 200);
            for (var i = 0; i < this.battleKeys.length; i++) {
                this.ctx.fillText(battleList[i].ID + " HP : " + battleList[i].HP, (i + 1) * 150, 100);
            }
        };
        Battle.prototype.newTurn = function () {
            this.currentkey = 0;
            this.currentPlayer = battleList[this.currentkey];
        };
        Battle.prototype.PlayerMenuInit = function () {
            this.ctx.clearRect(0, 0, 800, 600);
            this.ctx2.clearRect(0, 0, 800, 600);
            setStyle(this.ctx, 'Calibri', '16pt', 'black', 'bold', 'italic', 'left');
            setStyle(this.ctx2, 'Calibri', '16pt', 'black', 'bold', 'italic', 'left');
            this.statusGUI();
        };
        Battle.prototype.renderActors = function () {
            this.ctx.clearRect(0, 0, 800, 600);
            for (var i = 0; i < this.battleKeys.length; i++) {
                battleList[this.battleKeys[i]].render(this.ctx, 100, 100);
                this.ctx.fillText(battleList[this.battleKeys[i]].ID, battleList[this.battleKeys[i]].x + 20, battleList[this.battleKeys[i]].y - 5);
            }
            for (var x = 0; x < menuOptions.length; x++) {
                this.ctx2.drawImage(IMAGE_CACHE[menuOptions[x].Name], menuOptions[x].x, menuOptions[x].y);
            }
            this.statusGUI();
        };
        Battle.prototype.battleOver = function () {
            var aHP = 0;
            var eHP = 0;
            for (var i = 0; i < this.battleKeys.length; i++) {
                if (battleList[i].Type === 0) {
                    aHP += battleList[i].HP;
                } else if (battleList[i].Type === 1) {
                    eHP += battleList[i].HP;
                }
            }
            if (aHP === 0 || eHP === 0) {
                return true;
            } else {
                return false;
            }
        };
        Battle.prototype.init = function () {
            this.PlayerMenuInit();
            this.renderActors();
            this.currentPlayer = battleList[this.currentkey];
        };
        Battle.prototype.update = function () {
            var time = Date.now();
            if (this.currentkey > 3) {
                this.newTurn();
            }
            if (this.currentPlayer.Base.Type === 0 && this.drawCommands && time > this.newTime) {
                this.ctx2.clearRect(0, 0, 800, 600);
                this.ctx2.fillText("Player Turn", 350, 450);
                this.renderActors();
                this.drawCommands = false;
            }
            if (this.battleOver()) {
                this.ctx2.clearRect(0, 0, 800, 600);
                this.ctx2.fillText("THE BATTLE IS OVER", 400, 400);
            } else if (this.currentPlayer.Base.Type === 0 && this.enemySelect === true) {
                if (this.currentPlayer.Base.Type === 0 && mousedown()) {
                    this.mx = mEvent.pageX;
                    this.my = mEvent.pageY;
                    for (var i = 0; i < this.battleKeys.length; i++) {
                        var x1 = battleList[this.battleKeys[i]].x;
                        var x2 = battleList[this.battleKeys[i]].x + battleList[this.battleKeys[i]].W;
                        var y1 = battleList[this.battleKeys[i]].y;
                        var y2 = battleList[this.battleKeys[i]].y + battleList[this.battleKeys[i]].H;
                        if ((x1 <= this.mx && this.mx <= x2) && (y1 <= this.my && this.my <= y2)) {
                            for (var x = 0; x < this.battleKeys.length; x++) {
                                if (battleList[this.battleKeys[i]] === battleList[this.battleKeys[x]] && battleList[this.battleKeys[x]].Type === 1) {
                                    this.target = battleList[this.battleKeys[x]];
                                    this.statusGUI();
                                    this.enemySelect = false;
                                    break;
                                }
                            }
                        }
                    }
                }
                if (!this.enemySelect) {
                    this.drawCommands = true;
                    this.target.getTotalStats().HP = this.target.getTotalStats().HP - this.currentPlayer.getTotalStats().Atk;
                    if (this.target.getTotalStats().HP < 1) {
                        this.target.getTotalStats().Type = 2;
                    }

                    this.ctx2.clearRect(300, 400, 600, 500);
                    this.ctx2.fillText(this.currentPlayer.ID + " Attacks " + this.target.ID + " for " + this.currentPlayer.getTotalStats().Atk + " damage", 350, 450);
                    this.statusGUI();
                    this.currentkey++;
                    this.currentPlayer = battleList[this.currentkey];
                    this.newTime = Date.now() + 1000;
                }
            } else if (this.currentPlayer.Base.Type === 0 && mousedown()) {
                this.mx = mEvent.pageX;
                this.my = mEvent.pageY;
                for (var i = 0; i < menuOptions.length; i++) {
                    var x1 = menuOptions[i].x;
                    var x2 = menuOptions[i].x + 190;
                    var y1 = menuOptions[i].y;
                    var y2 = menuOptions[i].y + 100;
                    if ((x1 <= this.mx && this.mx <= x2) && (y1 <= this.my && this.my <= y2)) {
                        if (time > this.newTime) {
                            //display text
                            this.ctx2.clearRect(0, 0, 800, 600);
                            this.ctx2.fillText("Click to select Target", 350, 450);
                            this.enemySelect = true;
                        }
                    }
                }
            } else if (this.currentPlayer.Base.Type === 1) {
                if (time > this.newTime) {
                    this.ctx2.clearRect(300, 400, 600, 500);
                    this.ctx2.fillText(this.currentPlayer.ID + " Attacks " + battleList[0].ID + " for " + this.currentPlayer.getTotalStats().Atk + " damage", 350, 450);

                    //actual stat calculation
                    var targetNum = getRandomInt(0, this.battleKeys.length - 1);
                    while (battleList[targetNum].Type !== 0) {
                        targetNum = getRandomInt(0, this.battleKeys.length - 1);
                    }
                    this.target = battleList[targetNum];
                    this.target.getTotalStats().HP = this.target.getTotalStats().HP - this.currentPlayer.getTotalStats().Atk;
                    if (this.target.getTotalStats().HP < 1) {
                        this.target.Base.Type = 2;
                    }
                    this.statusGUI();
                    this.currentkey++;
                    this.currentPlayer = battleList[this.currentkey];
                    this.newTime = Date.now() + 1000;
                }
            } else if (this.currentPlayer.Base.Type === 2) {
                this.currentkey++;
                this.currentPlayer = battleList[this.currentkey];
            }
        };
        Battle.prototype.render = function () {
        };
        Battle.prototype.pause = function () {
        };
        Battle.prototype.resume = function () {
        };
        Battle.prototype.destroy = function () {
        };
        return Battle;
    })(Game.State);
    Game.Battle = Battle;
})(Game || (Game = {}));
///<reference path='State.ts' />
var equips = [];
var Game;
(function (Game) {
    var EquipShop = (function (_super) {
        __extends(EquipShop, _super);
        function EquipShop(ctx, ctx2) {
            _super.call(this);
            this.time = 0;
            this.back = false;
            this.ctx = ctx;
            this.ctx2 = ctx2;
        }
        EquipShop.prototype.drawEquip = function () {
            this.ctx2.clearRect(0, 0, 800, 600);
            this.ctx2.drawImage(IMAGE_CACHE['dialog'], 15, 100);
            setStyle(this.ctx2, 'Calibri', '16pt', 'black', 'bold', 'italic', 'left');
            this.ctx2.fillText(battleList[0].Base.ID + " Equipment Area", 200, 125);
            this.ctx2.fillText("Head: " + battleList[0].Equipment['Head'], 75, 150);
            this.ctx2.fillText("Body: " + battleList[0].Equipment['Body'], 75, 175);
            this.ctx2.fillText("Weapon: " + battleList[0].Equipment['Weapon'], 75, 200);
            this.ctx2.fillText("Feet: " + battleList[0].Equipment['Feet'], 75, 225);

            this.stats = battleList[0].getTotalStats();
            this.ctx2.fillText("HP: " + this.stats.HP, 400, 150);
            this.ctx2.fillText("MP: " + this.stats.MP, 400, 175);
            this.ctx2.fillText("Attack: " + this.stats.Atk, 400, 200);
            this.ctx2.fillText("Defense: " + this.stats.Def, 400, 225);
            this.ctx2.fillText("Speed: " + this.stats.Spd, 400, 250);
            this.ctx2.fillText("Magic Defense: " + this.stats.MDef, 400, 275);
            this.ctx2.fillText("Luck: " + this.stats.Luc, 400, 300);

            this.ctx2.drawImage(IMAGE_CACHE['back'], 25, 500);
        };
        EquipShop.prototype.addEquipPos = function () {
            var obj = {
                "type": "Head",
                "x": 75,
                "y": 145,
                "w": this.ctx2.measureText("Head: " + battleList[0].Equipment['Head']).width,
                "h": 5
            };
            equips.push(obj);
            obj = {
                "type": "Body",
                "x": 75,
                "y": 175,
                "w": this.ctx2.measureText("Body: " + battleList[0].Equipment['Body']).width,
                "h": 5
            };
            equips.push(obj);
            obj = {
                "type": "Weapon",
                "x": 75,
                "y": 200,
                "w": this.ctx2.measureText("Weapon: " + battleList[0].Equipment['Weapon']).width,
                "h": 5
            };
            equips.push(obj);
            obj = {
                "type": "Feet",
                "x": 75,
                "y": 225,
                "w": this.ctx2.measureText("Legs: " + battleList[0].Equipment['Feet']).width,
                "h": 5
            };
            equips.push(obj);
            obj = {
                "type": "Back",
                "x": 25,
                "y": 500,
                "w": 50,
                "h": 50
            };
            equips.push(obj);
        };
        EquipShop.prototype.changeEquip = function () {
            /*if (Date.now() > this.time && this.back) {
            this.ctx2.clearRect(0, 0, 800, 600);
            sManager.popState();
            }*/
            if (mousedown()) {
                this.mx = mEvent.pageX;
                this.my = mEvent.pageY;
                for (var i = 0; i < equips.length; i++) {
                    var x1 = equips[i].x;
                    var x2 = equips[i].x + equips[i].w;
                    var y1 = equips[i].y - 15;
                    var y2 = equips[i].y + equips[i].h;
                    if ((x1 <= this.mx && this.mx <= x2) && (y1 <= this.my && this.my <= y2)) {
                        if (equips[i].type === "Back") {
                            /*this.back = true;
                            this.time = Date.now() + 100;*/
                            this.ctx2.clearRect(0, 0, 800, 600);
                            sManager.popState();
                        } else {
                            sManager.pushState(new Game.SelectEquip(this.ctx2, equips[i].type));
                        }
                    }
                }
            }
        };
        EquipShop.prototype.init = function () {
            this.drawEquip();
            this.addEquipPos();
        };
        EquipShop.prototype.update = function () {
            this.drawEquip();
            this.changeEquip();
        };
        EquipShop.prototype.render = function () {
        };
        EquipShop.prototype.pause = function () {
        };
        EquipShop.prototype.resume = function () {
        };
        EquipShop.prototype.destroy = function () {
        };
        return EquipShop;
    })(Game.State);
    Game.EquipShop = EquipShop;
})(Game || (Game = {}));
///<reference path='State.ts' />
var Game;
(function (Game) {
    var Explore = (function (_super) {
        __extends(Explore, _super);
        function Explore(ctx, w, mapID, area, game) {
            _super.call(this);
            this.x = 0;
            this.y = 0;
            this.mx = 0;
            this.my = 0;
            this.velocity = 2.0;

            this.currentArea = area;
            this.mapID = mapID;
            var canvas = document.getElementById('layer2');
            this.layer2ctx = canvas.getContext('2d');

            var canvas2 = document.getElementById('layer1');
            this.layer1ctx = canvas2.getContext('2d');

            this.game = game;
            objects.push({
                "height": 75,
                "name": "menu",
                "properties": {},
                "type": "menu",
                "visible": true,
                "width": 75,
                "x": 5,
                "y": 5
            });
        }
        Explore.prototype.init = function () {
            this.layer1ctx.clearRect(0, 0, 800, 600);
            this.layer2ctx.clearRect(0, 0, 800, 600);
            tiles.setTileset(this.layer1ctx, this.mapID);
            this.layer1ctx.drawImage(IMAGE_CACHE['menu'], 5, 5);
            this.layer1ctx.drawImage(IMAGE_CACHE['hero'], 200, 250);
        };
        Explore.prototype.update = function () {
            if (mousedown()) {
                this.mx = mEvent.pageX;
                this.my = mEvent.pageY;
                for (var i = 0; i < objects.length; i++) {
                    var x1 = objects[i].x;
                    var x2 = objects[i].x + objects[i].width;
                    var y1 = objects[i].y;
                    var y2 = objects[i].y + objects[i].width;
                    if ((x1 <= this.mx && this.mx <= x2) && (y1 <= this.my && this.my <= y2)) {
                        if (objects[i].type === 'exit') {
                            if (objects[i].properties.ID === '0') {
                                console.log("exit");
                                sManager.popState();
                                this.game.currentArea = new Game.Area1(this.layer1ctx, 800, this);
                            } else if (objects[i].properties.ID === '1') {
                                sManager.popState();
                                this.game.currentArea = new Game.Area2(this.layer1ctx, 800, this);
                            }
                        } else if (objects[i].type === 'menu') {
                            sManager.pushState(new Game.StatusMenu(this.layer2ctx));
                        } else if (objects[i].type === 'cut') {
                            this.layer2ctx.clearRect(0, 0, 800, 600);
                            sManager.pushState(new Game.Cutscene("id", 800, 600, this.layer2ctx, objects[i].properties.ID));
                        } else if (objects[i].type === 'shop') {
                            this.layer2ctx.clearRect(0, 0, 800, 600);
                            sManager.pushState(new Game.EquipShop(this.layer1ctx, this.layer2ctx));
                        } else if (objects[i].type === 'battle') {
                            sManager.pushState(new Game.Battle(this.layer1ctx, this.layer2ctx));
                        }
                    }
                }
            }
        };
        Explore.prototype.render = function () {
        };
        Explore.prototype.pause = function () {
        };
        Explore.prototype.resume = function () {
        };
        Explore.prototype.destroy = function () {
        };
        return Explore;
    })(Game.State);
    Game.Explore = Explore;
})(Game || (Game = {}));
///<reference path='State.ts' />
var currentEquips = [];
var Game;
(function (Game) {
    var SelectEquip = (function (_super) {
        __extends(SelectEquip, _super);
        function SelectEquip(ctx2, type) {
            _super.call(this);
            this.itemSelected = false;
            this.time = 0;
            this.ctx2 = ctx2;
            this.type = type;
        }
        SelectEquip.prototype.init = function () {
            this.ctx2.drawImage(IMAGE_CACHE['dialog'], 15, 300);
            var eq = JSON_CACHE['equip'];
            if (this.type === "Head") {
                this.hKeys = Object.keys(eq.Head);
                for (var i = 0; i < ObjLength(eq.Head); i++) {
                    this.ctx2.fillText(this.hKeys[i], 50, (25 * i) + 325);
                    var obj = {
                        "Name": this.hKeys[i],
                        "x": 50,
                        "y": (25 * i) + 325,
                        "w": this.ctx2.measureText(this.hKeys[i]).width,
                        "h": 25
                    };
                    currentEquips.push(obj);
                }
            } else if (this.type === "Body") {
                this.bKeys = Object.keys(eq.Body);
                for (var i = 0; i < ObjLength(eq.Body); i++) {
                    this.ctx2.fillText(this.bKeys[i], 50, (25 * i) + 325);
                    var obj = {
                        "Name": this.bKeys[i],
                        "x": 50,
                        "y": (25 * i) + 325,
                        "w": this.ctx2.measureText(this.bKeys[i]).width,
                        "h": 25
                    };
                    currentEquips.push(obj);
                }
            } else if (this.type === "Weapon") {
                this.wKeys = Object.keys(eq.Weapon);
                for (var i = 0; i < ObjLength(eq.Weapon); i++) {
                    this.ctx2.fillText(this.wKeys[i], 50, (25 * i) + 325);
                    var obj = {
                        "Name": this.wKeys[i],
                        "x": 50,
                        "y": (25 * i) + 325,
                        "w": this.ctx2.measureText(this.wKeys[i]).width,
                        "h": 25
                    };
                    currentEquips.push(obj);
                }
            } else if (this.type === "Feet") {
                this.fKeys = Object.keys(eq.Feet);
                for (var i = 0; i < ObjLength(eq.Feet); i++) {
                    this.ctx2.fillText(this.fKeys[i], 50, (25 * i) + 325);
                    var obj = {
                        "Name": this.fKeys[i],
                        "x": 50,
                        "y": (25 * i) + 325,
                        "w": this.ctx2.measureText(this.fKeys[i]).width,
                        "h": 25
                    };
                    currentEquips.push(obj);
                }
            }

            this.itemSelected = false;
        };
        SelectEquip.prototype.update = function () {
            /*var time = Date.now();
            if (this.itemSelected) {
            this.itemSelected = false;
            
            }*/
            if (mousedown()) {
                this.mx = mEvent.pageX;
                this.my = mEvent.pageY;
                for (var i = 0; i < currentEquips.length; i++) {
                    var x1 = currentEquips[i].x;
                    var x2 = currentEquips[i].x + currentEquips[i].w;
                    var y1 = currentEquips[i].y - 10;
                    var y2 = currentEquips[i].y + currentEquips[i].h;
                    if ((x1 <= this.mx && this.mx <= x2) && (y1 <= this.my && this.my <= y2)) {
                        if (this.type === "Head") {
                            for (var x = 0; x <= ObjLength(JSON_CACHE['equip'].Head); x++) {
                                if (currentEquips[i].Name === this.hKeys[x]) {
                                    this.item = JSON_CACHE['equip'].Head[this.hKeys[x]];
                                    battleList[0].unequipItem(this.type);
                                    battleList[0].equipItem(this.hKeys[x], this.item, 'Head');
                                    sManager.popState();
                                    break;
                                }
                            }
                        } else if (this.type === "Body") {
                            for (var x = 0; x <= ObjLength(JSON_CACHE['equip'].Body); x++) {
                                if (currentEquips[i].Name === this.bKeys[x]) {
                                    //this.itemSelected = true;
                                    this.item = JSON_CACHE['equip'].Body[this.bKeys[x]];
                                    battleList[0].unequipItem(this.type);
                                    battleList[0].equipItem(this.bKeys[x], this.item, 'Body');
                                    sManager.popState();
                                    break;
                                }
                            }
                        } else if (this.type === "Weapon") {
                            for (var x = 0; x <= ObjLength(JSON_CACHE['equip'].Weapon); x++) {
                                if (currentEquips[i].Name === this.wKeys[x]) {
                                    //this.itemSelected = true;
                                    this.item = JSON_CACHE['equip'].Weapon[this.wKeys[x]];
                                    battleList[0].unequipItem(this.type);
                                    battleList[0].equipItem(this.wKeys[x], this.item, 'Weapon');
                                    sManager.popState();
                                    break;
                                }
                            }
                        } else if (this.type === "Feet") {
                            for (var x = 0; x <= ObjLength(JSON_CACHE['equip'].Feet); x++) {
                                if (currentEquips[i].Name === this.fKeys[x]) {
                                    //this.itemSelected = true;
                                    this.item = JSON_CACHE['equip'].Feet[this.fKeys[x]];
                                    battleList[0].unequipItem(this.type);
                                    battleList[0].equipItem(this.fKeys[x], this.item, 'Feet');
                                    sManager.popState();
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        };
        SelectEquip.prototype.render = function () {
        };
        SelectEquip.prototype.pause = function () {
        };
        SelectEquip.prototype.resume = function () {
        };
        SelectEquip.prototype.destroy = function () {
        };
        return SelectEquip;
    })(Game.State);
    Game.SelectEquip = SelectEquip;
})(Game || (Game = {}));
var Game;
(function (Game) {
    var StateManager = (function () {
        /*currentInGameState = 0;
        currentInGameStateFunction = null;
        currentState = 0;
        currentStateFunction = null;*/
        //Mostly guesswork here, I am assuming none of this code will make it to the final thing
        //High on the list, will start getting through this ASAP with help from nick and/or the book
        function StateManager() {
            this.time = 0;
            this.gameStates = [];
            this.stateStack = new Array();
        }
        StateManager.prototype.addState = function (key, state) {
            this.gameStates[key] = state;
            //this.stateStack.push(state);
            //state.init();
        };
        StateManager.prototype.pushState = function (state) {
            this.stateStack.push(state);
            state.init();
            //this.stateStack.push(this.gameStates[key]);
            //this.gameStates[key].init();
        };
        StateManager.prototype.popState = function () {
            if (this.stateStack.length > 0 && this.time < Date.now()) {
                this.time = Date.now() + 10;
                this.stateStack.pop();
                if (this.stateStack.length > 0) {
                    var len = this.stateStack.length;
                    this.stateStack[len - 1].init();
                }
            }
        };
        StateManager.prototype.updateStack = function () {
            var len = this.stateStack.length;
            this.stateStack[len - 1].update();
        };
        StateManager.prototype.renderStack = function () {
            for (var s in this.stateStack) {
                s.render();
            }
        };
        return StateManager;
    })();
    Game.StateManager = StateManager;
})(Game || (Game = {}));
///<reference path='State.ts' />
var Game;
(function (Game) {
    var Cutscene = (function (_super) {
        __extends(Cutscene, _super);
        function Cutscene(id, width, height, ctx, xmlID) {
            _super.call(this);
            this.canvas = document.getElementById('layer2');
            this.context = this.canvas.getContext('2d');
            this.xmlID = xmlID;
            this.dia = new Game.Dialogue(this.context, width);
        }
        Cutscene.prototype.init = function () {
            this.dia.startScene('chapter', 'scene', this.xmlID);
        };

        Cutscene.prototype.update = function () {
            if (mousedown()) {
                this.dia.updateScene();
            }
        };
        Cutscene.prototype.render = function () {
        };
        Cutscene.prototype.pause = function () {
        };
        Cutscene.prototype.resume = function () {
        };
        Cutscene.prototype.destroy = function () {
        };
        return Cutscene;
    })(Game.State);
    Game.Cutscene = Cutscene;
})(Game || (Game = {}));
///<reference path='State.ts' />
var Game;
(function (Game) {
    var StatusMenu = (function (_super) {
        __extends(StatusMenu, _super);
        //used as the base class to be extended for each state
        //might need some initialization code to remove some clutter
        //from each state to make stuff look better
        function StatusMenu(ctx) {
            _super.call(this);
            ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
            ctx.fillRect(0, 0, 650, 600);
            ctx.drawImage(IMAGE_CACHE['status'], 0, 100);
            ctx.drawImage(IMAGE_CACHE['back'], 50, 500);
        }
        StatusMenu.prototype.init = function () {
        };
        StatusMenu.prototype.update = function () {
            if (mousedown()) {
                this.mx = mEvent.pageX;
                this.my = mEvent.pageY;
                var x1 = 40;
                var x2 = 120;
                var y1 = 490;
                var y2 = 560;
                if ((x1 <= this.mx && this.mx <= x2) && (y1 <= this.my && this.my <= y2)) {
                    sManager.popState();
                }
            }
        };
        StatusMenu.prototype.render = function () {
        };
        StatusMenu.prototype.pause = function () {
        };
        StatusMenu.prototype.resume = function () {
        };
        StatusMenu.prototype.destroy = function () {
        };
        return StatusMenu;
    })(Game.State);
    Game.StatusMenu = StatusMenu;
})(Game || (Game = {}));
function ObjLength(obj) {
    var key, count = 0;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            count++;
        }
    }
    return count;
}
/*
* Returns a random integer between min and max
* Using Math.round() will give you a non - uniform distribution!
*/
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function setStyle(ctx, font, size, color, bold, italic, align) {
    var bolded = bold || '';
    var ital = italic || '';
    ctx.font = bolded + ' ' + ital + ' ' + size + ' ' + font;
    ctx.fillStyle = color;
    ctx.textAlign = align;
}
function wrap(ctx, cwidth, text) {
    var templine = "";
    var lines = [];
    var child = text.childNodes;

    for (var i = 0; i < text.childNodes.length; i++) {
        if (child[i].nodeType === 1) {
            if (ctx.measureText(child[i].textContent).width >= cwidth) {
                var words = child[i].textContent.split(' ');
                for (var key = 0; key < words.length; key++) {
                    var length = templine.length;
                    var word = words[key];
                    templine = templine + word + ' ';
                    if (ctx.measureText(templine).width >= (cwidth * 0.85)) {
                        lines.push({ "name": child[i].nodeName, "message": templine.substring(0, length) });
                        key--;
                        templine = "";
                    } else if (ctx.measureText(templine).width >= (cwidth * 0.70)) {
                        lines.push({ "name": child[i].nodeName, "message": templine });
                        templine = "";
                    }
                }
                lines.push({ "name": child[i].nodeName, "message": templine });
            } else {
                lines.push({ "name": child[i].nodeName, "message": child[i].textContent });
            }
        }
    }
    return lines;
}
//# sourceMappingURL=app.js.map
