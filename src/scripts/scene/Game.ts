import { PNG, SCENES } from '../util/consts';
import Phaser from 'phaser';
import BoardEntity from './game/board/BoardEntity';

export default class Game extends Phaser.Scene {
    public background: Phaser.GameObjects.Image;
    constructor() {
        super(SCENES.GAME);
    }

    public init() {
        const { width, height } = this.scale;

        this.addBackground(width / 2, height / 2);
    }

    public create() {
        new BoardEntity(this);
    }

    private addBackground(x: number, y: number) {
        this.background = this.add.image(x, y, PNG.BACKGRUOND);
    }

    public update(time: number, delta: number): void {}
}
