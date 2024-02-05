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

export {capitalizeTitle};