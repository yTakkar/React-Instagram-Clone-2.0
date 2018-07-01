import FilterArray from '../filter-array'
import { create } from 'react-test-renderer'

describe('Filter-Array', () => {
  it('should match snapshot', () => {
    const tree = create(FilterArray)
    expect(tree).toMatchSnapshot()
  })

  it('Filter should have prefix filter', () => {
    const isPrefixed = filter => filter.substr(0, 7) === 'filter-'
    expect(FilterArray).toSatisfyAll(isPrefixed)
  })
})
