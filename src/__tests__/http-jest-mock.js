import React from 'react'
import {render, fireEvent, wait} from '@testing-library/react'
import {GreetingLoader} from '../greeting-loader-01-mocking'
import {loadGreeting as mockLoadGreeting} from '../api'

/**
 * whenever a user clicks on the submit button,
 * the client makes a request to the server so that
 * it returns a greeting; we want to mock all of that
 * functionality without actually making real api
 * requests in these types of tests, so when we import
 *
 * `loadGreeting`
 *
 * above, we actually get a mocked version of it
 */
jest.mock('../api')

test('loads greetings on click', async () => {
  const testGreeting = 'TEST_GREETING'

  /**
   * we want `loadGreeting` to return a Promise,
   * and we want to specify what the object that
   * we get back from that Promise looks a certain
   * way:
   */
  mockLoadGreeting.mockResolvedValueOnce({data: {greeting: testGreeting}})

  // what methods do we need to get from render?
  // - we need to select `input` to set its value
  //   which we can get with `getByLabelText`
  // - we need to get the submit button, which has
  //   "Load Greeting" as its text value, so we'll
  //   need `getByText`
  // - we also need to check the div into which the
  //   greeting will render once its returned, so we'll
  //   use `getByLabelText`
  const {getByLabelText, getByText} = render(<GreetingLoader />)

  const nameInput = getByLabelText(/name/i)
  const loadButton = getByText(/load/i)

  // set the name input's value:
  nameInput.value = 'Mary'

  // ...then simulate the click event with `mockLoadGreeting` (instead
  // of the `loadGreeting` function that actually gets called irl):
  fireEvent.click(loadButton)

  expect(mockLoadGreeting).toHaveBeenCalledWith('Mary')
  expect(mockLoadGreeting).toHaveBeenCalledTimes(1)

  /**
   * since the last step in the `loadGreetingForInput` function in our
   * component gets called on submit, and since the last step in that
   * function is to setState, we need to use `wait` so that the test
   * can deal with this.
   *
   * the callback passed to wait will continue to run until the assertion
   * resolves itself
   */
  await wait(() =>
    expect(getByLabelText(/greeting/i)).toHaveTextContent(testGreeting),
  )
})
