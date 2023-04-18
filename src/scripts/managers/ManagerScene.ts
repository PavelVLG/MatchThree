import { game } from "index";
import { SCENES } from "scripts/util/global";

type Key = keyof typeof SCENES;

class ManagerScene {

  public sceneSwitch(from: Key, to: Key): ManagerScene {
    game.scene.start(SCENES[to])
    game.scene.stop(SCENES[from])

    return this
  }

  public pause(key: Key, isPause: boolean): ManagerScene {
    const manager = game.scene;
    const sceneKey = SCENES[key];

    isPause ? manager.pause(sceneKey) : manager.resume(sceneKey)

    return this
  }

}

export const managerScene = new ManagerScene();
