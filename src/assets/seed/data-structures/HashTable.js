export default {
  title: 'Hash Table',
  seed:
`class HashTable {
    constructor() {
        this.collection = {}
    }

    // methods to implement:
    // hash(key)
    // add(key, value)
    // remove(key)
    // lookup(key)
}
`,
  solution:
`/**
 * @class Hash Table data structure
 * @property {object} collection
 * @method hash @param {string} str The function that produces our hash keys
 * @method add @param {string} key @param {*} value The key value pair to add to the hash table
 * @method remove @param {string} key @returns {*} Accepts an un-hashed key, removes and returns associated value
 * @method lookup @param {string} key @returns {*} Accepts an un-hashed key, returns associated value
 */

 class HashTable {
    constructor() {
        this.collection = {}
    }

    /* we use a naive hashing function
    to demonstrate the problems that
    can arise from collision */
    hash(str) {
        let hash = 0
        str = String(str)

        for (var i in str) {
            hash += str.charCodeAt(i)
        }

        return hash
    }


    add(key, value) {
        const hash = this.hash(key)
        const currentValue = this.collection[hash]

        if (!currentValue) {
            this.collection[hash] = { key, value }
            return
        }

        // handle first instance of collision
        if (!Array.isArray(currentValue)) {
            // prevent duplicate keys (see note on line 171)
            if (key === currentValue.key) {
                return null
            }

            this.collection[hash] = [ currentValue, { key, value } ]

            return
        }

        // handle subsequent collisions
        for (let i in currentValue) {
            // prevent duplicate keys
            if (currentValue[i].key === key) {
                return null
            }
        }

        this.collection[hash] = [ ...currentValue, { key, value } ]
    }


    remove(key) {
        const hash = this.hash(key)
        const currentValue = this.collection[hash]

        if (!currentValue) {
            return null
        }

        if (!Array.isArray(currentValue)) {
            delete this.collection[hash]
            return currentValue.value
        }

        // handle collision
        let deleted
        for (let i in currentValue) {
            if (currentValue[i].key === key) {
                deleted = currentValue[i]
                currentValue.splice(i, 1)
            }
        }

        // remove bucket if 1 value left
        if (currentValue.length === 1) {
            this.collection[hash] = currentValue[0]
        }

        return deleted.value
    }


    lookup(key) {
        const hash = this.hash(key)
        const currentValue = this.collection[hash]

        if (!currentValue) {
            return null
        }

        // only one key/val pair stored at this hash key
        if (currentValue.key === key) {
            return currentValue.value
        }

        // otherwise, collision
        // iterate through bucket for match
        for (let i in currentValue) {
            if (currentValue[i].key === key) {
                return currentValue[i].value
            }
        }

        return null
    }


    print() {
        console.log(JSON.stringify(this.collection, null, 2))
    }
}

// example usage:

const table = new HashTable()

// there are several examples of collision here.
// luckily, our Hash Table can handle it!

// for example, even though the data is unique,
// these key-value pairs produce the same hash key:
table.add('Aidan Smith', '(555) 876-2344')
table.add('Aidan Smith', '(555) 234-4247')
table.add('Nadia Mihst', '(555) 934-5288')

// there are some other tricky examples here too. can you spot them?
table.add('Darin Shultz', '(555) 979-8276')
table.add('Tyler Tate', '(555) 278-4327')
table.add('Etta Tyler', '(555) 525-0384')
table.add('Daisy Harris', '(555) 634-0053')
table.add('Diana Shmit', '(555) 451-8529')
table.add('Sayid Shirra', '(555) 232-5978')
table.add('Thomas Brock', '(555) 244-9832')

table.print()

// this is a simple and efficient lookup, since there is no collision at this key
console.log("\\nlookup 'Thomas Brock': " + table.lookup('Thomas Brock'))

// this lookup is less efficient than the O(n) average
// lookup time that can usually be achieved with hash tables.
console.log("lookup 'Sayid Shirra': " + table.lookup('Sayid Shirra'))

/* since there are other elements that share the same hash this key-value
 * pair produces, our lookup function must iterate through that bucket of
 * key-value pairs until it finds a match. this is why a good hashing function
 * will strive to avoid collision as much as possible - collision defeats the
 * efficiency that makes hash tables great! can you think of a simple solution
 * for improving the hashing function to avoid this collision?
 */

// in cases of removal, our hash table is susceptible to
// the same efficiency drawbacks if collision is present:

table.remove('Aidan Smith')
table.remove('Nadia Mihst')
table.remove('Darin Shultz')

console.log("lookup 'Nadia Mihst': " + table.lookup('Nadia Mihst') + '\\n\\n')

table.print()

/* NOTE FROM LINE 41:
 * in a real phone book example, dupe keys would
 * need to be handled. It might make more sense
 * to use the phone number as the key since they
 * are guaranteed to be unique. But then that begs
 * the question, why use a hashtable at all and not
 * a regular JS object with phone numbers as keys and
 * names as values? This would provide constant lookup
 * time and be less complicated. As you can see, this
 * is just for example purposes, and a real-world hash
 * table implementation will have to make sense and be
 * justified by your particular needs and use-case.
 */
`,
  resources: [
    { href: 'http://www.geeksforgeeks.org/hashing-data-structure/', caption: 'GeeksforGeeks.org'},
    { href: 'https://beta.freecodecamp.org/en/challenges/coding-interview-data-structure-questions/create-a-hash-table', caption: 'freeCodeCamp Challenge'},
    { href: 'https://en.wikipedia.org/wiki/Hash_table', caption: 'Wikipedia'},
    { href: 'https://guide.freecodecamp.org/computer-science/data-structures/hash-tables', caption: 'freeCodeCamp Guides'},
    { href: 'https://www.cs.usfca.edu/~galles/visualization/OpenHash.html', caption: 'Interactive Animated Visualization 1'},
    { href: 'https://www.cs.usfca.edu/~galles/visualization/ClosedHash.html', caption: 'Interactive Animated Visualization 2'},
    { href: 'https://www.cs.usfca.edu/~galles/visualization/ClosedHashBucket.html', caption: 'Interactive Animated Visualization 3'},
    { href: 'https://visualgo.net/en/hashtable', caption: 'VisualAlgo.net: Better Interactive Animated Visualization!'},
  ]
}
