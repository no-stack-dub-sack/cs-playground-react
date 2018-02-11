import { forEach, replace } from 'lodash'

import BubbleSort from './seed/algorithms/BubbleSort'
import BucketSort from './seed/algorithms/BucketSort'
import HeapSort from './seed/algorithms/HeapSort'
import InsertionSort from './seed/algorithms/InsertionSort'
import Mergesort from './seed/algorithms/Mergesort'
import Quicksort from './seed/algorithms/Quicksort'
import SelectionSort from './seed/algorithms/SelectionSort'
import SortingAlgorithmBenchmarks from './seed/algorithms/SortingBenchmarks'

import BinarySearchTree from './seed/data-structures/BinarySearchTree'
import DoublyLinkedList from './seed/data-structures/DoublyLinkedList'
import CircularDoublyLinkedList from './seed/data-structures/CircularDoublyLinkedList'
import Graph from './seed/data-structures/Graph'
import HashTable from './seed/data-structures/HashTable'
import LinkedList from './seed/data-structures/LinkedList'
import MaxHeap from './seed/data-structures/MaxHeap'
import PriorityQueue from './seed/data-structures/PriorityQueue'
import Queue from './seed/data-structures/Queue'
import Stack from './seed/data-structures/Stack'

import AnagramPalindrome from './seed/algorithms/AnagramPalindrome'
import NoTwoConsecutiveChars from './seed/algorithms/NoTwoConsecutiveChars'
import SumAllPrimes from './seed/algorithms/SumAllPrimes'
import GenerateCheckerboard from './seed/algorithms/GenerateCheckerboard'
import FlattenAnArray from './seed/algorithms/FlattenAnArray'
import LongestCommonPrefix from './seed/algorithms/LongestCommonPrefix'
import ReverseAString from './seed/algorithms/ReverseAString'

// NOTE: order of arrays determines order of sidebar menu

export const CODE = {
  SORTING_ALGOS: [
    Quicksort,
    Mergesort,
    SelectionSort,
    InsertionSort,
    BubbleSort,
    HeapSort,
    BucketSort,
    SortingAlgorithmBenchmarks,
  ],
  DATA_STRUCTURES: [
    Stack,
    Queue,
    PriorityQueue,
    LinkedList,
    DoublyLinkedList,
    CircularDoublyLinkedList,
    BinarySearchTree,
    MaxHeap,
    HashTable,
    Graph
  ],
  EASY_ALGOS: [
    SumAllPrimes,
    GenerateCheckerboard,
    FlattenAnArray,
    ReverseAString,
    // IsPalindrome,
    // FizzBuzz,
  ],
  MODERATE_ALGOS: [
    LongestCommonPrefix,
    NoTwoConsecutiveChars,
    AnagramPalindrome,
    // RotateAnImage,
  ]
}

const createSolutionsRef = () => {
  const results = {}
  for (let category in CODE) {
    forEach(
      CODE[category],
      topic =>
      results[
        replace(topic.title, /\s/g, '')
      ] = topic.solution
    )
  }
  return results
}

export const SOLUTIONS = createSolutionsRef()
