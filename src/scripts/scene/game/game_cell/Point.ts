import { Position } from 'scripts/scene/type';

export interface ConfigPoint {
    empty: boolean;
    position: Position;
}

export default class Point {
    private _config: ConfigPoint;

    constructor(config: ConfigPoint) {
        this._config = config;
    }

    get empty() {
        return this._config.empty;
    }

    get position() {
        return this._config.position;
    }

    public changeEmpty(): Point {
        this._config.empty = !this._config.empty;
        return this;
    }
}
