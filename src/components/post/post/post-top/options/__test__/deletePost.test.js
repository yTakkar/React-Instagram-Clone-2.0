import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../../../store/__mocks__/mockStore'
import DeletePostOption, { PureDeletePostOption } from '../deletePost'
import MockDataElement from '../../../../../../utils/__mocks__/mock-dataElement'
import { shallow } from 'enzyme'

describe('DeletePostOption Component', () => {
  let dataElement

  beforeEach(() => (dataElement = MockDataElement()))

  afterEach(() => dataElement.remove())

  const mockFn = jest.fn()
  const props = {
    postDetails: {
      user: 24,
      post_id: 11,
      when: 'feed',
    },
    toggleOptions: mockFn,
  }

  it('should match snapshot and show delete option', () => {
    // when post is mine
    const tree = create(
      <Provider store={mockStore}>
        <DeletePostOption {...props} />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()

    // when I am the admin
    dataElement.setAttribute('data-isadmin', 'true')
    const tree2 = create(
      <Provider store={mockStore}>
        <DeletePostOption {...props} />
      </Provider>
    ).toJSON()
    expect(tree2).toMatchSnapshot()
  })

  it('should match snapshot with null', () => {
    const tree = create(
      <Provider store={mockStore}>
        <DeletePostOption
          postDetails={{
            ...props.postDetails,
            user: 7,
          }}
          toggleOptions={mockFn}
        />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should show <Prompt/> when clicked on delete option', () => {
    const wrapper = shallow(
      <PureDeletePostOption {...props} dispatch={mockFn} />
    )
    wrapper.find('li > a').simulate('click')
    expect(wrapper.find('Prompt').exists()).toBe(true)
  })

  it('should mock deletePost action and redirect when post is deleted', () => {
    const wrapper = shallow(
      <PureDeletePostOption {...props} dispatch={mockFn} />
    )
    wrapper.setState({ deletePost: true })
    wrapper.find('Prompt').prop('action')({
      preventDefault() {},
    })

    // should redirect
    wrapper.setState({ redirect: true })
    expect(wrapper.find('Redirect').exists()).toBe(true)
  })
})
