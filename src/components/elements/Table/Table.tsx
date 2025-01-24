import classNames from 'classnames';
import { useEffect, useMemo, useState } from 'react';
import styles from './Table.module.scss';
import { LayoutEvent, TableComponent } from './Table.types';
import TableBody from './TableBody/TableBody';
import TableCell from './TableCell/TableCell';
import TableHeader from './TableHeader/TableHeader';
import TableRow from './TableRow/TableRow';
import TableViewport from './TableViewport/TableViewport';
import VirtualTableRows from './VirtualTableRows/VirtualTableRows';
import { determineBottomGutterHeight, determineTopGutterHeight } from './VirtualTableRows/VirtualTableRows.utils';
import { round } from './utils/calculations';
import { getRowSelectableRule } from './utils/rows';
import { calculateVisibleRowIndexRange } from './utils/virtualization';


/**
 * TODO: calulate width, or set fixed width and notify
 */
const Table: TableComponent = ({ data, columns, columnSort, layout = 'auto', onSelectedRowsChange, selectMode }) => {
  const [scrollTop, setScrollTop] = useState<number>(0);
  const [viewportHeight, setViewportHeight] = useState<number>(1);
  const [rowHeight, setRowHeight] = useState<number>(1);
  const [selectedRowIndexes, setSelectedRowIndexes] = useState<number[]>([]);
  
  const handleViewportLayoutRender = (event: LayoutEvent) => {
    setViewportHeight(event.viewportHeight);
    setRowHeight(Math.ceil(event.rowHeight));
  }
  
  const handleRowSelection = (rowIndex: number) => {
    const isSelected = selectedRowIndexes.includes(rowIndex);
    setSelectedRowIndexes((currentSelectedRows) => {
      return isSelected
        ? currentSelectedRows.filter(selectedRowIndex => selectedRowIndex !== rowIndex)
        : [...currentSelectedRows, rowIndex]
    })
  }
  
  useEffect(() => {
    onSelectedRowsChange?.(data?.filter((_, index) => selectedRowIndexes.includes(index)) || []);
  }, [selectedRowIndexes, onSelectedRowsChange, data]);

  const showHeader = columns ? columns?.length > 0 : false;
  const headerCompensation = showHeader ? rowHeight : 0;
  const scrollPosition = round(scrollTop).to(rowHeight);
  const visibleRowIndexes = useMemo(() => calculateVisibleRowIndexRange({
    viewportHeight,
    rowHeight,
    scrollPosition,
    dataCount: data?.length || 0,
    headerHeight: headerCompensation,
  }), [data, rowHeight, scrollPosition, viewportHeight, headerCompensation]);
  
  const rowSelectionMode = useMemo(() => {
    if (selectedRowIndexes.length === 0) return null;
    else if (selectedRowIndexes.length === data?.length) return 'every';
    else return 'some';
  }, [selectedRowIndexes, data?.length])
  
  const renderedRows = data?.slice(visibleRowIndexes.start, visibleRowIndexes.end);  
  const visibleColumns = columns
    ?.filter(column => column.show !== false)
    .sort((a, b) => (a.order || 0) - (b.order || 0))
  ;
  const sortedColumnsByPinning = visibleColumns?.sort((a, b) => {
    if (b.pin === 'right') return -1;
    else return 0;
  });
  const showRowSelection = getRowSelectableRule(selectMode);
  
  const tableLayoutClassname = styles[layout];
    
  return (
    <>
      <TableViewport
        onLayout={handleViewportLayoutRender}
        onScroll={setScrollTop}
        tableClassName={classNames(styles.viewportTable, tableLayoutClassname)}
      >
        {showHeader && (
          <TableHeader 
            columns={sortedColumnsByPinning || []} 
            columnSort={columnSort}
            rowSelection={rowSelectionMode}
            selectMode={selectMode}
          />
        )}
        <TableBody>
          <VirtualTableRows
            {...determineTopGutterHeight({ rowHeight, scrollPosition })}
          />
          {renderedRows?.map((renderedItem, renderedItemIndex) => {
            /** The actual item index as it would be in the origin data list */
            const uniqueRowIndex = renderedItemIndex + visibleRowIndexes.start;
            const selected = selectedRowIndexes.includes(uniqueRowIndex);
            
            return (
              <TableRow
                {...{
                  'data-row-index': uniqueRowIndex,
                }}
                className={classNames(styles.row, selected && styles.selected)}
                style={{ height: rowHeight }}
                key={renderedItemIndex}
              >
                {showRowSelection && <TableCell
                  column={{ id: 'control', header: '', cell: () => null }}
                  columns={sortedColumnsByPinning || []}
                  isContainer={false} 
                  className={styles.cell}
                >
                  <input 
                    type="checkbox" 
                    checked={selected}
                    onChange={() => handleRowSelection(uniqueRowIndex)} 
                  />
                </TableCell>}
                {sortedColumnsByPinning?.map((column, columnIndex) => (
                  <TableCell
                    key={columnIndex}
                    columns={sortedColumnsByPinning}
                    column={column}
                    isContainer="auto"
                  >
                    {column.cell(renderedItem, uniqueRowIndex)}
                  </TableCell>
                ))}
              </TableRow>
            )
          })}
          <VirtualTableRows
            {...determineBottomGutterHeight({
              scrollPosition,
              viewportHeight,
              itemsAmount: data?.length || 0,
              rowHeight,
            })}
          />
        </TableBody>
      </TableViewport>
    </>
  )
}

export default Table;