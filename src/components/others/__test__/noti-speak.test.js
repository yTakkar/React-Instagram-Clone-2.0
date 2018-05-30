import React from 'react'
import { NotiSpeak } from '../noti-speak'
import { create } from 'react-test-renderer'

describe('Noti-Speak Component', () => {
  const session = {
    id: 24,
    username: 'takkar'
  }

  it('should match snapshot with empty DIV', () => {
    const tree = create(
      <NotiSpeak
        un={0}
        session={session}
      />
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot with complete Component', () => {
    const tree = create(
      <NotiSpeak
        un={5}
        session={session}
      />
    ).toJSON()

    expect(tree).toMatchSnapshot()
  })

})
