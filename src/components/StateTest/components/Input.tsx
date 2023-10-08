import React from 'react';

export interface InputProps {
  name: string;
  initialValue: number;
}

export function Input(props: InputProps) {
  const {
    name,
    initialValue,
  } = props;
  const [value, setValue] = React.useState(initialValue);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(+event.target.value);
  };

  return (
    <div>
      <input
        name={name}
        value={value}
        onChange={handleChange}
        type="number"
      />
    </div>
  );
}