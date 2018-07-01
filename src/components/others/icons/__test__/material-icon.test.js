import React from 'react'
import MaterialIcon from '../material-icon'
import { create } from 'react-test-renderer'

describe('Material Icon Component', () => {
  it('should match snapshot with delete icon', () => {
    const tree = create(<MaterialIcon icon="delete" />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot with close icon', () => {
    const tree = create(<MaterialIcon icon="close" />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
