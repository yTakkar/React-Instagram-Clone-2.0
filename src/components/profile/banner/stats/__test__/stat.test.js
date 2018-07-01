import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../../store/__mocks__/mockStore'
import BannerStat from '../stat.js'

describe('BannerStat Component', () => {
  const comp = (props = {}) => (
    <Provider store={mockStore}>
      <BannerStat {...props} />
    </Provider>
  )

  it('should match snapshot', () => {
    const tree = create(
      comp({
        statType: 'followers',
        statValue: 10,
      })
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot with disabled prop', () => {
    const tree = create(
      comp({
        statType: 'followers',
        statValue: 10,
        disabled: true,
      })
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
