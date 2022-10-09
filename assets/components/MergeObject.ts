
import { _decorator, Component, Node, log } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MergeObjectType')
class MergeObjectType {
    @property
    type = ''

    @property({type: [Node]})
    levels = []
}

/**
 * Predefined variables
 * Name = MergeObject
 * DateTime = Mon Oct 03 2022 06:58:10 GMT+0500 (Yekaterinburg Standard Time)
 * Author = greggsoft
 * FileBasename = MergeObject.ts
 * FileBasenameNoExtension = MergeObject
 * URL = db://assets/components/MergeObject.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
@ccclass('MergeObject')
export class MergeObject extends Component {
    @property
    get type() {
        return this._type;
    }

    set type(newTypeName) {
        let currentType = this.types.find(({type}) => type === this._type)
        let nextType = this.types.find(({type}) => type === newTypeName)
        let currentLevelNode = currentType?.levels[this.level - 1]
        let newLevelNode = nextType?.levels[this.level - 1]

        if (nextType) {
            if (currentLevelNode) {
                currentLevelNode.enabled = false
            }
            if (newLevelNode) {
                newLevelNode.enabled = true
            }
            this._type = newTypeName
        }
    }

    @property
    private _type = ''

    @property({step: 1})
    get level() {
        return this._level
    }

    set level(newLevel) {
        let type = this.types.find(({type}) => type === this.type)
        let currentLevelNode = type?.levels[this._level - 1]
        let newLevelNode = type?.levels[newLevel - 1]

        if (currentLevelNode) {
            currentLevelNode.active = false
        }

        if (newLevelNode) {
            newLevelNode.active = true
        }

        this._level = newLevel
    }

    @property
    private _level = 1

    @property
    types: [MergeObjectType] 

    start () {
        // [3]
    }

    // update (deltaTime: number) {
    //     // [4]
    // }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.4/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.4/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.4/manual/en/scripting/life-cycle-callbacks.html
 */

