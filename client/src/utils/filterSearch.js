/*
* objects is the orginal list of items
* searchTerm is used to check against the item
* additionalValues are any other values you may need to pass in
* ignoredKeys allows you to define a group of keys you dont want to be checked from the search term
*   Default ignoredKeys are createdAt updatedAt and id
*/
const filterSearch = (objects, searchTerm, additionalValues = [], ignoredKeys = [], surface = false) => {
  const fullignoredKeys = ['createdAt', 'updatedAt', 'id', ...ignoredKeys];

  const checkAliases = (obj) => {
    // Exclude createdAt, updatedAt, and id from the object values
    const objValues = [
      ...Object.entries(obj)
        .filter(([key]) => !fullignoredKeys.includes(key))
        .map(([, value]) => value),
      ...additionalValues,
    ];

    // Check for String matches
    if (objValues.some((value) => typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase()))) {
      return true;
    }

    // Check for number matches
    if (objValues.some((value) => typeof value === 'number' && value === parseFloat(searchTerm))) {
      return true;
    }

    // Check aliases for matches
    if (surface && obj.aliases && obj.aliases.length) {
      if (obj.aliases.some((alias) => alias.alias.toLowerCase().includes(searchTerm.toLowerCase()))) {
        return true;
      }
    }

    // Recursively check nested objects
    for (const key in obj) {
      if (obj[key] !== null && typeof obj[key] === 'object') {
        if (checkAliases(obj[key])) {
          return true;
        }
      }
    }

    return false;
  };

  return objects.filter(checkAliases);
};

export default filterSearch;
