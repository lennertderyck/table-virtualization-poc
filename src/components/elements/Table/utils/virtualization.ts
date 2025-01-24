import { TABLE_OVERSCAN } from "../Table.constants";
import { value } from "./calculations";

interface Context {
  rowHeight: number;
  scrollPosition: number;
  viewportHeight: number;
  dataCount: number;
  headerHeight: number;
}

export const calculateVisibleRowIndexRange = ({ viewportHeight, rowHeight, scrollPosition, dataCount, headerHeight}: Context) => {
  const visibleRowsAmount = Math.ceil(viewportHeight / rowHeight);
  const position = Math.floor((scrollPosition - (rowHeight * TABLE_OVERSCAN)) / rowHeight);
  const startIndex = 0 > position ? 0 : position;
      
  return {
    start: startIndex,
    end: value(startIndex + visibleRowsAmount).max(dataCount -1 || 0) + TABLE_OVERSCAN,
  }
}