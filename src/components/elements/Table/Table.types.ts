import { ReactNode } from "react";

export interface TableColumn<T = any> {
   /** @deprecated **/
  accessor?: string;
  id: string;
  header: string;
  cell: (item: T, index: number) => ReactNode;
  pin?: 'left' | 'right';
  sort?: ColumnSortDirection;
  show?: boolean;
}

export type ColumnSortDirection = 'asc' | 'desc' | null | undefined;
export interface ColumnSortRule {
  accessor: string;
  direction: ColumnSortDirection;
}

export type ColumnPinSide = 'left' | 'right' | null | undefined;
export interface ColumnPinRule {
  accessor: string;
  side: ColumnPinSide;
}

export interface TableProps<T> {
  data: T[];
  layout?: 'fixed' | 'auto';
  columns?: TableColumn<T>[];
  columnOrder?: string[];
  columnSort?: ColumnSortRule[];
  onColumnSortChange?: (rules: ColumnSortRule[]) => void;
  columnPinning?: ColumnPinRule[];
  onColumnPinningChange?: (rules: ColumnPinRule[]) => void;
  // /** @deprecated **/
  // renderItem?: (item: T, index: number) => JSX.Element;
}

export interface TableComponent {
  <T>(props: TableProps<T>): JSX.Element;
}

export interface LayoutEvent {
  viewportHeight: number;
  rowHeight: number;
}