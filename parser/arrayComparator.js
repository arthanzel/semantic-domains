module.exports = function arrayComparator(a1, a2) {
    const a = a1[0];
    const b = a2[0];

    if (a === undefined && b === undefined) {
        return 0;
    }
    else if (a === undefined) {
        return -1;
    }
    else if (b === undefined) {
        return 1;
    }
    else if (a === b) {
        return arrayComparator(a1.slice(1), a2.slice(1));
    }

    return a - b;
}
