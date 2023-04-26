import { KeyFrame, Position } from 'scripts/scene/type';
import { SPRITE } from 'scripts/util/consts';
import Phaser from 'phaser';

const skins = Object.keys(SPRITE.BLOK.FRAMES);

export default class CellView extends Phaser.GameObjects.Sprite {
    private skins: string[];
    private _skin: KeyFrame;
    private _id: number;

    constructor(scene: Phaser.Scene, { x, y }: Position, id: number) {
        super(scene, x, y, SPRITE.BLOK.NAME);

        this._id = id;

        this.skins = skins;
        this.changeFrame();
    }

    get skin() {
        return this._skin;
    }

    get id(): number {
        return this._id;
    }

    public changeFrame() {
        const key = +Phaser.Math.RND.pick(this.skins) as KeyFrame;

        const skin = SPRITE.BLOK.FRAMES[key];

        this._skin = key;

        this.setFrame(skin);
    }
}
