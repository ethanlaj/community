const filterSearch = (objects, searchTerm, additionalValues = []) => {
  const checkAliases = (obj) => {
    // Exclude createdAt, updatedAt and id from the object values
    const objValues = [...Object.entries(obj)
      .filter(([key]) => key !== 'createdAt' && key !== 'updatedAt' && key !== 'id')
      .map(([, value]) => value), ...additionalValues];

    if (objValues.some((value) => typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase()))) {
      return true;
    }

    // Check aliases for matches
    if (obj.aliases && obj.aliases.length) {
      return obj.aliases.some((alias) => alias.alias.toLowerCase().includes(searchTerm.toLowerCase()));
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
