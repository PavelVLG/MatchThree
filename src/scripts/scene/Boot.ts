import { SCENES } from '../util/consts';
import png from 'assets/png.json';
import atlas from 'assets/atlas.json';
import SystemLoading from './boot/loading/SystemLoading';

export default class Boot extends Phaser.Scene {
    constructor() {
        super(SCENES.BOOT);
    }

    public preload() {
        new SystemLoading(this, { png, atlas });
    }
}
