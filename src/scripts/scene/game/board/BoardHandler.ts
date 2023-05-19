import CellView from '../game_cell/CellView';
import BoardModel from './BoardModel';
import CellModel from '../game_cell/CellModel';
import CellAnimations from '../game_cell/CellAnimations';
import EventsHandler from '../EventsHandler';
import { MovingEvent } from 'scripts/scene/type';
import { EVENT, MATCH } from 'scripts/util/consts';
import { HANDLE_EVENT } from 'scripts/util/global';

export default class BoardHandler {
    public scene: Phaser.Scene;

    private board: BoardModel;

    private animate: CellAnimations;

    private eventHandler: EventsHandler;

    constructor(scene: Phaser.Scene, board: BoardModel) {
        this.scene = scene;

        this.board = board;

        this.animate = new CellAnimations(scene);

        this.eventHandler = new EventsHandler(scene, board.sprites);

        this.init();
    }

    private init() {
        this.eventHandler.initHandler();
        HANDLE_EVENT.on(EVENT.USER.MOVE_CELL, this.handleEvent, this);
    }

    private async handleEvent({ target, to }: MovingEvent) {
        this.eventHandler.removeInteractive();

        const modelStart = this.board.getBySprite(target);

        const { row, collumn } = modelStart;

        const options: { [key in MovingEvent['to']]: [number, number] } = {
            left: [row, collumn - 1],
            rigth: [row, collumn + 1],
            up: [row - 1, collumn],
            down: [row + 1, collumn],
        };

        const modelEnd = this.board.getByMatrix(...options[to]);

        await this.handleEventModels(modelStart, modelEnd);

        await this.checkBoardMatch();

        this.eventHandler.setInteractive();
    }

    private async checkBoardMatch() {
        const result = this.board.allModel.filter((model) => this.getMatches(model));

        if (result.length < 1) return;

        await this.matchWin(result);

        await this.checkBoardMatch();
    }

    private async handleEventModels(start: CellModel, end: CellModel) {
        const optionsAnimate = {
            fromCell: {
                target: start.sprite,
                x: start.point.position.x,
                y: start.point.position.y,
            },
            toCell: {
                target: end.sprite,
                x: end.point.position.x,
                y: end.point.position.y,
            },
        };

        this.changeModelSprite(start, end);

        const matches: CellModel[] = [];

        const matchesFrom = this.getMatches(start);
        const matchesTo = this.getMatches(end);

        if (matchesFrom) matches.push(...matchesFrom);
        if (matchesTo) matches.push(...matchesTo);

        const isMatch = !!matches.length;

        if (!isMatch) this.changeModelSprite(start, end);

        await this.animate.changePositions(optionsAnimate, !isMatch);

        isMatch ? await this.matchWin(matches) : this.matchFail(start.sprite);
    }

    private getMatches(model: CellModel): CellModel[] | null {
        const {
            sprite: { skin },
            id,
            row,
            collumn,
        } = model;

        const getrMatchLine = (models: CellModel[]): null | CellModel[] => {
            let modelsResult: CellModel[] = [];

            let flag = false;

            for (let i = 0; i < models.length; i++) {
                const tempModel = models[i];

                const tempSkin = tempModel.sprite.skin;

                if (tempModel.id === id) flag = true;

                if (skin === tempSkin) {
                    modelsResult.push(tempModel);
                    continue;
                }

                if (flag) break;

                modelsResult = [];
            }

            const isMatch = MATCH <= modelsResult.length;

            return isMatch ? modelsResult : null;
        };

        const verticalLine = getrMatchLine(this.board.getByRow(row));
        const horizontalLine = getrMatchLine(this.board.getByCollumn(collumn));

        let result = [];

        if (verticalLine) result.push(...verticalLine);
        if (horizontalLine) result.push(...horizontalLine);

        return !!result.length ? Array.from(new Set(result)) : null;
    }

    private changeModelSprite(fromModel: CellModel, toModel: CellModel) {
        const { sprite: from } = fromModel;
        const { sprite: to } = toModel;

        fromModel.sprite = to;

        toModel.sprite = from;
    }

    private async matchWin(models: CellModel[]): Promise<void> {
        await this.animate.matchWin(
            this.scene,
            models.map((model) => model.sprite)
        );

        await this.cellSliding(models);
    }

    private getModelTails(models: CellModel[], sortBy: 'top' | 'bottom') {
        const sorting = (acc: CellModel, temp: CellModel): CellModel => {
            const condition = sortBy === 'top' ? acc.id > temp.id : temp.id > acc.id;

            if (condition) acc = temp;

            return acc;
        };

        return models.reduce(sorting);
    }

    private sortBycollumn(arr: CellModel[]): CellModel[][] {
        return arr
            .reduce((acc, model) => {
                acc[model.collumn]
                    ? acc[model.collumn].push(model)
                    : (acc[model.collumn] = [model]);

                return acc;
            }, [])
            .filter(Boolean);
    }

    private async cellSliding(modelsMatch: CellModel[]) {
        const sortCollumns: CellModel[][] = this.sortBycollumn(modelsMatch);

        const promises = [];

        for (let i = sortCollumns.length - 1; i >= 0; i--) {
            const match: CellModel[] = sortCollumns[i];

            const bottomMatch: CellModel = this.getModelTails(match, 'bottom');

            const collumn: CellModel[] = this.board
                .getCollumnAfterId(bottomMatch.id)
                .filter((model) => !match.includes(model));

            const matchSprites = match.map(({ sprite }) => sprite);

            const otherSprites = collumn.map(({ sprite }) => sprite);

            const newQueue = [...match, ...collumn].sort((a, b) => b.id - a.id);

            for (let i = 0, j = newQueue.length - 1; i < newQueue.length; i++, j--) {
                const model = newQueue[i];

                const sprite = otherSprites[i] ? otherSprites[i] : matchSprites[j];

                model.sprite = sprite;

                const promise = this.animate.move(sprite, model.point.position.y);

                promises.push(promise);
            }
        }

        await Promise.all(promises);
    }

    private matchFail(cell: CellView): void {
        this.animate.matchFail(cell);
    }
}
