import classNames from 'classnames';
import { FC, isValidElement, TdHTMLAttributes, useMemo } from 'react';
import { TableColumn } from '../Table.types';
import styles from './TableCell.module.scss';
import { calculateCellPinning } from './TableCell.utils';

interface Props extends TdHTMLAttributes<HTMLTableCellElement> {
  columns: TableColumn[];
  column: TableColumn;
  element?: 'th' | 'td';
  /** Basic cell styling */
  isContainer?: 'auto' | boolean;
};

const TableCell: FC<Props> = ({ column, element = 'td', columns, className, isContainer = "auto", children, ...props}) => {
  const DynamicTag = element;
  const asTemplate = useMemo(() => {
    if (isContainer === 'auto') return isValidElement(children);
    else return isContainer;
  }, [isContainer, children]);
  
  const cellCanOverflow = column.cellWidth !== 'auto';
    
  return (
    <DynamicTag
      className={classNames(
        styles.cell, 
        asTemplate && styles.asTemplate, 
        styles[element], 
        className
      )}
      ref={calculateCellPinning({ column, columns })}
      {...props}
      children={
        <div 
          className={classNames(styles.inner, cellCanOverflow && styles.catchOverflow)} 
          style={{ width: column.cellWidth === 'auto' ? undefined : column.cellWidth }}
        >
          { children }
        </div>
      }
    />
  )
}

export default TableCell;