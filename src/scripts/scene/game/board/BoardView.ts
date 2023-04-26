import { FILD_OFFSET, PNG, SCALE } from 'scripts/util/consts';
import CellView from '../game_cell/CellView';

export default class BoardView {
    public scene: Phaser.Scene;
    private parent: Phaser.GameObjects.Container;
    private bloks: CellView[];

    constructor(scene: Phaser.Scene, bloks: CellView[]) {
        this.bloks = bloks;
        this.scene = scene;

        const { width, height } = scene.scale;

        const x = width / 2 + FILD_OFFSET.X;
        const y = height / 2 + FILD_OFFSET.Y;

        this.parent = scene.add.container(x, y);
        this.init();
    }

    get container() {
        return this.parent;
    }

    private init() {
        const bg = this.scene.add.image(0, 0, PNG.FIELD).setOrigin(0.5).setScale(0);

        this.parent.add(bg);
        this.bloks.forEach((block) => {
            this.parent.add(block.setScale(SCALE.BLOCK));
        });

        const { width, height } = this.parent.getBounds();

        bg.setScale((width / bg.width) * 1.06, (height / bg.height) * 1.06);
    }
}
