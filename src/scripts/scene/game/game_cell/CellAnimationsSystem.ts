import CellModel from './CellModel';
import { HANDLE_EVENT } from 'scripts/util/global';
import { EVENT } from 'scripts/util/consts';
import Phaser from 'phaser';

export default class CellAnimationsSystem {
    public scene: Phaser.Scene;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        this.init();
    }

    private init() {
        //@todo: отдельно обработчик и анимации
        HANDLE_EVENT.on(EVENT.PUSH.MATCH, this.match, this);
        HANDLE_EVENT.on(EVENT.PUSH.FAIL, this.fail, this);
    }

    private match(targets: CellModel[]) {
        const cells = targets.map((model) => model.sprite);

        const config: Phaser.Types.Tweens.TweenBuilderConfig = {
            targets: cells,
            duration: 500,
            y: -700,
            ease: Phaser.Math.Easing.Back.In,
            yoyo: true,
            onComplete: () => cells.forEach((cell) => cell.changeFrame()),
        };

        this.scene.tweens.add(config);
    }

    private fail(target: CellModel) {
        this.failAnimations(target);
    }

    private failAnimations(cell: CellModel) {
        const target = cell.sprite;

        const config: Phaser.Types.Tweens.TweenBuilderConfig = {
            targets: target,
            duration: 50,
            scale: target.scale * 0.8,
            yoyo: true,
        };

        this.scene.tweens.add(config);
    }
}
