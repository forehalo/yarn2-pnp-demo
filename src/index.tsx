import React, { useState, useCallback } from 'react'
import ReactDOM from 'react-dom'

function App() {
  const [count, setCount] = useState(0)

  const addOne = useCallback(() => {
    setCount((v) => v + 1)
  }, [setCount])

  return (
    <div>
      count: {count}
      <button onClick={addOne}>+</button>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
