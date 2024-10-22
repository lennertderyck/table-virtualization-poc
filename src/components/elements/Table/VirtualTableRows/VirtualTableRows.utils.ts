import { TableVirtualRowsProps } from "./VirtualTableRows.types";

interface TopGutterContext {
  rowHeight: number;
  scrollPosition: number;
}
export const determineTopGutterHeight = (context: TopGutterContext): TableVirtualRowsProps => {
  const position = context.scrollPosition - context.rowHeight;
  return {
    renderGutter: position >= context.rowHeight,
    gutter: position,
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
  const bottomHeight = totalHeight - viewportHeight - scrollPosition;
  return {
    renderGutter: bottomHeight - rowHeight >= rowHeight,
    gutter: bottomHeight,
  }
}