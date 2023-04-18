import { PNG, SCENES } from '../util/global';
import Phaser from 'phaser';
import FieldController from './game/field/FieldControler';

export default class Game extends Phaser.Scene {
    public background: Phaser.GameObjects.Image;
    constructor() {
        super(SCENES.GAME);
    }

    public init() {
        const { width, height } = this.scale;
        const centerX = width / 2;
        const centerY = height / 2;
        this.background = this.add.image(centerX, centerY, PNG.BACKGRUOND);
        new FieldController(this)
    }

    public create() {
        //
    }

    public update(time: number, delta: number): void {
        //
    }


}
