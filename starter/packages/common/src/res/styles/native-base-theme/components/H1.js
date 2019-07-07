// @flow

import variable from "../variables/apple";

export default (variables /*: * */ = variable) => {
  const h1Theme = {
    color: variables.textColor,
    fontSize: variables.fontSizeH1,
    fontFamily: variables.fontFamily,
    lineHeight: variables.lineHeightH1,
    textAlign:variables.textAlign,
    alignSelf:variables.textAlignSelf,
    direction:variables.textDirection
  };

  return h1Theme;
};
