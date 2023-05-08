import CellView from './CellView';
import Point from './Point';

interface CellConfig {
    id: number;
    collumn: number;
    row: number;
    point: Point;
    sprite: CellView | null;
}

export default class CellModel implements CellConfig {
    id: number;
    collumn: number;
    row: number;
    point: Point;
    sprite: CellView;

    constructor({ id, collumn, row, point, sprite }: CellConfig) {
        this.id = id;
        this.collumn = collumn;
        this.row = row;
        this.point = point;
        this.sprite = sprite;
    }
}
