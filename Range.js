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

    //misc
    filter(callback) {
        const arr = [];
        let [element, dir] = getIteratorValues(this.start, this.end);

        for (let index = 0; index < this.length; element += dir, index++) {
            const currentVal =
                typeof this.start === 'string'
                    ? String.fromCharCode(element)
                    : element;
            if (callback(currentVal, index)) arr.push(currentVal);
        }

        return arr;
    }

    includes(value) {
        if (this.start > this.end) {
            return this.start >= value && value >= this.end;
        }
        return this.start <= value && value <= this.end;
    }
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
    return (
        1 +
        Math.abs(
            typeof start === 'string'
                ? end.charCodeAt(0) - start.charCodeAt(0)
                : end - start
        )
    );
}
function getIteratorValues(start, end) {
    return [
        typeof start === 'string' ? start.charCodeAt(0) : start,
        start < end ? 1 : -1,
    ];
}
