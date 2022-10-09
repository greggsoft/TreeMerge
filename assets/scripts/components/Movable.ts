
import { _decorator, Component, Node, input, Input, EventTouch, EventMouse, log } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Movable
 * DateTime = Sat Oct 01 2022 15:10:53 GMT+0500 (Yekaterinburg Standard Time)
 * Author = greggsoft
 * FileBasename = Movable.ts
 * FileBasenameNoExtension = Movable
 * URL = db://assets/Movable.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/en/
 *
 */
 
@ccclass('Movable')
export class Movable extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    start () {
        let node = this.node

        node.on(Node.EventType.TOUCH_MOVE, this.onToucnMove, this)
    }

    onToucnMove(event: EventTouch) {
        let deltaX = event.getDeltaX()
        let deltaY = event.getDeltaY()
        let pos = this.node.getPosition()

        this.node.setPosition(pos.x + deltaX, pos.y + deltaY)
    }
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
