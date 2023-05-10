import { Position } from 'scripts/scene/type';
import { SCALE, FIELD_SIZE } from 'scripts/util/consts';
import { createPointsGrid } from 'scripts/util/extra';
import { ConfigPoint } from '../game_cell/Point';
import Point from '../game_cell/Point';
import CellModel from '../game_cell/CellModel';
import CellWiew from '../game_cell/CellView';
import { Board } from './type';

export default class BoardCreator {
    public scene: Phaser.Scene;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }

    public createBoard(): Board {
        const { scene } = this;

        const configGrid = this.getConfigGrid();

        const { rows, collumns } = configGrid;

        const board = [];

        const positions = createPointsGrid(configGrid);

        let temp_collumn = collumns - 1;

        const length = positions.length - 1;

        for (let i = length; i >= 0; i--) {
            const id = i;

            let row = i % rows;

            const position = positions[i] as Position;

            const collumn = temp_collumn;

            if (row === 0) temp_collumn--;

            const configPoint: ConfigPoint = { position };

            const point = new Point(configPoint);

            const sprite = new CellWiew(scene, position);

            board.push(new CellModel({ id, collumn, row, point, sprite }));
        }
        return board;
    }

    private getConfigGrid() {
        //особеннось ассета
        const offset_h = 5;

        //относительно размеров спрайта из json
        const sizeCell = {
            width: 171 * SCALE.BLOCK,
            height: 192 * SCALE.BLOCK - offset_h,
        };

        const configGrid = {
            rows: FIELD_SIZE.HORIZONTAL,
            collumns: FIELD_SIZE.VERTICAL,
            widthCell: sizeCell.width,
            heightCell: sizeCell.height,
        };

        return configGrid;
    }
}
