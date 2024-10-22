import { FC } from 'react';
import { TableVirtualRowsProps } from './VirtualTableRows.types';

const VirtualTableRows: FC<TableVirtualRowsProps> = ({ gutter, renderGutter }) => {
  if (!renderGutter) return null
  return (
    <tr>
      <td style={{ 
        height: gutter,
        padding: 0,
        border: 0,
      }} />
    </tr>
  )
}

export default VirtualTableRows;