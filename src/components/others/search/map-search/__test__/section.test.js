import React from 'react'
import { create } from 'react-test-renderer'
import SearchSection from '../section'

describe('Search Section Component', () => {
  const map = list => list.map(l => <span key={l}>{l}</span>)

  it('should match snapshot for users search', () => {
    const tree = create(
      <SearchSection searchList={map(['first', 'second'])} listFor="member" />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot for hashtags search', () => {
    const tree = create(
      <SearchSection
        searchList={map(['#first', '#second'])}
        listFor="hashtag"
      />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot for group search', () => {
    const tree = create(
      <SearchSection
        searchList={map(['normal-grp', 'crazy-group'])}
        listFor="group"
      />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
