import classNames from 'classnames';
import { FC, PropsWithChildren, UIEvent } from 'react';
import { LayoutEvent, TableProps } from '../Table.types';
import styles from './TableViewport.module.scss';

interface Props extends PropsWithChildren, Pick<TableProps<any>, 'layout'> {
  onLayout: (event: LayoutEvent) => void;
  onScroll: (scrollPosition: number) => void;
  tableClassName?: string;
};

const TableViewport: FC<Props> = ({ children, onLayout, onScroll, tableClassName }) => {
  const bindScrollHandler = () => (event: UIEvent<HTMLTableElement>) => onScroll(event.currentTarget.scrollTop);
  const bindLayoutHandlerByReference = () => (wrapper: HTMLDivElement | null) => {
    if (wrapper) {
      const viewportHeight = wrapper?.clientHeight;
      const rowHeight = wrapper?.querySelector('tbody tr[data-row-index]')?.clientHeight || 1;
      onLayout({ viewportHeight, rowHeight });
    }
  }
  
  return (
    <div className={styles.wrapper}>
      <div 
        className={styles.container}
        ref={bindLayoutHandlerByReference()}
        onScroll={bindScrollHandler()}
      >
        <table className={classNames(styles.table, tableClassName)}>
          { children }
        </table>
      </div>
    </div>
  )
}

export default TableViewport;