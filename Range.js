class Range {
    constructor(start, end) {
        if ((typeof start) !== (typeof end)) {
            throw new TypeError('Range start and end values must be same type!');
        }
        this.start = start;
        this.end = end;
    }

    map(callback) {
        const arr = [];
        const isString = (typeof this.start === 'string')
        const mapStart = (isString) ? this.start.charCodeAt(0) : this.start;
        const mapEnd = (isString) ? this.end.charCodeAt(0) : this.end;

        for (let i = mapStart; i <= mapEnd; i++) {
            const callReturn = isString
                ? callback(String.fromCharCode(i))
                : callback(i);

            if (callReturn !== undefined) arr.push(callReturn);
            if (isString && i === 90) i = 96; //jump for non-alpha chars inbetween upper and lowercase set
        }

        return arr;
    }

    reduce(callback, initial = 0) {
        if (typeof this.start === 'string') {

        }
        else {
            let acc = initial;
            for(let i = this.start; i<= this.end; i++) {
                acc = callback(acc, i);
            }
            return acc;
        }
    }
}

let myRange = new Range(1, 100);
console.log(
    myRange.map( x => {if (x%3 === 0) return x;} )
);

myRange = new Range('A', 'z');
console.log(
    myRange.map( x => { return x;} )
);

myRange = new Range(1, 5);
console.log(
    myRange.reduce( (acc, i) => { return acc + i;})
);
