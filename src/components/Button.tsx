type ButtonType = {
  buttonText: string;
}

const Button = (props: ButtonType) => {
  const { buttonText } = props;
  return (
    <button type='submit' >{buttonText}</button>
  )
}

export default Button
