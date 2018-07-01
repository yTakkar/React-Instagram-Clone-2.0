import React from 'react'
import { create } from 'react-test-renderer'
import EditPostOption from '../editPost'
import MockDataElement from '../../../../../../utils/__mocks__/mock-dataElement'
import { shallow } from 'enzyme'

describe('EditPostOption Component', () => {
  let dataElement

  beforeEach(() => (dataElement = MockDataElement()))

  afterEach(() => dataElement.remove())

  const mockFn = jest.fn()
  const props = {
    postDetails: {
      user: 24,
      post_id: 11,
      description: 'desc',
    },
    toggleOptions: mockFn,
    updateDescription: mockFn,
  }

  it('should match snapshot and show edit option', () => {
    // when post is mine
    const tree = create(<EditPostOption {...props} />).toJSON()
    expect(tree).toMatchSnapshot()

    // when I am the admin
    dataElement.setAttribute('data-isadmin', 'true')
    const tree2 = create(<EditPostOption {...props} />).toJSON()
    expect(tree2).toMatchSnapshot()
  })

  it('should match snapshot with null', () => {
    const tree = create(
      <EditPostOption
        postDetails={{
          ...props.postDetails,
          user: 7,
        }}
        toggleOptions={mockFn}
        updateDescription={mockFn}
      />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should show <EditPost/> when clicked on edit option', () => {
    const wrapper = shallow(<EditPostOption {...props} dispatch={mockFn} />)
    wrapper.find('li > a').simulate('click')
    expect(wrapper.find('Connect(EditPost)').exists()).toBe(true)
  })
})
