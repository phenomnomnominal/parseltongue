// Dependencies:
import { assertTranspile } from './setup';

describe('parseltongue - ', () => {
    describe('arrays - ', () => {
        it('should transpile assigning a Array containing variables to a variable:', () => {
            assertTranspile(`
                sssA <~ 'a'
                sssB <~ 'b'
                sssVariable <~ [sssA, sssB]
            `, `
                var a = 'a';
                var b = 'b';
                var variable = [
                    a,
                    b
                ];
            `);
        });

        it('should transpile assigning a Array containing a binary expression to a variable:', () => {
            assertTranspile(`
                sssA <~ 3
                sssB <~ 4
                sssVariable <~ [sssA + sssB]
            `, `
                var a = 3;
                var b = 4;
                var variable = [a + b];
            `);
        });
    });
});
