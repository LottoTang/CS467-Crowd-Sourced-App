function capitalizeTitle(title) {
// capitalize the first letter of each word in the title
    const words = title.split(" ");

    let capitalized_title = ''
    for (const word of words) {
        const letter = word[0].toUpperCase()
        capitalized_title = capitalized_title.concat(letter, word.slice(1, word.length), " ")
    };

    return capitalized_title
};

function removeItemFromArray(item, array) {
    const idx = array.indexOf(item);

    if (idx == -1) return [item]

    const new_array = array.slice();
    new_array.splice(idx, 1);
    return new_array
};


export {capitalizeTitle, removeItemFromArray};