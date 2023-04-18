
type AtlasSource = {
    key: string,
    png: string,
    json: string,
}

type PngSource = {
    key: string | Phaser.Types.Loader.FileTypes.ImageFileConfig | Phaser.Types.Loader.FileTypes.ImageFileConfig[],
    path: string | string[]
}
type SourceLoader = {
    atlas?: AtlasSource[],
    png?: PngSource[]
}

