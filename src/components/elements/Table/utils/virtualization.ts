import { round, value } from "./math";

interface Context {
  rowHeight: number;
  scrollPosition: number;
  viewportHeight: number;
  dataCount: number;
}
/**
 * @deprecated Not performant.
 */
export const itemCanRender = (index: number, { rowHeight, scrollPosition, viewportHeight }: Context) => {
  const distanceToItemTop = round(index * rowHeight).to(rowHeight);
  const distanceToItemBottom = distanceToItemTop + rowHeight;
  
  const isHiddenAtTop = distanceToItemTop < scrollPosition && distanceToItemBottom < scrollPosition;
  const isHiddenAtBottom = distanceToItemTop > (scrollPosition + rowHeight) + viewportHeight && distanceToItemBottom > (scrollPosition) + viewportHeight;
  const isNotInView = isHiddenAtTop || isHiddenAtBottom;
  
  return !isNotInView;
}

export const calculateVisibleRowIndexes = ({ viewportHeight, rowHeight, scrollPosition, dataCount}: Context) => {
  const visibleRowsAmount = Math.ceil(viewportHeight / rowHeight);
  const start = (scrollPosition) / rowHeight;
  
  return {
    start,
    end: value(start + visibleRowsAmount).max(dataCount -1 || 0),
  }
}