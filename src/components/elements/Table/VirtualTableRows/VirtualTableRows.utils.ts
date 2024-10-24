import { TABLE_OVERSCAN } from "../Table.constants";
import { TableVirtualRowsProps } from "./VirtualTableRows.types";

interface TopGutterContext {
  rowHeight: number;
  scrollPosition: number;
}
export const determineTopGutterHeight = ({ scrollPosition, rowHeight }: TopGutterContext): TableVirtualRowsProps => {
  return {
    renderGutter: scrollPosition >= (rowHeight / TABLE_OVERSCAN),
    gutter: scrollPosition - (rowHeight * TABLE_OVERSCAN),
  }
}

interface BottomGutterContext {
  scrollPosition: number;
  viewportHeight: number;
  itemsAmount: number;
  rowHeight: number;
}
export const determineBottomGutterHeight = ({ itemsAmount, rowHeight, viewportHeight, scrollPosition }: BottomGutterContext): TableVirtualRowsProps => {
  const totalHeight = itemsAmount * rowHeight;
  const bottomOverflowHeight = totalHeight - viewportHeight - scrollPosition;
    
  return {
    renderGutter: bottomOverflowHeight - rowHeight >= rowHeight,
    gutter: bottomOverflowHeight,
  }
}