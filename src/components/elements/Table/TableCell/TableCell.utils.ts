import { ColumnPinSide, TableColumn } from "../Table.types";

/** Returns relevant sibling cell properties of the given element */
const getSiblingCellProperties = (element: Element | null) => {
  if (!element) return null;
  
  const cell = element as HTMLTableCellElement
  return {
    element: cell,
    index: cell?.cellIndex,
    width: cell?.offsetWidth,
  }
}

export const getCurrentCellProperties = (element: HTMLTableCellElement) => {
  const currentColumnIndex = element.cellIndex;
  
  return {
    index: currentColumnIndex,
    previousCell: getSiblingCellProperties(element.previousElementSibling),
    nextCell: getSiblingCellProperties(element.nextElementSibling),
  }
}

/** Applies the needed styles to make a table data cell sticky */
export const makeCellSticky = (element: HTMLTableCellElement, side: NonNullable<ColumnPinSide>, offset: number) => {
  element.style.position = 'sticky';
  element.style[side] = `${offset}px`;
  element.style.zIndex = '2';
}

interface ColumnsContext {
  column: TableColumn;
  columns: TableColumn[];
}
export const calculateCellPinning = (columnsContext: ColumnsContext) => (reference: HTMLTableCellElement | null) => {
  if (!!columnsContext.column.pin && reference) {
    const currentCell = getCurrentCellProperties(reference);
    const referenceCell = columnsContext.column.pin === 'left' ? currentCell.previousCell : currentCell.nextCell;
    const previousCellWasPinned = referenceCell ? !!columnsContext.columns[referenceCell.index]?.pin : false;
    const offset = previousCellWasPinned && referenceCell ? referenceCell.width : 0;
    makeCellSticky(reference, columnsContext.column.pin, offset);
  }
}