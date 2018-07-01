import React, { Fragment } from 'react'
import FileInput from '../file'
import { create } from 'react-test-renderer'
import FAIcon from '../../icons/font-awesome-icon'

describe('FileInput Component', () => {
  const props = {
    value: 'a value',
    fileChange: jest.fn(),
    label: 'A label',
  }

  it('should match snapshot', () => {
    const tree = create(
      <FileInput {...props} labelClass="label-class" />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot with label as a function', () => {
    const labelMockFn = () => (
      <Fragment>
        <FAIcon icon="lock" />
        <img src="/images/spacecraft.jpg" />
      </Fragment>
    )
    const tree = create(<FileInput {...props} label={labelMockFn} />).toJSON()

    expect(tree).toMatchSnapshot()
  })
})
