import React from 'react'
import {render, fireEvent, wait} from '@testing-library/react'
import {GreetingLoader} from '../greeting-loader-02-dependency-injection'

test('loads greetings on click', async () => {
  /**
   * we're doing something similar to what we did in `http-jest-mock.js`
   * where we mocked the entire `api` module; the difference is that instead
   * of mocking the entire module, we're just mocking a single function
   * 
   * it's generally better to stick with `jest.mock`, but certain environments,
   * such as Storybook, do not support it, so this is a useful alternative.
   */
  const mockLoadGreeting = jest.fn()
  const testGreeting = 'TEST_GREETING'
  mockLoadGreeting.mockResolvedValueOnce({data: {greeting: testGreeting}})
  const {getByLabelText, getByText} = render(
    <GreetingLoader loadGreeting={mockLoadGreeting} />,
  )
  const nameInput = getByLabelText(/name/i)
  const loadButton = getByText(/load/i)
  nameInput.value = 'Mary'
  fireEvent.click(loadButton)
  expect(mockLoadGreeting).toHaveBeenCalledWith('Mary')
  expect(mockLoadGreeting).toHaveBeenCalledTimes(1)
  await wait(() =>
    expect(getByLabelText(/greeting/i)).toHaveTextContent(testGreeting),
  )
})
