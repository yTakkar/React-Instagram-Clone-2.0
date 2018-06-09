import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../../store/mockStore/mockStore'
import BannerAddToFavs, { PureBannerAddToFavs } from '../addToFavs'
import MockDataElement from '../../../../../utils/__test__/mock-dataElement'
import User from '../../../../../store/mockStore/mock-reducers/User'
import { shallow } from 'enzyme'

describe('BannerAddToFavs Component', () => {
  const mockFn = jest.fn()

  MockDataElement()

  const comp = (
    <Provider store={mockStore}>
      <BannerAddToFavs
        toggleOptions={mockFn}
      />
    </Provider>
  )

  it('should match snapshot with null', () => {
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should mock addToFavs action when option is clicked', () => {
    const wrapper = shallow(
      <PureBannerAddToFavs
        toggleOptions={mockFn}
        id={7}
      />
    )
    wrapper.find('.add_fav').simulate('click', {
      preventDefault() {}
    })
  })

  it('should match snapshot', () => {
    User.user_details.id = 7
    const tree = create(comp).toJSON()
    expect(tree).toMatchSnapshot()
  })

})
