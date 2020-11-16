import React from 'react'
/**
 * we need to wrap the rendered component in a <Provider />
 */
import {Provider} from 'react-redux'
import {fireEvent, render} from '@testing-library/react'
import {Counter} from '../redux-counter'
import {store} from '../redux-store'

test('can render with redux with defaults', () => {
  /**
   * we need `getByText` to grab the 'increment' & 'decrement' btns
   * we need `getByLabelText` to grab the span with the value
   */
  const {getByLabelText, getByText} = render(
    <Provider store={store}>
      <Counter />
    </Provider>,
  )

  fireEvent.click(getByText('+'))
  expect(getByLabelText(/count/i)).toHaveTextContent('1')
})
