const SearchTypeEnum = {
  ALL_PATHS: '',
  SHORTEST_STRICT_PATH: '',
};

Object.keys(SearchTypeEnum).forEach((key) => { SearchTypeEnum[key] = key; });

export default SearchTypeEnum;
