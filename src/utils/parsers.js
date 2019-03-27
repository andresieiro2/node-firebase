export const removeDuplicates = json => {
  const loop = object => {
    Object.keys(object).map(key => {
      if (Array.isArray(object[key])) {
        if (object[key].length === 1) {
          object[key] = object[key][0];
        }

        if (object[key].length === 2) {
          if (object[key][0].toString() === object[key][1].toString()) {
            object[key] = object[key][0];

            if (typeof object[key] === 'object') {
              removeDuplicates(object[key]);
            }
          }
        } else {
          for (let i = 0; i < object[key].length; i++) {
            removeDuplicates(object[key][i]);
          }
        }
      } else {
        if (typeof object[key] === 'object') {
          removeDuplicates(object[key]);
        }
      }
    });
  };

  loop(json);
};
