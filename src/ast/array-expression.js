// Dependencies:
import { Expression } from './expression';

export class ArrayExpression extends Expression {
    constructor(elements, loc) {
        super();
        this.elements = elements;
        this.loc = loc;
    }
}
