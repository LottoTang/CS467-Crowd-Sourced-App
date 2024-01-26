// File to handle all actions for redux

export const addItemInShoppingList = (item) => ({
    type: 'ADDING_ITEM',
    payload: item,
});