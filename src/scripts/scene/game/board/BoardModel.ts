import CellView from '../game_cell/CellView';
import CellModel from '../game_cell/CellModel';
import Point from '../game_cell/Point';
import { Board } from './type';

export default class BoardModel {
    private _board: Board;

    constructor(board: Board) {
        this._board = board;
    }

    get allModel(): CellModel[] {
        return this._board;
    }

    get sprites(): CellView[] {
        return this._board.map((cell) => cell.sprite);
    }

    get points(): Point[] {
        return this._board.map((cell) => cell.point);
    }

    public getById(id: number): CellModel {
        return this._board.filter((cell) => cell.id === id).at(0);
    }

    public getCollumnAfterId(id: number): CellModel[] {
        const inCollumn = this.getByCollumn(this.getById(id).collumn);

        return inCollumn.filter((model) => model.id < id);
    }

    public getBySprite(sprite: CellView): CellModel {
        return this._board.filter((cell) => cell.sprite === sprite).at(0);
    }

    public getByCollumn(collumn: number): CellModel[] {
        return this._board.filter((cell) => cell.collumn === collumn);
    }

    public getByRow(row: number): CellModel[] {
        return this._board.filter((cell) => cell.row === row);
    }

    public getByMatrix(row: number, collumn: number): CellModel | undefined {
        return this._board.filter((cell) => cell.row === row && cell.collumn === collumn).at(0);
    }
}
