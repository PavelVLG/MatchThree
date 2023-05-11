import CellView from '../game_cell/CellView';
import BoardModel from './BoardModel';
import CellModel from '../game_cell/CellModel';
import CellAnimations from '../game_cell/CellAnimations';
import { KeyFrame } from 'scripts/scene/type';
import { MATCH } from 'scripts/util/consts';

export default class BoardHandler {
    public scene: Phaser.Scene;

    private board: BoardModel;
    private animate: CellAnimations;

    constructor(scene: Phaser.Scene, board: BoardModel) {
        this.scene = scene;

        this.board = board;

        this.animate = new CellAnimations(scene);

        this.init();
    }

    private init() {
        this.board.sprites.forEach((sprite) => {
            sprite.setInteractive();

            sprite.on('pointerdown', () => this.handleClick(sprite));
        });
    }

    private setInteractive(): void {
        this.board.sprites.forEach((sprite) => sprite.setInteractive());
    }

    private setDisInteractive(): void {
        this.board.sprites.forEach((sprite) => sprite.disableInteractive());
    }

    private handleClick(sprite: CellView): void {
        const cell = this.board.getBySprite(sprite);

        const models = this.checkMatch(cell);

        models ? this.matchWin(models) : this.matchFail(sprite);
    }

    private async matchWin(models: CellModel[]): Promise<void> {
        this.setDisInteractive();

        await this.animate.matchWin(
            this.scene,
            models.map((model) => model.sprite)
        );

        await this.setOffset(models);

        this.setInteractive();
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

    private async setOffset(modelsMatch: CellModel[]) {
        const sortCollumns: CellModel[][] = this.sortBycollumn(modelsMatch);

        const promises = [];

        const partentContainer = modelsMatch.at(0).sprite.parentContainer;

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

                promises.push(promise)

            }


            newQueue.forEach(({ sprite }) => partentContainer.bringToTop(sprite));
        }

        await Promise.all(promises);
    }

    private matchFail(cell: CellView): void {
        this.animate.matchFail(cell);
    }

    private checkMatch(cell: CellModel): void | CellModel[] {
        const { board, checkSkin } = this;

        const match: CellModel[] = [];

        const skin = cell.sprite.skin;

        match.push(cell);

        const check = (cell: CellModel) => {
            let { row, collumn } = cell;

            [
                board.getByMatrix(row, collumn - 1),
                board.getByMatrix(row, collumn + 1),
                board.getByMatrix(row + 1, collumn),
                board.getByMatrix(row - 1, collumn),
            ].forEach((cell) => {
                if (!cell) return;

                if (!checkSkin(skin, cell)) return;

                if (match.includes(cell)) return;

                match.push(cell);

                check(cell);
            });
        };

        check(cell);

        if (match.length < MATCH) return;

        return match;
    }

    private checkSkin(skin: KeyFrame, cell: CellModel): boolean {
        return cell.sprite.skin === skin ? true : false;
    }
}
