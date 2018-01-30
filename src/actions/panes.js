import * as types from './types'
import { store } from '../index'

export const doubleClick = () => ({ type: types.DOUBLE_CLICK })

export const dragHorizontal = (el, pageX, startX, pageY, startY, resize) => {
  resize.skipX = true
  const LEFT_THRESHOLD = 30, RIGHT_THRESHOLD = 70
  if (pageX < window.innerWidth * LEFT_THRESHOLD / 100) {
    pageX = window.innerWidth * LEFT_THRESHOLD / 100
    resize.pageX = pageX
  }
  if (pageX > window.innerWidth * RIGHT_THRESHOLD / 100) {
    pageX = window.innerWidth * RIGHT_THRESHOLD / 100
    resize.pageX = pageX
  }

  let cur = pageX / window.innerWidth * 100
  if (cur < 0) {
    cur = 0
  }
  if (cur > window.innerWidth) {
    cur = window.innerWidth
  }

  const right = 100 - cur - .5
  store.dispatch({
    type: types.DRAG_HORIZONTAL,
    leftWidth: cur + "%",
    rightWidth: right + "%"
  })
}

export const dragVertical = (el, pageX, startX, pageY, startY, resize) => {
  resize.skipY = true
  const TOP_THRESHOLD = 0, BOTTOM_THRESHOLD = 100
  if (pageY < window.innerHeight * TOP_THRESHOLD / 100) {
    pageY = window.innerHeight * TOP_THRESHOLD / 100
    resize.pageY = pageY
  }
  if (pageY > window.innerHeight * BOTTOM_THRESHOLD / 100) {
    pageY = window.innerHeight * BOTTOM_THRESHOLD / 100
    resize.pageY = pageY
  }

  let cur = pageY / window.innerHeight * 100
  if (cur < 0) {
    cur = 0
  }
  if (cur > window.innerHeight) {
    cur = window.innerHeight
  }

  const bottom = 100 - cur - 1
  store.dispatch({
    type: types.DRAG_VERTICAL,
    topHeight: cur + "%",
    bottomHeight: bottom + "%"
  })
}
