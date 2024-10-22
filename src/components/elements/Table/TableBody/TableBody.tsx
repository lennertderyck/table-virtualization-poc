import { FC, HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLTableSectionElement> {};

const TableBody: FC<Props> = (props) => {
  return (
    <tbody {...props} />
  )
}

export default TableBody;