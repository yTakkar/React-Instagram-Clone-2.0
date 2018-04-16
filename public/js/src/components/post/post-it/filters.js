import React from 'react' // eslint-disable-line no-unused-vars
import { Scrollbars } from 'react-custom-scrollbars'
import PropTypes from 'prop-types'

const Filters = ({ previewImg, selectFilter }) => (
  <Scrollbars style={{ height: 396 }} className='add_filters'>
    <div className='add_filters_main'>
      <div className='filter_div fp_normal' onClick={() => selectFilter('normal')} >
        <img className='normal' src={previewImg} />
        <span>Normal</span>
      </div>
      <div className='filter_div fp_filter-1977' onClick={() => selectFilter('filter-1977')} >
        <img className='filter-1977' src={previewImg} />
        <span>1977</span>
      </div>
      <div className='filter_div fp_filter-aden' onClick={() => selectFilter('filter-aden')} >
        <img className='filter-aden' src={previewImg} />
        <span>Aden</span>
      </div>
      <div className='filter_div fp_filter-amaro' onClick={() => selectFilter('filter-amaro')} >
        <img className='filter-amaro' src={previewImg} />
        <span>Amaro</span>
      </div>
      <div className='filter_div fp_filter-ashby' onClick={() => selectFilter('filter-ashby')} >
        <img className='filter-ashby' src={previewImg} />
        <span>Ashby</span>
      </div>
      <div className='filter_div fp_filter-brannan' onClick={() => selectFilter('filter-brannan')} >
        <img className='filter-brannan' src={previewImg} />
        <span>Brannan</span>
      </div>
      <div className='filter_div fp_filter-brooklyn' onClick={() => selectFilter('filter-brooklyn')} >
        <img className='filter-brooklyn' src={previewImg} />
        <span>Brooklyn</span>
      </div>
      <div className='filter_div fp_filter-charmes' onClick={() => selectFilter('filter-charmes')} >
        <img className='filter-charmes' src={previewImg} />
        <span>Charmes</span>
      </div>
      <div className='filter_div fp_filter-clarendon' onClick={() => selectFilter('filter-clarendon')} >
        <img className='filter-clarendon' src={previewImg} />
        <span>Clarendon</span>
      </div>
      <div className='filter_div fp_filter-crema' onClick={() => selectFilter('filter-crema')} >
        <img className='filter-crema' src={previewImg} />
        <span>Crema</span>
      </div>
      <div className='filter_div fp_filter-dogpatch' onClick={() => selectFilter('filter-dogpatch')} >
        <img className='filter-dogpatch' src={previewImg} />
        <span>Dogpatch</span>
      </div>
      <div className='filter_div fp_filter-earlybird' onClick={() => selectFilter('filter-earlybird')} >
        <img className='filter-earlybird' src={previewImg} />
        <span>Earlybird</span>
      </div>
      <div className='filter_div fp_filter-gingham' onClick={() => selectFilter('filter-gingham')} >
        <img className='filter-gingham' src={previewImg} />
        <span>Gingham</span>
      </div>
      <div className='filter_div fp_filter-ginza' onClick={() => selectFilter('filter-ginza')} >
        <img className='filter-ginza' src={previewImg} />
        <span>Ginza</span>
      </div>
      <div className='filter_div fp_filter-hefe' onClick={() => selectFilter('filter-hefe')} >
        <img className='filter-hefe' src={previewImg} />
        <span>Hefe</span>
      </div>
      <div className='filter_div fp_filter-helena' onClick={() => selectFilter('filter-helena')} >
        <img className='filter-helena' src={previewImg} />
        <span>Helena</span>
      </div>
      <div className='filter_div fp_filter-hudson' onClick={() => selectFilter('filter-hudson')} >
        <img className='filter-hudson' src={previewImg} />
        <span>Hudson</span>
      </div>
      <div className='filter_div fp_filter-inkwell' onClick={() => selectFilter('filter-inkwell')} >
        <img className='filter-inkwell' src={previewImg} />
        <span>Inkwell</span>
      </div>
      <div className='filter_div fp_filter-juno' onClick={() => selectFilter('filter-juno')} >
        <img className='filter-juno' src={previewImg} />
        <span>Juno</span>
      </div>
      <div className='filter_div fp_filter-kelvin' onClick={() => selectFilter('filter-kelvin')} >
        <img className='filter-kelvin' src={previewImg} />
        <span>Kelvin</span>
      </div>
      <div className='filter_div fp_filter-lark' onClick={() => selectFilter('filter-lark')} >
        <img className='filter-lark' src={previewImg} />
        <span>Lark</span>
      </div>
      <div className='filter_div fp_filter-lofi' onClick={() => selectFilter('filter-lofi')} >
        <img className='filter-lofi' src={previewImg} />
        <span>Lofi</span>
      </div>
      <div className='filter_div fp_filter-ludwig' onClick={() => selectFilter('filter-ludwig')} >
        <img className='filter-ludwig' src={previewImg} />
        <span>Ludwig</span>
      </div>
      <div className='filter_div fp_filter-maven' onClick={() => selectFilter('filter-maven')} >
        <img className='filter-maven' src={previewImg} />
        <span>Maven</span>
      </div>
      <div className='filter_div fp_filter-mayfair' onClick={() => selectFilter('filter-mayfair')} >
        <img className='filter-mayfair' src={previewImg} />
        <span>Mayfair</span>
      </div>
      <div className='filter_div fp_filter-moon' onClick={() => selectFilter('filter-moon')} >
        <img className='filter-moon' src={previewImg} />
        <span>Moon</span>
      </div>
      <div className='filter_div fp_filter-nashville' onClick={() => selectFilter('filter-nashville')} >
        <img className='filter-nashville' src={previewImg} />
        <span>Nashville</span>
      </div>
      <div className='filter_div fp_filter-perpetua' onClick={() => selectFilter('filter-perpetua')} >
        <img className='filter-perpetua' src={previewImg} />
        <span>Perpetua</span>
      </div>
      <div className='filter_div fp_filter-poprocket' onClick={() => selectFilter('filter-poprocket')} >
        <img className='filter-poprocket' src={previewImg} />
        <span>Poprocket</span>
      </div>
      <div className='filter_div fp_filter-reyes' onClick={() => selectFilter('filter-reyes')} >
        <img className='filter-reyes' src={previewImg} />
        <span>Reyes</span>
      </div>
      <div className='filter_div fp_filter-rise' onClick={() => selectFilter('filter-rise')} >
        <img className='filter-rise' src={previewImg} />
        <span>Rise</span>
      </div>
      <div className='filter_div fp_filter-sierra' onClick={() => selectFilter('filter-sierra')} >
        <img className='filter-sierra' src={previewImg} />
        <span>Sierra</span>
      </div>
      <div className='filter_div fp_filter-skyline' onClick={() => selectFilter('filter-skyline')} >
        <img className='filter-skyline' src={previewImg} />
        <span>Skyline</span>
      </div>
      <div className='filter_div fp_filter-slumber' onClick={() => selectFilter('filter-slumber')} >
        <img className='filter-slumber' src={previewImg} />
        <span>Slumber</span>
      </div>
      <div className='filter_div fp_filter-stinson' onClick={() => selectFilter('filter-stinson')} >
        <img className='filter-stinson' src={previewImg} />
        <span>Stinson</span>
      </div>
      <div className='filter_div fp_filter-sutro' onClick={() => selectFilter('filter-sutro')} >
        <img className='filter-sutro' src={previewImg} />
        <span>Sutro</span>
      </div>
      <div className='filter_div fp_filter-toaster' onClick={() => selectFilter('filter-toaster')} >
        <img className='filter-toaster' src={previewImg} />
        <span>Toaster</span>
      </div>
      <div className='filter_div fp_filter-valencia' onClick={() => selectFilter('filter-valencia')} >
        <img className='filter-valencia' src={previewImg} />
        <span>Valencia</span>
      </div>
      <div className='filter_div fp_filter-vesper' onClick={() => selectFilter('filter-vesper')} >
        <img className='filter-vesper' src={previewImg} />
        <span>Vesper</span>
      </div>
      <div className='filter_div fp_filter-walden' onClick={() => selectFilter('filter-walden')} >
        <img className='filter-walden' src={previewImg} />
        <span>Walden</span>
      </div>
      <div className='filter_div fp_filter-willow' onClick={() => selectFilter('filter-willow')} >
        <img className='filter-willow' src={previewImg} />
        <span>Willow</span>
      </div>
      <div className='filter_div fp_filter-xpro-ii' onClick={() => selectFilter('filter-xpro-ii')} >
        <img className='filter-xpro-ii' src={previewImg} />
        <span>Xpro-ii</span>
      </div>
    </div>
  </Scrollbars>
)

Filters.propTypes = {
  previewImg: PropTypes.string.isRequired,
  selectFilter: PropTypes.func.isRequired
}

export default Filters
