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
            //sManager.pushState(new Explore(ctx, w, 'rpg', this, loop));
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
            //sManager.pushState(new Explore(ctx, w, 'carpet', this, loop));
        }
        return Area2;
    })();
    Game.Area2 = Area2;
})(Game || (Game = {}));
var Game;
(function (Game) {
    var Animation = (function () {
        function Animation(context) {
            var _this = this;
            this.finishPlaying = false;
            this.counter = 0;
            this.play = function () {
                var animate = requestAnimationFrame(_this.play);
                _this.context.clearRect(0, 0, 800, 600);
                var im = _this.animHolder[_this.counter];

                //this.context.drawImage(im.img, im.x, im.y, im.W, im.H, 200, 200, im.W * im.scale, im.H * im.scale);
                _this.animHolder[_this.counter].render(_this.context);
                _this.counter++;
                if (_this.counter >= ObjLength(_this.animHolder)) {
                    cancelAnimationFrame(animate);
                    _this.context.clearRect(0, 0, 800, 600);
                    _this.finishPlaying = true;
                }
            };
            this.context = context;
        }
        Animation.prototype.queueAnimation = function (anim) {
            this.animHolder = anim;
            this.finishPlaying = false;
        };
        return Animation;
    })();
    Game.Animation = Animation;
})(Game || (Game = {}));
var FORMATION;
var Game;
(function (Game) {
    var BattleFormation = (function () {
        function BattleFormation() {
            this.positionLength = 2;
            this.formKey = Object.keys(JSON_CACHE['formation']['Formations']);
            this.current = this.formKey[0];
            this.positions = [];
            var currentFormation = JSON_CACHE['formation']['Formations'][this.current];

            for (var i = 0; i < this.formKey.length; i++) {
                var obj = {
                    "x": currentFormation.positions.x[i],
                    "y": currentFormation.positions.y[i]
                };
                this.positions[i] = obj;
            }

            //add bonues to objects
            this.bonus = {
                "HP": currentFormation.bonus.HP,
                "MP": currentFormation.bonus.MP,
                "Atk": currentFormation.bonus.Atk,
                "Def": currentFormation.bonus.Def,
                "Spd": currentFormation.bonus.Spd,
                "MDef": currentFormation.bonus.MDef,
                "Luc": currentFormation.bonus.Luc
            };

            this.battleKeys = Object.keys(battleList);

            for (var i = 0; i < this.battleKeys.length; i++) {
                if (battleList[i].Base.Type === 0) {
                    battleList[i].setModifiedAttributes(battleList[i].Modified.ID, battleList[i].Modified['HP'] + this.bonus.HP, battleList[i].Modified['MP'] + this.bonus.MP, battleList[i].Modified['Atk'] + this.bonus.Atk, battleList[i].Modified['Def'] + this.bonus.Def, battleList[i].Modified['Spd'] + this.bonus.Spd, battleList[i].Modified['MAtk'] + this.bonus.MAtk, battleList[i].Modified['MDef'] + this.bonus.MDef, battleList[i].Modified['Luc'] + this.bonus.Luc, battleList[i].Modified.Type);
                }
            }
        }
        BattleFormation.prototype.setFormation = function (formation) {
            for (var i = 0; i < this.battleKeys.length; i++) {
                if (battleList[i].Base.Type === 0) {
                    battleList[i].setModifiedAttributes(battleList[i].Modified.ID, battleList[i].Modified['HP'] - this.bonus.HP, battleList[i].Modified['MP'] - this.bonus.MP, battleList[i].Modified['Atk'] - this.bonus.Atk, battleList[i].Modified['Def'] - this.bonus.Def, battleList[i].Modified['Spd'] - this.bonus.Spd, battleList[i].Modified['MAtk'] - this.bonus.MAtk, battleList[i].Modified['MDef'] - this.bonus.MDef, battleList[i].Modified['Spd'] - this.bonus.Spd, battleList[i].Modified['Luc'] - this.bonus.Luc, battleList[i].Modified.Type);
                }
            }

            //find reference to new formation
            var fKeys = Object.keys(JSON_CACHE['formation']['Formations']);
            for (var i = 0; i < this.formKey.length; i++) {
                if (formation === this.formKey[i]) {
                    this.current = this.formKey[i];
                }
            }

            //add bonues to objects
            this.bonus = {
                "HP": JSON_CACHE['formation']['Formations'][this.current].bonus.HP,
                "MP": JSON_CACHE['formation']['Formations'][this.current].bonus.MP,
                "Atk": JSON_CACHE['formation']['Formations'][this.current].bonus.Atk,
                "Def": JSON_CACHE['formation']['Formations'][this.current].bonus.Def,
                "Spd": JSON_CACHE['formation']['Formations'][this.current].bonus.Spd,
                "MAtk": JSON_CACHE['formation']['Formations'][this.current].bonus.MAtk,
                "MDef": JSON_CACHE['formation']['Formations'][this.current].bonus.MDef,
                "Luc": JSON_CACHE['formation']['Formations'][this.current].bonus.Luc
            };

            for (var i = 0; i < this.battleKeys.length; i++) {
                if (battleList[i].Base.Type === 0) {
                    battleList[i].setModifiedAttributes(battleList[i].Modified.ID, battleList[i].Modified['HP'] + this.bonus.HP, battleList[i].Modified['MP'] + this.bonus.MP, battleList[i].Modified['Atk'] + this.bonus.Atk, battleList[i].Modified['Def'] + this.bonus.Def, battleList[i].Modified['Spd'] + this.bonus.Spd, battleList[i].Modified['MAtk'] + this.bonus.MAtk, battleList[i].Modified['MDef'] + this.bonus.MDef, battleList[i].Modified['Luc'] + this.bonus.Luc, battleList[i].Modified.Type);
                }
            }

            for (var i = 0; i < this.formKey.length; i++) {
                var obj = {
                    "x": JSON_CACHE['formation']['Formations'][this.current].positions.x[i],
                    "y": JSON_CACHE['formation']['Formations'][this.current].positions.y[i]
                };
                this.positions[i] = obj;
            }
        };
        return BattleFormation;
    })();
    Game.BattleFormation = BattleFormation;
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
                _this.lines = wrap(_this.ctx, _this.dialogueObject);
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
            setStyle(this.ctx, 'Calibri', '16pt', 'white', 'bold', 'italic', 'left');
        }
        return Dialogue;
    })();
    Game.Dialogue = Dialogue;
})(Game || (Game = {}));
var Game;
(function (Game) {
    var Equipable = (function () {
        function Equipable(name, desc, type, hp, mp, atk, def, spd, matk, mdef, luc) {
            this.Name = name;
            this.Desc = desc;
            this.Type = type;
            this.HP = hp || 1;
            this.MP = mp || 0;
            this.Atk = atk || 0;
            this.Def = def || 0;
            this.Spd = spd || 0;
            this.MAtk = matk || 0;
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
        function Accessory(name, desc, type, hp, mp, atk, def, spd, matk, mdef, luc) {
            _super.call(this, name, desc, type, hp, mp, atk, def, spd, matk, mdef, luc);
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
        function Body(name, desc, type, hp, mp, atk, def, spd, matk, mdef, luc) {
            _super.call(this, name, desc, type, hp, mp, atk, def, spd, matk, mdef, luc);
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
        function Feet(name, desc, type, hp, mp, atk, def, spd, matk, mdef, luc) {
            _super.call(this, name, desc, type, hp, mp, atk, def, spd, matk, mdef, luc);
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
        function Helm(name, desc, type, hp, mp, atk, def, spd, matk, mdef, luc) {
            _super.call(this, name, desc, type, hp, mp, atk, def, spd, matk, mdef, luc);
        }
        return Helm;
    })(Game.Equipable);
    Game.Helm = Helm;
})(Game || (Game = {}));
var ITEM;
var Game;
(function (Game) {
    var ItemManager = (function () {
        function ItemManager() {
            this.consumable = [];
            this.quest = [];
        }
        ItemManager.prototype.add = function (name, amt, type) {
            if (type === "consumable") {
                this.itemSource = JSON_CACHE['items']['consumable'];
                this.itemKeys = Object.keys(JSON_CACHE['items']['consumable']);
            } else if (type === "quest") {
                this.itemSource = JSON_CACHE['items']['quest'];
                this.itemKeys = Object.keys(JSON_CACHE['items']['quest']);
            }
            for (var x = 0; x < this.itemKeys.length; x++) {
                if (name === this.itemSource[this.itemKeys[x]].name) {
                    if (type === "consumable") {
                        this.consumable[this.itemKeys[x]] = {
                            "name": this.itemSource[this.itemKeys[x]].name,
                            "quantity": amt
                        };
                    } else if (type === "quest") {
                        this.quest[this.itemKeys[x]] = {
                            "name": this.itemSource[this.itemKeys[x]].name,
                            "quantity": amt
                        };
                    }
                }
            }
        };
        return ItemManager;
    })();
    Game.ItemManager = ItemManager;
})(Game || (Game = {}));
///<reference path='equipable.ts' />
var Game;
(function (Game) {
    var Weapon = (function (_super) {
        __extends(Weapon, _super);
        function Weapon(name, desc, type, hp, mp, atk, def, spd, matk, mdef, luc) {
            _super.call(this, name, desc, type, hp, mp, atk, def, spd, matk, mdef, luc);
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
        function GameObject(img, dx, dy, sx, sy, w, h, scale) {
            this.sx = 0;
            this.sy = 0;
            this.dx = 0;
            this.dy = 0;
            this.W = 0;
            this.H = 0;
            this.img = new Image();
            this.scale = 1;
            this.img = img;
            this.sx = sx || 0;
            this.sy = sy || 0;
            this.dx = dx;
            this.dy = dy;
            this.W = w || img.naturalWidth;
            this.H = h || img.naturalHeight;
            this.scale = scale || 1;
        }
        GameObject.prototype.update = function () {
        };
        GameObject.prototype.render = function (context) {
            context.drawImage(this.img, this.sx, this.sy, this.W, this.H, this.dx, this.dy, this.W * this.scale, this.H * this.scale);
            //context.drawImage(this.img, this.x, this.y);
        };
        GameObject.prototype.setPos = function (x, y) {
            this.dx = x;
            this.dy = y;
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
        function Sprite(img, dx, dy, sx, sy, w, h, scale) {
            _super.call(this, img, dx, dy, sx, sy, w, h, scale);
            this.dead = false;
            this.defend = false;
            this.defend = false;
            this.currentState = 0;
            this.Spells = [];
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
                "MAtk": 0,
                "MDef": 0,
                "Luc": 0,
                "Type": null
            };
            this.Modified = this.Base;
            this.Current = this.Base;
            this.ElementResist = {
                "Physical": 0,
                "Fire": 0,
                "Ice": 0,
                "Thunder": 0,
                "Wind": 0,
                "Earth": 0,
                "Light": 0,
                "Dark": 0
            };
            this.StatusResist = {
                "Poison": 0,
                "Paralysis": 0,
                "Sleep": 0
            };
            this.Level = 1;
        }
        Sprite.prototype.setBaseAttributes = function (id, hp, mp, atk, def, spd, matk, mdef, luc, type) {
            this.Base = {
                "ID": id,
                "HP": hp,
                "MP": mp || 0,
                "Atk": atk || 0,
                "Def": def || 0,
                "Spd": spd || 0,
                "MAtk": matk || 0,
                "MDef": mdef || 0,
                "Luc": luc || 0,
                "Type": type
            };
        };
        Sprite.prototype.setModifiedAttributes = function (id, hp, mp, atk, def, spd, matk, mdef, luc, type) {
            this.Modified = {
                "ID": id,
                "HP": hp,
                "MP": mp || 0,
                "Atk": atk || 0,
                "Def": def || 0,
                "Spd": spd || 0,
                "MAtk": matk || 0,
                "MDef": mdef || 0,
                "Luc": luc || 0,
                "Type": type
            };
        };

        Sprite.prototype.equipItem = function (name, equipment, type) {
            this.Equipment[type] = name;

            this.setModifiedAttributes(name, this.Modified['HP'] + equipment.HP, this.Modified['MP'] + equipment.MP, this.Modified['Atk'] + equipment.Atk, this.Modified['Def'] + equipment.Def, this.Modified['Spd'] + equipment.Spd, this.Modified['MAtk'] + equipment.MAtk, this.Modified['MDef'] + equipment.MDef, this.Modified['Luc'] + equipment.Luc, type);
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
                this.setModifiedAttributes(key, this.Modified['HP'] - item.HP, this.Modified['MP'] - item.MP, this.Modified['Atk'] - item.Atk, this.Modified['Def'] - item.Def, this.Modified['Spd'] - item.Spd, this.Modified['MAtk'] - item.MAtk, this.Modified['MDef'] - item.MDef, this.Modified['Luc'] - item.Luc, type);
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
                "MAtk": this.Base['MAtk'] + this.Modified['MAtk'],
                "MDef": this.Base['MDef'] + this.Modified['MDef'],
                "Luc": this.Base['Luc'] + this.Modified['Luc'],
                "Type": this.Base['Type']
            };
        };
        Sprite.prototype.levelUp = function () {
        };
        return Sprite;
    })(Game.GameObject);
    Game.Sprite = Sprite;
})(Game || (Game = {}));
var PARTY;
var Game;
(function (Game) {
    var PartyManager = (function () {
        function PartyManager() {
            this.character = "";
        }
        PartyManager.prototype.add = function (char, type, x, y) {
            var x = x || 400;
            var y = y || 250;
            if (type === 0) {
                var keys = Object.keys(JSON_CACHE['character']['Party']);
                for (var s = 0; s < keys.length; s++) {
                    if (char === keys[s]) {
                        var b = JSON_CACHE['character']['Party'][keys[s]];
                        var p1 = new Game.Sprite(IMAGE_CACHE[b.Img], 0, 0);
                        p1.setBaseAttributes(keys[s], b.HP, b.MP, b.Atk, b.Def, b.Spd, b.MAtk, b.MDef, b.Luc, type);

                        //p1.setBaseAttributes('hero', 10, 0, 4, 1, 1, 1, 1, 0);
                        p1.growth = b.growth;
                        battleList.push(p1);
                    }
                }
            }
        };
        PartyManager.prototype.remove = function (char, type) {
            var keys = Object.keys(battleList);
            for (var c = 0; c < keys.length; c++) {
                if (char === battleList[c].Base.ID) {
                    battleList.splice(c, 1);
                    break;
                }
            }
        };
        return PartyManager;
    })();
    Game.PartyManager = PartyManager;
})(Game || (Game = {}));
var QUEST;
var Game;
(function (Game) {
    var QuestManager = (function () {
        function QuestManager() {
            this.Switch = [];
            var key = Object.keys(JSON_CACHE['location']);
            for (var x = 0; x < key.length; x++) {
                var bkeys = Object.keys(JSON_CACHE['location'][key[x]]);
                for (var y = 0; y < bkeys.length; y++)
                    if (bkeys[y] === key[x]) {
                        this.Switch[bkeys[y]] = JSON_CACHE['location'][key[x]][key[x]]['auto'];
                    } else {
                        this.Switch[bkeys[y]] = false;
                    }
            }
        }
        return QuestManager;
    })();
    Game.QuestManager = QuestManager;
})(Game || (Game = {}));
var SAVE;
var Game;
(function (Game) {
    var SaveSystem = (function () {
        function SaveSystem(ctx) {
            this.MapID = [];
            this.PartyMembers = [];
            this.switches = [];
            this.QuestItems = [];

            //this.ConsumableItems = [];
            this.context = ctx;
            this.cName = [];
            this.cAmt = [];
            var canvas = document.getElementById('layer2');
            this.ctx = canvas.getContext('2d');

            var canvas2 = document.getElementById('layer1');
            this.ctx2 = canvas2.getContext('2d');
        }
        SaveSystem.prototype.save = function () {
            this.MapID = TileMap.currentIndex;
            var k = Object.keys(battleList);
            for (var x = 0; x < k.length; x++) {
                if (battleList[k[x]].Base.Type === 0) {
                    this.PartyMembers.push(battleList[k[x]]);
                }
            }
            localStorage['Party'] = JSON.stringify(this.PartyMembers);
            localStorage['TileMap'] = this.MapID;
            var ckey = Object.keys(ITEM.consumable);
            if (ckey.length > 0) {
                for (var x = 0; x < ckey.length; x++) {
                    this.cName[x] = ITEM.consumable[ckey[x]].name;
                    this.cAmt[x] = ITEM.consumable[ckey[x]].quantity;
                }
            }

            /*var qkey = Object.keys(ITEM.quest)
            if (qkey.length > 0) {
            
            for (var x = 0; x < qkey.length; x++) {
            this.qName[x] = ITEM.quest[ckey[x]].name;
            this.qAmt[x] = ITEM.quest[ckey[x]].quantity;
            }
            }
            localStorage['QName'] = JSON.stringify(this.qName);
            localStorage['QAmt'] = JSON.stringify(this.qAmt);*/
            localStorage['CName'] = JSON.stringify(this.cName);
            localStorage['CAmt'] = JSON.stringify(this.cAmt);
            this.ctx.clearRect(0, 0, 800, 600);
            this.ctx2.clearRect(0, 0, 800, 600);

            sManager.pushState(new Game.Title(this.ctx));
        };
        SaveSystem.prototype.load = function (w) {
            if (localStorage.getItem("TileMap") === null || localStorage.getItem("Party") === null) {
                this.context.fillText("No saved file detected. Please start a new Game", 100, 250);
            } else {
                var canvas = document.getElementById('layer1');
                var context = canvas.getContext('2d');
                var canvas2 = document.getElementById('layer2');
                var context2 = canvas.getContext('2d');
                TileMap = new Game.Tilemap();
                TileMap.Init();
                this.MapID = localStorage['TileMap'];
                battleList = [];
                ITEM.quest = [];
                ITEM.consumable = [];
                battleList = JSON.parse(localStorage['Party']);

                /*ITEM.quest = localStorage['Quest'];
                
                if (localStorage.getItem('QName') !== null) {
                this.qName = JSON.parse(localStorage['QName']);
                this.qAmt = JSON.parse(localStorage['QAmt']);
                var qkey = Object.keys(this.qName);
                for (var x = 0; x < qkey.length; x++) {
                ITEM.quest[qkey[x]] = {
                "name": this.qName[x],
                "quantity": this.qAmt[x]
                };
                }
                }*/
                if (localStorage.getItem('CName') !== null) {
                    this.cName = JSON.parse(localStorage['CName']);
                    this.cAmt = JSON.parse(localStorage['CAmt']);
                    var ckey = Object.keys(this.cName);
                    for (var x = 0; x < ckey.length; x++) {
                        ITEM.consumable[ckey[x]] = {
                            "name": this.cName[x],
                            "quantity": this.cAmt[x]
                        };
                    }
                }
                sManager.pushState(new Game.Explore(context, this.MapID));
            }
        };
        return SaveSystem;
    })();
    Game.SaveSystem = SaveSystem;
})(Game || (Game = {}));
/*      Spell Manager to add and remove spells from characters. Example of use below:
*            SPELL = new SpellManager();
*            var spellkeys = Object.keys(JSON_CACHE['spell']['Spells']);
*            SPELL.AddSpell(battleList[0], spellkeys[3]);
*            SPELL.AddSpell(battleList[1], spellkeys[3]);
*/
var SPELL;
var Game;
(function (Game) {
    var SpellManager = (function () {
        function SpellManager() {
            this.SpellKeys = Object.keys(JSON_CACHE['spell'].Spells);
        }
        SpellManager.prototype.AddSpell = function (character, SpellName) {
            for (var i = 0; i < this.SpellKeys.length; i++) {
                if (SpellName === this.SpellKeys[i]) {
                    character.Spells.push(SpellName);
                    break;
                }
            }
        };
        SpellManager.prototype.RemoveSpell = function (character, SpellName) {
            var keys = Object.keys(character.Spells);
            for (var i = 0; i < 5; i++) {
                if (SpellName === keys[i]) {
                    character.Spells[i] = null;
                    break;
                }
            }
        };
        return SpellManager;
    })();
    Game.SpellManager = SpellManager;
})(Game || (Game = {}));
var STATUS;
var Game;
(function (Game) {
    var StatusManager = (function () {
        function StatusManager() {
            this.effects = [];
            this.effects = {
                "Poison": 2
            };
        }
        return StatusManager;
    })();
    Game.StatusManager = StatusManager;
})(Game || (Game = {}));
var TileMap;
var Game;
(function (Game) {
    var Loop = (function () {
        //remove alot of initialization code from here as it will go in the states
        //need to put the code in here to deal with the states as needed thoughs
        function Loop() {
            this.render = function () {
            };
            this.canvas = document.getElementById('layer1');
            this.context = this.canvas.getContext('2d');
            this.canvas2 = document.getElementById('layer2');
            this.context2 = this.canvas.getContext('2d');
            TileMap = new Game.Tilemap();
            TileMap.Init();

            PARTY = new Game.PartyManager();
            FORMATION = new Game.BattleFormation();
            ITEM = new Game.ItemManager();
            SPELL = new Game.SpellManager();
            QUEST = new Game.QuestManager();
            STATUS = new Game.StatusManager();

            //add default party..should move it somewhere else later on
            /* PARTY.add("Shadow", 0);
            var spellkeys = Object.keys(JSON_CACHE['spell']['Spells']);
            SPELL.AddSpell(battleList[0], spellkeys[1]);
            PARTY.add("Syndra", 0);
            PARTY.add("Johnathan", 0);
            */
            sManager.pushState(new Game.Title(this.context));
        }
        Loop.prototype.update = function () {
            sManager.updateStack();
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
var GAME_VERSION = "0.10";
var PARTY_SIZE = 3;
var GAME_WIDTH = 800;
var GAME_HEIGHT = 600;

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
                    LArrow: 'Assets/Image/arrowLeft.png',
                    RArrow: 'Assets/Image/arrowRight.png',
                    dialog: 'Assets/Image/dialogWindow.png',
                    hero: 'Assets/Image/hero.png',
                    status: 'Assets/Image/status.png',
                    Attack: 'Assets/Image/attack_button.png',
                    Defend: 'Assets/Image/defend_button.png',
                    Spell: 'Assets/Image/spell.png',
                    bg: 'Assets/Image/bg.png',
                    tick: 'Assets/Image/tick.png',
                    box: 'Assets/Image/box.png',
                    ripple: 'Assets/Image/ripple.jpg'
                },
                Anim: {
                    at: 'Assets/Atlas/test.json'
                },
                Sprite: {
                    spr: 'Assets/Atlas/test.json'
                },
                Tileset: {
                    map1: 'Assets/Tilemap/map1.json',
                    map2: 'Assets/Tilemap/map2.json',
                    map3: 'Assets/Tilemap/map3.json',
                    Timor_Grasslands: 'Assets/Tilemap/Timor_Grasslands.json'
                },
                XML: {
                    chapter: 'Assets/XML/test.xml'
                },
                JSON: {
                    equip: 'Assets/XML/Equipment.json',
                    formation: 'Assets/XML/Formation.json',
                    items: 'Assets/XML/item.json',
                    spell: 'Assets/XML/Spells.json',
                    character: 'Assets/XML/characters.json',
                    Enemies: 'Assets/XML/EnemyGroups.json',
                    location: 'Assets/XML/locationMap.json'
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
            sManager = new Game.StateManager();
            this.preloader.queueAssets(source, this.onComplete);
        }
        return Init;
    })();
    Game.Init = Init;
})(Game || (Game = {}));

function startGame() {
    var world = new Game.Loop();
    setInterval(function () {
        world.update();
    }, 1000 / 30);
}
var that = this;
var keys = [];
var mousedown = false;
var canvas;
var mEvent = null;
var clickTime = 0;
document.addEventListener('mousedown', function (e) {
    e.stopPropagation();
    e.preventDefault();
    that.mEvent = e;
    that.mousedown = true;
});
document.addEventListener('mouseup', function (e) {
    e.stopPropagation();
    e.preventDefault();
    that.mousedown = false;
});
function mouseClicked() {
    if (mousedown) {
        mousedown = false;
        return true;
    } else {
        return false;
    }
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
var isLoaded = 0;
var totalAssets = 0;
var tilesetPos = 0;
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
            this.jsonKey = [];
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
            this.callback = new function () {
            };
            this.onAnimJSONLoad = function (key, response) {
                var holder = [];
                var frame;
                _this.animData = JSON.parse(response);

                _this.animSource.onload = function () {
                    isLoaded++;
                };
                _this.animSource.src = 'Assets/Atlas/' + _this.animData.meta.image;
                for (var i = 0; i < _this.animData.frames.length; i++) {
                    frame = _this.animData.frames[i].frame;
                    holder[i] = new Game.GameObject(_this.spriteSource, 0, 0, frame.x, frame.y, frame.w, frame.h);
                }
                ANIM_CACHE[key[_this.animPos]] = holder; //Store the holder array into the key of the ANIM_CACHE
                _this.animPos++; //Move to the next key of the array
            };
            this.onSpriteJSONLoad = function (key, response) {
                var holder = [];

                _this.spriteData = JSON.parse(response);
                _this.spriteSource.onload = function () {
                    isLoaded++;
                };
                _this.spriteSource.src = 'Assets/Atlas/' + _this.spriteData.meta.image;
                for (var i = 0; i < _this.spriteData.frames.length; i++) {
                    var frame = _this.spriteData.frames[i].frame;

                    //figure out whats wrong with the associative array
                    var indexes = _this.spriteData.frames[i].filename.substring(0, _this.spriteData.frames[i].filename.length - 4);
                    holder[i] = new Game.GameObject(_this.spriteSource, 0, 0, frame.x, frame.y, frame.w, frame.h);
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
                var tileset_holder = [];
                for (var i = 0; i < tiledata.length; i++) {
                    var tilesetimage = new Image();
                    tilesetimage.onload = function () {
                        isLoaded++;
                    };
                    tilesetimage.src = "Assets/Tilemap/" + tiledata[i].image.replace(/^.*[\\\/]/, '');
                    var tileData = {
                        "firstgid": tiledata[i].firstgid,
                        "image": tilesetimage,
                        "imageheight": tiledata[i].imageheight,
                        "imagewidth": tiledata[i].imagewidth,
                        "name": tiledata[i].name,
                        "numXTiles": Math.floor(tiledata[i].imagewidth / _this.tileSizeX),
                        "numYTiles": Math.floor(tiledata[i].imageheight / _this.tileSizeY)
                    };
                    tileset_holder.push(tileData);

                    _this.tileKey = key; //needed for getTile ()
                }
                TILESET_CACHE[tiledata[0].name] = tileset_holder;
                TILEDATA_CACHE[tiledata[0].name] = _this.tiledData;
            };
            this.onXMLLoad = function (key, response, pos) {
                XML_CACHE[key[pos]] = response;
                isLoaded++;
                //rest to be implemented. not sure how to extract the info how i want yet...will do soon
                //saved xml file iin the global variable to be used later on as needed
            };
            this.onJSONLoad = function (key, response, pos) {
                JSON_CACHE[key[pos]] = JSON.parse(response);
                isLoaded++;
            };
        }
        Preloader.prototype.queueAssets = function (Assets, load) {
            this.callback = load;
            var Assetkeys = Object.keys(Assets);
            for (var x = 0; x < Assetkeys.length; x++) {
                var itemkeys = Object.keys(Assets[Assetkeys[x]]);
                for (var y = 0; y < itemkeys.length; y++) {
                    totalAssets++;
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
            var that = this;
            this.timerid = setInterval(function () {
                if (isLoaded >= totalAssets) {
                    clearInterval(that.timerid);
                    startGame();
                }
            }, 1000 / 1);
        };
        Preloader.prototype.genericLoader = function (url, isImage, key, onLoad, typeOfFile) {
            if (isImage) {
                for (var file in url) {
                    IMAGE_CACHE[file] = new Image();
                    IMAGE_CACHE[file].onload = isLoaded++;
                    IMAGE_CACHE[file].onerror = this.isError++;
                    IMAGE_CACHE[file].src = url[file];
                }
            } else {
                key = Object.keys(url);
                for (var i = 0; i < key.length; i++) {
                    this.loadfile(key, url[key[i]], onLoad, typeOfFile, i);
                }
            }
        };
        Preloader.prototype.soundloader = function (sounds, type) {
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
                        isLoaded++;
                    });
                } else if (type === 'Music') {
                    MUSIC_CACHE[key[pos]] = document.createElement("audio");
                    document.body.appendChild(MUSIC_CACHE[key[pos]]);
                    audioType = this.soundFormat(MUSIC_CACHE[key[pos]]);
                    MUSIC_CACHE[key[pos]].setAttribute("src", sounds[key[pos]] + audioType);
                    MUSIC_CACHE[key[pos]].load();
                    MUSIC_CACHE[key[pos]].addEventListener('canplaythrough', function () {
                        isLoaded++;
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
        Preloader.prototype.loadfile = function (key, url, onLoad, type, pos) {
            var xobj = new XMLHttpRequest();
            xobj.open('GET', url, true);
            xobj.onreadystatechange = function () {
                if (xobj.readyState == 4 && xobj.status == 200) {
                    if (type === 'json') {
                        onLoad(key, xobj.responseText, pos);
                    } else if (type === 'xml') {
                        onLoad(key, xobj.responseXML, pos);
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
                //go back through this to see if its needed later on. might need a revamp or look through
                /*if (!this.isFilesLoaded) {
                console.log("tileset not loaded");
                return;
                }*/
                _this.currentIndex = index;
                objects = [];
                for (var layeridX = 0; layeridX < TILEDATA_CACHE[index].layers.length; layeridX++) {
                    if (TILEDATA_CACHE[index].layers[layeridX].type === "tilelayer") {
                        var data = TILEDATA_CACHE[index].layers[layeridX].data;

                        for (var tileidX = 0; tileidX < data.length; tileidX++) {
                            var ID = data[tileidX];
                            if (ID === 0) {
                                continue;
                            }
                            var tileloc = _this.getTile(ID, index);

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

                        //var key = Object.keys(objects);
                        /*for (var y = 0; y < key.length; y++) {
                        objects[key[y]] = [];
                        }*/
                        objects = [];
                        for (var x = 0; x < tileObjects.length; x++) {
                            var tile = _this.getTile(tileObjects[x].gid, index);

                            /*obj.name = tileObjects[x].name;
                            obj.type = tileObjects[x].type;
                            obj.properties.ID = tileObjects[x].properties.ID;
                            obj.x = tileObjects[x].x;
                            obj.y = tileObjects[x].y;*/
                            var w = TILEDATA_CACHE[index].tilewidth;
                            var h = TILEDATA_CACHE[index].tileheight;

                            //this.objimg = tile.img;
                            //this.objpx = tile.px;
                            //this.objpy = tile.py;
                            //this.objx = obj.x;
                            //this.objy = obj.y;
                            var y = tileObjects[x].y - 64;
                            setStyle(context, 'Calibri', '12pt', 'black', 'bold', 'italic', 'center');
                            context.drawImage(tile.img, tile.px, tile.py, w, h, tileObjects[x].x, y, w, h);
                            context.fillText(tileObjects[x].name, tileObjects[x].x + 32, y - 10);
                            if (tileObjects[x].type === "exit") {
                                objects[x] = {
                                    "gid": tileObjects[x].gid,
                                    "name": tileObjects[x].name,
                                    "type": tileObjects[x].type,
                                    "properties": {
                                        "Type": tileObjects[x].properties.Type,
                                        "ID": tileObjects[x].properties.ID
                                    },
                                    "width": w,
                                    "x": tileObjects[x].x,
                                    "y": y
                                };
                            } else {
                                objects[x] = {
                                    "gid": tileObjects[x].gid,
                                    "name": tileObjects[x].name,
                                    "type": tileObjects[x].type,
                                    "properties": {
                                        "Type": 0,
                                        "ID": tileObjects[x].properties.ID
                                    },
                                    "width": w,
                                    "x": tileObjects[x].x,
                                    "y": y
                                };
                            }
                        }
                    }
                }
            };
            this.drawMapNoObjectReset = function (context, mapID) {
                for (var layeridX = 0; layeridX < TILEDATA_CACHE[mapID].layers.length; layeridX++) {
                    if (TILEDATA_CACHE[mapID].layers[layeridX].type === "tilelayer") {
                        var data = TILEDATA_CACHE[mapID].layers[layeridX].data;
                        for (var tileidX = 0; tileidX < data.length; tileidX++) {
                            var ID = data[tileidX];
                            if (ID === 0) {
                                continue;
                            }
                            var tileloc = _this.getTile(ID, mapID);

                            var worldX = Math.floor(tileidX % TILEDATA_CACHE[mapID].width) * TILEDATA_CACHE[mapID].tilewidth;
                            var worldY = Math.floor(tileidX / TILEDATA_CACHE[mapID].width) * TILEDATA_CACHE[mapID].tileheight;
                            context.drawImage(tileloc.img, tileloc.px, tileloc.py, TILEDATA_CACHE[mapID].tilewidth, TILEDATA_CACHE[mapID].tileheight, worldX, worldY, TILEDATA_CACHE[mapID].tilewidth, TILEDATA_CACHE[mapID].tileheight);
                        }
                    } else if (TILEDATA_CACHE[mapID].layers[layeridX].type === "objectgroup") {
                        for (var x = 0; x < objects.length; x++) {
                            var tile = _this.getTile(objects[x].gid, mapID);

                            var w = TILEDATA_CACHE[mapID].tilewidth;
                            var h = TILEDATA_CACHE[mapID].tileheight;

                            setStyle(context, 'Calibri', '12pt', 'black', 'bold', 'italic', 'center');
                            context.drawImage(tile.img, tile.px, tile.py, w, h, objects[x].x, objects[x].y, w, h);
                            context.fillText(objects[x].name, objects[x].x + 16, objects[x].y - 10);
                        }
                    }
                }
            };
        }
        Tilemap.prototype.Init = function () {
        };

        //ALOT OF WORK LEFT TO DO HERE TO MAKE OBJECTS EASILY ALTERED and removed as needed
        //Functions to test if file are loaded and can be rendered properly
        Tilemap.prototype.getTile = function (tileIndex, index) {
            var tile = {
                "img": null,
                "px": 0,
                "py": 0
            };

            var i = 0;
            var key = Object.keys(TILESET_CACHE[index]);
            var tileset = TILESET_CACHE[index];
            for (i = (key.length - 1); i > 0; i--) {
                if (tileset[i].firstgid <= tileIndex)
                    break;
            }
            tile.img = tileset[i].image;
            var localIndex = (tileIndex - tileset[key[i]].firstgid);
            var localtileX = Math.floor((tileIndex - tileset[key[i]].firstgid) % tileset[key[i]].numXTiles);
            var localtileY = Math.floor((tileIndex - tileset[key[i]].firstgid) / tileset[key[i]].numXTiles);
            tile.px = localtileX * TILEDATA_CACHE[index].tilesets[i].tilewidth;
            tile.py = localtileY * TILEDATA_CACHE[index].tilesets[i].tileheight;

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
function Attack(context, Attacker, Target) {
    var dmg = Attacker.Base.Atk;
    if (Target.defend) {
        dmg = Math.floor(dmg / 2);
        Target.defend = false;
    }
    var def = Target.Base.Def;
    var result = dmg - def;

    if (result < 0) {
        result = 0;
    }

    //add check if status is applied here, possible statuses could be
    Target.Current.HP -= result;
    if (Target.Current.HP < 0) {
        Target.Current.HP = 0;
    }
    context.fillText(result + "", Target.dx, Target.dy - 10);
    return { "Atk": Attacker, "Tar": Target };
}
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
///<reference path='../State.ts' />
var battleList = [];
var Game;
(function (Game) {
    var Battle = (function (_super) {
        __extends(Battle, _super);
        function Battle(EnemyID, mapID) {
            _super.call(this);
            this.newTime = 0;
            this.playerCount = 0;

            //time to wait between actions
            this.turnDelay = 500;

            //get canvases from html
            var canvas = document.getElementById('layer1');
            this.context = canvas.getContext('2d');
            var canvas2 = document.getElementById('layer2');
            this.context2 = canvas2.getContext('2d');

            //initalize animation class
            this.Anim = new Game.Animation(this.context2);

            //saves the next state and ID the player will go if victory is achieved
            this.nextState = JSON_CACHE['Enemies']['EnemyGroups'][EnemyID].next;
            this.nextID = JSON_CACHE['Enemies']['EnemyGroups'][EnemyID].ID;
            this.mapID = mapID;

            //Battle queue is now in the queue variable
            this.queue = [];
            this.queue = battleList;

            for (var y = 0; y < this.queue.length; y++) {
                this.queue[y].Current = this.queue[y].getTotalStats();
            }

            //initializes battle positions for all characters in the battle list
            var enemies = initializeBattlePositions(EnemyID);
            for (var x = 0; x < enemies.length; x++) {
                this.queue.push(enemies[x]);
            }

            //use function to add all the menu items to the menu array
            this.menu = [];
            this.menu = initializeMenuBounds();

            //current spell and data
            this.cSpell = [];
            this.cSpellData = [];

            //the states that the battle can be in which would alter what is drawn and listened from input
            this.states = {
                "PSelect": 0,
                "PAttack": 1,
                "PSpell": 2,
                "SpellSelect": 3,
                "SpellTarget": 4,
                "PDefend": 5,
                "EAction": 6,
                "EndTurn": 7,
                "PrePlayerTurn": 8,
                "PreEnemyTurn": 9,
                "EndPhase": 10,
                "BattleEnd": 11
            };
        }
        Battle.prototype.drawLayer1 = function () {
            //clears screen
            this.context.clearRect(0, 0, 800, 600);

            //draws static background
            this.context.drawImage(IMAGE_CACHE['bg'], 0, 0);
            //can add additional background details in this layer
        };
        Battle.prototype.drawLayer2 = function () {
            //clears layer
            this.context2.clearRect(0, 0, 800, 600);

            //draws HUD window and labels above the data
            quickWindow(this.context2, 100, 375, 600, 220, "blue", "red");

            //set text properties
            setStyle(this.context2, 'Calibri', '12 pt', 'white', 'bold');
            this.context2.fillText("Party", 550, 385);
            this.context2.fillText("Enemies", 200, 385);

            for (var s = 0; s < this.queue.length; s++) {
                if (this.queue[s].currentState !== 1) {
                    //this.context2.fillText(this.queue[s].Base.ID, this.queue[s].dx, this.queue[s].dy - 15)
                    this.queue[s].render(this.context2);
                }

                //sprite is ally then print name and HP
                if (this.queue[s].Base.Type === 0 && this.queue[s].currentState !== 1) {
                    this.context2.fillText(this.queue[s].Base.ID, 500, 400 + (s * 20));
                    this.context2.fillText(this.queue[s].Current.HP + " / " + this.queue[s].getTotalStats().HP, 600, 400 + (s * 20));
                } else if (this.queue[s].Base.Type === 1 && this.queue[s].currentState !== 1) {
                    this.context2.fillText(this.queue[s].Base.ID, 200, 400 + (s * 20));
                    this.context2.fillText(this.queue[s].Current.HP + " / " + this.queue[s].getTotalStats().HP, 250, 400 + (s * 20));
                }
            }
            StateDialogs(this.context2, this.cState);
        };
        Battle.prototype.init = function () {
            this.cState = this.states["PrePlayerTurn"];
            this.drawLayer1();
            this.drawLayer2();
            this.cTurn = 0;
        };
        Battle.prototype.CheckIfDead = function () {
            for (var x = 0; x < this.queue.length; x++) {
                if (this.queue[x].Current.HP <= 0) {
                    this.queue[x].currentState = 1;
                    this.isBattleOver();
                }
            }
        };
        Battle.prototype.isBattleOver = function () {
            var aHP = 0;
            var eHP = 0;
            for (var y = 0; y < this.queue.length; y++) {
                if (this.queue[y].Base.Type === 0) {
                    aHP += this.queue[y].Current.HP;
                }
                if (this.queue[y].Base.Type === 1) {
                    eHP += this.queue[y].Current.HP;
                }
            }
            if (aHP <= 0) {
                this.context2.fillText("Defeat", 400, 300);
                this.cState = this.states['BattleEnd'];
                this.newTime = Date.now() + this.turnDelay;
            }
            if (eHP <= 0) {
                this.context2.fillText("Victory", 400, 300);
                this.cState = this.states['BattleEnd'];
                this.newTime = Date.now() + this.turnDelay;
            }
        };
        Battle.prototype.playerSelect = function () {
            this.mx = mEvent.pageX;
            this.my = mEvent.pageY;
            for (var i = 0; i < this.menu.length; i++) {
                var a1 = this.menu[i].x;
                var a2 = this.menu[i].x + this.menu[i].w;
                var b1 = this.menu[i].y;
                var b2 = this.menu[i].y + this.menu[i].h;
                if ((a1 <= this.mx && this.mx <= a2) && (b1 <= this.my && this.my <= b2)) {
                    switch (this.menu[i].Name) {
                        case "Attack":
                            this.cState = this.states["PAttack"];
                            break;
                        case "Spell":
                            this.cState = this.states["PSpell"];
                            break;
                        case "Defend":
                            this.cState = this.states["PDefend"];
                            break;
                        default:
                            break;
                    }
                    this.drawLayer2();
                }
            }
        };
        Battle.prototype.playerAttack = function () {
            this.mx = mEvent.pageX;
            this.my = mEvent.pageY;
            for (var i = 0; i < this.queue.length; i++) {
                var s1 = this.queue[i].dx;
                var s2 = this.queue[i].dx + this.queue[i].W;
                var d1 = this.queue[i].dy;
                var d2 = this.queue[i].dy + this.queue[i].H;
                if ((s1 <= this.mx && this.mx <= s2) && (d1 <= this.my && this.my <= d2)) {
                    if (this.queue[i].Base.Type === 1 && this.queue[i].currentState !== 1) {
                        this.cTarget = i;
                        this.cState = this.states["EndTurn"];
                        this.drawLayer2();
                        this.newTime = Date.now() + this.turnDelay;
                        var sprites = Attack(this.context2, this.queue[this.cTurn], this.queue[i]);
                        this.queue[this.cTurn] = sprites.Atk;
                        this.queue[i] = sprites.Tar;
                        this.CheckIfDead();
                        break;
                    }
                }
            }
        };
        Battle.prototype.update = function () {
            var time = Date.now();

            //if player action select state is action
            if (this.cState === this.states["PrePlayerTurn"]) {
                this.cState = this.states["PSelect"];
                this.newTime = time + this.turnDelay;
                this.drawLayer2();
                this.queue[this.cTurn] = applyStatusEffect(this.context2, this.queue[this.cTurn]);
            }
            if (this.cState === this.states["PSelect"] && mouseClicked()) {
                this.playerSelect();
            } else if (this.cState === this.states["PAttack"] && mouseClicked()) {
                this.playerAttack();
            } else if (this.cState === this.states["PSpell"]) {
                this.cState = this.states["SpellSelect"];
                this.drawLayer2();
                this.cSpellData = SpellSelectDialog(this.queue[this.cTurn], this.context2);
            } else if (this.cState === this.states["SpellSelect"] && mouseClicked()) {
                var spells = Object.keys(JSON_CACHE['spell']['Spells']);
                var mx = mEvent.pageX;
                var my = mEvent.pageY;
                for (var i = 0; i < this.cSpellData.length; i++) {
                    var a1 = this.cSpellData[i].x;
                    var a2 = this.cSpellData[i].x + this.cSpellData[i].w;
                    var b1 = this.cSpellData[i].y;
                    var b2 = this.cSpellData[i].y + this.cSpellData[i].h;
                    if ((a1 <= mx && mx <= a2) && (b1 <= my && my <= b2)) {
                        for (var x = 0; x < spells.length; x++) {
                            if (this.cSpellData[i].name === spells[x]) {
                                this.cSpell = JSON_CACHE['spell']['Spells'][spells[x]];
                                this.cState = this.states["SpellTarget"];
                                this.drawLayer2();
                                break;
                            }
                        }
                    }
                }
            } else if (this.cState === this.states["SpellTarget"] && mouseClicked() && time > this.newTime) {
                var bounds = [];
                if (this.cSpell.All === 0) {
                    //select target
                    var mx = mEvent.pageX;
                    var my = mEvent.pageY;
                    for (var i = 0; i < this.queue.length; i++) {
                        var x1 = this.queue[i].dx;
                        var x2 = this.queue[i].dx + this.queue[i].W;
                        var y1 = this.queue[i].dy;
                        var y2 = this.queue[i].dy + this.queue[i].H;
                        if ((x1 <= mx && mx <= x2) && (y1 <= my && my <= y2)) {
                            var sprite = castSpellSingle(this.context2, this.cSpell, this.queue[i], this.queue[this.cTurn]);
                            this.queue[i] = sprite;
                        }
                    }
                } else if (this.cSpell.All === 1) {
                    //go ahead and cast
                    this.queue = castSpellAll(this.context2, this.cSpell, this.queue, this.queue[this.cTurn]);
                }
                this.cState = this.states["EndTurn"];
                this.CheckIfDead();
                this.newTime = time + this.turnDelay;
                this.drawLayer2();
            } else if (this.cState === this.states["PDefend"]) {
                this.queue[this.cTurn].defend = true;
                this.cState = this.states["EndTurn"];
                this.newTime = time + this.turnDelay;
                this.drawLayer2();
            } else if (this.cState === this.states["PreEnemyTurn"]) {
                this.cState = this.states["EAction"];
                this.newTime = time + this.turnDelay;
                this.drawLayer2();
                this.queue[this.cTurn] = applyStatusEffect(this.context2, this.queue[this.cTurn]);
            } else if (this.cState === this.states["EAction"] && time > this.newTime) {
                this.cState = this.states["EndTurn"];
                this.drawLayer2();
                this.queue = EnemyAction(this.context2, this.queue[this.cTurn], this.queue);
                this.CheckIfDead();
                this.newTime = time + this.turnDelay;
            } else if (this.cState === this.states["EndTurn"] && time > this.newTime) {
                this.cTurn = (this.cTurn + 1) % this.queue.length;
                if (this.queue[this.cTurn].Base.Type === 0 && this.queue[this.cTurn].currentState !== 1) {
                    this.cState = this.states["PrePlayerTurn"];
                    this.drawLayer2();
                } else if (this.queue[this.cTurn].Base.Type === 1 && this.queue[this.cTurn].currentState !== 1) {
                    this.cState = this.states["PreEnemyTurn"];
                    this.drawLayer2();
                }
            } else if (this.cState === this.states["BattleEnd"] && time > this.newTime) {
                for (var q = 0; q < this.queue.length; q++) {
                    if (this.queue[q].Base.Type === 1) {
                        battleList.splice(q, this.queue.length - q);
                    }
                }
                if (this.playerCount < this.queue.length) {
                    if (mouseClicked()) {
                        if (this.queue[this.playerCount].Base.Type === 0) {
                            LevelUp(this.queue[this.playerCount], this.context2);
                        }
                        this.playerCount++;
                    }
                } else {
                    sManager.popState();
                    if (this.nextState === "scene") {
                        sManager.pushState(new Game.Cutscene(this.context2, +this.nextID, this.mapID));
                    }
                }
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
function applyStatus(effect, chance, sprite) {
    var status = STATUS.effects;
    var ran = getRandomInt(0, 100);
    switch (effect) {
        case "Poison":
            if (ran < chance) {
                sprite.currentState = status["Poison"];
            }
            break;
        default:
            break;
    }
    return sprite;
}
function applyStatusEffect(context, sprite) {
    var status = STATUS.effects;
    switch (sprite.currentState) {
        case status["Poison"]:
            sprite.Current.HP = sprite.Current.HP - Math.floor(sprite.getTotalStats().HP * 0.2);
            context.fillText(Math.floor(sprite.getTotalStats().HP * 0.2) + "", sprite.dx, sprite.dy - 10);
            break;
        default:
            break;
    }
    return sprite;
}
function EnemyAction(context, enemy, queue) {
    var total = 100;
    var parts = [];
    var foe;

    //gets all the abilites of the enemy
    var keys = Object.keys(JSON_CACHE['character']['Enemies']);
    for (var x = 0; x < keys.length; x++) {
        if (enemy.Base.ID === keys[x]) {
            foe = JSON_CACHE['character']['Enemies'][keys[x]].Abilities;
        }
    }

    //get random int to determine which ability should be used by enemy
    var rand = getRandomInt(0, 100);
    var key = Object.keys(foe);
    var cAbilities;
    for (var y = 0; y < (key.length - 1); y++) {
        if (rand >= foe[key[y]] && (foe[key[y + 1]]) >= rand) {
            cAbilities = key[y];
        }
    }

    //count the number of allies
    var allyCount = 0;
    for (var x = 0; x < queue.length; x++) {
        if (queue[x].Base.Type === 0 && queue[x].currentState !== 1) {
            allyCount++;
        }
    }

    //get random int to determine which ally to target
    var random = getRandomInt(0, allyCount);

    if (cAbilities === "Attack") {
        var sprite = Attack(context, enemy, queue[random]);
        queue[random] = sprite.Tar;
        return queue;
    } else if (cAbilities === "Defend") {
        return queue;
    } else {
        var spellkey = Object.keys(JSON_CACHE['spell']['Spells']);
        for (var x = 0; x < spellkey.length; x++) {
            if (cAbilities === spellkey[x]) {
                return checkSpellType(context, JSON_CACHE['spell']['Spells'][spellkey[x]], queue, random, enemy);
                break;
            }
        }
        return queue;
    }
}
function checkSpellType(context, spell, queue, target, caster) {
    if (spell.All === 0) {
        var counter = 0;

        for (var x = 0; x < queue.length; x++) {
            if (queue[x].Base.Type === 0) {
                counter++;
            }
        }
        var rand = getRandomInt(0, counter);
        queue[target] = castSpellSingle(context, spell, queue[rand], caster);
        return queue;
    } else if (spell.All === 1) {
        return castSpellAll(context, spell, queue, caster);
    }
}
function floatingDamageTextSingle(context, Amt, sprite) {
}
function floatingDamageTextAll(Amt, sprites) {
}
function initializeMenuBounds() {
    var menu = [];
    menu.push({
        "Name": "Attack",
        "x": 600,
        "y": 50,
        "w": 190,
        "h": 50
    });
    menu.push({
        "Name": "Spell",
        "x": 600,
        "y": 150,
        "w": 190,
        "h": 50
    });
    menu.push({
        "Name": "Defend",
        "x": 600,
        "y": 250,
        "w": 190,
        "h": 50
    });

    return menu;
}
function input_template(len, bounds, f) {
    var mx = mEvent.pageX;
    var my = mEvent.pageY;
    for (var i = 0; i < len; i++) {
        var x1 = bounds[i].x;
        var x2 = bounds[i].x + bounds[i].w;
        var y1 = bounds[i].y;
        var y2 = bounds[i].y + bounds[i].h;
        if ((x1 <= mx && mx <= x2) && (y1 <= my && my <= y2)) {
            f(i);
        }
    }
}
function SpellSelectDialog(sp, context) {
    quickWindow(context, 50, 400, 600, 200, "blue", "red");
    setStyle(context, 'calibre', 14, "white", "bold");
    context.fillText(sp.Base.ID + " Spells", 150, 415);
    var bounds = [];
    for (var x = 0; x < sp.Spells.length; x++) {
        context.fillText(sp.Spells[x], 75, 430 + (x * 20));
        bounds[x] = {
            "name": sp.Spells[x],
            "x": 75,
            "y": 430 + (x * 20),
            "w": context.measureText(sp.Spells[x]).width,
            "h": 10
        };
    }
    return bounds;
}
function castSpellSingle(context, spell, sp, caster) {
    var dmg = spell.Damage + (spell.Ratio * caster.Current.MAtk);
    var def = sp.Base.MDef;

    var result = dmg - def;
    switch (spell.Type) {
        case "Enemy":
            if (spell.Effect) {
                //applies status resistance
                var resist = sp.StatusResist[spell.Status.Effect];
                var spellChance = spell.Status.chance;
                var chance = spellChance - ((spellChance * resist) / 100);
                sp = applyStatus(spell.Status.Effect, spell.Status.Chance, sp);
            }
            if (spell.Element !== 'undefined') {
                dmg = spell.Damage - ((spell.Damage * sp.ElementResist[spell.Element]) / 100);
                result = dmg - def;
            }
            sp.Current.HP -= result;
            context.fillText(dmg + "", sp.dx, sp.dy - 10);
            break;
        case "Ally":
            if (spell.Effect) {
                sp = applyStatus(spell.Status.Effect, spell.Status.Chance, sp);
            }
            sp.Current.HP += dmg;
            context.fillText(dmg + "", sp.dx, sp.dy - 10);
            break;
        default:
            break;
    }
    return sp;
}
function castSpellAll(context, spell, queue, caster) {
    setStyle(context, 'Calibri', '12 pt', 'white', 'bold');

    switch (spell.Type) {
        case "Enemy":
            for (var x = 0; x < queue.length; x++) {
                var dmg = spell.Damage + (spell.Ratio * caster.Current.MAtk);
                var def = queue[x].Base.MDef;

                var result = dmg - def;
                if (caster.Base.Type === 0) {
                    if (queue[x].Base.Type === 1 && queue[x].currentState !== 1) {
                        if (spell.Effect) {
                            //applies status resistance
                            var resist = queue[x].StatusResist[spell.Status.Effect];
                            var spellChance = spell.Status.chance;
                            var chance = spellChance - ((spellChance * resist) / 100);
                            queue[x] = applyStatus(spell.Status.Effect, spell.Status.Chance, queue[x]);
                        }
                        if (spell.Element !== 'undefined') {
                            dmg = spell.Damage - ((spell.Damage * queue[x].ElementResist[spell.Element]) / 100);
                            result = dmg - def;
                        }
                        queue[x].Current.HP -= result;
                        context.fillText(result + "", queue[x].dx, queue[x].dy - 10);
                    }
                } else if (caster.Base.Type === 1) {
                    if (queue[x].Base.Type === 0 && queue[x].currentState !== 1) {
                        if (spell.Effect) {
                            //applies status resistance
                            var resist = queue[x].StatusResist[spell.Status.Effect];
                            var spellChance = spell.Status.chance;
                            var chance = spellChance - ((spellChance * resist) / 100);
                            queue[x] = applyStatus(spell.Status.Effect, spell.Status.Chance, queue[x]);
                        }
                        if (spell.Element !== 'undefined') {
                            dmg = spell.Damage - ((spell.Damage * queue[x].ElementResist[spell.Element]) / 100);
                            result = dmg - def;
                        }
                        queue[x].Current.HP -= result;
                        context.fillText(result + "", queue[x].dx, queue[x].dy - 10);
                    }
                }
            }
            break;
        case "Ally":
            for (var x = 0; x < queue.length; x++) {
                if (caster.Base.Type === 0) {
                    if (queue[x].Base.Type === 0 && queue[x].currentState !== 1) {
                        if (spell.Effect) {
                            queue[x] = applyStatus(spell.Status.Effect, spell.Status.Chance, queue[x]);
                        }
                        queue[x].Current.HP += spell.Damage;
                        context.fillText(spell.Damage + "", queue[x].dx, queue[x].dy - 10);
                    }
                } else if (caster.Base.Type === 1) {
                    if (queue[x].Base.Type === 1 && queue[x].currentState !== 1) {
                        if (spell.Effect) {
                            queue[x] = applyStatus(spell.Status.Effect, spell.Status.Chance, queue[x]);
                        }
                        queue[x].Current.HP += spell.Damage;
                        context.fillText(spell.Damage + "", queue[x].dx, queue[x].dy - 10);
                    }
                }
            }
            break;
        default:
            break;
    }
    return queue;
}
function StateDialogs(context, state) {
    setStyle(context, 'Calibri', '18 pt', 'white', 'bold');
    switch (state) {
        case 0:
            context.drawImage(IMAGE_CACHE['Attack'], 600, 50);
            context.drawImage(IMAGE_CACHE['Spell'], 600, 150);
            context.drawImage(IMAGE_CACHE['Defend'], 600, 250);
            break;
        case 1:
            context.fillText("Select target to Attack", 350, 50);
            break;
        case 3:
            context.fillText("Select Spell to cast", 350, 50);
            break;
        case 4:
            context.fillText("Select Target to cast spell", 350, 50);
            break;
        case 9:
            context.fillText("Enemy's Turn", 350, 150);
            ;
            break;
        case 7:
            break;
    }
}
///<reference path='../State.ts' />
var equips = [];
var Game;
(function (Game) {
    var Equip = (function (_super) {
        __extends(Equip, _super);
        function Equip(context) {
            _super.call(this);
            this.time = 0;
            this.back = false;
            this.context = context;
            this.battler = battleList[0];
            this.objects = [];
        }
        Equip.prototype.drawEquip = function () {
            this.battler = battleList[0];
            this.context.clearRect(0, 0, 800, 600);
            this.context.drawImage(IMAGE_CACHE['dialog'], 15, 100);
            setStyle(this.context, 'Calibri', '16pt', 'black', 'bold', 'italic', 'left');

            this.context.fillText("Head: " + this.battler.Equipment['Head'], 75, 175);
            this.context.fillText("Body: " + this.battler.Equipment['Body'], 75, 200);
            this.context.fillText("Weapon: " + this.battler.Equipment['Weapon'], 75, 225);
            this.context.fillText("Feet: " + this.battler.Equipment['Feet'], 75, 250);

            this.stats = this.battler.getTotalStats();
            this.context.fillText("HP: " + this.stats.HP, 400, 175);
            this.context.fillText("MP: " + this.stats.MP, 400, 200);
            this.context.fillText("Attack: " + this.stats.Atk, 400, 225);
            this.context.fillText("Defense: " + this.stats.Def, 400, 250);
            this.context.fillText("Speed: " + this.stats.Spd, 400, 275);
            this.context.fillText("Magic Defense: " + this.stats.MDef, 400, 300);
            this.context.fillText("Luck: " + this.stats.Luc, 400, 325);

            this.context.drawImage(IMAGE_CACHE['back'], 25, 500);
        };
        Equip.prototype.addEquipPos = function () {
            var obj = {
                "type": "Head",
                "x": 75,
                "y": 170,
                "w": this.context.measureText("Head: " + this.battler.Equipment['Head']).width,
                "h": 5
            };
            equips.push(obj);
            obj = {
                "type": "Body",
                "x": 75,
                "y": 195,
                "w": this.context.measureText("Body: " + this.battler.Equipment['Body']).width,
                "h": 5
            };
            equips.push(obj);
            obj = {
                "type": "Weapon",
                "x": 75,
                "y": 220,
                "w": this.context.measureText("Weapon: " + this.battler.Equipment['Weapon']).width,
                "h": 5
            };
            equips.push(obj);
            obj = {
                "type": "Feet",
                "x": 75,
                "y": 245,
                "w": this.context.measureText("Legs: " + this.battler.Equipment['Feet']).width,
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
        Equip.prototype.changeEquip = function () {
            if (Date.now() > this.time && this.back) {
                this.context.clearRect(0, 0, 800, 600);
                sManager.popState();
            }
            if (mouseClicked()) {
                this.mx = mEvent.pageX;
                this.my = mEvent.pageY;
                for (var i = 0; i < equips.length; i++) {
                    var x1 = equips[i].x;
                    var x2 = equips[i].x + equips[i].w;
                    var y1 = equips[i].y - 15;
                    var y2 = equips[i].y + equips[i].h;
                    if ((x1 <= this.mx && this.mx <= x2) && (y1 <= this.my && this.my <= y2)) {
                        if (equips[i].type === "Back") {
                            this.back = true;
                            this.time = Date.now() + 100;
                        } else {
                            sManager.pushState(new Game.SelectEquip(this.context, equips[i].type, this.battler));
                        }
                    }
                }
            }
        };
        Equip.prototype.drawPC = function () {
            var oKeys = Object.keys(battleList);
            for (var y = 0; y < oKeys.length; y++) {
                if (battleList[oKeys[y]].Base.Type === 0) {
                    if (this.battler === battleList[oKeys[y]]) {
                        this.context.fillText("*", 210 + (y * 75), 140);
                    }
                    this.context.fillText(battleList[oKeys[y]].Base.ID, 200 + (y * 75), 125);
                    this.objects[y] = {
                        "Name": battleList[oKeys[y]].Base.ID,
                        "x": 200 + (y * 75),
                        "y": 120,
                        "w": this.context.measureText(battleList[oKeys[y]].Base.ID).width,
                        "h": 5
                    };
                }
            }
        };
        Equip.prototype.reload = function (name) {
            var oKeys = Object.keys(battleList);
            for (var y = 0; y < oKeys.length; y++) {
                if (battleList[oKeys[y]].Base.Type === 0 && name === battleList[oKeys[y]].Base.ID) {
                    this.battler = battleList[oKeys[y]];
                    break;
                }
            }
            this.context.clearRect(0, 0, 800, 600);
            this.init();
        };
        Equip.prototype.checkCurrentChar = function () {
            if (mouseClicked()) {
                this.mx = mEvent.pageX;
                this.my = mEvent.pageY;
                var keys = Object.keys(this.objects);
                for (var i = 0; i < keys.length; i++) {
                    var x1 = this.objects[i].x;
                    var x2 = this.objects[i].x + this.objects[i].w;
                    var y1 = this.objects[i].y;
                    var y2 = this.objects[i].y + this.objects[i].h;
                    if ((x1 <= this.mx && this.mx <= x2) && (y1 <= this.my && this.my <= y2)) {
                        this.reload(this.objects[keys[i]].Name);
                    }
                }
            }
        };
        Equip.prototype.init = function () {
            this.drawEquip();
            this.drawPC();
            this.addEquipPos();
        };
        Equip.prototype.update = function () {
            this.drawEquip();
            this.drawPC();
            this.changeEquip();
            this.checkCurrentChar();
        };
        Equip.prototype.render = function () {
        };
        Equip.prototype.pause = function () {
        };
        Equip.prototype.resume = function () {
        };
        Equip.prototype.destroy = function () {
        };
        return Equip;
    })(Game.State);
    Game.Equip = Equip;
})(Game || (Game = {}));
///<reference path='State.ts' />
var Game;
(function (Game) {
    var Explore = (function (_super) {
        __extends(Explore, _super);
        function Explore(ctx, mapID) {
            _super.call(this);
            this.x = 0;
            this.y = 0;
            this.mx = 0;
            this.my = 0;
            this.velocity = 2.0;

            //this.currentArea = area;
            this.mapID = mapID;
            var canvas = document.getElementById('layer2');
            this.layer2ctx = canvas.getContext('2d');

            var canvas2 = document.getElementById('layer1');
            this.layer1ctx = canvas2.getContext('2d');
            //this.game = game;
        }
        Explore.prototype.init = function () {
            this.layer1ctx.clearRect(0, 0, 800, 600);
            this.layer2ctx.clearRect(0, 0, 800, 600);

            TileMap.setTileset(this.layer1ctx, this.mapID);
            this.layer1ctx.drawImage(IMAGE_CACHE['menu'], 5, 5);
            battleList[0].setPos((5 * 32) + 16, (5 * 32) + 16);
            this.layer2ctx.drawImage(battleList[0].img, battleList[0].dx, battleList[0].dy);
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

            //battleList[0].setPos((8*32) + 16, (8*32) + 16);
            //battleList[0].render(this.layer2ctx);
            this.map = FormatTilemap(this.mapID);

            //var path = findPath(this.map, [8, 8], [6, 7]);
            //var x = 0;
            var questAutoStart = QUEST.Switch[this.mapID];
            if (questAutoStart) {
                sManager.pushState(new Game.Cutscene(this.layer2ctx, JSON_CACHE['location'][this.mapID][this.mapID]['ID'], this.mapID));
                QUEST.Switch[this.mapID] = false;
            }
        };
        Explore.prototype.update = function () {
            var _this = this;
            if (mouseClicked()) {
                this.mx = mEvent.pageX;
                this.my = mEvent.pageY;
                for (var i = 0; i < objects.length; i++) {
                    var x1 = objects[i].x;
                    var x2 = objects[i].x + objects[i].width;
                    var y1 = objects[i].y;
                    var y2 = objects[i].y + objects[i].width;
                    if ((x1 <= this.mx && this.mx <= x2) && (y1 <= this.my && this.my <= y2)) {
                        var path = [];
                        path = findPath(this.map, [5, 5], [Math.floor(this.mx / 32), Math.floor(this.my / 32)]);
                        var keys = Object.keys(path);
                        var ctx = this.layer2ctx;
                        var x = 0;
                        if (objects[i].type === 'menu' || objects[i].type === 'exit') {
                            this.nextState(i);
                        } else if (typeof path !== 'undefined' && path.length > 0) {
                            if (objects[i].type !== 'menu') {
                                var timer = setInterval(function () {
                                    var coords = moveSprite(ctx, battleList[0].dx, battleList[0].dy, path[x][0], path[x][1]);
                                    battleList[0].setPos(coords.x, coords.y);
                                    ctx.clearRect(0, 0, 800, 600);
                                    ctx.drawImage(battleList[0].img, battleList[0].dx, battleList[0].dy);
                                    x++;
                                    if (x >= (keys.length - 1)) {
                                        clearInterval(timer);
                                        _this.nextState(i);
                                    }
                                }, 1000 / 5);
                            }
                        }
                        break;
                    }
                }
            }
        };
        Explore.prototype.nextState = function (i) {
            if (objects[i].type === 'exit') {
                if (objects[i].properties.Type === "0") {
                    sManager.popState();
                    sManager.pushState(new Explore(this.layer2ctx, objects[i].properties.ID));
                } else if (objects[i].properties.Type === "1") {
                    sManager.popState();
                    sManager.pushState(new Explore(this.layer1ctx, 'map1'));
                }
            } else if (objects[i].type === 'menu') {
                sManager.pushState(new Game.StatusMenu(this.layer2ctx));
            } else if (objects[i].type === 'cut') {
                this.layer2ctx.clearRect(0, 0, 800, 600);
                var sceneid = +objects[i].properties.ID;
                if (typeof JSON_CACHE['location'][this.mapID][objects[i].name] !== 'undefined') {
                    var keys = Object.keys(JSON_CACHE['location'][this.mapID][objects[i].name]);
                    for (var c = 0; c < keys.length; c++) {
                        if (QUEST.Switch[keys[c]]) {
                            sceneid = JSON_CACHE['location'][this.mapID][objects[i].name][keys[c]];
                        } else {
                            break;
                        }
                    }
                }
                sManager.pushState(new Game.Cutscene(this.layer2ctx, +sceneid, this.mapID));
            } else if (objects[i].type === 'battle') {
                sManager.pushState(new Game.Battle(+objects[i].properties.ID, this.mapID));
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
///<reference path='../State.ts' />
var Game;
(function (Game) {
    var Formation = (function (_super) {
        __extends(Formation, _super);
        function Formation(ctx2) {
            _super.call(this);
            this.time = 0;
            this.back = false;
            this.ctx2 = ctx2;
            this.forms = [];
            this.battleKeys = Object.keys(battleList);
        }
        Formation.prototype.draw = function () {
            this.ctx2.clearRect(0, 0, 800, 600);
            this.ctx2.drawImage(IMAGE_CACHE['dialog'], 15, 100);
            setStyle(this.ctx2, 'Calibri', '16pt', 'black', 'bold', 'italic', 'left');
            this.ctx2.fillText('Formations', 150, 125);
            for (var i = 0; i < this.keys.length; i++) {
                this.ctx2.fillText(this.keys[i], this.forms[i].x, this.forms[i].y);
            }
            this.ctx2.fillText("Formation Bonuses", 400, 125);
            this.ctx2.fillText("HP: " + FORMATION.bonus.HP, 400, 150);
            this.ctx2.fillText("MP: " + FORMATION.bonus.MP, 400, 175);
            this.ctx2.fillText("Attack: " + FORMATION.bonus.Atk, 400, 200);
            this.ctx2.fillText("Defense: " + FORMATION.bonus.Def, 400, 225);
            this.ctx2.fillText("Speed: " + FORMATION.bonus.Spd, 400, 250);
            this.ctx2.fillText("Magic Defense: " + FORMATION.bonus.MDef, 400, 275);
            this.ctx2.fillText("Luck: " + FORMATION.bonus.Luc, 400, 300);

            this.ctx2.fillText("Current Formation: " + FORMATION.current, 200, 325);

            this.ctx2.drawImage(IMAGE_CACHE['back'], 25, 500);
            /* for (var i = 0; i < this.battleKeys.length; i++) {
            if (battleList[this.battleKeys[i]].currentState !== 1) {
            if (battleList[this.battleKeys[i]].Base.Type === 0) {
            this.formation = FORMATION.positions[i];
            //battleList[this.battleKeys[i]].setPos(this.formation[i].x, this.formation[i].y);
            }
            battleList[this.battleKeys[i]].render(this.ctx2, this.formation.x, this.formation.y);
            //this.ctx.fillText(battleList[this.battleKeys[i]].Base.ID, this.formation[i].x, this.formation[i].y);
            this.ctx2.fillText(battleList[this.battleKeys[i]].Base.ID, battleList[this.battleKeys[i]].x + 20, battleList[this.battleKeys[i]].y - 5);
            }
            }*/
        };
        Formation.prototype.addObjects = function () {
            this.keys = Object.keys(JSON_CACHE['formation'].Formations);
            for (var i = 0; i < this.keys.length; i++) {
                this.forms.push({
                    "Name": this.keys[i],
                    "x": 25,
                    "y": (i * 50) + 145,
                    "w": 75,
                    "h": 5
                });
                this.ctx2.fillText(this.keys[i], this.forms[i].x, this.forms[i].y);
            }
            var obj = {
                "Name": "Back",
                "x": 25,
                "y": 500,
                "w": 50,
                "h": 50
            };
            this.forms.push(obj);
        };
        Formation.prototype.changeFormation = function () {
            if (Date.now() > this.time && this.back) {
                this.ctx2.clearRect(0, 0, 800, 600);
                sManager.popState();
            } else if (mouseClicked()) {
                this.mx = mEvent.pageX;
                this.my = mEvent.pageY;
                for (var i = 0; i <= this.keys.length; i++) {
                    var x1 = this.forms[i].x;
                    var x2 = this.forms[i].x + this.forms[i].w;
                    var y1 = this.forms[i].y - 15;
                    var y2 = this.forms[i].y + this.forms[i].h;
                    if ((x1 <= this.mx && this.mx <= x2) && (y1 <= this.my && this.my <= y2)) {
                        if (this.forms[i].Name === "Back") {
                            this.back = true;
                            this.time = Date.now() + 100;
                        } else {
                            for (var x = 0; x <= this.keys.length; x++) {
                                if (this.forms[i].Name === this.keys[i]) {
                                    FORMATION.setFormation(this.keys[i]);
                                    this.draw();
                                    this.time = Date.now() + 100;
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        };
        Formation.prototype.init = function () {
            this.addObjects();
            this.draw();
        };
        Formation.prototype.update = function () {
            this.changeFormation();
        };
        Formation.prototype.render = function () {
        };
        Formation.prototype.pause = function () {
        };
        Formation.prototype.resume = function () {
        };
        Formation.prototype.destroy = function () {
        };
        return Formation;
    })(Game.State);
    Game.Formation = Formation;
})(Game || (Game = {}));
///<reference path='../State.ts' />
var Game;
(function (Game) {
    var Inventory = (function (_super) {
        __extends(Inventory, _super);
        function Inventory(ctx2) {
            _super.call(this);
            this.context = ctx2;
        }
        Inventory.prototype.init = function () {
            this.context.clearRect(0, 0, 800, 600);
            this.context.drawImage(IMAGE_CACHE['dialog'], 15, 100);
            this.context.drawImage(IMAGE_CACHE['back'], 40, 490);

            this.context.fillText("Consumable", 25, 120);
            this.context.fillText("Quest", 150, 120);

            this.items = [];
            var ikeys = Object.keys(ITEM.consumable);
            var items = ITEM.consumable;
            for (var x = 0; x < ikeys.length; x++) {
                if (items[ikeys[x]].quantity > 0) {
                    this.context.fillText(items[ikeys[x]].name, 25, 150 + (x * 30));
                    this.context.fillText(items[ikeys[x]].quantity, 100, 150 + (x * 30));
                    this.items.push({
                        "name": items[ikeys[x]].name,
                        "x": 25,
                        "y": (150 + (x * 30)),
                        "w": this.context.measureText(items[ikeys[x]]).width,
                        "h": 5
                    });
                }
            }
            this.items.push({
                "name": "quest",
                "x": 150,
                "y": 115,
                "w": this.context.measureText("quest").width,
                "h": 5
            });
            this.items.push({
                "name": "consumable",
                "x": 25,
                "y": 115,
                "w": this.context.measureText("consumable").width,
                "h": 5
            });
            this.items.push({
                "name": "back",
                "x": 40,
                "y": 490,
                "w": 75,
                "h": 75
            });
        };
        Inventory.prototype.reload = function (type) {
            this.context.clearRect(0, 0, 800, 600);
            if (type === "quest") {
                this.context.drawImage(IMAGE_CACHE['dialog'], 15, 100);
                this.context.drawImage(IMAGE_CACHE['back'], 40, 490);

                this.context.fillText("Items", 25, 120);
                this.context.fillText("Key Items", 100, 120);

                var ikeys = Object.keys(JSON_CACHE['items']['quest']);
                var items = JSON_CACHE['items']['quest'];
                for (var x = 0; x < ikeys.length; x++) {
                    this.context.fillText(items[ikeys[x]], 25, 130 + (x * 30));
                }
            } else if (type === "consumable") {
                this.context.drawImage(IMAGE_CACHE['dialog'], 15, 100);
                this.context.drawImage(IMAGE_CACHE['back'], 40, 490);

                this.context.fillText("Items", 25, 120);
                this.context.fillText("Key Items", 150, 120);

                var ikeys = Object.keys(JSON_CACHE['items']['consumable']);
                var items = JSON_CACHE['items']['consumable'];
                for (var x = 0; x < ikeys.length; x++) {
                    this.context.fillText(items[ikeys[x]].name, 25, 150 + (x * 30));
                    this.context.fillText(items[ikeys[x]].quantity, 100, 150 + (x * 30));
                }
            }
        };
        Inventory.prototype.update = function () {
            if (mouseClicked()) {
                this.mx = mEvent.pageX;
                this.my = mEvent.pageY;
                for (var x = 0; x < this.items.length; x++) {
                    var x1 = this.items[x].x;
                    var x2 = this.items[x].x + this.items[x].w;
                    var y1 = this.items[x].y;
                    var y2 = this.items[x].y + this.items[x].h;
                    if ((x1 <= this.mx && this.mx <= x2) && (y1 <= this.my && this.my <= y2)) {
                        switch (this.items[x].name) {
                            case "quest":
                                this.reload("quest");
                                break;
                            case "consumable":
                                this.reload("consumable");
                                break;
                            case "back":
                                this.context.clearRect(0, 0, 800, 600);
                                sManager.popState();
                                break;
                            default:
                                for (var i = 0; i < ObjLength(this.items); i++) {
                                    if (this.items[x].name === this.items[i].name) {
                                        sManager.pushState(new Game.ItemDetails(this.items[x], this.context));
                                    }
                                }
                                break;
                        }
                    }
                }
            }
        };
        Inventory.prototype.render = function () {
        };
        Inventory.prototype.pause = function () {
        };
        Inventory.prototype.resume = function () {
        };
        Inventory.prototype.destroy = function () {
        };
        return Inventory;
    })(Game.State);
    Game.Inventory = Inventory;
})(Game || (Game = {}));
///<reference path='../State.ts' />
var Game;
(function (Game) {
    var ItemDetails = (function (_super) {
        __extends(ItemDetails, _super);
        function ItemDetails(item, ctx) {
            _super.call(this);
            this.context = ctx;
            this.item = item;
            this.clickBounds = [];
        }
        ItemDetails.prototype.init = function () {
            this.context.drawImage(IMAGE_CACHE['dialog'], 35, 150);
            this.context.fillText(this.item.name, 45, 160);
            this.context.fillText("description here", 45, 200);
            this.context.fillText("Image here", 200, 200);
            this.context.drawImage(IMAGE_CACHE['back'], 40, 490);
            this.context.fillText("Use", 300, 300);

            this.clickBounds.push({
                "name": "back",
                "x": 40,
                "y": 490,
                "w": 75,
                "h": 75
            });
            this.clickBounds.push({
                "name": "use",
                "x": 150,
                "y": 395,
                "w": this.context.measureText("use").width,
                "h": 5
            });
        };
        ItemDetails.prototype.update = function () {
            if (mouseClicked()) {
                this.mx = mEvent.pageX;
                this.my = mEvent.pageY;
                for (var x = 0; x < this.clickBounds.length; x++) {
                    var x1 = this.clickBounds[x].x;
                    var x2 = this.clickBounds[x].x + this.clickBounds[x].w;
                    var y1 = this.clickBounds[x].y;
                    var y2 = this.clickBounds[x].y + this.clickBounds[x].h;
                    if ((x1 <= this.mx && this.mx <= x2) && (y1 <= this.my && this.my <= y2)) {
                        switch (this.clickBounds[x].name) {
                            case "back":
                                this.context.clearRect(0, 0, 800, 600);
                                sManager.popState();
                                break;
                            case "use":
                                break;
                            default:
                                break;
                        }
                    }
                }
            }
        };
        ItemDetails.prototype.render = function () {
        };
        ItemDetails.prototype.pause = function () {
        };
        ItemDetails.prototype.resume = function () {
        };
        ItemDetails.prototype.destroy = function () {
        };
        return ItemDetails;
    })(Game.State);
    Game.ItemDetails = ItemDetails;
})(Game || (Game = {}));
///<reference path='../State.ts' />
var Game;
(function (Game) {
    var Save = (function (_super) {
        __extends(Save, _super);
        function Save(context) {
            _super.call(this);
            this.time = 0;
            this.saveTime = 0;
            this.initBool = false;
            this.context = context;
            this.time = 0;
            this.objects = [];
            this.objects.push({
                "Name": "back",
                "x": 40,
                "y": 490,
                "w": 75,
                "h": 75
            });
            this.objects.push({
                "Name": "load",
                "x": 200,
                "y": 295,
                "w": this.context.measureText("Load Game").width,
                "h": 5
            });
            this.objects.push({
                "Name": "save",
                "x": 200,
                "y": 245,
                "w": this.context.measureText("Save Game").width,
                "h": 5
            });
        }
        Save.prototype.init = function () {
            this.context.drawImage(IMAGE_CACHE['dialog'], 25, 130);
            this.context.fillText("Save Game", 200, 250);
            this.context.fillText("Load Game", 200, 300);
        };
        Save.prototype.action = function (type) {
            this.context.drawImage(IMAGE_CACHE['dialog'], 45, 150);
            this.context.fillText("Your game is currently being " + type, 200, 200);
            this.saveTime = Date.now() + 1000;
            if (type === "saved" && this.saveTime < Date.now()) {
                sManager.restart();
                SAVE.save();
            } else if (type === "loaded") {
                sManager.restart();
                SAVE.load(800);
            }
            this.type = type;
            this.initBool = true;
        };
        Save.prototype.update = function () {
            if (mouseClicked() && this.time < Date.now()) {
                this.mx = mEvent.pageX;
                this.my = mEvent.pageY;
                var keys = Object.keys(this.objects);
                for (var i = 0; i < keys.length; i++) {
                    var x1 = this.objects[keys[i]].x;
                    var x2 = this.objects[keys[i]].x + this.objects[keys[i]].w;
                    var y1 = this.objects[keys[i]].y;
                    var y2 = this.objects[keys[i]].y + this.objects[keys[i]].h;
                    if ((x1 <= this.mx && this.mx <= x2) && (y1 <= this.my && this.my <= y2)) {
                        if (this.objects[keys[i]].Name === "save") {
                            this.context.clearRect(0, 0, 800, 600);
                            SAVE.save();
                        } else if (this.objects[keys[i]].Name === "load") {
                            this.action("loaded");
                        } else if (this.objects[keys[i]].Name === "back") {
                            sManager.popState();
                        }
                    }
                }
            } else if (Date.now() > this.saveTime) {
                if (this.initBool) {
                    this.context.clearRect(0, 0, 800, 600);
                    this.init();
                    this.initBool = false;
                    this.context.fillText("your game has been " + this.type, 200, 200);
                }
            }
        };
        Save.prototype.render = function () {
        };
        Save.prototype.pause = function () {
        };
        Save.prototype.resume = function () {
        };
        Save.prototype.destroy = function () {
        };
        return Save;
    })(Game.State);
    Game.Save = Save;
})(Game || (Game = {}));
///<reference path='../State.ts' />
var currentEquips = [];
var Game;
(function (Game) {
    var SelectEquip = (function (_super) {
        __extends(SelectEquip, _super);
        function SelectEquip(ctx2, type, battler) {
            _super.call(this);
            this.itemSelected = false;
            this.time = 0;
            this.ctx2 = ctx2;
            this.type = type;
            this.battler = battler;
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
                        "y": (25 * i) + 320,
                        "w": this.ctx2.measureText(this.hKeys[i]).width,
                        "h": 5
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
                        "y": (25 * i) + 320,
                        "w": this.ctx2.measureText(this.bKeys[i]).width,
                        "h": 5
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
                        "y": (25 * i) + 320,
                        "w": this.ctx2.measureText(this.wKeys[i]).width,
                        "h": 5
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
                        "y": (25 * i) + 320,
                        "w": this.ctx2.measureText(this.fKeys[i]).width,
                        "h": 5
                    };
                    currentEquips.push(obj);
                }
            }

            this.itemSelected = false;
        };
        SelectEquip.prototype.update = function () {
            if (mouseClicked()) {
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
                                    this.battler.unequipItem(this.type);
                                    this.battler.equipItem(this.hKeys[x], this.item, 'Head');
                                    sManager.popState();
                                    break;
                                }
                            }
                        } else if (this.type === "Body") {
                            for (var x = 0; x <= ObjLength(JSON_CACHE['equip'].Body); x++) {
                                if (currentEquips[i].Name === this.bKeys[x]) {
                                    //this.itemSelected = true;
                                    this.item = JSON_CACHE['equip'].Body[this.bKeys[x]];
                                    this.battler.unequipItem(this.type);
                                    this.battler.equipItem(this.bKeys[x], this.item, 'Body');
                                    sManager.popState();
                                    break;
                                }
                            }
                        } else if (this.type === "Weapon") {
                            for (var x = 0; x <= ObjLength(JSON_CACHE['equip'].Weapon); x++) {
                                if (currentEquips[i].Name === this.wKeys[x]) {
                                    //this.itemSelected = true;
                                    this.item = JSON_CACHE['equip'].Weapon[this.wKeys[x]];
                                    this.battler.unequipItem(this.type);
                                    this.battler.equipItem(this.wKeys[x], this.item, 'Weapon');
                                    sManager.popState();
                                    break;
                                }
                            }
                        } else if (this.type === "Feet") {
                            for (var x = 0; x <= ObjLength(JSON_CACHE['equip'].Feet); x++) {
                                if (currentEquips[i].Name === this.fKeys[x]) {
                                    //this.itemSelected = true;
                                    this.item = JSON_CACHE['equip'].Feet[this.fKeys[x]];
                                    this.battler.unequipItem(this.type);
                                    this.battler.equipItem(this.fKeys[x], this.item, 'Feet');
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
///<reference path='../State.ts' />
var Game;
(function (Game) {
    var Setting = (function (_super) {
        __extends(Setting, _super);
        function Setting(context) {
            _super.call(this);
            this.soundBool = false;
            this.musicBool = false;
            this.time = 0;
            this.context = context;
            this.objects = [];
            this.objects.push({
                "Name": "sound",
                "x": 250,
                "y": 170,
                "w": 36,
                "h": 35
            });
            this.objects.push({
                "Name": "music",
                "x": 250,
                "y": 220,
                "w": 36,
                "h": 35
            });
            this.objects.push({
                "Name": "back",
                "x": 40,
                "y": 490,
                "w": 75,
                "h": 75
            });
            this.objects.push({
                "Name": "save",
                "x": 250,
                "y": 320,
                "w": this.context.measureText("Save Settings").width,
                "h": 5
            });
        }
        Setting.prototype.init = function () {
            this.context.drawImage(IMAGE_CACHE['dialog'], 25, 130);
            this.context.fillText("Settings", 275, 150);
            this.context.fillText("Sounds", 300, 200);
            this.context.drawImage(IMAGE_CACHE['box'], 250, 175);
            this.context.fillText("Music", 300, 250);
            this.context.drawImage(IMAGE_CACHE['box'], 250, 225);
            this.context.drawImage(IMAGE_CACHE['back'], 40, 490);

            this.context.fillText("Save Settings", 250, 325);
        };
        Setting.prototype.update = function () {
            if (mouseClicked() && this.time < Date.now()) {
                this.mx = mEvent.pageX;
                this.my = mEvent.pageY;
                var keys = Object.keys(this.objects);
                for (var i = 0; i < keys.length; i++) {
                    var x1 = this.objects[keys[i]].x;
                    var x2 = this.objects[keys[i]].x + this.objects[keys[i]].w;
                    var y1 = this.objects[keys[i]].y;
                    var y2 = this.objects[keys[i]].y + this.objects[keys[i]].h;
                    if ((x1 <= this.mx && this.mx <= x2) && (y1 <= this.my && this.my <= y2)) {
                        this.time = Date.now() + 500;
                        if (this.objects[keys[i]].Name === "back") {
                            this.context.clearRect(0, 0, 800, 600);
                            sManager.popState();
                        } else if (this.objects[keys[i]].Name === "sound") {
                            this.soundBox();
                        } else if (this.objects[keys[i]].Name === "music") {
                            this.musicBox();
                        } else if (this.objects[keys[i]].Name === "save") {
                            this.context.clearRect(0, 0, 800, 600);
                            sManager.popState();
                        }
                    }
                }
            }
        };
        Setting.prototype.soundBox = function () {
            if (this.soundBool) {
                this.soundBool = false;
                this.context.clearRect(0, 0, 800, 600);
                this.init();
                if (this.musicBool) {
                    this.context.drawImage(IMAGE_CACHE['tick'], 260, 230);
                }
            } else {
                this.soundBool = true;
                this.context.drawImage(IMAGE_CACHE['tick'], 260, 180);
            }
        };
        Setting.prototype.musicBox = function () {
            if (this.musicBool) {
                this.musicBool = false;
                this.context.clearRect(0, 0, 800, 600);
                this.init();
                if (this.soundBool) {
                    this.context.drawImage(IMAGE_CACHE['tick'], 260, 180);
                }
            } else {
                this.musicBool = true;
                this.context.drawImage(IMAGE_CACHE['tick'], 260, 230);
            }
        };
        Setting.prototype.render = function () {
        };
        Setting.prototype.pause = function () {
        };
        Setting.prototype.resume = function () {
        };
        Setting.prototype.destroy = function () {
        };
        return Setting;
    })(Game.State);
    Game.Setting = Setting;
})(Game || (Game = {}));
///<reference path='../State.ts' />
var Game;
(function (Game) {
    var Status = (function (_super) {
        __extends(Status, _super);
        function Status(context) {
            _super.call(this);
            this.objects = [];
            this.context = context;
            this.battler = battleList[0];
        }
        Status.prototype.init = function () {
            this.context.drawImage(IMAGE_CACHE['dialog'], 35, 130);
            this.context.drawImage(IMAGE_CACHE['back'], 40, 490);
            var oKeys = Object.keys(battleList);
            for (var y = 0; y < oKeys.length; y++) {
                if (battleList[oKeys[y]].Base.Type === 0) {
                    if (this.battler === battleList[oKeys[y]]) {
                        this.context.fillText("*", 55 + (y * 75), 155);
                    }
                    this.context.fillText(battleList[oKeys[y]].Base.ID, 50 + (y * 75), 145);
                    this.objects[y] = {
                        "Name": battleList[oKeys[y]].Base.ID,
                        "x": 50 + (y * 75),
                        "y": 145,
                        "w": this.context.measureText(battleList[oKeys[y]].Base.ID).width,
                        "h": 20
                    };
                }
            }
            this.objects[y + 1] = {
                "Name": "back",
                "x": 40,
                "y": 490,
                "w": 75,
                "h": 75
            };
            var bKeys = Object.keys(this.battler.Base);
            for (var x = 1; x < bKeys.length - 1; x++) {
                this.context.fillText(bKeys[x] + " " + this.battler.Base[bKeys[x]] + " ( + " + this.battler.Modified[bKeys[x]] + ")", 50, 190 + (25 * x));
            }
            this.context.fillText("Abilities", 150, 200);
            for (var i = 0; i < this.battler.Spells.length; i++) {
                this.context.fillText(this.battler.Spells[i], 150, 215 + (25 * i));
            }
            this.context.drawImage(this.battler.img, 300, 200);
        };
        Status.prototype.reload = function (name) {
            var oKeys = Object.keys(battleList);
            for (var y = 0; y < oKeys.length; y++) {
                if (battleList[oKeys[y]].Base.Type === 0 && name === battleList[oKeys[y]].Base.ID) {
                    this.battler = battleList[oKeys[y]];
                    break;
                }
            }
            this.context.clearRect(0, 0, 800, 600);
            this.init();
        };
        Status.prototype.update = function () {
            if (mouseClicked()) {
                this.mx = mEvent.pageX;
                this.my = mEvent.pageY;
                var keys = Object.keys(this.objects);
                for (var i = 0; i < keys.length; i++) {
                    var x1 = this.objects[keys[i]].x;
                    var x2 = this.objects[keys[i]].x + this.objects[keys[i]].w;
                    var y1 = this.objects[keys[i]].y;
                    var y2 = this.objects[keys[i]].y + this.objects[keys[i]].h;
                    if ((x1 <= this.mx && this.mx <= x2) && (y1 <= this.my && this.my <= y2)) {
                        if (this.objects[keys[i]].Name === "back") {
                            this.context.clearRect(0, 0, 800, 600);
                            sManager.popState();
                        } else {
                            this.reload(this.objects[keys[i]].Name);
                            break;
                        }
                    }
                }
            }
        };
        Status.prototype.render = function () {
        };
        Status.prototype.pause = function () {
        };
        Status.prototype.resume = function () {
        };
        Status.prototype.destroy = function () {
        };
        return Status;
    })(Game.State);
    Game.Status = Status;
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
                this.time = Date.now() + 1000;
                this.stateStack.pop();
                if (this.stateStack.length > 0) {
                    var len = this.stateStack.length;
                    this.stateStack[len - 1].init();
                }
            }
        };
        StateManager.prototype.restart = function () {
            this.stateStack.slice(0, this.stateStack.length);
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
        function Cutscene(ctx, xmlID, mapID) {
            _super.call(this);
            this.lines = [];
            this.linePos = 0;
            this.time = 0;
            this.currentTime = 0;
            this.lineHeight = 1;
            this.initNode = true;
            this.nCounter = 0;
            this.nodeCount = 0;
            this.textNodes = [];
            this.canvas = document.getElementById('layer2');
            this.context = this.canvas.getContext('2d');
            this.canvas2 = document.getElementById('layer1');
            this.context2 = this.canvas.getContext('2d');
            this.xmlID = xmlID;
            this.mapID = mapID;
        }
        Cutscene.prototype.init = function () {
            this.initNode = true;
            this.node = XML_CACHE['chapter'].getElementsByTagName('scene')[this.xmlID];
            var count = 0;
            for (var x = 0; x < this.node.childNodes.length; x++) {
                if (this.node.childNodes[x].nodeType === 1) {
                    this.textNodes[count] = this.node.childNodes[x];
                    count++;
                    this.nodeCount++;
                }
            }
            this.currentNode = this.textNodes[this.nCounter];
            //this.lines = wrap(this.context, this.canvasWidth, this.dialogueObject);
            //this.prevName = this.lines[this.linePos].name;
        };
        Cutscene.prototype.nextNode = function () {
            this.nCounter++;
            this.currentNode = this.textNodes[this.nCounter];
            /*if (this.nCounter >= this.nodeCount) {
            sManager.popState();
            }*/
        };
        Cutscene.prototype.update = function () {
            this.currentTime = Date.now();
            switch (this.currentNode.getAttribute('type')) {
                case "dialog":
                    if (this.initNode) {
                        setStyle(this.context, 'Calibri', '16pt', 'white', 'bold', 'italic', 'left');
                        this.linePos = 0;
                        this.lineHeight = 1;
                        this.lines = wrap(this.context, this.currentNode);
                        this.prevName = this.lines[this.linePos].name;
                        this.initNode = false;
                        this.context.drawImage(IMAGE_CACHE['dialog'], 25, 350);

                        this.time = this.currentTime + 500;
                        if (this.prevName !== this.lines[this.linePos].name) {
                            this.context.clearRect(0, 0, 800, 600);
                            this.prevName = this.lines[this.linePos].name;
                            this.lineHeight = 1;
                            this.context.drawImage(IMAGE_CACHE['dialog'], 25, 350);
                        } else if (this.linePos >= 1) {
                            this.lineHeight += 25;
                        }
                        this.context.fillText(this.lines[this.linePos].message, 50, (425 + this.lineHeight));
                        this.context.fillText(this.lines[this.linePos].name, 30, 400);
                        this.linePos++;
                    }
                    if (this.linePos < this.lines.length && this.currentTime > this.time && mouseClicked()) {
                        this.time = this.currentTime + 500;
                        if (this.prevName !== this.lines[this.linePos].name) {
                            this.context.clearRect(0, 0, 800, 600);
                            this.prevName = this.lines[this.linePos].name;
                            this.lineHeight = 1;
                            this.context.drawImage(IMAGE_CACHE['dialog'], 25, 350);
                        } else if (this.linePos >= 1) {
                            this.lineHeight += 25;
                        }
                        this.context.fillText(this.lines[this.linePos].message, 50, (425 + this.lineHeight));
                        this.context.fillText(this.lines[this.linePos].name, 30, 400);
                        this.linePos++;
                    } else if (this.linePos >= this.lines.length && this.currentTime > this.time && mouseClicked()) {
                        this.initNode = true;
                        this.nextNode();
                    }
                    break;
                case "bg":
                    this.context.drawImage(IMAGE_CACHE[this.currentNode.nodeName], 0, 0);
                    this.nextNode();
                    break;
                case "party":
                    if (this.currentNode.getAttribute('value') === "add") {
                        PARTY.add(this.currentNode.nodeName, 0);
                    } else if (this.currentNode.getAttribute('value') === "remove") {
                        PARTY.remove(this.currentNode.nodeName, 0);
                    }

                    //level up character to current level and add spells as well check if there is noone in the party here -TODO
                    this.nextNode();
                    break;
                case "ability":
                    if (this.currentNode.getAttribute('value') === "add") {
                        for (var i = 0; i < battleList.length; i++) {
                            if (battleList[i].Base.ID === this.currentNode.nodeName)
                                break;
                        }
                        SPELL.AddSpell(battleList[i], this.currentNode.getAttribute('spell'));
                    } else if (this.currentNode.getAttribute('value') === "remove") {
                        for (var i = 0; i < battleList.length; i++) {
                            if (battleList[i].Base.ID === this.currentNode.nodeName)
                                break;
                        }
                        SPELL.RemoveSpell(battleList[i], this.currentNode.getAttribute('spell'));
                    }
                    this.nextNode();
                    break;
                case "switch":
                    QUEST.Switch[this.currentNode.nodeName] = this.currentNode.getAttribute('value');
                    this.nextNode();
                    break;
                case "sfx":
                    if (this.initNode) {
                        this.sfx = SOUND_CACHE[this.currentNode.nodeName];
                        this.sfx.play();
                        this.initNode = false;
                    } else if (this.sfx.ended) {
                        this.initNode = true;
                        this.nextNode();
                    }
                    break;
                case "move":
                    var sx;
                    var sy;
                    var dx;
                    var dy;
                    var keys = Object.keys(objects);
                    for (var x = 0; x < keys.length; x++) {
                        if (this.currentNode.nodeName === objects[keys[x]].name) {
                            sx = objects[keys[x]].x;
                            sy = objects[keys[x]].y;
                            break;
                        }
                    }
                    dx = +this.currentNode.getAttribute('x');
                    dy = +this.currentNode.getAttribute('y');
                    var coords = moveSprite(this.context2, sx, sy, dx, dy);
                    objects[x].x = coords.x;
                    objects[x].y = coords.y;
                    this.context2.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
                    TileMap.drawMapNoObjectReset(this.context2, this.mapID);
                    this.nextNode();
                    break;
                case "object":
                    if (this.currentNode.getAttribute('value') === "add") {
                        var obj = {
                            "gid": 262,
                            "name": "Assassin",
                            "type": "",
                            "properties": {
                                "Type": 0,
                                "ID": 0
                            },
                            "width": 0,
                            "x": +this.currentNode.getAttribute('x') * 32,
                            "y": +this.currentNode.getAttribute('y') * 32
                        };
                        objects.push(obj);
                        this.context2.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
                        TileMap.drawMapNoObjectReset(this.context2, this.mapID);
                    } else if (this.currentNode.getAttribute('value') === "remove") {
                        for (var x = 0; x < objects.length; x++) {
                            if (objects[x].name === this.currentNode.getAttribute('name')) {
                                break;
                            }
                        }
                        objects.splice(x, 1);
                    }
                    this.nextNode();
                    break;
                case "anim":
                    if (this.initNode) {
                        this.anim = ANIM_CACHE[this.currentNode.nodeName];
                        this.animate = new Game.Animation(this.context);
                        this.animate.queueAnimation(this.anim);
                        this.animate.play();
                        this.initNode = false;
                    } else if (this.animate.finishPlaying) {
                        this.initNode = true;
                        this.nextNode();
                    }
                    break;
                case "bgm":
                    var bgm = MUSIC_CACHE[this.currentNode.nodeName];
                    bgm.addEventListener('ended', function () {
                        this.currentTime = 0;
                        this.play();
                    }, false);
                    bgm.play();
                    this.nextNode();
                    break;
                case "item":
                    ITEM.add(this.currentNode.nodeName, this.currentNode.getAttribute('quantity'), this.currentNode.getAttribute('itemType'));
                    this.nextNode();
                    break;
                case "next":
                    var id = this.currentNode.getAttribute('id');
                    sManager.popState();
                    switch (this.currentNode.nodeName) {
                        case "explore":
                            sManager.pushState(new Game.Explore(this.context, id));
                            break;
                        case "battle":
                            this.context.clearRect(0, 0, 800, 600);
                            this.context2.clearRect(0, 0, 800, 600);
                            sManager.pushState(new Game.Battle(+id, this.mapID));
                            break;
                        case "dialog":
                            sManager.pushState(new Cutscene(this.context, +id, this.mapID));
                            break;
                        default:
                            break;
                    }
                    break;
                default:
                    break;
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
            this.context = ctx;
            this.context.clearRect(0, 0, 800, 600);
            this.context.fillStyle = "rgba(0, 0, 0, 0.6)";
            this.context.fillRect(0, 0, 650, 600);

            this.menuItems = [];
            this.menuItems.push({
                "name": "back",
                "x": 40,
                "y": 490,
                "w": 75,
                "h": 75
            });
            this.menuItems.push({
                "name": "inventory",
                "x": 400,
                "y": 100,
                "w": 150,
                "h": 45
            });
            this.menuItems.push({
                "name": "equip",
                "x": 400,
                "y": 160,
                "w": 150,
                "h": 45
            });
            this.menuItems.push({
                "name": "formation",
                "x": 400,
                "y": 220,
                "w": 150,
                "h": 40
            });

            this.menuItems.push({
                "name": "status",
                "x": 400,
                "y": 270,
                "w": 150,
                "h": 45
            });
            this.menuItems.push({
                "name": "setting",
                "x": 400,
                "y": 330,
                "w": 150,
                "h": 45
            });
            this.menuItems.push({
                "name": "save",
                "x": 400,
                "y": 380,
                "w": 150,
                "h": 45
            });
        }
        StatusMenu.prototype.init = function () {
            this.context.drawImage(IMAGE_CACHE['status'], 400, 100);
            this.context.drawImage(IMAGE_CACHE['back'], 40, 490);

            quickWindow(this.context, 10, 100, 380, 100, "blue", "#FF0000");
            quickWindow(this.context, 10, 225, 380, 100, "blue", "#FF0000");
            quickWindow(this.context, 10, 350, 380, 100, "blue", "#FF0000");

            setStyle(this.context, 'calibre', 14, "white", "bold");
            for (var x = 0; x < PARTY_SIZE; x++) {
                if (battleList[x].Base.Type === 0) {
                    this.context.drawImage(battleList[x].img, 25, 15 + (125 * (x + 1)));
                    this.context.fillText("Level: 1", 75, 15 + (125 * (x + 1)));
                    this.context.fillText("HP: " + battleList[x].getTotalStats().HP, 75, 35 + (125 * (x + 1)));
                    this.context.fillText("MP: " + battleList[x].getTotalStats().MP, 150, 35 + (125 * (x + 1)));
                }
            }
        };
        StatusMenu.prototype.update = function () {
            if (mouseClicked()) {
                this.mx = mEvent.pageX;
                this.my = mEvent.pageY;
                for (var x = 0; x < this.menuItems.length; x++) {
                    var x1 = this.menuItems[x].x;
                    var x2 = this.menuItems[x].x + this.menuItems[x].w;
                    var y1 = this.menuItems[x].y;
                    var y2 = this.menuItems[x].y + this.menuItems[x].h;
                    if ((x1 <= this.mx && this.mx <= x2) && (y1 <= this.my && this.my <= y2)) {
                        switch (this.menuItems[x].name) {
                            case "back":
                                this.context.clearRect(0, 0, 800, 600);
                                sManager.popState();
                                break;
                            case "inventory":
                                sManager.pushState(new Game.Inventory(this.context));
                                break;
                            case "equip":
                                sManager.pushState(new Game.Equip(this.context));
                                break;
                            case "formation":
                                sManager.pushState(new Game.Formation(this.context));
                                break;
                            case "status":
                                sManager.pushState(new Game.Status(this.context));
                                break;
                            case "setting":
                                sManager.pushState(new Game.Setting(this.context));
                                break;
                            case "save":
                                sManager.pushState(new Game.Save(this.context));
                                break;
                            default:
                                break;
                        }
                    }
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
///<reference path='State.ts' />
var Game;
(function (Game) {
    var Title = (function (_super) {
        __extends(Title, _super);
        function Title(ctx) {
            _super.call(this);
            this.context = ctx;
            this.MenuItems = [];
            SAVE = new Game.SaveSystem(ctx);
        }
        Title.prototype.init = function () {
            this.context.drawImage(IMAGE_CACHE['ripple'], 0, 0);
            setStyle(this.context, 'Calibri', 25, "white", "bold");
            this.context.fillText("Ripples of War Alpha " + GAME_VERSION, 250, 100);
            this.context.fillText("New Game", 300, 300);
            this.context.fillText("Continue Game", 300, 350);

            this.MenuItems.push({
                "name": "new",
                "x": 300,
                "y": 290,
                "w": this.context.measureText("New Game").width,
                "h": 10
            });
            this.MenuItems.push({
                "name": "load",
                "x": 300,
                "y": 340,
                "w": this.context.measureText("Continue Game").width,
                "h": 10
            });
        };
        Title.prototype.update = function () {
            if (mouseClicked()) {
                this.mx = mEvent.pageX;
                this.my = mEvent.pageY;
                for (var x = 0; x < this.MenuItems.length; x++) {
                    var x1 = this.MenuItems[x].x;
                    var x2 = this.MenuItems[x].x + this.MenuItems[x].w;
                    var y1 = this.MenuItems[x].y;
                    var y2 = this.MenuItems[x].y + this.MenuItems[x].h;
                    if ((x1 <= this.mx && this.mx <= x2) && (y1 <= this.my && this.my <= y2)) {
                        if (this.MenuItems[x].name === "new") {
                            this.context.clearRect(0, 0, 800, 600);
                            sManager.popState();
                            sManager.pushState(new Game.Cutscene(this.context, 0, "map1"));
                            //sManager.pushState(new Battle(0, "map1"));
                        } else if (this.MenuItems[x].name === "load") {
                            if (localStorage.getItem("TileMap") === null || localStorage.getItem("Party") === null) {
                                this.context.fillText("No saved file detected. Please start a new Game", 100, 250);
                            } else {
                                sManager.popState();
                                SAVE.load(GAME_WIDTH);
                            }
                        }
                    }
                }
            }
        };
        Title.prototype.render = function () {
        };
        Title.prototype.pause = function () {
        };
        Title.prototype.resume = function () {
        };
        Title.prototype.destroy = function () {
        };
        return Title;
    })(Game.State);
    Game.Title = Title;
})(Game || (Game = {}));
function initializeBattlePositions(enemyID) {
    var enemies = [];

    //Allies formation initialization
    var f = FORMATION.positions;
    for (var a = 0; a < battleList.length; a++) {
        battleList[a].setPos(f[a].x, f[a].y);
    }

    //Enemies creation and initialization then added into battlelist
    //stores all the data about the enemies from both the enemygroups and enemy json files
    var eData = [];
    var eStat = [];

    //gets enemy position and name
    var group = JSON_CACHE['Enemies']['EnemyGroups'][enemyID]['pos'];
    var ekeys = Object.keys(group);

    for (var i = 0; i < ekeys.length; i++) {
        eData[i] = {
            "id": group[i].id,
            "x": group[i].x,
            "y": group[i].y,
            "w": group[i].w,
            "h": group[i].h
        };
    }

    //enemies from json
    var foe = JSON_CACHE['character']['Enemies'];

    //get key of all values in enemies
    var key = Object.keys(foe);

    for (var e = 0; e < ekeys.length; e++) {
        for (var x = 0; x < key.length; x++) {
            if (eData[e].id === key[x]) {
                eStat[e] = {
                    "Img": foe[key[x]].Img,
                    "HP": foe[key[x]].HP,
                    "MP": foe[key[x]].MP,
                    "Atk": foe[key[x]].Atk,
                    "Def": foe[key[x]].Def,
                    "Spd": foe[key[x]].Spd,
                    "MDef": foe[key[x]].MDef,
                    "Luc": foe[key[x]].Luc,
                    "Abilities": foe[key[x]].Abilities,
                    "growth": foe[key[x]].growth
                };
            }
        }
    }

    //create sprites using all the data drawn from the enemy groups and enemy files
    var spr;
    for (var x = 0; x < ekeys.length; x++) {
        spr = new Game.Sprite(IMAGE_CACHE[eStat[x].Img], eData[x].x, eData[x].y);
        spr.setBaseAttributes(eData[x].id, eStat[x].HP, eStat[x].MP, eStat[x].Atk, eStat[x].Def, eStat[x].Spd, eStat[x].MAtk, eStat[x].MDef, eStat[x].Luc, 1);
        spr.currentState = 0;
        spr.Current = spr.getTotalStats();
        enemies.push(spr);
    }
    return enemies;
}
function quickWindow(context, x, y, w, h, fcolor, scolor) {
    context.fillStyle = fcolor;
    context.fillRect(x, y, w, h);

    context.strokeStyle = scolor;
    context.strokeRect(x - 1, y - 1, w + 2, h + 2);
}
function LevelUp(sprite, context) {
    var growth = [];
    var split = sprite.growth.split(" ");
    var keys = Object.keys(sprite.Base);
    var increase = 0;
    var lvl = sprite.Level + 1;
    var newSpells = [];
    var spell = Object.keys(JSON_CACHE['character']['Party'][sprite.Base.ID]['Abilities']);
    for (var y = 0; y < spell.length; y++) {
        if (lvl === JSON_CACHE['character']['Party'][spell[y]]['Abilities'][spell[y]]) {
            var spellkeys = Object.keys(JSON_CACHE['spell']['Spells']);
            SPELL.AddSpell(sprite, spellkeys[y]);
            newSpells.push(spellkeys[y]);
        }
    }
    for (var x = 1; x < (keys.length - 1); x++) {
        switch (split[x - 1]) {
            case "+++++":
                increase = 10;
                break;
            case "++++":
                increase = 8;
                break;
            case "+++":
                increase = 6;
                break;
            case "++":
                increase = 4;
                break;
            case "+":
                increase = 2;
                break;
            case "-":
                increase = -1;
                break;
            case "--":
                increase = -2;
                break;
            case "---":
                increase = -3;
                break;
            case "----":
                increase = -4;
                break;
            case "-----":
                increase = -5;
                break;
        }
        sprite.Base[keys[x]] += (sprite.Level) + increase;
        growth[keys[x]] = (sprite.Level) + increase;
    }

    LevelUpDisplay(context, growth, sprite.Base, sprite.Base.ID, newSpells);
}
function LevelUpDisplay(context, growth, base, name, spells) {
    //box to put text on
    context.fillStyle = "blue";
    context.fillRect(250, 250, 400, 300);

    //Border around box
    context.strokeStyle = "#FF0000";
    context.strokeRect(249, 249, 402, 302);

    //levelup text
    setStyle(context, 'calibre', 16, "yellow", "bold");
    context.fillText("Level Up!", 300, 265);

    //Name and stats
    setStyle(context, 'calibre', 12, "white", "bold");
    context.fillText(name, 255, 265);
    context.fillText("HP: " + (base.HP - growth.HP) + " + " + growth.HP + " = " + base.HP, 275, 300);
    context.fillText("MP: " + (base.MP - growth.MP) + " + " + growth.MP + " = " + base.MP, 275, 320);
    context.fillText("Attack: " + (base.Atk - growth.Atk) + " + " + growth.Atk + " = " + base.Atk, 275, 340);
    context.fillText("Defense: " + (base.Def - growth.Def) + " + " + growth.Def + " = " + base.Def, 275, 360);
    context.fillText("Speed: " + (base.Spd - growth.Spd) + " + " + growth.Spd + " = " + base.Spd, 275, 380);
    context.fillText("M. Defense: " + (base.MDef - growth.MDef) + " + " + growth.MDef + " = " + base.MDef, 275, 400);
    context.fillText("Luck: " + (base.Luc - growth.Luc) + " + " + growth.Luc + " = " + base.Luc, 275, 420);

    context.fillText("Spells Learned: ", 255, 440);
    var newSpellKeys = Object.keys(spells);
    for (var x = 0; x < newSpellKeys.length; x++) {
        context.fillText("Luck: " + base.Luc + " + " + growth.Luc, 300, 440 + (x * 20));
    }
}
function moveSprite(context, sx, sy, dx, dy) {
    var x = dx * 32;
    var y = dy * 32;
    var easingAmount = 1;
    var im = new Image();
    im = this.img;
    var xDistance = x - sx;
    var yDistance = y - sy;
    var distance = Math.sqrt(xDistance * xDistance + yDistance * yDistance);

    if (distance > 1) {
        sx += xDistance * easingAmount;
        sy += yDistance * easingAmount;
    }
    return { "x": sx, "y": sy };
    //this.interval = setInterval(this.movefunc, 1000/10);
    /*var move = requestAnimationFrame(function () {
    context.clearRect(0, 0, 800, 600);
    cx = dx;
    cy = dy;
    context.drawImage(IMAGE_CACHE['D'], dx, dy);
    if (cx === dx && cy === dy) {
    cancelAnimationFrame(move);
    }
    });*/
}
function ObjLength(obj) {
    var key, count = 0;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            count++;
        }
    }
    return count;
}
// world is a 2d array of integers (eg world[10][15] = 0)
// pathStart and pathEnd are arrays like [5,10]
function findPath(world, pathStart, pathEnd) {
    // shortcuts for speed
    var abs = Math.abs;
    var max = Math.max;
    var pow = Math.pow;
    var sqrt = Math.sqrt;

    // the world data are integers:
    // anything higher than this number is considered blocked
    // this is handy is you use numbered sprites, more than one
    // of which is walkable road, grass, mud, etc
    var maxWalkableTileNum = 0;

    // keep track of the world dimensions
    // Note that this A-star implementation expects the world array to be square:
    // it must have equal height and width. If your game world is rectangular,
    // just fill the array with dummy values to pad the empty space.
    var worldWidth = world[0].length;
    var worldHeight = world.length;
    var worldSize = worldWidth * worldHeight;

    // which heuristic should we use?
    // default: no diagonals (Manhattan)
    var distanceFunction = ManhattanDistance;
    var findNeighbours = function () {
    };

    /*
    // alternate heuristics, depending on your game:
    
    // diagonals allowed but no sqeezing through cracks:
    var distanceFunction = DiagonalDistance;
    var findNeighbours = DiagonalNeighbours;
    
    // diagonals and squeezing through cracks allowed:
    var distanceFunction = DiagonalDistance;
    var findNeighbours = DiagonalNeighboursFree;
    
    // euclidean but no squeezing through cracks:
    var distanceFunction = EuclideanDistance;
    var findNeighbours = DiagonalNeighbours;
    
    // euclidean and squeezing through cracks allowed:
    var distanceFunction = EuclideanDistance;
    var findNeighbours = DiagonalNeighboursFree;
    */
    // distanceFunction functions
    // these return how far away a point is to another
    function ManhattanDistance(Point, Goal) {
        return abs(Point.x - Goal.x) + abs(Point.y - Goal.y);
    }

    function DiagonalDistance(Point, Goal) {
        return max(abs(Point.x - Goal.x), abs(Point.y - Goal.y));
    }

    function EuclideanDistance(Point, Goal) {
        // diagonal movement using Euclide (AC = sqrt(AB^2 + BC^2))
        // where AB = x2 - x1 and BC = y2 - y1 and AC will be [x3, y3]
        return sqrt(pow(Point.x - Goal.x, 2) + pow(Point.y - Goal.y, 2));
    }

    // Neighbours functions, used by findNeighbours function
    // to locate adjacent available cells that aren't blocked
    // Returns every available North, South, East or West
    // cell that is empty. No diagonals,
    // unless distanceFunction function is not Manhattan
    function Neighbours(x, y) {
        var N = y - 1, S = y + 1, E = x + 1, W = x - 1, myN = N > -1 && canWalkHere(x, N), myS = S < worldHeight && canWalkHere(x, S), myE = E < worldWidth && canWalkHere(E, y), myW = W > -1 && canWalkHere(W, y), result = [];
        if (myN)
            result.push({ x: x, y: N });
        if (myE)
            result.push({ x: E, y: y });
        if (myS)
            result.push({ x: x, y: S });
        if (myW)
            result.push({ x: W, y: y });

        //findNeighbours(myN, myS, myE, myW, N, S, E, W, result);
        return result;
    }

    // returns every available North East, South East,
    // South West or North West cell - no squeezing through
    // "cracks" between two diagonals
    function DiagonalNeighbours(myN, myS, myE, myW, N, S, E, W, result) {
        if (myN) {
            if (myE && canWalkHere(E, N))
                result.push({ x: E, y: N });
            if (myW && canWalkHere(W, N))
                result.push({ x: W, y: N });
        }
        if (myS) {
            if (myE && canWalkHere(E, S))
                result.push({ x: E, y: S });
            if (myW && canWalkHere(W, S))
                result.push({ x: W, y: S });
        }
    }

    // returns every available North East, South East,
    // South West or North West cell including the times that
    // you would be squeezing through a "crack"
    function DiagonalNeighboursFree(myN, myS, myE, myW, N, S, E, W, result) {
        myN = N > -1;
        myS = S < worldHeight;
        myE = E < worldWidth;
        myW = W > -1;
        if (myE) {
            if (myN && canWalkHere(E, N))
                result.push({ x: E, y: N });
            if (myS && canWalkHere(E, S))
                result.push({ x: E, y: S });
        }
        if (myW) {
            if (myN && canWalkHere(W, N))
                result.push({ x: W, y: N });
            if (myS && canWalkHere(W, S))
                result.push({ x: W, y: S });
        }
    }

    // returns boolean value (world cell is available and open)
    function canWalkHere(x, y) {
        return ((world[x] != null) && (world[x][y] != null) && (world[x][y] <= maxWalkableTileNum));
    }
    ;

    // Node function, returns a new object with Node properties
    // Used in the calculatePath function to store route costs, etc.
    function Node(Parent, Point) {
        var newNode = {
            // pointer to another Node object
            Parent: Parent,
            // array index of this Node in the world linear array
            value: Point.x + (Point.y * worldWidth),
            // the location coordinates of this Node
            x: Point.x,
            y: Point.y,
            // the heuristic estimated cost
            // of an entire path using this node
            f: 0,
            // the distanceFunction cost to get
            // from the starting point to this node
            g: 0
        };

        return newNode;
    }

    // Path function, executes AStar algorithm operations
    function calculatePath() {
        // create Nodes from the Start and End x,y coordinates
        var mypathStart = Node(null, { x: pathStart[0], y: pathStart[1] });
        var mypathEnd = Node(null, { x: pathEnd[0], y: pathEnd[1] });

        // create an array that will contain all world cells
        var AStar = new Array(worldSize);

        // list of currently open Nodes
        var Open = [mypathStart];

        // list of closed Nodes
        var Closed = [];

        // list of the final output array
        var result = [];

        // reference to a Node (that is nearby)
        var myNeighbours;

        // reference to a Node (that we are considering now)
        var myNode;

        // reference to a Node (that starts a path in question)
        var myPath;

        // temp integer variables used in the calculations
        var length, max, min, i, j;

        while (length = Open.length) {
            max = worldSize;
            min = -1;
            for (i = 0; i < length; i++) {
                if (Open[i].f < max) {
                    max = Open[i].f;
                    min = i;
                }
            }

            // grab the next node and remove it from Open array
            myNode = Open.splice(min, 1)[0];

            // is it the destination node?
            if (myNode.value === mypathEnd.value) {
                myPath = Closed[Closed.push(myNode) - 1];
                do {
                    result.push([myPath.x, myPath.y]);
                } while(myPath = myPath.Parent);

                // clear the working arrays
                AStar = Closed = Open = [];

                // we want to return start to finish
                result.reverse();
            } else {
                // find which nearby nodes are walkable
                myNeighbours = Neighbours(myNode.x, myNode.y);

                for (i = 0, j = myNeighbours.length; i < j; i++) {
                    myPath = Node(myNode, myNeighbours[i]);
                    if (!AStar[myPath.value]) {
                        // estimated cost of this particular route so far
                        myPath.g = myNode.g + distanceFunction(myNeighbours[i], myNode);

                        // estimated cost of entire guessed route to the destination
                        myPath.f = myPath.g + distanceFunction(myNeighbours[i], mypathEnd);

                        // remember this new path for testing above
                        Open.push(myPath);

                        // mark this node in the world graph as visited
                        AStar[myPath.value] = true;
                    }
                }

                // remember this route as having no more untested options
                Closed.push(myNode);
            }
        }
        return result;
    }

    // actually calculate the a-star path!
    // this returns an array of coordinates
    // that is empty if no path is possible
    return calculatePath();
}
'use strict';
// Adapted from https://gist.github.com/paulirish/1579671 which derived from
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
// requestAnimationFrame polyfill by Erik Möller.
// Fixes from Paul Irish, Tino Zijdel, Andrew Mao, Klemen Slavič, Darius Bacon
// MIT license
if (!Date.now)
    Date.now = function () {
        return new Date().getTime();
    };

(function () {
    var vendors = ['webkit', 'moz'];
    for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
        var vp = vendors[i];
        window.requestAnimationFrame = window[vp + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = (window[vp + 'CancelAnimationFrame'] || window[vp + 'CancelRequestAnimationFrame']);
    }
    if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
        var lastTime = 0;
        window.requestAnimationFrame = function (callback) {
            var now = Date.now();
            var nextTime = Math.max(lastTime + 16, now);
            return setTimeout(function () {
                callback(lastTime = nextTime);
            }, nextTime - now);
        };
        window.cancelAnimationFrame = clearTimeout;
    }
}());
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
function FormatTilemap(mapID) {
    var map = new Array(TILEDATA_CACHE[mapID].layers[0].height);
    var declareArray = true;
    for (var x = 0; x < TILEDATA_CACHE[mapID].layers.length; x++) {
        if (TILEDATA_CACHE[mapID].layers[x].name === "Tile Layer 1") {
            for (var y = 0; y < TILEDATA_CACHE[mapID].layers[x].height; y++) {
                declareArray = true;
                for (var z = 0; z < TILEDATA_CACHE[mapID].layers[x].width; z++) {
                    if (declareArray) {
                        map[y] = new Array(TILEDATA_CACHE[mapID].layers[x].width);
                        declareArray = false;
                    }

                    //map[x][y] = (y * TILEDATA_CACHE[mapID].tilewidth) + x;
                    var index = (y * TILEDATA_CACHE[mapID].layers[x].width) + z;
                    var data = TILEDATA_CACHE[mapID].layers[x].data;
                    map[y][z] = data[index];
                }
            }
        } else if (TILEDATA_CACHE[mapID].layers[x].type === "tilelayer") {
            for (var y = 0; y < TILEDATA_CACHE[mapID].layers[x].height; y++) {
                for (var z = 0; z < TILEDATA_CACHE[mapID].layers[x].width; z++) {
                    var index = (y * TILEDATA_CACHE[mapID].layers[x].width) + z;
                    var data = TILEDATA_CACHE[mapID].layers[x].data;
                    if (data[index] === 0) {
                    } else {
                        map[y][z] = data[index];
                    }
                }
            }
        }
    }
    var walkable = TILEDATA_CACHE[mapID].tilesets[0].tiles;
    var wkeys = Object.keys(walkable);
    for (var i = 0; i < 9; i++) {
        for (var e = 0; e < 9; e++) {
            for (var l = 0; l < wkeys.length; l++) {
                if (map[i][e] === (+wkeys[l])) {
                    map[i][e] = 0;
                }
            }
        }
    }
    return map;
}
function wrap(ctx, text) {
    var templine = "";
    var lines = [];
    var child = text.childNodes;

    //figure out if the arbitrary numbers used will affect other resolutions negatively
    //mostly feature complete apart from adding more tags to the xml to grab them here to be used in
    //areas such as bg img or sounds to be called
    /*for (var i = 0; i < text.childNodes.length; i++) {
    if (child[i].nodeType === 1) { //gets only the element nodes*/
    if (ctx.measureText(text.textContent).width >= GAME_WIDTH) {
        var words = text.textContent.split(' ');
        for (var key = 0; key < words.length; key++) {
            var length = templine.length;
            var word = words[key];
            templine = templine + word + ' ';
            if (ctx.measureText(templine).width >= (GAME_WIDTH * 0.95)) {
                lines.push({ "name": text.nodeName, "message": templine.substring(0, length) });
                key--;
                templine = "";
            }
            /*else if (ctx.measureText(templine).width >= (GAME_WIDTH * 0.70)) {
            lines.push({ "name": text.nodeName, "message": templine });
            templine = "";
            }*/
        }
        lines.push({ "name": text.nodeName, "message": templine });
    } else {
        lines.push({ "name": text.nodeName, "message": text.textContent });
    }

    //}
    //}
    return lines;
}
//# sourceMappingURL=app.js.map
