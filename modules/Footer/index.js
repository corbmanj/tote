import React, { useContext } from 'react'
import { Icon } from '@blueprintjs/core'
import { AppContext } from '../AppState'

export default function NavMenu (props) {
    const { setStage } = useContext(AppContext)
    const { isSetup } = props
    const mainClass = isSetup ? 'footerItem' : 'footerItem active'
    const setupClass = isSetup ? 'footerItem active' : 'footerItem'
    
    function handleFooterClick(ev) {
        setStage(ev.target.id)
    }

    return (
        <div className="footer">
            <div id="getStarted" onClick={handleFooterClick} className={mainClass}><Icon icon="briefcase" iconSize={32} /></div>
            <div id="setup" onClick={handleFooterClick} className={setupClass}><Icon icon="cog" iconSize={32} /></div>
        </div>
    )
}