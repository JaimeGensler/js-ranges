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

    map(callback) {
        const arr = [];
        const startVal =
            typeof this.start === 'string'
                ? this.start.charCodeAt(0)
                : this.start;
        const dir = this.start < this.end ? 1 : -1;

        for (
            let index = 0, element = startVal;
            index < this.length;
            element += dir, index++
        ) {
            const callReturn = callback(
                typeof this.start === 'string'
                    ? String.fromCharCode(element)
                    : element,
                index
            );

            if (callReturn !== undefined) arr.push(callReturn);
        }

        return arr;
    }

    reduce(callback, initial = 0) {
        let total = initial;
        const startVal =
            typeof this.start === 'string'
                ? this.start.charCodeAt(0)
                : this.start;
        const dir = this.start < this.end ? 1 : -1;

        for (
            let index = 0, element = startVal;
            index < this.length;
            element += dir, index++
        ) {
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
}

let myRange = new Range(0, 10);
console.log(
    myRange.reduce((acc, val, i) => {
        return `${acc}-${val}-${i} `;
    })
);
