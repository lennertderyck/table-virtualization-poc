import classNames from 'classnames';
import { FC } from 'react';
import Icon from '../../../basics/Icon/Icon';
import { ColumnPinRule, ColumnSortDirection, ColumnSortRule, TableColumn } from '../Table.types';
import TableCell from '../TableCell/TableCell';
import TableRow from '../TableRow/TableRow';
import { getColumnSortRule, getColumnSortRuleIcon, switchColumbSortDirection } from '../utils/columns';
import styles from './TableHeader.module.scss';

interface Props {
  columns: TableColumn[];
  columnSort?: ColumnSortRule[];
  onColumnSort?: (accessor: string, direction: ColumnSortDirection) => void;
  columnPinning?: ColumnPinRule[];
  onColumnPinning?: (accessor: string, side: ColumnPinRule) => void;
};

const TableHeader: FC<Props> = ({ columns, columnSort, onColumnSort }) => {
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
  
  return (
    <thead className={styles.tableHead}>
      <TableRow>
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
                {!column.sort 
                  ? null
                  : <button
                    className={classNames(styles.action, isSorting && styles.active)} 
                    onClick={bindColumnSort(column, columnMeta?.sortDirection?.direction)}
                  >
                    <Icon name={getColumnSortRuleIcon(columnMeta?.sortDirection?.direction)} />
                  </button>
                }
              </div>
            </TableCell>
        )})}
      </TableRow>
    </thead>
  )
}

export default TableHeader;