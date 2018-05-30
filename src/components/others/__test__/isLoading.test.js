import React from 'react'
import IsLoading from '../isLoading'
import renderer from 'react-test-renderer'

describe('IsLoading Component', () => {
  const snapshot = renderer.create

  it('should match snapshot with <Spinner />', () => {
    const tree = snapshot(
      <IsLoading loading={true} />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot with <Loading />', () => {
    const tree = snapshot(
      <IsLoading loading={true} when='page' />
    )
    expect(tree).toMatchSnapshot()
  })

})
