import React from 'react'
import NotiSpeak from '../noti-speak'
import { create } from 'react-test-renderer'
import mockStore from '../../../store/__mocks__/mockStore'

describe('Noti-Speak Component', () => {
  it('should match snapshot with null', () => {
    const tree = create(<NotiSpeak un={0} store={mockStore} />).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot with complete Component', () => {
    const tree = create(<NotiSpeak un={5} store={mockStore} />).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
