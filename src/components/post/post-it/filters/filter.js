import React from 'react'
import { c_first } from '../../../../utils/utils'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { CPP } from '../../../../store/actions/post-a'
import d from '../../../../utils/DOM'

const Filter = ({ filter, postIt, dispatch }) => {

  let { previewImg } = postIt
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
  { postIt: state.Post.postIt }
)

export default connect(mapStateToProps)(Filter)
