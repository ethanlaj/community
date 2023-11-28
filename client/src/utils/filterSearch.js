const filterSearch = (objects, searchTerm, additionalValues = []) => objects.filter((obj) => {
  const objValues = [...Object.values(obj), ...additionalValues];

  if (objValues.some((value) => typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase()))) {
    return true;
  }

  // Check aliases for matches
  if (obj.aliases && obj.aliases.length) {
    return obj.aliases.some((alias) => alias.alias.toLowerCase().includes(searchTerm.toLowerCase()));
  }

  return false;
});

export default filterSearch;
