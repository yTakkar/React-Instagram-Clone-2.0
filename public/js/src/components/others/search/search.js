import React from 'react'

export default class Search extends React.Component {
  render() {
    return (
      <div>

        <div className='search_box'>
          <input type='text' name='' placeholder='Search Instagram' spellCheck='false' autoComplete='off' className='search' autoFocus />
          <span className='search_icon'>
            <i className='fa fa-search' aria-hidden='true'></i>
          </span>
        </div>

      </div>
    )
  }
}
