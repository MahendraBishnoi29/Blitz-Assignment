import { useState, useEffect } from "react";

const UniversitySearch = () => {
  const [country, setCountry] = useState("");
  const [universities, setUniversities] = useState([]);
  const [highestCount, setHighestCount] = useState(0);
  const [lowestCount, setLowestCount] = useState(0);
  const [countryWithHighestCount, setCountryWithHighestCount] = useState("");
  const [countryWithLowestCount, setCountryWithLowestCount] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (debouncedSearch) {
        fetch(
          `http://universities.hipolabs.com/search?country=${debouncedSearch}`
        )
          .then((response) => response.json())
          .then((data) => {
            setUniversities(data);
            calculateCounts(data);
          })
          .catch((error) => console.error("Error fetching data:", error));
      }
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [debouncedSearch]);

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
    <div>
      <h1>University Search</h1>
      <label>
        Enter Country:
        <input type="text" value={country} onChange={handleInputChange} />
      </label>
      <div>
        <h2>Total Universities: {universities.length}</h2>
        <h3>
          Highest Count: {highestCount} ({countryWithHighestCount})
        </h3>
        <h3>
          Lowest Count: {lowestCount} ({countryWithLowestCount})
        </h3>
      </div>
      <ul>
        {universities.map((university, index) => (
          <li key={index}>
            <strong>{university.name}</strong> ({university.country})
            <br />
            Website: {university.web_pages[0]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UniversitySearch;
