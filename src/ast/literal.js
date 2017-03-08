// Dependencies:
import { Expression } from './expression';

export class Literal extends Expression {
    constructor(value, loc) {
        super('Literal');
        this.value = value;
        this.loc = loc;
    }
}
