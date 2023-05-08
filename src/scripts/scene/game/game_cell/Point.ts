import { Position } from 'scripts/scene/type';

export interface ConfigPoint {
    position: Position;
}

export default class Point {
    private _config: ConfigPoint;

    constructor(config: ConfigPoint) {
        this._config = config;
    }

    get position() {
        return this._config.position;
    }

    public changeEmpty(): Point {
        return this;
    }
}
