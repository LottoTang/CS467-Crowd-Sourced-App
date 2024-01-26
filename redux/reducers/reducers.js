// Creating the first reducer

export default function shoppingReducer(state, action){
    switch (action.type){
        case "shoppingList/add_item":
            return [
                ...state,
                {

                }
            ]
        default:
            return state;
    }
}