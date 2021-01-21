import React from 'react'
import { CSSTransitionGroup } from "react-transition-group";

// ...props includes children
export default props => (
  <CSSTransitionGroup
    transitionAppear={true}
    transitionAppearTimeout={0}
    transitionName="fade"
    transitionEnterTimeout={0}
    transitionLeaveTimeout={0}
    {...props}
  >
    {props.children}
  </CSSTransitionGroup>
);
