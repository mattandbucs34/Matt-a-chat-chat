import React from 'react';

type TextInputType = {
  value: string;
  handleTextChange(value: string): void
}

const TextInput = ({value, handleTextChange}: TextInputType) => {
  return (
    <div>
      <input type="text" value={value} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleTextChange(e.currentTarget.value)} />
    </div>
  )
}

export default TextInput
