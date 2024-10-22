import classNames from 'classnames';
import { ForwardedRef, forwardRef, HTMLAttributes } from 'react';
import styles from './TableRow.module.scss';

interface Props extends HTMLAttributes<HTMLTableRowElement> {
  ref?: ForwardedRef<HTMLTableRowElement>
};

const TableRow = forwardRef<HTMLTableRowElement, Props>(({
  children,
  className,
  ...rest
}, ref) => {
  return (
    <tr
      ref={ref}
      className={classNames(styles.row, className)}
      {...rest}
    >
      {children}
    </tr>
  );
})

export default TableRow;