import { useState, useEffect } from "react";

const UniversitySearch = () => {
  const [country, setCountry] = useState("");
  const [universities, setUniversities] = useState([]);
  const [highestCount, setHighestCount] = useState(0);
  const [lowestCount, setLowestCount] = useState(0);
  const [countryWithHighestCount, setCountryWithHighestCount] = useState("");
  const [countryWithLowestCount, setCountryWithLowestCount] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [noData, setNoData] = useState(false);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      // Fetch universities based on the country
      if (debouncedSearch) {
        setLoading(true);
        setNoData(false);
        fetch(
          `http://universities.hipolabs.com/search?country=${debouncedSearch}`
        )
          .then((response) => response.json())
          .then((data) => {
            setUniversities(data);
            calculateCounts(data);
            setLoading(false);
            if (data.length === 0) {
              setNoData(true);
            }
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
            setLoading(false);
            setNoData(true);
          });
      } else {
        setUniversities([]);
        setHighestCount(0);
        setLowestCount(0);
        setCountryWithHighestCount("");
        setCountryWithLowestCount("");
        setLoading(false);
        setNoData(false);
      }
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [debouncedSearch]);

  console.log("cccc ", country);

  const calculateCounts = (data) => {
    // highest and lowest counts
    const counts = data.reduce((acc, university) => {
      acc[university.country] = (acc[university.country] || 0) + 1;
      return acc;
    }, {});

    const countries = Object.keys(counts);
    setHighestCount(Math.max(...countries.map((country) => counts[country])));
    setLowestCount(Math.min(...countries.map((country) => counts[country])));

    // Find country with the highest and lowest counts
    const countryHighest = Object.keys(counts).find(
      (country) => counts[country] === highestCount
    );
    const countryLowest = Object.keys(counts).find(
      (country) => counts[country] === lowestCount
    );

    setCountryWithHighestCount(countryHighest);
    setCountryWithLowestCount(countryLowest);
  };

  const handleInputChange = (event) => {
    setCountry(event.target.value);
    setDebouncedSearch(event.target.value);
  };

  return (
    <div className="w-full px-6 py-3 flex flex-col items-center justify-cente shadow-md">
      <h1 className="text-3xl font-bold mb-4 text-white">
        University Search 🏫
      </h1>
      <div className="flex flex-col">
        <label className="text-zinc-200">Enter Country:</label>{" "}
        <input
          type="text"
          placeholder="enter country name..."
          value={country}
          onChange={handleInputChange}
          className="border rounded-lg border-gray-300 p-2 text-black w-full"
        />
      </div>
      <div className="my-4">
        <h2 className="text-xl text-zinc-200 font-bold mb-2">
          Total Universities in {country}:{" "}
          <span className="text-indigo-300">{universities.length}</span>
        </h2>
        <p className="text-lg text-gray-400">Highest Count: {highestCount}</p>
        <p className="text-lg text-gray-400">Lowest Count: {lowestCount}</p>
      </div>
      {loading && (
        <p className="text-lg text-white font-bold mb-4">Loading...</p>
      )}
      {noData && !loading && (
        <p className="text-lg text-white font-bold my-8">
          No results found for {debouncedSearch}
        </p>
      )}
      {!loading && !noData && universities.length === 0 && (
        <p className="text-lg text-white mt-11">
          Enter a country name to search for universities.
        </p>
      )}
      <div className="flex items-center flex-col justify-center">
        {universities?.length && (
          <h2 className="text-white text-4xl mb-6">Search Results 👇🏻</h2>
        )}
        <ul className="flex items-start flex-col justify-center">
          {universities.length > 0 &&
            universities.map((university, index) => (
              <li key={index} className="mb-4 text-indigo-200">
                {index + 1}.&nbsp;<strong>{university.name}</strong> (
                {university.country})
                <br />
                <span className="italic font-light">Website: </span>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href={university.web_pages[0]}
                  className="text-blue-500"
                >
                  {university.web_pages[0]}
                </a>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default UniversitySearch;
