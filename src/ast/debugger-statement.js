// Dependencies:
import { Statement } from './statement';

export class DebuggerStatement extends Statement {
    constructor (loc) {
        super();
        this.loc = loc;
    }
}
