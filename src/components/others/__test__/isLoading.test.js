import React from 'react'
import IsLoading from '../isLoading'
import { create } from 'react-test-renderer'

describe('IsLoading Component', () => {
  it('should match snapshot and show <Spinner />', () => {
    const tree = create(<IsLoading loading={true} />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot and show <Loading />', () => {
    const tree = create(<IsLoading loading={true} when="page" />)
    expect(tree).toMatchSnapshot()
  })
})
