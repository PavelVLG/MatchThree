import BoardModel from './BoardModel';
import BoardWiew from './BoardView';
import { Board } from './type';
import BoardCreator from './BoardCreator';
import BoardHandler from './BoardHandler';

export default class BoardMain {
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

    private createBoard(): BoardMain {
        const boardCreator = new BoardCreator(this.scene);

        this.board = boardCreator.createBoard();

        return this;
    }

    private createBoardModel(): BoardMain {
        this.boardModel = new BoardModel(this.board);

        return this;
    }

    private createBoardView(): BoardMain {
        new BoardWiew(this.scene, this.boardModel.sprites);

        return this;
    }

    private createBoardHandler(): BoardMain {
        new BoardHandler(this.scene, this.boardModel);

        return this;
    }

}
