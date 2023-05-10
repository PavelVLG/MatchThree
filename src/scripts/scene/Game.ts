import { PNG, SCENES } from '../util/consts';
import Phaser from 'phaser';
import BoardMain from './game/board/BoardMain';

export default class Game extends Phaser.Scene {
    public background: Phaser.GameObjects.Image;

    constructor() {
        super(SCENES.GAME);
    }

    public init() { }

    public create() {
        this.createGame()
    }

    private createGame() {
        const { width, height } = this.scale;

        const x = width / 2;
        const y = height / 2;

        this.background = this.add.image(x, y, PNG.BACKGRUOND);

        const game_board = new BoardMain(this);

        this.add.renderTexture(x, y, width, height)
            .draw(this.background)
            .erase(game_board.boardContainer);
    }

    public update(time: number, delta: number): void { }
}
