import { KeyFrame, Position } from "scripts/scene/type"
import { SPRITE } from "scripts/util/global"
import Phaser from "phaser";

export default class CellView extends Phaser.GameObjects.Sprite {
  private skins: string[];
  private _skin: KeyFrame;
  private _id: number;

  constructor(scene: Phaser.Scene, { x, y }: Position, id: number) {
    super(scene, x, y, SPRITE.BLOK.NAME)

    this._id = id;

    this.skins = Object.keys(SPRITE.BLOK.FRAMES);

    this.changeFrame();

  }

  get skin() {
    return this._skin;
  }

  get id(): number {
    return this._id
  }

  public changeFrame() {
    const random_frame = +Phaser.Math.RND.pick(this.skins) as KeyFrame;

    this.setFrame(random_frame)
  }

}
