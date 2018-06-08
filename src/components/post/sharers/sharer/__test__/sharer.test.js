import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../../store/mockStore/mockStore'
import { BrowserRouter as Router } from 'react-router-dom'
import Sharer from '../sharer'
import Post from '../../../../../store/mockStore/mock-reducers/Post'
import MockDataElement from '../../../../../utils/__test__/mock-dataElement'

describe('Sharer Component', () => {
  let dataElement

  beforeEach(() =>
    dataElement = MockDataElement()
  )

  afterEach(() =>
    dataElement.remove()
  )

  const comp = (extraProps={}) => (
    <Provider store={mockStore}>
      <Router>
        <Sharer
          {...Post.sharers[0]}
          decrementSharers={jest.fn()}
          {...extraProps}
        />
      </Router>
    </Provider>
  )

  it('should match snapshot and show <AdvancedFollow/>', () => {
    const tree = create(comp()).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot and show <AdvancedUnfollow/>', () => {
    const tree = create(comp({
      isFollowing: true
    })).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot and show <AppLink/>', () => {
    const tree = create(comp({
      share_by: 24
    })).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot and show <RemoveShare/>', () => {
    dataElement.setAttribute('data-isadmin', 'true')
    const tree = create(comp()).toJSON()
    expect(tree).toMatchSnapshot()

    dataElement.setAttribute('data-isadmin', 'false')
    const tree2 = create(comp({
      share_to: 24
    })).toJSON()
    expect(tree2).toMatchSnapshot()
  })

})
