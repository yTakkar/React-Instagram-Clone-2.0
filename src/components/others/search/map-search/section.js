import React from 'react'
import { humanReadable } from '../../../../utils/utils'
import { array, string } from 'prop-types'

const SearchSection = ({ searchList, listFor }) => {
  let len = searchList.length

  return (
    <div className="s_d">
      <span className="s_header">{humanReadable(len, listFor)}</span>
      {searchList}
    </div>
  )
}

SearchSection.propTypes = {
  searchList: array.isRequired,
  listFor: string.isRequired,
}

export default SearchSection
