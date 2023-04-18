import Phaser from "phaser";

type Size = {
  vertical: number,
  horizontal: number
}
export default class FieldModel {
  public scene: Phaser.Scene;
  private size: Size;
  constructor(scene: Phaser.Scene, size: Size) {
    this.scene = scene;
    this.size = size;
    this.init()
  }

  private init() {
    const { horizontal, vertical } = this.size;

    console.log(horizontal, vertical)
  }
}
