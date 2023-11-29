const filterSearch = (objects, searchTerm, additionalValues = []) => objects.filter((obj) => {
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

  return false;
});

export default filterSearch;
