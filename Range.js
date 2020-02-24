class Range {
    constructor(start, end) {
        typeCheck(start, end);

        this.start = start;
        this.end = end;
        this.length = getLength(start, end);
    }

    //iterators
    forEach(callback) {
        let [element, dir] = getIteratorValues(this.start, this.end);

        for (let index = 0; index < this.length; element += dir, index++) {
            callback(
                typeof this.start === 'string'
                    ? String.fromCharCode(element)
                    : element,
                index
            );
        }
    }

    map(callback) {
        const arr = [];
        let [element, dir] = getIteratorValues(this.start, this.end);

        for (let index = 0; index < this.length; element += dir, index++) {
            const callReturn = callback(
                typeof this.start === 'string'
                    ? String.fromCharCode(element)
                    : element,
                index
            );
            arr.push(callReturn);
        }

        return arr;
    }

    reduce(callback, initial = 0) {
        let total = initial;
        let [element, dir] = getIteratorValues(this.start, this.end);

        for (let index = 0; index < this.length; element += dir, index++) {
            total = callback(
                total,
                typeof this.start === 'string'
                    ? String.fromCharCode(element)
                    : element,
                index
            );
        }

        return total;
    }

    filter(callback) {
        const arr = [];
        let [element, dir] = getIteratorValues(this.start, this.end);

        for (let index = 0; index < this.length; element += dir, index++) {
            const callReturn = callback(
                typeof this.start === 'string'
                    ? String.fromCharCode(element)
                    : element,
                index
            );
            if (callReturn) arr.push(element);
        }

        return arr;
    }

    //misc
    // includes() {}
}

function typeCheck(start, end) {
    if (typeof start !== typeof end) {
        throw new TypeError('Range values must be same type');
    } else if (
        (typeof start !== 'string' && typeof start !== 'number') ||
        (typeof start === 'number' &&
            (Math.floor(start) !== start || Math.floor(end) !== end))
    ) {
        throw new TypeError('Range values must only be integers or strings');
    }
}
function getLength(start, end) {
    let isString = typeof start === 'string';
    return (
        1 +
        Math.abs(
            isString ? end.charCodeAt(0) - start.charCodeAt(0) : end - start
        )
    );
}
function getIteratorValues(start, end) {
    return [
        typeof start === 'string' ? start.charCodeAt(0) : start,
        start < end ? 1 : -1,
    ];
}

// const factorial = num => {
//     return new Range(1, num).reduce((acc, x) => {
//         return acc * x;
//     }, 1);
// };
// console.log(factorial(10));
// console.log(new Range(1, 100).filter(x => x % 10 === 0));
