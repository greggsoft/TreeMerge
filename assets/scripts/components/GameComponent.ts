
import { _decorator, Component, Node, Prefab, instantiate, randomRangeInt, EventTouch } from 'cc';
import { MergeObject } from './MergeObject';
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

    @property({type: Node})
    field = null as Node

    @property({type: Node})
    objectLayer = null as Node

    get cells(): Node[] {
        return this.field.children
    }

    get trees(): Node[] {
        return this.objectLayer.children
    }

    start () {
        for (let _ = 0; _ < 3; _++) {
            this.createRandomTree()
        }
    }

    createRandomTree() {
        let emptyCells = this.cells.filter((cell) => this.isEmptyCell(cell))
        if (emptyCells.length === 0) return;
        let i = randomRangeInt(0, emptyCells.length)
        let randomEmptyCell = emptyCells[i]

        this.createTree(randomEmptyCell)
    }

    isEmptyCell(cell: Node): boolean {
        let isNotEmpty = this.getTree(cell) ?? false
        return !isNotEmpty
    }

    getTree(cell: Node): Node {
        return this.trees.find((tree) => tree.position.equals(cell.position))
    }

    createTree(cell: Node) {
        let tree = instantiate(this.object)
        tree.parent = this.objectLayer
        tree.position = cell.position

        tree.on(Node.EventType.TOUCH_END, this.onTreeTouchStart(tree), this)
    }

    onTreeTouchStart(tree: Node) {
        return (event: EventTouch) => {
            let closeCell = null as Node
            let minDistance = 0

            for (const cell of this.cells) {
                let distance = (cell.position.x - tree.position.x)**2 + (cell.position.y - tree.position.y)**2
                if (!closeCell || distance < minDistance) {
                    minDistance = distance
                    closeCell = cell
                }
            }

            let anotherTree = this.getTree(closeCell)
            if (!anotherTree || anotherTree === tree) {
                tree.position = closeCell.position
                return;
            }
            let treeMergeObject = tree.getComponent(MergeObject)
            let anotherTreeMergeObject = anotherTree.getComponent(MergeObject)

            if (treeMergeObject.equals(anotherTreeMergeObject)) {
                anotherTree.removeFromParent()
                treeMergeObject.level += 1
            } else {
                this.moveToClosestEmptyCell(anotherTree)
            }
            tree.position = closeCell.position
        }
    }

    moveToClosestEmptyCell(tree: Node) {
        let emptyCells = this.cells.filter((cell) => this.isEmptyCell(cell))
        let closeCell = null as Node
        let minDistance = 0

        for (const cell of emptyCells) {
            let distance = (cell.position.x - tree.position.x)**2 + (cell.position.y - tree.position.y)**2
            if (!closeCell || distance < minDistance) {
                closeCell = cell
                minDistance = distance
            }
        }

        if (!closeCell) return;

        tree.position = closeCell.position
    }
}
