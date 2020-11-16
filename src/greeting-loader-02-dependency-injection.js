import React from 'react'
import * as api from './api'

/**
 * we want to pass in loadGreeting as a prop so that our tests
 * function as expected, but since we do not want to have to pass
 * in this prop everywhere we're using our component, we can
 * set its default value here
 */
function GreetingLoader({loadGreeting = api.loadGreeting}) {
  const [greeting, setGreeting] = React.useState('')
  async function loadGreetingForInput(e) {
    e.preventDefault()
    const {data} = await loadGreeting(e.target.elements.name.value)
    setGreeting(data.greeting)
  }
  return (
    <form onSubmit={loadGreetingForInput}>
      <label htmlFor="name">Name</label>
      <input id="name" />
      <button type="submit">Load Greeting</button>
      <div aria-label="greeting">{greeting}</div>
    </form>
  )
}

export {GreetingLoader}
