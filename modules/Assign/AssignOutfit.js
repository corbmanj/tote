import React, { useContext } from 'react'
import PropTypes from 'prop-types'
// import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
// import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import { AppContext } from '../AppState'
// import AssignItem from './AssignItem'
import OutfitItems from './OutfitItems'

export default function AssignOutfit (props) {
  const context = useContext(AppContext)
  const {
    dayIndex,
    index,
    // updateNamedItems,
    // updateNamedItemInAllOutfits,
    outfit
  } = props

  function updateActiveOutfit () {
    context.setExpanded(dayIndex, index)
  }

  return (
    <Accordion expanded={outfit.expanded} onChange={updateActiveOutfit}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <div>{outfit.realName}</div>
        <div className="outfit-type">{outfit.type}</div>
      </AccordionSummary>
      <AccordionDetails>
        <OutfitItems
          outfitItems={outfit.items}
          dayIndex={dayIndex}
          outfitIndex={index}
        />
      </AccordionDetails>
    </Accordion>
  )
}

AssignOutfit.propTypes = {
  dayIndex: PropTypes.number,
  index: PropTypes.number,
  updateNamedItems: PropTypes.func,
  updateNamedItemInAllOutfits: PropTypes.func,
  outfit: PropTypes.shape({
    type: PropTypes.string,
    realName: PropTypes.string,
    id: PropTypes.number,
    expanded: PropTypes.bool,
    items: PropTypes.arrayOf(PropTypes.shape({
      dropdown: PropTypes.bool,
      parentType: PropTypes.string,
      type: PropTypes.string,
    })),
  })
}