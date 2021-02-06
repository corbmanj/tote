import React from 'react'
import PropTypes from 'prop-types'
import { useHistory } from 'react-router-dom'
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter'
import SettingsIcon from '@material-ui/icons/Settings'
import './footer.scss'

export default function Footer (props) {
    const history = useHistory()
    const { isSetup } = props
    const mainClass = isSetup ? 'footerItem' : 'footerItem active'
    const setupClass = isSetup ? 'footerItem active' : 'footerItem'
    
    function handleFooterClick(ev) {
        history.push(`/${ev.target.id}`)
    }

    return (
        <div className="footer">
            <div id="getStarted" onClick={handleFooterClick} className={mainClass}><BusinessCenterIcon /></div>
            <div id="setup" onClick={handleFooterClick} className={setupClass}><SettingsIcon /></div>
        </div>
    )
}

Footer.propTypes = {
    isSetup: PropTypes.bool
}