
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

export type TextStile = Phaser.Types.GameObjects.Text.TextStyle;
