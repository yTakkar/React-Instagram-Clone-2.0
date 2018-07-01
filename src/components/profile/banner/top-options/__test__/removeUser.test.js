import React from 'react'
import MockDataElement from '../../../../../utils/__mocks__/mock-dataElement'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../../store/__mocks__/mockStore'
import BannerRemoveUser, { PureBannerRemoveUser } from '../removeUser'
import { shallow } from 'enzyme'

describe('BannerRemoveUser Component', () => {
  let dataElement = MockDataElement()
  dataElement.setAttribute('data-isadmin', 'true')

  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <BannerRemoveUser />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should mock removeUser action when option is clicked', () => {
    const wrapper = shallow(<PureBannerRemoveUser id={7} />)
    wrapper.find('li > a').simulate('click', {
      preventDefault() {},
    })
  })
})
