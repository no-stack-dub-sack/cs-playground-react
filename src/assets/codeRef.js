// @flow
import { forEach, replace } from 'lodash'

import AnagramPalindrome from './seed/algorithms/AnagramPalindrome'
import BinarySearchTree from './seed/data-structures/BinarySearchTree'
import BubbleSort from './seed/algorithms/BubbleSort'
import BucketSort from './seed/algorithms/BucketSort'
import CircularDoublyLinkedList from './seed/data-structures/CircularDoublyLinkedList'
import DoublyLinkedList from './seed/data-structures/DoublyLinkedList'
import FlattenAnArray from './seed/algorithms/FlattenAnArray'
import FreeCode from './seed/FreeCode'
import GenerateCheckerboard from './seed/algorithms/GenerateCheckerboard'
import Graph from './seed/data-structures/Graph'
import HashTable from './seed/data-structures/HashTable'
import HeapSort from './seed/algorithms/HeapSort'
import InsertionSort from './seed/algorithms/InsertionSort'
import LinkedList from './seed/data-structures/LinkedList'
import LongestCommonPrefix from './seed/algorithms/LongestCommonPrefix'
import MaxHeap from './seed/data-structures/MaxHeap'
import Mergesort from './seed/algorithms/Mergesort'
import NoTwoConsecutiveChars from './seed/algorithms/NoTwoConsecutiveChars'
import PriorityQueue from './seed/data-structures/PriorityQueue'
import Queue from './seed/data-structures/Queue'
import {Quicksort} from './seed/algorithms/Quicksort'
import ReverseAString from './seed/algorithms/ReverseAString'
import ReverseVowels from './seed/algorithms/ReverseVowels'
import SelectionSort from './seed/algorithms/SelectionSort'
import SortingAlgorithmBenchmarks from './seed/algorithms/SortingBenchmarks'
import Stack from './seed/data-structures/Stack'
import SumAllPrimes from './seed/algorithms/SumAllPrimes'

// NOTE: order of arrays determines order of sidebar menu

export type Challenge = {
  title: string,
  seed: string,
  solution: string,
  resources: {
    href: string,
    caption: string
  }[]
}

export type Code = {
  SORTING_ALGOS: Challenge[],
  DATA_STRUCTURES: Challenge[],
  EASY_ALGOS: Challenge[],
  MODERATE_ALGOS: Challenge[],
  REPLS: Challenge[],
}

export const CODE: Code = {
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
    ReverseVowels,
    // IsPalindrome,
    // FizzBuzz,
  ],
  MODERATE_ALGOS: [
    LongestCommonPrefix,
    NoTwoConsecutiveChars,
    AnagramPalindrome,
    // RotateAnImage,
  ],
  REPLS: [
    FreeCode
  ]
}

type SolutionsMap = Map<string, string>

const createSolutionsRef = (CODE: Code): SolutionsMap => {
  const map: SolutionsMap = new Map()
  for (let category: string in CODE) {
    let challenges: Challenge[] = CODE[category]
    forEach(
      challenges,
      challenge => {
        if (challenge.solution) {
        map.set(
          replace(challenge.title, /\s/g, ''),
          challenge.solution
        )
      }
    })
  }
  return map
}

export const SOLUTIONS = createSolutionsRef(CODE)
