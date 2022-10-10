
import { _decorator, Component, Node, input, Input, EventTouch, EventMouse, log } from 'cc';
const { ccclass } = _decorator;

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
    start () {
        let node = this.node

        node.on(Node.EventType.TOUCH_START, this.onTouchStart, this)
        node.on(Node.EventType.TOUCH_MOVE, this.onToucnMove, this)
    }

    onTouchStart() {
        let node = this.node
        let parent = node.parent
        parent.removeChild(node)
        parent.addChild(node)
    }

    onToucnMove(event: EventTouch) {
        let delta = event.getUIDelta()
        let deltaX = delta.x
        let deltaY = delta.y
        let pos = this.node.getPosition()

        this.node.setPosition(pos.x + deltaX, pos.y + deltaY)
    }
}
