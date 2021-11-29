import React from 'react'

type ButtonType = {
  buttonText: string;
  handleButtonClick(): void
}

const Button = (props: ButtonType) => {
  const { buttonText, handleButtonClick} = props;
  return (
    <button onClick={() => handleButtonClick}>
      {buttonText}
    </button>
  )
}

export default Button
