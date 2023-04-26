import CellWiew from '../game_cell/CellView';
import BoardModel from './BoardModel';
import CellModel from '../game_cell/CellModel';
import { HANDLE_EVENT } from 'scripts/util/global';
import { KeyFrame } from 'scripts/scene/type';
import { MATCH, EVENT } from 'scripts/util/consts';

export default class BoardHandlerSystem {
    public scene: Phaser.Scene;
    private board: BoardModel;

    constructor(scene: Phaser.Scene, board: BoardModel) {
        this.scene = scene;

        this.board = board;

        this.init();
    }

    private init() {
        this.setInteractive();
    }

    public setInteractive() {
        this.board.sprites.forEach((sprite) => {
            sprite.setInteractive();

            sprite.on('pointerdown', () => this.handleClick(sprite));
        });
    }

    public removeInteractive() {
        this.board.sprites.forEach((sprite) => sprite.removeInteractive());
    }

    private handleClick(sprite: CellWiew) {
        const cell = this.board.getById(sprite.id);

        const match = this.checkMatch(cell);

        match
            ? HANDLE_EVENT.emit(EVENT.PUSH.MATCH, match)
            : HANDLE_EVENT.emit(EVENT.PUSH.FAIL, cell);
    }

    private checkMatch(cell: CellModel): void | CellModel[] {
        const { board, checkSkin } = this;

        const match: CellModel[] = [];

        const skin = cell.sprite.skin;

        match.push(cell);

        const check = (cell: CellModel) => {
            let { row, collumn } = cell;

            [
                board.getByMatrix(row, collumn - 1),
                board.getByMatrix(row, collumn + 1),
                board.getByMatrix(row + 1, collumn),
                board.getByMatrix(row - 1, collumn),
            ].forEach((cell) => {
                if (!cell) return;
                if (!checkSkin(skin, cell)) return;
                if (match.includes(cell)) return;

                match.push(cell);

                check(cell);
            });
        };

        check(cell);

        if (match.length < MATCH) return;

        return match;
    }

    private checkSkin(skin: KeyFrame, cell: CellModel): boolean {
        return cell.sprite.skin === skin ? true : false;
    }
}
