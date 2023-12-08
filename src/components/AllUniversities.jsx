import { useState, useEffect } from "react";
import { Shimmer, UniversityCard } from "./UniversityCard";

const AllUniversities = () => {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch all universities
    setLoading(true);
    fetch(
      "https://uni-backend-bza3.onrender.com/api/universities/search?country="
    )
      .then((response) => response.json())
      .then((data) => setUniversities(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="p-8 w-full">
      <h1 className="text-3xl font-bold mb-8 text-white">
        All Universities Across Countries
      </h1>
      <div className="w-full grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {universities.length > 0
          ? universities.map((university, index) => (
              <UniversityCard
                key={index}
                title={university.name}
                country={university.country}
                website={university.web_pages[0]}
              />
            ))
          : Array.from({ length: 12 }, (_, i) => <Shimmer key={i} />)}
      </div>
    </div>
  );
};

export default AllUniversities;
