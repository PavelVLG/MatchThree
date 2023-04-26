import Phaser from 'phaser';
import { PNG } from 'scripts/util/consts';

type TextStile = Phaser.Types.GameObjects.Text.TextStyle;

const style: TextStile = {
    fontFamily: 'fantasy',
    fontSize: '64px',
};

export default class SourceLoaderView extends Phaser.GameObjects.Container {
    public scene: Phaser.Scene;
    private tittle: Phaser.GameObjects.Text;
    private _plate: Phaser.GameObjects.Image;
    private _bar: Phaser.GameObjects.Image;
    private _background: Phaser.GameObjects.Image;
    constructor(scene: Phaser.Scene) {
        super(scene);

        const { width, height } = scene.scale;

        this.setPosition(width / 2, height / 2);

        this.scene = scene;

        this.scene.add.existing(this);
        this.init();
    }

    public setTitle(text: string): SourceLoaderView {
        this.tittle.setText(text);
        return this;
    }

    get plate() {
        return this._plate;
    }

    get bar() {
        return this._bar;
    }

    private init() {
        const { scene } = this;

        this._background = scene.add.image(0, 0, PNG.RECTANGLE).setOrigin(0.5);
        const y = this._background.height * 0.2;

        this.tittle = scene.add.text(0, -y, '', style).setOrigin(0.5);
        this._plate = scene.add.image(0, y, PNG.LOADER[1]).setOrigin(0.5);
        this._bar = scene.add.image(0, y, PNG.LOADER[2]).setOrigin(0.5);

        this.add([this._background, this.tittle, this._plate, this._bar]);
    }
}
