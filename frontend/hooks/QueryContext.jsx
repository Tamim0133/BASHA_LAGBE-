import React, { createContext, useContext, useState } from 'react';

// Create a context for query parameters
const QueryParamsContext = createContext();

// Create a provider component
export const QueryParamsProvider = ({ children }) => {
  const [queryParams, setQueryParams] = useState({
    areaId: '',
    subArea: '',
    sortBy: '',
    priceMin: '',
    priceMax: '',
    bedrooms: '',
    bathrooms: '',
    propertyType: '',
  });

  // Function to update query parameters
  const updateQueryParams = (newParams) => {
    setQueryParams((prevParams) => ({
      ...prevParams,
      ...newParams,
    }));
  };

  return (
    <QueryParamsContext.Provider value={{ queryParams, updateQueryParams }}>
      {children}
    </QueryParamsContext.Provider>
  );
};

// Custom hook to use the context
export const useQueryParams = () => useContext(QueryParamsContext);