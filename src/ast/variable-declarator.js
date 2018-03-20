// Dependencies:
import { Node } from './node';

export class VariableDeclarator extends Node {
    constructor (identifier, initialValue, loc) {
        super();
        this.id = identifier;
        this.init = initialValue;
        this.loc = loc;
    }
}
