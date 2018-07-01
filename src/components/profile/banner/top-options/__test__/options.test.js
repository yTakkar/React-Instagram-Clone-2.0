import React from 'react'
import { create } from 'react-test-renderer'
import { Provider } from 'react-redux'
import mockStore from '../../../../../store/__mocks__/mockStore'
import BannerOptions from '../options'
import MockDataElement from '../../../../../utils/__mocks__/mock-dataElement'

describe('BannerOptions Component', () => {
  it('should match snapshot', () => {
    const tree = create(
      <Provider store={mockStore}>
        <BannerOptions toggleOptions={jest.fn()} />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('should match snapshot and show <CopyLink/> only', () => {
    MockDataElement()
    const tree = create(
      <Provider store={mockStore}>
        <BannerOptions toggleOptions={jest.fn()} />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
