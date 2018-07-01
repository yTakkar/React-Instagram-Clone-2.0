import React from 'react'
import MockDataElement from '../../../../../../utils/__mocks__/mock-dataElement'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../../../store/__mocks__/mockStore'
import RemBookmarkAsAdmin, { PureRemBookmarkAsAdmin } from '../remBookmark'
import { shallow } from 'enzyme'

describe('RemBookmarkAsAdmin Component', () => {
  let dataElement

  beforeEach(() => (dataElement = MockDataElement()))

  afterEach(() => dataElement.remove())

  const props = {
    post_id: 11,
    user: 24,
    when: 'bookmarks',
  }

  it('should match snapshot', () => {
    dataElement.setAttribute('data-isadmin', 'true')
    const tree = create(
      <Provider store={mockStore}>
        <RemBookmarkAsAdmin {...props} />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should mock removeBookmark action when remove option is clicked', () => {
    dataElement.setAttribute('data-isadmin', 'true')
    const wrapper = shallow(
      <PureRemBookmarkAsAdmin {...props} dispatch={jest.fn()} />
    )
    wrapper.find('li > a').simulate('click', {
      preventDefault() {},
    })
  })
})
