import Phaser from 'phaser';
import { managerScene } from 'scripts/managers/ManagerScene';

import { SourceLoader } from 'scripts/scene/type';
import ViewLoading from './ViewLoading';
import ManagerSourceLoading from 'scripts/managers/ManagerSourceLoading';

export default class SystemLoading {
  private loader: ViewLoading;

  constructor(scene: Phaser.Scene, source: SourceLoader) {
    new ManagerSourceLoading(scene, source);

    this.loader = new ViewLoading(scene).setTitle("Loading").setScale(0.5)

    scene.load.on("progress", this.updateProgress, this)
    scene.load.on("complete", this.completeProgress, this)
  }

  private updateProgress(percent: number) {
    const value = Math.floor(100 * percent)

    this.loader.setSubtittle(`${value}%`)
  }

  private completeProgress() {
    managerScene.sceneSwitch("BOOT", "GAME")
  }
}
