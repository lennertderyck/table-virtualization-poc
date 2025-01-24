import classNames from 'classnames';
import { FC } from 'react';
import Icon from '../../../basics/Icon/Icon';
import { ColumnPinRule, ColumnSortDirection, ColumnSortRule, RowSelectionMode, TableColumn } from '../Table.types';
import TableCell from '../TableCell/TableCell';
import TableRow from '../TableRow/TableRow';
import { getColumnSortRule, getColumnSortRuleIcon, switchColumbSortDirection } from '../utils/columns';
import { getRowSelectableRule } from '../utils/rows';
import styles from './TableHeader.module.scss';

interface Props {
  columns: TableColumn[];
  columnSort?: ColumnSortRule[];
  onColumnSort?: (accessor: string, direction: ColumnSortDirection) => void;
  columnPinning?: ColumnPinRule[];
  onColumnPinning?: (accessor: string, side: ColumnPinRule) => void;
  rowSelection?: 'every' | 'some' | null;
  onRowSelectionChange?: (selection: 'every' | 'some' | null) => void;
  selectMode?: RowSelectionMode;
};

const TableHeader: FC<Props> = ({ columns, columnSort, onColumnSort, rowSelection, selectMode }) => {
  const bindColumnSort = (column: TableColumn, currentDirection: ColumnSortDirection) => () => {
    if (column?.id) {
      onColumnSort?.(
        column?.id, 
        switchColumbSortDirection(currentDirection)
      );
    } else console.warn('Column accessor is missing');
  }
  
  const sortedColumns = columns;
  const columnsMeta = sortedColumns.map((column) => ({
    sortDirection: column.accessor && columnSort ? getColumnSortRule(columnSort, column.accessor) : null,
  }))
  const showRowSelection = getRowSelectableRule(selectMode);
  
  return (
    <thead className={styles.tableHead}>
      <TableRow>
        {showRowSelection && <TableCell
          column={{ id: 'select', header: '', cell: () => null }}
          columns={columns}
          element="th" 
          isContainer={false} 
          className={styles.cell}
        ><input 
          type="checkbox" 
          checked={rowSelection === 'every'}
          onChange={() => console.log('select all')}
          ref={ref => {
            if (ref) {
              if (rowSelection === 'some') {
                ref.indeterminate = true;
              } else {
                ref.indeterminate = false;
              }
            }
          }}
        /></TableCell>}
        { sortedColumns?.map((column, index) => {
          const columnMeta = columnsMeta[index];
          const isSorting = !!columnMeta?.sortDirection?.direction;
          
          return (
            <TableCell 
              element="th" 
              isContainer={false}
              key={index} 
              columns={columns}
              column={column}
              className={styles.cell}
            >
              <div className={styles.inner}>
                <span>{column.header}</span>
                <button>
                  <Icon name="more-2-line" />
                </button>
                {!column.sort 
                  ? null
                  : <button
                    className={classNames(styles.action, isSorting && styles.active)} 
                    onClick={bindColumnSort(column, columnMeta?.sortDirection?.direction)}
                  >
                    <Icon name={getColumnSortRuleIcon(columnMeta?.sortDirection?.direction)} />
                  </button>
                }
                {/* <div className={styles.controlBox}>
                  { column.pin === 'left' && (<Icon name="align-item-left-line" className="text-sky-500" />)}
                  { column.pin === 'right' && (<Icon name="align-item-right-line" className="text-sky-500" />)}
                </div> */}
              </div>
            </TableCell>
          )
        })}
      </TableRow>
    </thead>
  )
}

export default TableHeader;