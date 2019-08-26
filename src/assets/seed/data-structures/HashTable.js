export default {
  title: 'Hash Table',
  seed:
`class HashTable {
    constructor() {
        this.data = {}
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
  * @class HashBucketNode
  * @property {(number|string)} value The node's value
  * @property {?Object.<Node>} next The next node
  */

class HashBucketNode {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

/**
 * @class HashBucket A simple Singly-Linked List data structure for use as our hash buckets.
 * This will allow us to implement chaining to handle collisions in our hash table.
 * @property {?Object.<Node>} head Root node of collection
 * @property {number} length The length of the list
 * @method add @param {(number|string)} value Adds node to List
 * @method remove @param {(number|string)} value @returns {?(number|string)} removed element
 * @method indexOf @param {(number|string)} value @returns {number} index of a given element
 */

class HashBucket {
    constructor() {
        this.length = 0
        this.head = null
    }


    get size() {
        return this.length
    }


    add(value) {
        const newNode = new HashBucketNode(value)
        if (!this.head) {
            this.head = newNode
        } else {
            var currentNode = this.head
            while (currentNode.next) {
                currentNode = currentNode.next
            }

            currentNode.next = newNode
        }

        this.length++
        return true
    }


    remove(value) {
        if (this.isEmpty()) {
          return null
        }

        if (this.head.value === value) {
            this.length--
            this.head = this.head.next
            return true
        }

        let currentNode = this.head, previousNode
        while (currentNode.value !== value) {
            previousNode = currentNode
            currentNode = currentNode.next
            // no match found
            if (!currentNode) {
              return null
            }
        }

        this.length--
        previousNode.next = currentNode.next
        return true
    }


    indexOf(value) {
        var count = 0
        var currentNode = this.head
        if (!currentNode) return -1

        while (value !== currentNode.value) {
            if (currentNode.next === null) {
                return -1
            }
            currentNode = currentNode.next
            count++
        }

        return count
    }
}

/**
 * @class Hash Table data structure
 * @property {object} data
 * @method hash @param {string} str The function that produces our hash keys
 * @method add @param {string} key @param {*} value The key value pair to add to the hash table
 * @method remove @param {string} key @returns {*} Accepts an un-hashed key, removes and returns associated value
 * @method lookup @param {string} key @returns {*} Accepts an un-hashed key, returns associated value
 */

class HashTable {
    // Note: HashTables often use arrays to store data, and the keys produced
    // represent array indices (which is why the concept of distribution is so
    // important when it comes to hashing functions, i.e. the hashing function
    // should produce keys that are as evenly distributed as possible across the
    // array's indices). However, in our case, we are using an object to make it
    // easier to print and visualize the structure in the console, given the wide
    // range of indices our hashing function creates.
    constructor() {
        this.data = {}
    }


    /**
     * we use a naive hashing function
     * to demonstrate collision. If you're
     * interested in good hashing functions,
     * djb2 is a good place to start. It has
     * good distribution, and is widely used.
    */
    hash(str) {
        let hash = 0
        str = String(str)

        for (var i in str) {
            hash += str.charCodeAt(i)
        }

        return hash
    }


    add(value) {
        	const key = this.hash(value)

            if (!this.data[key]) {
                const bucket = new HashBucket()
                bucket.add(value)

                this.data[key] = bucket
            }

            // handle collisions using chaining:
            // each bucket is a LinkedList. Add
            // items to end of list where bucket
            // already exists at this index.
            else {
                const bucket = this.data[key]
                bucket.add(value)
            }
    }


	remove(value) {
        const key = this.hash(value)

        if (!this.data[key]) {
            return null
        }

        return this.data[key].remove(value)
    }


	lookup(value) {
        const key = this.hash(value)

        if (!this.data[key]) {
            return null
        }

        const bucket = this.data[key]

        if (bucket.indexOf(value) > -1) {
            return key
        }

        return null
    }


	print() {
        console.log(JSON.stringify(this.data, null, 2))
    }
}

const randomWords = [
    'a',
    'airplane',
    'and',
    'approach',
    'baby',
    'basic',
    'button',
    'can',
    'case',
    'chain',
    'chaining',
    'collision',
    'collisions',
    'computer',
    'contains',
    'create',
    'created',
    'cycle',
    'data',
    'demonstrate',
    'dictionary',
    'distribution',
    'does',
    'dress',
    'explosive',
    'eyes',
    'for',
    'fruit',
    'function',
    'fungus',
    'gas',
    'good',
    'grapes',
    'guitar',
    'handling',
    'hash',
    'hashing',
    'have',
    'here',
    'hieroglyph',
    'hood',
    'hose',
    'ice',
    'ideal',
    'incomplete',
    'in',
    'insect',
    'is',
    'junk',
    'kaleidoscope',
    'knife',
    'library',
    'liquid',
    'maze',
    'monster',
    'mosquito',
    'naive',
    'necklace',
    'needle',
    'not',
    'note',
    'now',
    'obvious',
    'of',
    'onion',
    'only',
    'our',
    'parachute',
    'passport',
    'pretty',
    'produces',
    'pyramid',
    'radar',
    'rainbow',
    'reasons',
    'regular',
    'regularly',
    'rope',
    'saddle',
    'sample',
    'sentence',
    'signature',
    'since',
    'small',
    'software',
    'spellcheck',
    'spellchecker',
    'table',
    'that',
    'the',
    'this',
    'to',
    'tunnel',
    'typescript',
    'umbrella',
    'under',
    'use',
    'uses',
    'using',
    'utilize',
    'utilizes',
    'videotape',
    'vulture',
    'we',
    'web',
    'which',
    'with',
    'woman',
    'word',
    'words',
    'words',
    'worm',
    'x-ray'
]

const dictionary = new HashTable()

// populate our hash table with a small sample of random words
randomWords.forEach(word => dictionary.add(word.toLowerCase()))

// create a simplified spellcheck function
const spellcheck = (str) => {
    return str.split(' ').map(word => {
        const strippedWord = word.replace(/^[^a-zA-Z]|[^a-zA-Z]$/, '')
        const key = dictionary.lookup(strippedWord.toLowerCase())

        if (!key) {
            return '**' + word + '**'
        }

		return word
    }).join(' ')
}

const sentence = 'Here is a sentence to spellcheck using a prettty basic spellchecker which utilizes a dictionary created with our ' +
      			 'haash table under the hood. The hash table uses a naive hashing function which does not have ideal distrobution ' +
      			 'and produces colisions pretty regularly. This is good in our case since now we can demonstrate handling collisions ' +
      			 'using the chaining approach! Note, that, for obvious reasons, this dictionary is imcomplete, and only contains a ' +
      			 'small smaple of words!'

console.log(spellcheck(sentence))

console.log('\\nSome collision examples:')
console.log('dictionary.lookup("junk") = ', dictionary.lookup("junk"))
console.log('dictionary.lookup("this") = ', dictionary.lookup("this"))
console.log('dictionary.lookup("have") = ', dictionary.lookup("have"))
console.log('dictionary.lookup("hash") = ', dictionary.lookup("hash"))
console.log('dictionary.lookup("here") = ', dictionary.lookup("here"))
console.log('dictionary.lookup("rainbow") = ', dictionary.lookup("rainbow"))
console.log('dictionary.lookup("regular") = ', dictionary.lookup("regular"))

console.log('\\nOur hash table:')
console.log(dictionary.print())
`,
  resources: [
    { href: 'https://medium.com/basecs/hashing-out-hash-functions-ea5dd8beb4dd', caption: 'Hashing out Hashing Functions (BaseCS Medium Article)'},
    { href: 'https://medium.com/basecs/taking-hash-tables-off-the-shelf-139cbf4752f0', caption: 'Taking Hash Tables Off The Shelf (BaseCS Medium Article)'},
    { href: 'http://www.geeksforgeeks.org/hashing-data-structure/', caption: 'GeeksforGeeks.org'},
    { href: 'https://learn.freecodecamp.org/coding-interview-prep/data-structures/create-a-hash-table', caption: 'freeCodeCamp Challenge'},
    { href: 'https://en.wikipedia.org/wiki/Hash_table', caption: 'Wikipedia'},
    { href: 'https://guide.freecodecamp.org/computer-science/data-structures/hash-tables', caption: 'freeCodeCamp Guides'},
    { href: 'https://www.cs.usfca.edu/~galles/visualization/OpenHash.html', caption: 'Interactive Animated Visualization 1'},
    { href: 'https://www.cs.usfca.edu/~galles/visualization/ClosedHash.html', caption: 'Interactive Animated Visualization 2'},
    { href: 'https://www.cs.usfca.edu/~galles/visualization/ClosedHashBucket.html', caption: 'Interactive Animated Visualization 3'},
    { href: 'https://visualgo.net/en/hashtable', caption: 'VisualAlgo.net: Better Interactive Animated Visualization!'},
  ]
}
