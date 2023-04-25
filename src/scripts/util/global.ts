import Phaser from "phaser";

export const WIDTH = document.documentElement.clientWidth;

export const HEIGHT = (9 / 16) * WIDTH;


export const FIELD_SIZE = {
    VERTICAL: 10,
    HORIZONTAL: 10,
} as const;

export const FILD_OFFSET = {
    X: 0,
    Y: 0
} as const;

export const SCALE = {
    BLOCK: 0.4,
}
export const FPS = 10;

export const HANDLE_EVENT = new Phaser.Events.EventEmitter();


export const IS_DEBUG = process.env.NODE_ENV === 'development' ? true : false;

export const SCENES = {
    PREBOOT: "Preboot",
    BOOT: "Boot",
    GAME: "Game",
} as const;

export const EVENT = {
    LOADING: {
        PROGRESS: "loading_progress",
        COMPLETE: "loading_complete"
    },

} as const;

export const PNG = {
    BACKGRUOND: "background",
    BONUS: "bonus",
    BTN_PAUSE: "btn_pause",
    MONEY_PLATE_1: "money_1",
    FIELD: "field",
    GROUP: "group",
    RECTANGLE: "rectangle",
    MONEY_PLATE_2: {
        1: "money_2",
        2: "money_3"
    },
    LOADER: {
        1: "bar_plate",
        2: "bar",
    },
    SCORE: {
        1: "score_1",
        2: "score_2",
        3: "score_3"
    }

} as const;


export const SPRITE = {
    BLOK: {
        NAME: "block",
        FRAMES: {
            0: "1",
            1: "2",
            2: "3",
            3: "4",
            4: "5"
        }
    },
    BTN_1: {
        NAME: "btn_1",
        FRAMES: ["button_1", "button_2", "button_3"]
    },
    BTN_2: {
        NAME: "btn_2",
        FRAMES: ["button_1", "button_2", "button_3"]
    }

} as const;


