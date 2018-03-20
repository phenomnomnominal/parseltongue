export function createScope (state) {
    let identifiers = {};
    if (state.currentScope) {
        identifiers = Object.assign({}, state.currentScope.identifiers);
    }
    return {
        identifiers,
        parentScope: state.currentScope
    };
}
