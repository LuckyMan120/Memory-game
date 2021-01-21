import './Flip.scss'
import React from 'react'

// taken from https://codepen.io/darkwing/pen/bCali?q=flip+animation&limit=all&type=type-pens
export default class Flip extends React.Component {
  render() {
    const { front, back, className, onClick, isFaceup } = this.props;

    return <div
      className={`flip-container ${isFaceup && 'toggling'} ${className}`}
      ontouchstart="this.classList.toggle('hover');"
    >
      <div className={`flipper`}>
        <div className="front" onClick={onClick}>
          {front}
        </div>
        <div className="back" onClick={onClick}>
          {back}
        </div>
      </div>
    </div>;
  }
}