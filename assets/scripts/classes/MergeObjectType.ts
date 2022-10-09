
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MergeObjectType')
export class MergeObjectType {
    @property
    type = ''

    @property({type: [Node]})
    levels = [] as Node[]
}
