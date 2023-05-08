import BoardCreateSystem from './BoardCreateSystem';
import BoardModel from './BoardModel';
import BoardWiew from './BoardView';
import BoardHandlerSystem from './BoardHandlerSystem';
import { Board } from './type';

export default class BoardEntity {
    public scene: Phaser.Scene;

    private board: Board;

    private boardModel: BoardModel;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
        this.init();
    }

    private init() {
        this.createBoard();
        this.createBoardModel();
        this.createBoardView();
        this.createBoardHandler();
    }

    private createBoard(): BoardEntity {
        const boardCreator = new BoardCreateSystem(this.scene);

        this.board = boardCreator.createBoard();

        return this;
    }

    private createBoardModel(): BoardEntity {
        this.boardModel = new BoardModel(this.board);

        return this;
    }

    private createBoardView(): BoardEntity {
        new BoardWiew(this.scene, this.boardModel.sprites);

        return this;
    }

    private createBoardHandler(): BoardEntity {
        new BoardHandlerSystem(this.scene, this.boardModel);

        return this;
    }
}
