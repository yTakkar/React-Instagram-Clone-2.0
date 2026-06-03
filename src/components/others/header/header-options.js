import React from 'react'
import PropTypes from 'prop-types'
import AppLink from '../link/link'
import { connect } from 'react-redux'
import { t } from '../../../utils/translation'

const HeaderOptions = ({ toggleOptions, lang }) => {
  let clicked = () => toggleOptions()

  return (
    <div className="sp_options options">
      <ul className="o_ul">
        <li className="o_li" onClick={clicked}>
          <AppLink
            url="/settings"
            className="o_a"
            alt={t(lang, 'header', 'settings')}
            label={t(lang, 'header', 'settings')}
          />
        </li>
        <li className="o_li" onClick={clicked}>
          <AppLink
            url="/edit-profile"
            className="o_a"
            alt={t(lang, 'header', 'edit')}
            label={t(lang, 'header', 'edit')}
          />
        </li>
        <li className="o_li">
          <a href="/help" className="o_a" alt={t(lang, 'header', 'help')}>
            {t(lang, 'header', 'help')}
          </a>
        </li>
        <li className="o_li">
          <a href="/about">{t(lang, 'header', 'about')}</a>
        </li>
        <li className="o_li">
          <a href="/developer">{t(lang, 'header', 'developer')}</a>
        </li>
        <li className="o_li o_divider">
          <hr className="menu_divider" />
        </li>
        <li className="o_li">
          <a href="/logout" className="o_a" alt={t(lang, 'header', 'logout')}>
            {t(lang, 'header', 'logout')}
          </a>
        </li>
      </ul>
    </div>
  )
}

HeaderOptions.propTypes = {
  toggleOptions: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  lang: state.Language.language
})

export default connect(mapStateToProps)(HeaderOptions)
