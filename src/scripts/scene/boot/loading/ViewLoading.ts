import Phaser from 'phaser';

type TextStile = Phaser.Types.GameObjects.Text.TextStyle;

const style: TextStile = {
  fontFamily: 'fantasy',
  fontSize: '64px',
};

export default class ViewLoading extends Phaser.GameObjects.Container {
  public scene: Phaser.Scene;

  private _tittle: Phaser.GameObjects.Text;
  private _subtittle: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene) {
    super(scene);

    const { width, height } = scene.scale;

    this.setPosition(width / 2, height / 2);

    this.scene = scene;

    this.scene.add.existing(this);
    this.init()
  }



  public setTitle(text: string): ViewLoading {
    this._tittle.setText(text)

    return this;
  }

  public setSubtittle(text: string): ViewLoading {
    this._subtittle.setText(text)

    return this;
  }


  private init() {
    const { scene } = this;

    const y = scene.scale.height * 0.15

    this._tittle = scene.add.text(0, -y, "", style).setOrigin(0.5);

    this._subtittle = scene.add.text(0, y, "", style).setOrigin(0.5);

    this.add([this._tittle, this._subtittle])

  }

}
