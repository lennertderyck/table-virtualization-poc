import classNames from 'classnames';
import { ForwardedRef, forwardRef, InputHTMLAttributes } from 'react';
import styles from './FormCellField.module.scss';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  ref?: ForwardedRef<HTMLInputElement>;
};

const FormCellField = forwardRef<HTMLInputElement, Props>((props, ref) => {
  return (
    <input
      className={classNames(styles.controller)}
      ref={ref}
      {...props}
    />
  )
})

export default FormCellField;