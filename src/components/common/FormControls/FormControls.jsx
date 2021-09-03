import React, { ReactNode } from 'react';
import styles from './../../../styles/components/FormControls.module.scss';
import {
  Field,
} from 'redux-form';

const FormControl = ({
  meta: { touched, error },
  children,
}) => {
  const hasError = touched && error;
  return (
    <div className={styles.formControl + ' ' + (hasError ? styles.error : '')}>
      <div>{children}</div>
      {hasError && <span>"{error}</span>}
    </div>
  );
};

export const Textarea = (props) => {
  const { input, meta, ...restProps } = props;
  return (
    <FormControl {...props}>
      <textarea {...input} {...restProps} />
    </FormControl>
  );
};

export const Input = (props) => {
  const { input, meta, ...restProps } = props;
  return (
    <FormControl {...props}>
      <input {...input} {...restProps} />
    </FormControl>
  );
};

export function createField(
  placeholder,
  name,
  component,
  valiadtors,
  props = {},
  text = '',
) {
  return (
    <div>
      <Field
        placeholder={placeholder}
        name={name}
        component={component}
        validate={valiadtors}
        {...props}
      />
      {text}
    </div>
  );
}
