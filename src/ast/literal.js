// Dependencies:
import { Expression } from './expression';

export class Literal extends Expression {
    constructor(value, loc) {
        super();
        this.value = value;
        this.loc = loc;
    }
}
