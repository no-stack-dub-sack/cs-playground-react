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

// must retain order of sidebar menu

const CODE = [
  // sorting algorithms:
  { id: 'Quicksort', Quicksort },
  { id: 'Mergesort', Mergesort },
  { id: 'SelectionSort', SelectionSort },
  { id: 'InsertionSort', InsertionSort },
  { id: 'BubbleSort', BubbleSort },
  { id: 'HeapSort', HeapSort },
  { id: 'SortingAlgorithmBenchmarks', SortingAlgorithmBenchmarks },
  // data structures:
  { id: 'Stack', Stack },
  { id: 'Queue', Queue },
  { id: 'LinkedList', LinkedList },
  { id: 'DoublyLinkedList', DoublyLinkedList },
  { id: 'BinarySearchTree', BinarySearchTree },
  { id: 'MaxHeap', MaxHeap },
  { id: 'HashTable', HashTable },
  // other algos:
  { id: 'SumAllPrimes', SumAllPrimes },
  { id: 'NoTwoConsecutiveChars', NoTwoConsecutiveChars },
  { id: 'AnagramPalindrome', AnagramPalindrome },
];

CODE.forEach(el => {
  SnippetList.add(el.id, el[el.id]);
});

SnippetList.makeCircular();

export default SnippetList;
