import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Shimmer, UniversityCard } from "./UniversityCard";

const UniversitySearch = () => {
  const [country, setCountry] = useState("");
  const [universities, setUniversities] = useState([]);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [noData, setNoData] = useState(false);

  const apiUrl = `https://uni-backend-bza3.onrender.com/api/universities/search?country=${debouncedSearch}`;

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      // Fetch universities based on the country
      if (debouncedSearch) {
        setLoading(true);
        setNoData(false);
        fetch(apiUrl, {
          headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setUniversities(data);

            setLoading(false);
            if (data.length === 0) {
              setNoData(true);
            }
          })
          .catch((error) => {
            console.error("Error fetching data:", error.message);
            setLoading(false);
            setNoData(true);
          });
      } else {
        setUniversities([]);
        setLoading(false);
        setNoData(false);
      }
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [debouncedSearch]);

  const handleInputChange = (event) => {
    setCountry(event.target.value);
    setDebouncedSearch(event.target.value);
  };

  return (
    <>
      <div className="w-full px-6 py-3 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4 text-white">
          University Search 🏫
        </h1>
        <Link to="/all-universities" className="underline mb-5 text-blue-500">
          {" "}
          Click Here to All see Universities by Country
        </Link>
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
            Total Universities:{" "}
            <span className="text-indigo-300">{universities.length}</span>
          </h2>
          {/* <p className="text-lg text-gray-400">Highest Count: {highestCount}</p>
        <p className="text-lg text-gray-400">Lowest Count: {lowestCount}</p> */}
        </div>

        {noData && !loading && (
          <p className="text-lg text-white font-bold my-8">No results found</p>
        )}
        {!loading && !noData && universities.length === 0 && (
          <p className="text-lg text-white mt-11">
            Enter a country name to search for universities.
          </p>
        )}
        <div className="">
          {/* {universities?.length && (
            <h2 className="text-white text-4xl mb-6">Search Results 👇🏻</h2>
          )} */}
          <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {universities.length > 0
              ? universities.map((university, index) => (
                  <div className="flex" key={index}>
                    <UniversityCard
                      title={university.name}
                      country={university.country}
                      website={university.web_pages[0]}
                    />
                  </div>
                ))
              : null}
          </ul>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {loading &&
              Array.from({ length: 10 }, (_, i) => <Shimmer key={i} />)}
          </div>
        </div>
      </div>
    </>
  );
};

export default UniversitySearch;
