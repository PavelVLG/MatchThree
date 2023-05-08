import Phaser from 'phaser';
import { SPEED } from 'scripts/util/consts';
import CellView from '../game_cell/CellView';

type Target = CellView;

type ConfigAnimate = Phaser.Types.Tweens.TweenBuilderConfig;

export default class AnimateSystem {
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

    public move(target: Target, y: number) {
        const config: ConfigAnimate = {
            targets: target,
            onStart: () => target.setVisible(true),
            y,
            duration: SPEED.CELL_MOVE,
        };

        this.scene.tweens.add(config);
    }

    public matchFail(target: Target) {
        const config: ConfigAnimate = {
            targets: target,
            duration: 50,
            scale: target.scale * 0.8,
            yoyo: true,
        };

        this.scene.tweens.add(config);
    }
}
