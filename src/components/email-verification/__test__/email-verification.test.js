import React from 'react'
import { create } from 'react-test-renderer'
import EmailVerification from '../email-verification'
import { Provider } from 'react-redux'
import mockStore from '../../../store/__mocks__/mockStore'

describe('EmailVerification Component', () => {
  const comp = is => (
    <Provider store={mockStore}>
      <EmailVerification
        match={{
          params: { is },
        }}
      />
    </Provider>
  )

  it('should match snapshot with verified message', () => {
    const tree = create(comp('yes')).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot with already-verified message', () => {
    const tree = create(comp('alr')).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot with something-wrong message', () => {
    const tree = create(comp('jewnkjen')).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
