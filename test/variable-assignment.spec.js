// Dependencies:
import { assertTranspile } from './setup';

describe('parseltongue - ', () => {
    describe('variable assignment - ', () => {
        it('should transpile assigning an integer to a variable:', () => {
            assertTranspile(`
                sssVariable <~ 0
            `, `
                var variable = 0;
            `);
        });

        it('should transpile assigning a double to a variable:', () => {
            assertTranspile(`
                sssVariable <~ 0.5
            `, `
                var variable = 0.5;
            `);
        });

        it('should transpile assigning a string to a variable:', () => {
            assertTranspile(`
                sssVariable <~ 'string'
            `, `
                var variable = 'string';
            `);
        });

        it('should transpile assigning a boolean to a variable:', () => {
            assertTranspile(`
                sssVariable <~ true
            `, `
                var variable = true;
            `);
        });

        it('should transpile assigning null to a variable:', () => {
            assertTranspile(`
                sssVariable <~ null
            `, `
                var variable = null;
            `);
        });

        it('should transpile assigning an Array to a variable:', () => {
            assertTranspile(`
                sssVariable <~ [0, 0.5, 'string', true, null, []]
            `, `
                var variable = [
                    0,
                    0.5,
                    'string',
                    true,
                    null,
                    []
                ];
            `);
        });

        it('should transpile assigning a nested Array to a variable:', () => {
            assertTranspile(`
                sssVariable <~ [0, 0.5, 'string', true, null, [1, 2, 3]]
            `, `
                var variable = [
                    0,
                    0.5,
                    'string',
                    true,
                    null,
                    [
                        1,
                        2,
                        3
                    ]
                ];
            `);
        });
    });

    describe('variable reassignment -', () => {
        it('should transpile assigning a value to a variable that has already been declared:', () => {
            assertTranspile(`
                sssA <~ 1
                sssA <~ 2
            `, `
                var a = 1;
                a = 2;
            `);
        });
    });
});
