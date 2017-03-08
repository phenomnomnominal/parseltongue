// Dependencies:
import { Declaration } from './declaration';

export class VariableDeclaration extends Declaration {
    constructor (declarations, loc) {
        super('VariableDeclaration');
        this.declarations = declarations;
        this.kind = 'var';
        this.loc = loc;
    }
}
