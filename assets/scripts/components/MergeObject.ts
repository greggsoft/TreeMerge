
import { _decorator, Component, Node, log, randomRangeInt } from 'cc';
import { MergeObjectType } from '../classes/MergeObjectType';
const { ccclass, property } = _decorator;

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
                currentLevelNode.active = false
            }
            if (newLevelNode) {
                newLevelNode.active = true
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

        if (!newLevelNode) {
            return;
        }

        if (currentLevelNode) {
            currentLevelNode.active = false
        }

        newLevelNode.active = true
        
        this._level = newLevel
    }

    @property
    private _level = 1

    @property({
        type: [MergeObjectType]
    })
    types = [] as MergeObjectType[]

    start () {
       let types = this.types.map(({type}) => type)
       let randomTypeIndex = randomRangeInt(0, types.length)
       let randomType = types[randomTypeIndex]

       log('merge object selected type ' + randomType)
       this.type = randomType
       this.level = 1
    }

    equals(obj: MergeObject): boolean {
        return this.type == obj.type && this.level === obj.level
    }
}
