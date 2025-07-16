class Item {
    static value = null;
    static key = null;
}

class HashMap {
    constructor() {
        this.loadFactor = 0.75;
        this.capacity = 2;
        this.bucket = {};
        this.size = 0;
    }

    hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }

        return hashCode % Number.MAX_SAFE_INTEGER;
    }

    set(key,value) {
        if (this.size >= Math.floor(this.capacity * this.loadFactor)) {
            this.capacity *= 2;
        }

        let hashkey = this.hash(key);
    
        if (!this.bucket[hashkey]) {
            this.bucket[hashkey] = new Item();
            this.size++;
        }
        
        this.bucket[hashkey].key = key;
        this.bucket[hashkey].value = value;
    }

    get(key) {
        let hashkey = this.hash(key);
        if (!this.bucket[hashkey]) return null;
        return this.bucket[hashkey].value;
    }

    has(key) {
        return this.bucket[this.hash(key)] ? true : false;
    }

    remove(key) {
        let hashkey = this.hash(key);
        if (this.bucket[hashkey]) {
            delete this.bucket[hashkey];
            this.size--;
            return true;
        }
        return false;
    }

    length() {
        return this.size;
    }

    clear() {
        for (let item in this.bucket) {
            delete this.bucket[item];
        }
        this.size = 0;
    }

    keys() {
        let keys = [];
        for (let item in this.bucket) {
            keys.push(this.bucket[item].key);
        }
        return keys;
    }

    values() {
        let values = [];
        for (let item in this.bucket) {
            values.push(this.bucket[item].value);
        }
        return values;
    }

    entries() {
        let entries = [];
        for (let item in this.bucket) {
            entries.push([this.bucket[item].key, this.bucket[item].value]);
        }
        return entries;
    }
}

let test = new HashMap();

test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')
test.set('moon', 'silver')

console.log(test.keys());
console.log(test.values());
console.log(test.entries());
console.log(test.get("dog"));