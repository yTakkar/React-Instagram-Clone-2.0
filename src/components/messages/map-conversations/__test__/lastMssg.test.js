import React from 'react'
import { create } from 'react-test-renderer'
import LastMssg from '../lastMssg'

describe('LastMssg Component', () => {
  it('should match snapshot when lastMssgType == text', () => {
    const tree = create(
      <LastMssg lastMessage="some message" lastMssgType="text" />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot when lastMssgType == image', () => {
    const tree = create(
      <LastMssg lastMessage="some message" lastMssgType="image" />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot when lastMssgType == sticker', () => {
    const tree = create(
      <LastMssg lastMessage="some message" lastMssgType="sticker" />
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot when lastMssg == ""', () => {
    const tree = create(<LastMssg lastMessage="" />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
