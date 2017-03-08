// Dependencies:
import { Expression } from './expression';

export class ArrayExpression extends Expression {
    constructor(elements, loc) {
        super('ArrayExpression');
        this.elements = elements;
        this.loc = loc;
    }
}
