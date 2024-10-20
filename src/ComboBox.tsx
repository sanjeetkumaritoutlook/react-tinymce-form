import React, { useEffect, useRef } from 'react';

export function ComboBox(props: any, ref: any) {
  const { value, allowInput, label } = props;

  const comboBoxInput: any = useRef();

  useEffect(() => {
    comboBoxInput.current?.addEventListener('comboBoxInput', (event: any) => {
      console.log(event.detail);

      // setComboBox(event.detail);
    });
  }, []);
  return (
    <input
      value={value}
      ref={comboBoxInput}
    ></input>
  );
}