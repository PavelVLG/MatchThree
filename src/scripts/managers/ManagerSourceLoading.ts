import { SourceLoader } from 'scripts/scene/type';
import Phaser from 'phaser';

export default class ManagerSourceLoading {
  public scene: Phaser.Scene;
  private sources: SourceLoader;
  constructor(scene: Phaser.Scene, sources: SourceLoader) {
    this.scene = scene;
    this.sources = sources
    this.init();
  }

  private init() {
    this.loadAtlas();
    this.loadPng();
  }

  private loadPng() {
    const { png } = this.sources;

    if (!png) return;

    png.forEach(({ key, path }) => {
      this.scene.load.image(key, path);
    });
  }

  private loadAtlas() {
    const { atlas } = this.sources;

    if (!atlas) return;

    atlas.forEach(({ key, png, json }) => {
      this.scene.load.atlas(key, png, json);
    });
  }

}
