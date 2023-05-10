export default class RenderTexture extends Phaser.GameObjects.RenderTexture {
  public scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    super(scene, 0, 0, 0, 0)
  }

}
