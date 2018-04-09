// @flow
import type { DragHorizontal, DragVertical } from '../types/Actions';

export const doubleClick = () => ({ type: 'DOUBLE_CLICK' })

export const dragHorizontal = (cur: number, right: number): DragHorizontal => ({
  type: 'DRAG_HORIZONTAL',
  leftWidth: cur + "%",
  rightWidth: right + "%"
})

export const dragVertical = (cur: number, bottom: number): DragVertical => ({
  type: 'DRAG_VERTICAL',
  topHeight: cur + "%",
  bottomHeight: bottom + "%"
})
