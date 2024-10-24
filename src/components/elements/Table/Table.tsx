import classNames from 'classnames';
import { useMemo, useState } from 'react';
import styles from './Table.module.scss';
import { LayoutEvent, TableComponent } from './Table.types';
import TableBody from './TableBody/TableBody';
import TableCell from './TableCell/TableCell';
import TableHeader from './TableHeader/TableHeader';
import TableRow from './TableRow/TableRow';
import TableViewport from './TableViewport/TableViewport';
import VirtualTableRows from './VirtualTableRows/VirtualTableRows';
import { determineBottomGutterHeight, determineTopGutterHeight } from './VirtualTableRows/VirtualTableRows.utils';
import { round } from './utils/math';
import { calculateVisibleRowIndexRange } from './utils/virtualization';


/**
 * TODO: calulate width, or set fixed width and notify
 */
const Table: TableComponent = ({ data, columns, columnSort, layout = 'auto' }) => {
  const [scrollTop, setScrollTop] = useState<number>(0);
  const [viewportHeight, setViewportHeight] = useState<number>(1);
  const [rowHeight, setRowHeight] = useState<number>(1);
  
  const handleViewportLayoutRender = (event: LayoutEvent) => {
    setViewportHeight(event.viewportHeight);
    setRowHeight(Math.ceil(event.rowHeight));
  }

  const showHeader = columns ? columns?.length > 0 : false;
  const headerCompensation = showHeader ? rowHeight : 0;
  const scrollPosition = round(scrollTop).to(rowHeight);
  const visibleRowIndexes = useMemo(() => calculateVisibleRowIndexRange({
    viewportHeight,
    rowHeight,
    scrollPosition,
    dataCount: data?.length || 0,
    headerHeight: headerCompensation,
  }), [data, rowHeight, scrollPosition, viewportHeight]);
  
  const renderedRows = data?.slice(visibleRowIndexes.start, visibleRowIndexes.end);  
  const visibleColumns = columns?.filter(column => column.show !== false);
  const sortedColumnsByPinning = visibleColumns?.sort((a, b) => {
    if (b.pin === 'right') return -1;
    else return 0;
  });
  
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
          />
        )}
        <TableBody>
          <VirtualTableRows
            {...determineTopGutterHeight({ rowHeight, scrollPosition })}
          />
          {renderedRows?.map((renderedItem, renderedItemIndex) => {
            /** The actual item index as it would be in the origin data list */
            const uniqueRowIndex = renderedItemIndex + visibleRowIndexes.start;
            
            return (
              <TableRow
                {...{
                  'data-row-index': uniqueRowIndex,
                }}
                style={{ height: rowHeight }}
                key={renderedItemIndex}
              >
                {sortedColumnsByPinning?.map((column, columnIndex) => (
                  <TableCell
                    key={columnIndex}
                    columns={sortedColumnsByPinning}
                    column={column}
                    isContainer="auto"
                  >{column.cell(renderedItem, uniqueRowIndex)}</TableCell>
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