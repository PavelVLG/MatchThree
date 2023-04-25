import CellWiew from "../game_cell/CellView";
import BoardModel from "./BoardModel";


export default class BoardHandlerSystem {
  private _board: BoardModel;

  constructor(board: BoardModel) {
    this._board = board;
    this.init()
  }

  private init() {
    this.setInteractive();
  }

  public setInteractive() {
    this._board.sprites.forEach((sprite) => {

      sprite.setInteractive()

      sprite.on("pointerdown", () => this.handleClick(sprite))
    })
  }

  public removeInteractive() {
    this._board.sprites.forEach(sprite => sprite.removeInteractive())
  }

  private handleClick(sprite: CellWiew) {
    sprite.changeFrame()
  }

}
