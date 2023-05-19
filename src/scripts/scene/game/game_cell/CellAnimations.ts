import Phaser from 'phaser';
import CellView from '../game_cell/CellView';
import { DURATION } from 'scripts/util/consts';

type Target = CellView;

type ConfigAnimate = Phaser.Types.Tweens.TweenBuilderConfig;

type ConfigChange = {
    target: CellView;
    x: number;
    y: number;
};

export default class CellAnimations {
    public scene: Phaser.Scene;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }

    public async matchWin(scene: Phaser.Scene, targets: Target[]) {
        const fxs = targets.map((sprite) => sprite.preFX.addGlow());

        const config: ConfigAnimate = {
            targets: [...fxs, ...targets],
            duration: 100,
            scale: 0.2,
            yoyo: true,
        };

        await new Promise((resolve) =>
            scene.tweens.add({
                ...config,
                onComplete: () => {
                    fxs.forEach((i) => i.destroy());

                    targets.forEach((target) => target.setVisible(false).changeFrame());
                    //@todo: -1000 => const
                    targets.forEach((target) => (target.y = -1000));

                    resolve(null);
                },
            })
        );
    }

    public move(target: Target, y: number): Promise<void> {

        const config: ConfigAnimate = {
            targets: target,
            onStart: () => target.setVisible(true),
            y,
            completeDelay: 200,
            ease: "Cubic.out",
            duration: DURATION.CELL_MOVE,
        };

        return new Promise((resolve) =>
            this.scene.tweens.add({ ...config, onComplete: () => resolve() })
        );
    }

    public matchFail(target: Target) {
        const config: ConfigAnimate = {
            targets: target,
            duration: DURATION.CELL_FAIL,
            scale: target.scale * 0.8,
            yoyo: true,
        };

        this.scene.tweens.add(config);
    }

    public changePositions(
        options: { fromCell: ConfigChange; toCell: ConfigChange },
        yoyo: boolean
    ) {
        const { fromCell, toCell } = options;

        const config_from: ConfigAnimate = {
            targets: fromCell.target,
            duration: DURATION.CELL_DROP,
            x: toCell.x,
            y: toCell.y,
            yoyo,
        };

        const config_to: ConfigAnimate = {
            targets: toCell.target,
            duration: DURATION.CELL_DROP,
            x: fromCell.x,
            y: fromCell.y,
            yoyo,
        };

        const from = new Promise((resolve) =>
            this.scene.tweens.add({ ...config_from, onComplete: () => resolve(null) })
        );

        const to = new Promise((resolve) =>
            this.scene.tweens.add({ ...config_to, onComplete: () => resolve(null) })
        );

        return Promise.all([from, to]);
    }
}
