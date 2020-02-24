class Range {
    constructor(start, end) {
        if (typeof start !== typeof end) {
            throw new TypeError('Range values must be same type!');
        } else if (
            (typeof start !== 'string' && typeof start !== 'number') ||
            (typeof start === 'number' && Math.floor(start) !== start)
        ) {
            throw new TypeError(
                'Range values must only be integers or strings!'
            );
        }
        this.start = start;
        this.end = end;
        this.length =
            1 +
            Math.abs(
                typeof start === 'string'
                    ? end.charCodeAt(0) - start.charCodeAt(0)
                    : end - start
            );
    }

    //iterators
    forEach(callback) {
        let element =
            typeof this.start === 'string'
                ? this.start.charCodeAt(0)
                : this.start;
        const dir = this.start < this.end ? 1 : -1;

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
        let element =
            typeof this.start === 'string'
                ? this.start.charCodeAt(0)
                : this.start;
        const dir = this.start < this.end ? 1 : -1;

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
        let element =
            typeof this.start === 'string'
                ? this.start.charCodeAt(0)
                : this.start;
        const dir = this.start < this.end ? 1 : -1;

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
        let element =
            typeof this.start === 'string'
                ? this.start.charCodeAt(0)
                : this.start;
        const dir = this.start < this.end ? 1 : -1;

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
    includes() {}
}

// const factorial = num => {
//     return new Range(1, num).reduce((acc, x) => {
//         return acc * x;
//     }, 1);
// };
// console.log(factorial(10));
console.log(
    new Range(1, 100).filter(x => {
        return x % 10 === 0;
    })
);
