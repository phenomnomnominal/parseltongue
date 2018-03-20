// Dependencies:
import { assertTranspile } from './setup';

describe('parseltongue - ', () => {
    describe('functions - ', () => {
        it('should transpile a function:', () => {
            assertTranspile(`
                sssFunc [sssA, sssB, sssC]
                    <~ sssA * sssB * sssC
            `, `
                var func = function (a, b, c) {
                    return a * b * c;
                };
            `);
        });

        it('should transpile a function within a function:', () => {
            assertTranspile(`
                sssOuter [sssA, sssB]
                    sssInner [sssC, sssD]
                        <~ sssC + sssD
                    <~ sssInner <~ [sssA, sssB]
            `, `
                var outer = function (a, b) {
                    var inner = function (c, d) {
                        return c + d;
                    };
                    return inner(a, b);
                };
            `);
        });
    });
});
