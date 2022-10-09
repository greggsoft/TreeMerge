
import { _decorator, Component, Node, Prefab } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Game
 * DateTime = Sun Oct 09 2022 22:34:42 GMT+0500 (Yekaterinburg Standard Time)
 * Author = greggsoft
 * FileBasename = Game.ts
 * FileBasenameNoExtension = Game
 * URL = db://assets/components/Game.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
 
@ccclass('GameComponent')
export class GameComponent extends Component {
    @property({
        type: Prefab
    })
    object = null as Prefab

    start () {
    }
}
