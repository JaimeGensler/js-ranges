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
        this.length = Math.abs(
            typeof start === 'string'
                ? end.charCodeAt(0) - start.charCodeAt(0)
                : end - start
        );
    }

    map(callback) {
        const arr = [];
        const isString = typeof this.start === 'string';
        const mapStart = isString ? this.start.charCodeAt(0) : this.start;
        const mapEnd = isString ? this.end.charCodeAt(0) : this.end;
        const dir = this.start < this.end ? 1 : -1;

        for (
            let index = 0, element = mapStart;
            index <= this.length;
            element += dir, index++
        ) {
            const callReturn = callback(
                isString ? String.fromCharCode(element) : element,
                index
            );

            if (callReturn !== undefined) arr.push(callReturn);
        }

        return arr;
    }

    reduce(callback, initial = 0) {
        if (typeof this.start === 'string') {
        } else {
            let acc = initial;
            for (let i = this.start; i <= this.end; i++) {
                acc = callback(acc, i);
            }
            return acc;
        }
    }
}

let myRange = new Range(0, -100);
console.log(
    myRange.map((x, i) => {
        return x + i;
    })
);

myRange = new Range('A', 'z');
console.log(
    myRange.map(x => {
        return x;
    })
);

myRange = new Range('a', 'z');
console.log(
    myRange.reduce((acc, i) => {
        return acc + i;
    })
);
