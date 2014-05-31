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
                    holder[i] = new Game.GameObject(_this.spriteSource, 0, 0, frame.x, frame.y, frame.w, frame.h);
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
            this.onXMLLoad = function (key, response, pos) {
                XML_CACHE[key[pos]] = response;
                _this.isLoaded++;
                //rest to be implemented. not sure how to extract the info how i want yet...will do soon
                //saved xml file iin the global variable to be used later on as needed
            };
            this.onJSONLoad = function (key, response, pos) {
                JSON_CACHE[key[pos]] = JSON.parse(response);
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
                    this.loadfile(key, url[key[i]], onLoad, typeOfFile, i);
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
                    battleList[i].setModifiedAttributes(battleList[i].Modified.ID, battleList[i].Modified['HP'] + this.bonus.HP, battleList[i].Modified['MP'] + this.bonus.MP, battleList[i].Modified['Atk'] + this.bonus.Atk, battleList[i].Modified['Def'] + this.bonus.Def, battleList[i].Modified['MDef'] + this.bonus.MDef, battleList[i].Modified['Spd'] + this.bonus.Spd, battleList[i].Modified['Luc'] + this.bonus.Luc, battleList[i].Modified.Type);
                }
            }
        }
        BattleFormation.prototype.setFormation = function (formation) {
            for (var i = 0; i < this.battleKeys.length; i++) {
                if (battleList[i].Base.Type === 0) {
                    battleList[i].setModifiedAttributes(battleList[i].Modified.ID, battleList[i].Modified['HP'] - this.bonus.HP, battleList[i].Modified['MP'] - this.bonus.MP, battleList[i].Modified['Atk'] - this.bonus.Atk, battleList[i].Modified['Def'] - this.bonus.Def, battleList[i].Modified['MDef'] - this.bonus.MDef, battleList[i].Modified['Spd'] - this.bonus.Spd, battleList[i].Modified['Luc'] - this.bonus.Luc, battleList[i].Modified.Type);
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
                "MDef": JSON_CACHE['formation']['Formations'][this.current].bonus.MDef,
                "Luc": JSON_CACHE['formation']['Formations'][this.current].bonus.Luc
            };

            for (var i = 0; i < this.battleKeys.length; i++) {
                if (battleList[i].Base.Type === 0) {
                    battleList[i].setModifiedAttributes(battleList[i].Modified.ID, battleList[i].Modified['HP'] + this.bonus.HP, battleList[i].Modified['MP'] + this.bonus.MP, battleList[i].Modified['Atk'] + this.bonus.Atk, battleList[i].Modified['Def'] + this.bonus.Def, battleList[i].Modified['MDef'] + this.bonus.MDef, battleList[i].Modified['Spd'] + this.bonus.Spd, battleList[i].Modified['Luc'] + this.bonus.Luc, battleList[i].Modified.Type);
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
///<reference path='gameobject.ts' />
var statusEffects = {
    "normal": 0,
    "dead": 1,
    "poison": 2,
    "sleep": 3,
    "paralyze": 4
};
var Game;
(function (Game) {
    var Sprite = (function (_super) {
        __extends(Sprite, _super);
        //all the base attributes and methods are to be added here, this will come when
        //the battle system is being developed but for now it stays relatively empty i guess
        function Sprite(img, dx, dy, sx, sy, w, h, scale) {
            _super.call(this, img, dx, dy, sx, sy, w, h, scale);
            this.dead = false;
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
            this.Current = {
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
                "HP": hp,
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
                "HP": hp,
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
            var keys = Object.keys(JSON_CACHE['character']['Party']);
            for (var s = 0; s < keys.length; s++) {
                if (char === keys[s]) {
                    var b = JSON_CACHE['character']['Party'][keys[s]];
                    var p1 = new Game.Sprite(IMAGE_CACHE[b.Img], 0, 0);
                    p1.setBaseAttributes(keys[s], b.HP, b.MP, b.Atk, b.Def, b.MDef, b.Spd, b.Luc, type);

                    //p1.setBaseAttributes('hero', 10, 0, 4, 1, 1, 1, 1, 0);
                    battleList.push(p1);
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

            sManager.pushState(new Game.Title(this.ctx, 800));
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
                sManager.pushState(new Game.Explore(context, w, this.MapID));
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

                        //var key = Object.keys(objects);
                        /*for (var y = 0; y < key.length; y++) {
                        objects[key[y]] = [];
                        }*/
                        objects = [];
                        for (var x = 0; x < tileObjects.length; x++) {
                            var tile = _this.getTile(tileObjects[x].gid);

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
            this.width = 800;

            //sManager.pushState(new Explore(this.context, this.width, 'rpg'));
            sManager.pushState(new Game.Title(this.context, this.width));

            PARTY = new Game.PartyManager();
            FORMATION = new Game.BattleFormation();
            ITEM = new Game.ItemManager();
            SPELL = new Game.SpellManager();
            QUEST = new Game.QuestManager();

            PARTY.add("Shadow", 0);
            PARTY.add("Syndra", 0);
            PARTY.add("Johnathan", 0);
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
                    map2: 'Assets/Tilemap/map2.json'
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
                    Enemies: 'Assets/XML/EnemyGroups.json'
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
        function Battle(ctx, ctx2, EnemyID) {
            _super.call(this);
            this.newTime = 0;
            this.currentkey = 0;
            this.endTime = 0;
            this.spellSelect = false;
            this.applyStatus = true;
            this.ctx = ctx;
            this.ctx2 = ctx2;
            this.spellList = [];
            this.EnemyID = EnemyID;

            this.nextState = JSON_CACHE['Enemies']['EnemyGroups'][EnemyID].next;
            var enemy;
            var eGroup = JSON_CACHE['Enemies']['EnemyGroups'][EnemyID]['pos'];
            var egroupkeys = Object.keys(eGroup);
            var ekeys = Object.keys(JSON_CACHE['character']['Enemies']);
            for (var e = 0; e < egroupkeys.length; e++) {
                for (var i = 0; i < ekeys.length; i++) {
                    if (eGroup[e].id === ekeys[i]) {
                        break;
                    }
                }
                enemy = JSON_CACHE['character']['Enemies'][ekeys[i]];
                this.e1 = new Game.Sprite(IMAGE_CACHE[enemy.Img], eGroup[e].x, eGroup[e].y);
                this.e1.setBaseAttributes(ekeys[i], enemy.HP, enemy.MP, enemy.Atk, enemy.Def, enemy.MDef, enemy.Spd, enemy.Luc, 1);
                battleList.push(this.e1);
            }

            /*this.e1 = new Sprite(IMAGE_CACHE['S'], 200, 250, 24, 22);
            this.e2 = new Sprite(IMAGE_CACHE['S'], 200, 325, 24, 22);
            
            this.e1.setBaseAttributes('foe', 15, 0, 5, 0, 1, 1, 1, 1);
            this.e2.setBaseAttributes('foe2', 10, 0, 5, 1, 1, 1, 1, 1);
            
            battleList[0] = this.e1;
            battleList[1] = this.e2;*/
            this.battleKeys = Object.keys(battleList);

            menuOptions.push({
                "Name": "Attack",
                "x": 550,
                "y": 125
            });
            menuOptions.push({
                "Name": "Spell",
                "x": 550,
                "y": 200
            });
            menuOptions.push({
                "Name": "Defend",
                "x": 550,
                "y": 275
            });
            this.ctx.drawImage(IMAGE_CACHE['bg'], 0, 0);
        }
        Battle.prototype.Action = function () {
            if (this.currentPlayer.Base.Type === 0 && mouseClicked()) {
                if (this.command === 'spell' && this.currentSpell.TargetAll === 1) {
                } else {
                    this.mx = mEvent.pageX;
                    this.my = mEvent.pageY;
                    for (var i = 0; i < this.battleKeys.length; i++) {
                        var x1 = battleList[this.battleKeys[i]].dx;
                        var x2 = battleList[this.battleKeys[i]].dx + battleList[this.battleKeys[i]].W;
                        var y1 = battleList[this.battleKeys[i]].dy;
                        var y2 = battleList[this.battleKeys[i]].dy + battleList[this.battleKeys[i]].H;
                        if ((x1 <= this.mx && this.mx <= x2) && (y1 <= this.my && this.my <= y2)) {
                            if (this.command === 'Attack') {
                                for (var x = 0; x < this.battleKeys.length; x++) {
                                    if (battleList[this.battleKeys[i]] === battleList[this.battleKeys[x]] && battleList[this.battleKeys[x]].currentState !== 1 && battleList[this.battleKeys[x]].Base.Type === 1) {
                                        this.target = battleList[this.battleKeys[x]];
                                        this.statusGUI();
                                        this.enemySelect = false;
                                        break;
                                    }
                                }
                            } else if (this.command === 'Spell' && this.currentSpell.Damage >= 0) {
                                for (var x = 0; x < this.battleKeys.length; x++) {
                                    if (battleList[this.battleKeys[i]] === battleList[this.battleKeys[x]] && battleList[this.battleKeys[x]].currentState !== 1 && battleList[this.battleKeys[x]].Base.Type === 1) {
                                        this.target = battleList[this.battleKeys[x]];
                                        this.statusGUI();
                                        this.enemySelect = false;
                                        break;
                                    }
                                }
                            } else if (this.command === 'Spell' && this.currentSpell.Damage < 0) {
                                for (var x = 0; x < this.battleKeys.length; x++) {
                                    if (battleList[this.battleKeys[i]] === battleList[this.battleKeys[x]] && battleList[this.battleKeys[x]].currentState !== 1 && battleList[this.battleKeys[x]].Base.Type === 0) {
                                        this.target = battleList[this.battleKeys[x]];
                                        this.statusGUI();
                                        this.enemySelect = false;
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
                if (!this.enemySelect) {
                    if (this.command === 'Attack') {
                        this.playerAttack(this.currentPlayer, this.target);
                    } else if (this.command === 'Spell') {
                        this.playerSpell(this.currentPlayer, this.currentSpell, this.target);
                    }
                    this.drawCommands = true;
                    this.statusGUI();
                    this.currentkey++;
                    this.currentPlayer = battleList[this.currentkey];
                    this.newTime = Date.now() + 2000;
                    this.ctx2.clearRect(540, 125, 260, 150); //clear commands only
                }
            }
        };
        Battle.prototype.SelectSpell = function () {
            //clear screen and draw dialog with spells on screen
            this.ctx2.drawImage(IMAGE_CACHE['dialog'], 25, 300);
            for (var i = 0; i < this.currentPlayer.Spells.length; i++) {
                this.spellList.push({
                    "Name": this.currentPlayer.Spells[i],
                    "x": 50,
                    "y": 325 + (i * 25)
                });
                this.ctx2.fillText(this.spellList[i].Name, this.spellList[i].x, this.spellList[i].y);
            }

            //pick up which spell was clicked on and stores it
            var keys = Object.keys(JSON_CACHE['spell'].Spells);
            this.mx = mEvent.pageX;
            this.my = mEvent.pageY;
            for (var i = 0; i < this.spellList.length; i++) {
                var a1 = this.spellList[i].x - 30;
                var a2 = this.spellList[i].x + 30;
                var b1 = this.spellList[i].y - 20;
                var b2 = this.spellList[i].y + 20;

                if ((a1 <= this.mx && this.mx <= a2) && (b1 <= this.my && this.my <= b2)) {
                    for (var x = 0; x < keys.length; x++) {
                        if (this.spellList[i].Name === keys[x]) {
                            this.currentSpell = JSON_CACHE['spell'].Spells[keys[x]];

                            //determines who to target
                            if (this.currentSpell.Damage < 0) {
                                this.ctx2.clearRect(0, 0, 800, 600);
                                this.ctx2.fillText("Click to select Ally", 350, 100);
                            } else {
                                this.ctx2.clearRect(0, 0, 800, 600);
                                this.ctx2.fillText("Click to select Enemy", 350, 100);
                            }
                            this.statusGUI();
                            this.enemySelect = true;
                            this.spellSelect = false;
                            this.spellList.length = 0;
                            break;
                        }
                    }
                }
            }
        };
        Battle.prototype.Target = function (time) {
            this.mx = mEvent.pageX;
            this.my = mEvent.pageY;
            for (var i = 0; i < menuOptions.length; i++) {
                var a1 = menuOptions[i].x;
                var a2 = menuOptions[i].x + 190;
                var b1 = menuOptions[i].y;
                var b2 = menuOptions[i].y + 50;
                if ((a1 <= this.mx && this.mx <= a2) && (b1 <= this.my && this.my <= b2) && time > this.newTime) {
                    if (menuOptions[i].Name === 'Attack') {
                        this.command = menuOptions[i].Name;
                        this.ctx2.clearRect(0, 0, 800, 600);
                        this.statusGUI();
                        this.ctx2.fillText("Click to select Target", 350, 100);
                        this.enemySelect = true;
                    } else if (menuOptions[i].Name === 'Spell') {
                        this.command = menuOptions[i].Name;
                        this.ctx2.clearRect(0, 0, 800, 600);
                        this.statusGUI();
                        this.spellSelect = true;
                    } else if (menuOptions[i].Name === 'Defend') {
                        this.command = menuOptions[i].Name;
                        this.ctx2.clearRect(0, 0, 800, 600);
                        this.statusGUI();
                        this.drawCommands = true;
                        this.ctx2.fillText(this.currentPlayer.Base.ID + " Defends and takes reduced damage", 350, 100);
                        this.statusGUI();
                        this.currentkey++;
                        this.currentPlayer = battleList[this.currentkey];
                        this.newTime = Date.now() + 2000;
                    }
                }
            }
        };
        Battle.prototype.statusGUI = function () {
            this.ctx2.clearRect(0, 375, 800, 600);
            this.ctx2.drawImage(IMAGE_CACHE['dialog'], 100, 375);
            for (var i = 0; i < this.battleKeys.length; i++) {
                this.ctx2.fillText(battleList[i].Base.ID + " HP : " + battleList[i].Current.HP, 400, (i * 25) + 400);
                if (battleList[i].currentState === 0) {
                    this.ctx2.fillText("Normal", 600, (i * 25) + 400);
                } else if (battleList[i].currentState === 1) {
                    this.ctx2.fillText("Dead", 600, (i * 25) + 400);
                } else if (battleList[i].currentState === 2) {
                    this.ctx2.fillText("Poisoned", 600, (i * 25) + 400);
                } else if (battleList[i].currentState === 3) {
                    this.ctx2.fillText("Asleep", 600, (i * 25) + 400);
                } else if (battleList[i].currentState === 4) {
                    this.ctx2.fillText("Paralyzed", 600, (i * 25) + 400);
                }
                /*if (battleList[i].Base.Type === 0) {
                this.ctx.fillText("Formation Bonus: " + FORMATION.bonus.HP + " " + FORMATION.bonus.MP + " " + FORMATION.bonus.Atk + " " + FORMATION.bonus.Def + " " + FORMATION.bonus.Spd + " " + FORMATION.bonus.MDef + " " + FORMATION.bonus.Luc, 300, 500);
                }*/
            }
        };
        Battle.prototype.newTurn = function () {
            this.currentkey = 0;
            this.currentPlayer = battleList[this.currentkey];
        };
        Battle.prototype.PlayerMenuInit = function () {
            this.ctx.clearRect(0, 0, 800, 600);
            this.ctx2.clearRect(0, 0, 800, 600);
            setStyle(this.ctx, 'Calibri', '16pt', 'white', 'bold', 'italic', 'left');
            setStyle(this.ctx2, 'Calibri', '16pt', 'white', 'bold', 'italic', 'left');
            this.statusGUI();
        };
        Battle.prototype.renderActors = function () {
            this.ctx.clearRect(0, 0, 800, 600);
            this.ctx.drawImage(IMAGE_CACHE['bg'], 0, 0);
            for (var i = 0; i < this.battleKeys.length; i++) {
                if (battleList[this.battleKeys[i]].currentState !== 1) {
                    if (battleList[this.battleKeys[i]].Base.Type === 0) {
                        this.formation = FORMATION.positions;
                        battleList[this.battleKeys[i]].setPos(this.formation[i].x, this.formation[i].y);
                    }
                    battleList[this.battleKeys[i]].render(this.ctx);

                    //this.ctx.fillText(battleList[this.battleKeys[i]].Base.ID, this.formation[i].x, this.formation[i].y);
                    this.ctx.fillText(battleList[this.battleKeys[i]].Base.ID, battleList[this.battleKeys[i]].dx + 20, battleList[this.battleKeys[i]].dy - 5);
                }
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
                if (battleList[i].Base.Type === 0) {
                    aHP += battleList[i].Current.HP;
                } else if (battleList[i].Base.Type === 1) {
                    eHP += battleList[i].Current.HP;
                }
            }
            if (aHP <= 0 || eHP <= 0) {
                return true;
            } else {
                return false;
            }
        };
        Battle.prototype.playerAttack = function (attacker, target) {
            target.Current.HP = target.Current.HP - attacker.Current.Atk;
            this.checkSpriteState(target);
            this.ctx2.clearRect(0, 0, 800, 600);
            this.ctx2.fillText(attacker.Base.ID + " Attacks " + target.Base.ID + " for " + attacker.Current.Atk + " damage", 350, 100);
        };
        Battle.prototype.playerSpell = function (caster, spell, target) {
            this.ctx2.clearRect(0, 0, 800, 600);
            if (spell.Effect) {
                //apply status effect
                var chance = getRandomInt(0, 100);
                if (target.currentState === 0 && chance > spell.Chance) {
                    target.currentState = statusEffects[spell.Status];
                    this.ctx2.fillText(caster.Base.ID + " Casts spell1 on " + target.Base.ID + " for " + spell.Damage + " damage", 350, 100);
                    this.ctx2.fillText(spell.Status, target.x, target.y + 20);
                }
            } else {
                target.Current.HP = target.Current.HP - spell.Damage;
                if (target.Current.HP > target.getTotalStats().HP) {
                    target.Current.HP = target.getTotalStats().HP;
                }
                this.checkSpriteState(target);
                if (spell.Damage > 0) {
                    this.ctx2.fillText(caster.Base.ID + " Casts spell1 on " + target.Base.ID + " for " + spell.Damage + " damage", 350, 100);
                } else if (spell.Damage <= 0) {
                    this.ctx2.fillText(caster.Base.ID + " Casts Spell1 on " + target.Base.ID + " and heals " + -spell.Damage + " HP", 350, 100);
                }
            }
        };
        Battle.prototype.checkSpriteState = function (target) {
            if (target.Current.HP < 1) {
                target.currentState = 1;
                target.Current.HP = 0;
                if (this.battleOver()) {
                    this.endTime = Date.now() + 2000;
                }
                this.renderActors();
            }
        };
        Battle.prototype.init = function () {
            for (var x = 0; x < this.battleKeys.length; x++) {
                battleList[x].currentState = 0;
                battleList[x].Current = battleList[x].getTotalStats();
            }
            this.PlayerMenuInit();
            this.renderActors();
            this.currentPlayer = battleList[this.currentkey];
        };

        Battle.prototype.update = function () {
            var time = Date.now();
            if (this.currentkey > 3) {
                this.newTurn();
            }
            if (this.currentPlayer.Base.Type === 0 && this.currentPlayer.currentState !== 1 && this.drawCommands && time > this.newTime) {
                this.ctx2.clearRect(0, 0, 800, 600);
                this.ctx2.fillText("Player Turn", 350, 100);
                this.renderActors();
                this.drawCommands = false;
            }
            if (this.battleOver() && time > this.endTime) {
                for (var t = 0; t < this.battleKeys.length; t++) {
                    if (battleList[this.battleKeys[t]].Base.Type === 1) {
                        var list = battleList;
                        battleList = [];
                        battleList = list.splice(t, this.battleKeys.length - t); //double check to ensure it works properly
                        break;
                    }
                }
                this.ctx.clearRect(0, 0, 800, 600);
                this.ctx2.clearRect(0, 0, 800, 600);
                sManager.popState();
                if (this.nextState === "scene") {
                    sManager.pushState(new Game.Cutscene("id", 800, 600, this.ctx2, 0));
                }
            } else if (this.battleOver()) {
                this.ctx2.clearRect(0, 0, 800, 600);
                this.statusGUI();
                this.ctx2.fillText("THE BATTLE IS OVER", 400, 100);
            } else if (this.currentPlayer.Base.Type === 0 && this.spellSelect) {
                this.SelectSpell();
            } else if (this.currentPlayer.Base.Type === 0 && this.enemySelect) {
                this.Action();
            } else if (this.currentPlayer.Base.Type === 0 && mouseClicked() && this.currentPlayer.currentState !== 1) {
                this.Target(time);
            } else if (this.currentPlayer.Base.Type === 1 && this.currentPlayer.currentState !== 1) {
                if (time > this.newTime) {
                    if (this.applyStatus) {
                        if (this.currentPlayer.currentState === statusEffects['poison']) {
                            this.ctx2.clearRect(0, 0, 800, 600);
                            this.statusGUI();
                            this.ctx2.fillText(this.currentPlayer.Base.ID + " suffers 5 damage from poison", 350, 100);
                            this.currentPlayer.Current.HP -= 5;
                        } else if (this.currentPlayer.currentState === statusEffects['sleep']) {
                        } else if (this.currentPlayer.currentState === statusEffects['paralyze']) {
                        }
                        this.applyStatus = false;
                        this.newTime = Date.now() + 2000;
                    } else {
                        this.ctx2.clearRect(0, 0, 800, 600);

                        //actual stat calculation
                        var targetNum = getRandomInt(0, this.battleKeys.length - 1);
                        while (battleList[targetNum].currentState === 1 || battleList[targetNum].Base.Type !== 0) {
                            targetNum = getRandomInt(0, this.battleKeys.length - 1);
                        }
                        this.target = battleList[targetNum];
                        this.playerAttack(this.currentPlayer, this.target);
                        this.statusGUI();
                        this.currentkey++;
                        this.currentPlayer = battleList[this.currentkey];
                        this.newTime = Date.now() + 2000;
                        this.applyStatus = true;
                    }
                }
            } else if (this.currentPlayer.currentState === 1) {
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
var Game;
(function (Game) {
    var Cutscene = (function (_super) {
        __extends(Cutscene, _super);
        function Cutscene(id, width, height, ctx, xmlID) {
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
            this.xmlID = xmlID;
            setStyle(this.context, 'Calibri', '16pt', 'white', 'bold', 'italic', 'left');
            this.canvasWidth = width;
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
                        this.linePos = 0;
                        this.lineHeight = 1;
                        this.lines = wrap(this.context, this.canvasWidth, this.currentNode);
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
                case "action":
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
                            sManager.pushState(new Game.Explore(this.context, 800, id));
                            break;
                        case "battle":
                            break;
                        case "dialog":
                            break;
                        default:
                            break;
                    }
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
    var Explore = (function (_super) {
        __extends(Explore, _super);
        function Explore(ctx, w, mapID) {
            _super.call(this);
            this.x = 0;
            this.y = 0;
            this.mx = 0;
            this.my = 0;
            this.velocity = 2.0;
            this.width = w;

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
            this.layer2ctx.drawImage(IMAGE_CACHE['D'], (5 * 64) + 16, (5 * 64) + 16);
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

            //battleList[0].setPos((8*64) + 16, (8*64) + 16);
            //battleList[0].render(this.layer2ctx);
            this.map = FormatTilemap(this.mapID);
            //var path = findPath(this.map, [8, 8], [6, 7]);
            //var x = 0;
        };
        Explore.prototype.update = function () {
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
                        path = findPath(this.map, [5, 5], [Math.floor(this.mx / 64), Math.floor(this.my / 64)]);
                        var keys = Object.keys(path);
                        var ctx = this.layer2ctx;
                        var x = 0;

                        //for (var x = 0; x < keys.length; x++) {
                        if (objects[i].type !== 'menu' && path !== []) {
                            var timer = setInterval(function () {
                                moveSprite(ctx, path[x][0], path[x][1]);
                                x++;
                                if (x >= (keys.length - 1)) {
                                    clearInterval(timer);
                                }
                            }, 1000 / 5);
                        }

                        //}
                        if (objects[i].type === 'exit') {
                            if (objects[i].properties.Type === '0') {
                                sManager.popState();
                                sManager.pushState(new Explore(this.layer2ctx, this.width, objects[i].properties.ID));
                            } else if (objects[i].properties.Type === '1') {
                                sManager.popState();
                                sManager.pushState(new Explore(this.layer1ctx, this.width, 'map1'));
                            }
                        } else if (objects[i].type === 'menu') {
                            sManager.pushState(new Game.StatusMenu(this.layer2ctx));
                        } else if (objects[i].type === 'cut') {
                            this.layer2ctx.clearRect(0, 0, 800, 600);
                            sManager.pushState(new Game.Cutscene("id", 800, 600, this.layer2ctx, +objects[i].properties.ID));
                        } else if (objects[i].type === 'battle') {
                            sManager.pushState(new Game.Battle(this.layer1ctx, this.layer2ctx, 0));
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

            this.context.fillStyle = "blue";
            this.context.fillRect(10, 100, 380, 100);
            this.context.fillRect(10, 225, 380, 100);
            this.context.fillRect(10, 350, 380, 100);

            this.context.strokeStyle = "#FF0000";
            this.context.strokeRect(9, 99, 382, 102);
            this.context.strokeRect(9, 224, 382, 102);
            this.context.strokeRect(9, 349, 382, 102);

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
        function Title(ctx, w) {
            _super.call(this);
            this.context = ctx;
            this.MenuItems = [];
            this.width = w;
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
                            sManager.pushState(new Game.Cutscene("id", 600, 200, this.context, 0));
                            //sManager.pushState(new Explore(this.context, this.width, 'rpg'));
                        } else if (this.MenuItems[x].name === "load") {
                            if (localStorage.getItem("TileMap") === null || localStorage.getItem("Party") === null) {
                                this.context.fillText("No saved file detected. Please start a new Game", 100, 250);
                            } else {
                                sManager.popState();
                                SAVE.load(this.width);
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
function moveSprite(context, x, y) {
    var dx = x * 64;
    var dy = y * 64;
    var cx = this.dx;
    var cy = this.dy;
    var im = new Image();
    im = this.img;
    context.clearRect(0, 0, 800, 600);
    context.drawImage(IMAGE_CACHE['D'], dx, dy);
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
function wrap(ctx, cwidth, text) {
    var templine = "";
    var lines = [];
    var child = text.childNodes;

    //figure out if the arbitrary numbers used will affect other resolutions negatively
    //mostly feature complete apart from adding more tags to the xml to grab them here to be used in
    //areas such as bg img or sounds to be called
    /*for (var i = 0; i < text.childNodes.length; i++) {
    if (child[i].nodeType === 1) { //gets only the element nodes*/
    if (ctx.measureText(text.textContent).width >= cwidth) {
        var words = text.textContent.split(' ');
        for (var key = 0; key < words.length; key++) {
            var length = templine.length;
            var word = words[key];
            templine = templine + word + ' ';
            if (ctx.measureText(templine).width >= (cwidth * 0.95)) {
                lines.push({ "name": text.nodeName, "message": templine.substring(0, length) });
                key--;
                templine = "";
            }
            /*else if (ctx.measureText(templine).width >= (cwidth * 0.70)) {
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
