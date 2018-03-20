// Dependencies:
import { assertTranspile } from './setup';

describe('parseltongue - ', () => {
    describe('conditionals - ', () => {
        it('should transpile a simple if statement:', () => {
            assertTranspile(`
                ss true
                    sssCast <~ []
            `, `
                if (true) {
                    alert();
                }
            `);
        });

        it('should transpile an if-else statement', () => {
            assertTranspile(`
                ss true
                    sssCast <~ []
                ssss
                    sssCast <~ []
            `, `
                if (true) {
                    alert();
                } else {
                    alert();
                }
            `);
        });

        it('should transpile an if-elseif-else statement', () => {
            assertTranspile(`
                ss true
                    sssCast <~ []
                ssssss false
                    sssCast <~ []
                ssss
                    sssCast <~ []
            `, `
                if (true) {
                    alert();
                } else if (false) {
                    alert();
                } else {
                    alert();
                }
            `);
        });
    });
});
