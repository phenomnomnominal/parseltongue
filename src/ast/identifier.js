// Dependencies:
import { Expression } from './expression';

export class Identifier extends Expression {
    constructor (name, loc) {
        super ('Identifier');
        this.name = name;
        this.loc = loc;
    }
}
