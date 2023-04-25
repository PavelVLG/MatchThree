import CellWiew from "../game_cell/CellView";
import Point from "../game_cell/Point";
import { Board } from "./type"

export default class BoardModel {
  private _board: Board;

  constructor(board: Board) {
    this._board = board;
  }

  get sprites(): CellWiew[] {
    return this._board.map(cell => cell.sprite)
  }

  get points(): Point[] {
    return this._board.map(cell => cell.point)
  }

  public getById(id: number) {
    return id;
  }

  public getByCollumn(collumn: number) {
    return collumn
  }

  public getByRow(row: number) {
    return row;
  }


}
