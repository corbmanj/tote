import React, { useContext } from 'react'
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import SettingsIcon from '@material-ui/icons/Settings';
import { AppContext } from '../AppState'
import './footer.scss'

export default function Footer (props) {
    const { setStage } = useContext(AppContext)
    const { isSetup } = props
    const mainClass = isSetup ? 'footerItem' : 'footerItem active'
    const setupClass = isSetup ? 'footerItem active' : 'footerItem'
    
    function handleFooterClick(ev) {
        setStage(ev.target.id)
    }

    return (
        <div className="footer">
            <div id="getStarted" onClick={handleFooterClick} className={mainClass}><BusinessCenterIcon /></div>
            <div id="setup" onClick={handleFooterClick} className={setupClass}><SettingsIcon /></div>
        </div>
    )
}