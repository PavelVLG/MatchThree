import { Position } from 'scripts/scene/type';
import { SCALE, FIELD_SIZE, OFFSET_CELL } from 'scripts/util/consts';
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

        const length = positions.length - 1;

        let collumn = rows - 1;

        for (let i = length, row = collumns - 1; i >= 0; i--, row--) {
            const id = i;

            const position = positions[i] as Position;

            const configPoint: ConfigPoint = { position };

            const point = new Point(configPoint);

            const sprite = new CellWiew(scene, position);

            board.push(new CellModel({ id, collumn, row, point, sprite }));

            if (row === 0) {
                row = collumns;
                collumn--;
            }
        }

        return board;
    }

    private getConfigGrid() {
        //относительно размеров спрайта из json
        const sizeCell = {
            width: 171 * SCALE.BLOCK + OFFSET_CELL.X,
            height: 192 * SCALE.BLOCK + OFFSET_CELL.Y,
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
