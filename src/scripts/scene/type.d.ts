import { SPRITE, STATE } from "scripts/util/consts"

type AtlasSource = {
    key: string,
    png: string,
    json: string,
}

type PngSource = {
    key: string | Phaser.Types.Loader.FileTypes.ImageFileConfig | Phaser.Types.Loader.FileTypes.ImageFileConfig[],
    path: string | string[]
}
export type SourceLoader = {
    atlas?: AtlasSource[],
    png?: PngSource[]
}

export type Position = {
    x: number,
    y: number
}

export type KeyFrame = keyof typeof SPRITE.BLOK.FRAMES;

export type TextStile = Phaser.Types.GameObjects.Text.TextStyle;
