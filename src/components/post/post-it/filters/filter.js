import React from 'react'
import { c_first } from '../../../../utils/utils'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { CPP } from '../../../../actions/post'
import d from '../../../../utils/API/DOM'

const Filter = ({ filter, previewImg, dispatch }) => {

  let f = filter.replace('filter-', '')

  let select = () => {
    new d('.filter_div').removeClass('select_receiver_toggle')
    new d(`.fp_${filter}`).addClass('select_receiver_toggle')
    dispatch(CPP('filter', filter))
  }

  return (
    <div
      className={`filter_div fp_${filter}`}
      onClick={select}
    >
      <img className={filter} src={previewImg} />
      <span>{c_first(f)}</span>
    </div>
  )
}

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
}

const mapStateToProps = state => (
  { previewImg: state.Post.postIt.previewImg }
)

export default connect(mapStateToProps)(Filter)
export { Filter as PureFilter }
