import React from 'react'
import { create } from 'react-test-renderer'
import AboutSection from '../section'

describe('AboutSection Component', () => {
  it('should match snapshot', () => {
    const tree = create(
      <AboutSection label="Username" value="takkar" />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot with isLink prop', () => {
    const tree = create(
      <AboutSection
        label="Github"
        value="https://www.github.com/yTakkar"
        isLink
      />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot with null', () => {
    const tree = create(<AboutSection label="Firstname" value="" />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
