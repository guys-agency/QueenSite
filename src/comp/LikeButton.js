import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";

const LinkButton = (props) => {
  const {
    history,
    location,
    match,
    staticContext,
    to,
    onClick,
    // ⬆ filtering out props that `button` doesn’t know what to do with.
    // ...rest
    classNameProp,
  } = props;
  return (
    <button
      //   {...rest} // `children` is just another prop!
      className={classNameProp}
      onClick={(event) => {
        onClick && onClick(event);
        history.push(to);
      }}
    />
  );
};

LinkButton.propTypes = {
  to: PropTypes.string.isRequired,
  //   children: PropTypes.node.isRequired
};

export default withRouter(LinkButton);
