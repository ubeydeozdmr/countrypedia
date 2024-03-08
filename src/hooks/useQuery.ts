import React from 'react';
import { useLocation } from 'react-router-dom';

export function useQuery(): URLSearchParams {
  const { search } = useLocation();

  return React.useMemo(() => {
    return new URLSearchParams(search);
  }, [search]);
}
