// @flow

import variable from "../variables/apple";

export default (variables /*: * */ = variable) => {
  const h2Theme = {
    color: variables.textColor,
    fontSize: variables.fontSizeH2,
    fontFamily: variables.fontFamily,
    lineHeight: variables.lineHeightH2,
    textAlign:variables.textAlign,
    alignSelf:variables.textAlignSelf,
    direction:variables.textDirection
  };

  return h2Theme;
};
