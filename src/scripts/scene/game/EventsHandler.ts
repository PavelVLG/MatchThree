import CellView from './game_cell/CellView';
import Phaser from 'phaser';
import { HANDLE_EVENT } from 'scripts/util/global';
import { EVENT } from 'scripts/util/consts';
import { MovingEvent } from '../type';

export default class EventsHandler {
    public scene: Phaser.Scene;
    private _targets: CellView[];

    private targetMove: CellView;

    constructor(scene: Phaser.Scene, cells: CellView[]) {
        this.scene = scene;
        this._targets = cells;
    }

    public initHandler() {
        this._targets.forEach((target) => {
            target
                .setInteractive()
                .on('pointerdown', (pointer: Phaser.Input.Pointer) => {
                    this.mouseDown(pointer, target);
                })
                .on('pointerup', this.mouseUp, this);
        });
    }

    public setInteractive() {
        this._targets.forEach((target) => target.setInteractive());
    }

    public removeInteractive() {
        this._targets.forEach((target) => target.removeInteractive());
    }

    private mouseDown(pointer: Phaser.Input.Pointer, target: CellView) {
        this.targetMove = target;
    }

    private mouseUp(pointer: Phaser.Input.Pointer) {
        const { downX, downY, upY, upX } = pointer;
        const delta_x = downX - upX;
        const delta_y = downY - upY;

        const isHoriontal = Math.abs(delta_x) > Math.abs(delta_y);

        const option: MovingEvent['to'] = isHoriontal
            ? delta_x > 0
                ? 'left'
                : 'rigth'
            : delta_y > 0
            ? 'up'
            : 'down';

        const event: MovingEvent = {
            target: this.targetMove,
            to: option,
        };

        HANDLE_EVENT.emit(EVENT.USER.MOVE_CELL, event);
    }
}
