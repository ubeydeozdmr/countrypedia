import useLocalStorage from './useLocalStorage';

function useSaveCountries() {
  const { setItem, getItem } = useLocalStorage();

  function saveCountry(code: string) {
    const favourites = getItem('favourites');
    if (favourites) {
      setItem('favourites', JSON.stringify([...JSON.parse(favourites), code]));
    } else {
      setItem('favourites', JSON.stringify([code]));
    }
  }

  function isCountrySaved(code: string) {
    const favourites = getItem('favourites');
    if (favourites) {
      return JSON.parse(favourites).includes(code);
    }
    return false;
  }

  function getSavedCountries() {
    const favourites = getItem('favourites');
    if (favourites) {
      return JSON.parse(favourites);
    }
    return [];
  }

  function deleteSavedCountry(code: string) {
    const favourites = getItem('favourites');
    if (favourites) {
      setItem(
        'favourites',
        JSON.stringify(
          JSON.parse(favourites).filter((c: string) => c !== code),
        ),
      );
    }
  }

  function clearSavedCountries() {
    setItem('favourites', JSON.stringify([]));
  }

  return {
    saveCountry,
    isCountrySaved,
    getSavedCountries,
    deleteSavedCountry,
    clearSavedCountries,
  };
}

export default useSaveCountries;
