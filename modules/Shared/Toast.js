import React from 'react'

export default function Toast (props) {
  // static propTypes = {
  //   message: PropTypes.string.isRequired,
  //   action: PropTypes.func,
  //   type: PropTypes.oneOf(['warning', 'success'])
  // }

  // renderUndo = () => {
  //   return (
  //     <button
  //       className="clear-button"
  //       title="Click to undo previous action"
  //       onClick={this.props.action}
  //     >
  //       <Fa
  //         name="undo"
  //         className="toast-undo-icon"
  //       />
  //     </button>
  //   )
  // }

  function renderIcon () {
    switch (props.type) {
      case 'warning':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <g>
              <rect x="11" y="10" width="2" height="4" />
              <rect x="11" y="15" width="2" height="2" />
              <path
                d="M21.71,19.13,13.06,3.85A1.31,1.31,0,0,0,12,3.08a1.31,1.31,0,0,0-1.08.77L2.26,19.13c-.59,1-.11,1.87,1.08,1.87H20.63C21.82,21,22.3,20.15,21.71,19.13ZM4.63,19,12,6l7.35,13Z" />
            </g>
          </svg>
        )
      case 'success':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24.04" height="24" viewBox="0 0 24.04 24">
            <g>
              <polygon
                points="10.34 13.88 7.95 11.48 6.53 12.9 8.88 15.24 8.87 15.25 10.28 16.67 10.29 16.66 10.3 16.67 10.63 16.34 17.51 9.91 16.1 8.5 10.34 13.88" />
              <path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" />
            </g>
          </svg>
        )
    }
  }

  const className = [props.type] + ' toast-container'
  return (
    <span
      className={className}
    >
      <div className="toast-status-icon">
        {renderIcon()}
      </div>
      <span>{props.message}</span>
      {/* {props.action ? renderUndo() : null} */}
    </span>
  )
}
