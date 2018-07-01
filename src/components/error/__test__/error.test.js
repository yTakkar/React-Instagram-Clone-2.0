import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../store/__mocks__/mockStore'
import Error from '../error'

describe('Error Component', () => {
  const comp = what => (
    <Provider store={mockStore}>
      <Error
        match={{
          params: { what },
        }}
      />
    </Provider>
  )

  it('should match snapshot with no-post error', () => {
    const tree = create(comp('post')).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot with no-user error', () => {
    const tree = create(comp('user')).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot with no param', () => {
    const tree = create(comp(null)).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
