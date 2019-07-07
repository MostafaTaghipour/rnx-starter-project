// @flow

import variable from "../variables/apple";

export default (variables /*: * */ = variable) => {
  const viewTheme = {
    ".padder": {
      padding: variables.contentPadding
    }
  };

  return viewTheme;
};
