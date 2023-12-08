import { useState, useEffect } from "react";

const AllUniversities = () => {
  const [universities, setUniversities] = useState([]);

  useEffect(() => {
    // Fetch all universities
    fetch(
      "https://uni-backend-bza3.onrender.com/api/universities/search?country="
    )
      .then((response) => response.json())
      .then((data) => setUniversities(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="container mx-auto mt-8 p-8 bg-gray-200 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">
        All Universities Across Countries
      </h1>
      {universities.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">University</th>
              <th className="py-2 px-4 border-b">Country</th>
              <th className="py-2 px-4 border-b">Website</th>
            </tr>
          </thead>
          <tbody>
            {universities.map((university, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b">{university.name}</td>
                <td className="py-2 px-4 border-b">{university.country}</td>
                <td className="py-2 px-4 border-b">
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href={university.web_pages[0]}
                    className="text-blue-500"
                  >
                    {university.web_pages[0]}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-lg font-bold">Loading...</p>
      )}
    </div>
  );
};

export default AllUniversities;
