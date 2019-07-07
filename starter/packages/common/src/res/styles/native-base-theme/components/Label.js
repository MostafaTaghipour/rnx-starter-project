// @flow

import variable from "../variables/apple";

export default (variables /*: * */ = variable) => {
  const labelTheme = {
    ".focused": {
      width: 0
    },
    fontFamily: variables.fontFamily,
    fontSize: 17,
    textAlign:variables.textAlign,
    alignSelf:variables.textAlignSelf,
    direction:variables.textDirection
  };

  return labelTheme;
};
