import AnagramPalindrome from './seed/algorithms/AnagramPalindrome';
import BubbleSort from './seed/algorithms/BubbleSort';
import HeapSort from './seed/algorithms/HeapSort';
import InsertionSort from './seed/algorithms/InsertionSort';
import Mergesort from './seed/algorithms/Mergesort';
import NoTwoConsecutiveChars from './seed/algorithms/NoTwoConsecutiveChars';
import Quicksort from './seed/algorithms/Quicksort';
import SelectionSort from './seed/algorithms/SelectionSort';
import SortingAlgorithmBenchmarks from './seed/algorithms/SortingBenchmarks';
import SumAllPrimes from './seed/algorithms/SumAllPrimes';

import BinarySearchTree from './seed/data-structures/BinarySearchTree';
import DoublyLinkedList from './seed/data-structures/DoublyLinkedList';
import HashTable from './seed/data-structures/HashTable';
import LinkedList from './seed/data-structures/LinkedList';
import MaxHeap from './seed/data-structures/MaxHeap';
import Queue from './seed/data-structures/Queue';
import Stack from './seed/data-structures/Stack';

import List from '../utils/List';

const SnippetList = new List();

// order of arrays determines order of sidebar menu:

export const CODE = {
  SORTING_ALGOS: [
    { title: 'Quicksort', Quicksort },
    { title: 'Mergesort', Mergesort },
    { title: 'Selection Sort', SelectionSort },
    { title: 'Insertion Sort', InsertionSort },
    { title: 'Bubble Sort', BubbleSort },
    { title: 'Heap Sort', HeapSort },
    { title: 'Sorting Algorithm Benchmarks', SortingAlgorithmBenchmarks },
  ],
  DATA_STRUCTURES: [
    { title: 'Stack', Stack },
    { title: 'Queue', Queue },
    { title: 'Linked List', LinkedList },
    { title: 'Doubly Linked List', DoublyLinkedList },
    { title: 'Binary Search Tree', BinarySearchTree },
    { title: 'Max Heap', MaxHeap },
    { title: 'Hash Table', HashTable },
  ],
  EASY_ALGOS: [
    { title: 'Sum All Primes', SumAllPrimes },
    // { title: 'Is Palindrome', IsPalindrome },
    // { title: 'Fizz Buzz', FizzBuzz },
  ],
  MODERATE_ALGOS: [
    { title: 'No Two Consecutive Chars', NoTwoConsecutiveChars },
    { title: 'Anagram Palindrome', AnagramPalindrome },
    // { title: 'Sum Prime Factors', SumPrimeFactors },
    // { title: 'Rotate An Image', RotateAnImage },
  ]
};

for (let type in CODE) {
  CODE[type].forEach(snippet => {
    let id = snippet.title.replace(/\s/g, '');
    SnippetList.add(id, snippet[id]);
  });
}

/** make structure circular for
circular navigation of snippets */
SnippetList.makeCircular();

export default SnippetList;
