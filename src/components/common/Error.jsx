const Error = ({message}) => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className=""> Oops! Something went wrong: {message}</div>
    </div>
  )
}

export default Error