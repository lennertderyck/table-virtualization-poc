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
import { round, value } from './utils/math';
import { calculateVisibleRowIndexes } from './utils/virtualization';

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

  const visibleColumns = columns?.filter(column => column.show !== false);
  const sortedColumnsByPinning = visibleColumns?.sort((a, b) => {
    if (b.pin === 'right') return -1;
    else return 0;
  });

  const showHeader = columns ? columns?.length > 0 : false;
  const headerCompensation = showHeader ? rowHeight : 0;
  const scrollPosition = round(scrollTop).to(rowHeight) - headerCompensation;
  const visibleRowIndexes = useMemo(() => calculateVisibleRowIndexes({
    viewportHeight,
    rowHeight,
    scrollPosition,
    dataCount: data?.length || 0,
  }), [data, rowHeight, scrollPosition, viewportHeight]);
  
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
          {data?.map((item, itemIndex) => {
            const rowInViewPort = value(itemIndex).isBetween( visibleRowIndexes.start, visibleRowIndexes.end);
            if (!rowInViewPort) return null;
            return (
              <TableRow
                {...{
                  'data-row-index': itemIndex,
                }}
                style={{ height: rowHeight }}
                key={itemIndex}
              >
                {sortedColumnsByPinning?.map((column, columnIndex) => (
                  <TableCell
                    key={columnIndex}
                    columns={sortedColumnsByPinning}
                    column={column}
                    isContainer="auto"
                  >{column.cell(item, itemIndex)}</TableCell>
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