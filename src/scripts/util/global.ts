import Phaser from "phaser";

export const WIDTH = document.documentElement.clientWidth;

export const HEIGHT = (9 / 16) * WIDTH;

export const FPS = 10;

export const HANDLE_EVENT = new Phaser.Events.EventEmitter();


export const IS_DEBUG = process.env.NODE_ENV === 'development' ? true : false;



