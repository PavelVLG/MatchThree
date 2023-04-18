import FieldModel from "./FieldModel";
import size from "scripts/scene/game/config.json"
export default class FieldController {
  public scene: Phaser.Scene;
  private model: FieldModel;

  constructor(scene: Phaser.Scene) {
    this.model = new FieldModel(scene, size.field_size)
  }

}
