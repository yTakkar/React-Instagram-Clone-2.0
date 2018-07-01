import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import Filter from './filter'
import FiltersArray from './filter-array'

const Filters = () => {
  let map_filters = FiltersArray.map(f => <Filter key={f} filter={f} />)

  return (
    <Scrollbars style={{ height: 396 }} className="add_filters">
      <div className="add_filters_main">{map_filters}</div>
    </Scrollbars>
  )
}

export default Filters
