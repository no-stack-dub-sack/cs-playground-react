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
import PriorityQueue from './seed/data-structures/PriorityQueue';
import Queue from './seed/data-structures/Queue';
import Stack from './seed/data-structures/Stack';

import List from '../utils/List';

const SnippetList = new List();

// order of arrays determines order of sidebar menu:

export const CODE = {
  SORTING_ALGOS: [
    { title: 'Quicksort', seed: Quicksort.seed, solution: Quicksort.solution  },
    { title: 'Mergesort', seed: Mergesort.seed, solution: Mergesort.solution  },
    { title: 'Selection Sort', seed: SelectionSort.seed, solution: SelectionSort.solution  },
    { title: 'Insertion Sort', seed: InsertionSort.seed, solution: InsertionSort.solution  },
    { title: 'Bubble Sort', seed: BubbleSort.seed, solution: BubbleSort.solution  },
    { title: 'Heap Sort', seed: HeapSort.seed, solution: HeapSort.solution  },
    { title: 'Sorting Algorithm Benchmarks', seed: SortingAlgorithmBenchmarks.seed },
  ],
  DATA_STRUCTURES: [
    { title: 'Stack', seed: Stack.seed, solution: Stack.solution  },
    { title: 'Queue', seed: Queue.seed, solution: Queue.solution  },
    { title: 'Priority Queue', seed: PriorityQueue.seed, solution: PriorityQueue.solution  },
    { title: 'Linked List', seed: LinkedList.seed, solution: LinkedList.solution  },
    { title: 'Doubly Linked List', seed: DoublyLinkedList.seed, solution: DoublyLinkedList.solution  },
    { title: 'Binary Search Tree', seed: BinarySearchTree.seed, solution: BinarySearchTree.solution  },
    { title: 'Max Heap', seed: MaxHeap.seed, solution: MaxHeap.solution  },
    { title: 'Hash Table', seed: HashTable.seed, solution: HashTable.solution  },
  ],
  EASY_ALGOS: [
    { title: 'Sum All Primes', seed: SumAllPrimes.seed, solution: SumAllPrimes.solution  },
    // { title: 'Is Palindrome', seed: IsPalindrome.seed, solution: IsPalindrome.solution  },
    // { title: 'Fizz Buzz', seed: FizzBuzz.seed, solution: FizzBuzz.solution  },
  ],
  MODERATE_ALGOS: [
    { title: 'No Two Consecutive Chars', seed: NoTwoConsecutiveChars.seed, solution: NoTwoConsecutiveChars.solution  },
    { title: 'Anagram Palindrome', seed: AnagramPalindrome.seed, solution: AnagramPalindrome.solution  },
    // { title: 'Sum Prime Factors', seed: SumPrimeFactors.seed, solution: SumPrimeFactors.solution  },
    // { title: 'Rotate An Image', seed: RotateAnImage.seed, solution: RotateAnImage.solution  },
  ]
};

for (let type in CODE) {
  CODE[type].forEach(snippet => {
    SnippetList.add(
      snippet.title.replace(/\s/g, ''),
      snippet.seed,
      snippet.solution
    );
  });
}

/** make structure circular for
circular navigation of snippets */
SnippetList.makeCircular();

export default SnippetList;
