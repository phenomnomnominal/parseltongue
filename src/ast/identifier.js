// Dependencies:
import { Expression } from './expression';

export class Identifier extends Expression {
    constructor (name, loc) {
        super();
        this.name = name;
        this.loc = loc;
    }
}
