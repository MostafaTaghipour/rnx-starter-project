// @flow

import variable from "../variables/apple";

export default (variables /*: * */ = variable) => {
  const iconTheme = {
    fontSize: variables.iconFontSize,
    color: "#000"
  };

  return iconTheme;
};
