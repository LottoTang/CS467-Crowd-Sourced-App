// Creating the first reducer

export default function reducers(state, action){
    switch (action.type){
        case "addShoppingList":
            return [
                ...state,
                {

                }
            ]
        default:
            return state;
    }
}