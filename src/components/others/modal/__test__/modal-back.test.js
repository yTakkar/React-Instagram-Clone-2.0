import React from 'react'
import ModalBack from '../modal-back'
import { create } from 'react-test-renderer'
import { shallow } from 'enzyme'

describe('ModalBack Component', () => {
  const mockFn = jest.fn()

  it('should match snapshot with primary button', () => {
    const tree = create(<ModalBack back={mockFn} />).toJSON()
    expect(tree).toMatchSnapshot()

    const wrapper = shallow(<ModalBack back={mockFn} />)
    wrapper.find('PrimaryButton').simulate('click', { preventDefault() {} })
  })

  it('should match snapshot with secondary button', () => {
    const tree = create(
      <ModalBack back={mockFn} btnType="secondary" />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
