///<reference path='../State.ts' />
var equippedItem = false;
module Game {
    export class EquipDetails extends State {
        equip;
        context: CanvasRenderingContext2D;
        battler: Sprite;
        equipType;
        equipName;
        e;
        mx;
        my;
        constructor(context, equip, equipName, type, battler) {
            super();
            this.context = context;
            this.equip = equip;
            this.equipType = type;
            this.battler = battler;
            this.equipName = equipName;
        }
        init() {
            quickWindow(this.context, 100, 200, 500, 300, "blue", "Red");
            quickWindow(this.context, 250, 440, 100, 50, "blue", "red");
            setStyle(this.context, 'calibre', 12, 'white');

            this.context.fillText(this.equipName, 125, 225);
            this.context.fillText(this.equip.Description, 125, 250);

            this.e = this.equip;
            this.context.fillText("HP: " + this.e.HP, 150, 270);
            this.context.fillText("MP: " + this.e.MP, 150, 290);
            this.context.fillText("Attack: " + this.e.Atk, 150, 310);
            this.context.fillText("Defense: " + this.e.Def, 150, 330);
            this.context.fillText("Speed: " + this.e.Spd, 150, 350);
            this.context.fillText("M. Defense: " + this.e.MDef, 150, 370);
            this.context.fillText("Luck: " + this.e.Luc, 150, 390);

            this.context.fillText("Physical: " + this.e.Physical, 300, 270);
            this.context.fillText("Fire: " + this.e.Fire, 300, 290);
            this.context.fillText("Ice: " + this.e.Ice, 300, 310);
            this.context.fillText("Thunder: " + this.e.Thunder, 300, 330);
            this.context.fillText("Wind: " + this.e.Wind, 300, 350);
            this.context.fillText("Earth: " + this.e.Earth, 300, 370);
            this.context.fillText("Dark: " + this.e.Dark, 300, 390);
            this.context.fillText("Light: " + this.e.Light, 300, 410);

            this.context.fillText("Poison: " + this.e.Poison, 450, 270);
            this.context.fillText("Paralysis: " + this.e.Paralysis, 450, 290);
            this.context.fillText("Sleep: " + this.e.Sleep, 450, 310);

            this.context.fillText("Equip Gear", 275, 465);
            this.context.drawImage(IMAGE_CACHE['back'], 25, 500);
        }
        update() {
            /*
                check which equiptype was passed and equip the equipment into that slot
            */
            if (mouseClicked()) {
                this.mx = mEvent.pageX;
                this.my = mEvent.pageY;
                if ((250 <= this.mx && this.mx <= 350) && (440 <= this.my && this.my <= 490)) {
                    this.battler.unequipItem(this.equipType);
                    if (this.equipType === 'Head') {
                        this.battler.equipItem(this.equipName, this.equip, 'Head');
                    }
                    else if (this.equipType === 'Body') {
                        this.battler.equipItem(this.equipName, this.equip, 'Body');
                    }
                    else if (this.equipType === 'Weapon') {
                        this.battler.equipItem(this.equipName, this.equip, 'Weapon');
                    }
                    else if (this.equipType === 'Feet') {
                        this.battler.equipItem(this.equipName, this.equip, 'Feet');
                    }
                    sManager.popState();
                }
                else if ((25 <= this.mx && this.mx <= 75) && (500 <= this.my && this.my <= 550)) {
                    sManager.popState();
                }
            }
        }
    }
}