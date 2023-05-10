import { KeyFrame, Position } from 'scripts/scene/type';
import { SPRITE } from 'scripts/util/consts';
import Phaser from 'phaser';

const skins = Object.keys(SPRITE.BLOK.FRAMES);

export default class CellView extends Phaser.GameObjects.Sprite {
    private skins: string[];
    private _skin: KeyFrame;

    constructor(scene: Phaser.Scene, { x, y }: Position) {
        super(scene, x, y, SPRITE.BLOK.NAME);

        this.scene.add.layer(this);

        this.skins = skins;

        this.changeFrame();
    }

    get skin() {
        return this._skin;
    }


    public changeFrame(): CellView {
        const key = +Phaser.Math.RND.pick(this.skins) as KeyFrame;

        const skin = SPRITE.BLOK.FRAMES[key];

        this._skin = key;

        this.setFrame(skin);

        return this;
    }
}
