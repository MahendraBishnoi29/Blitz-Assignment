/* eslint-disable react/prop-types */

export const UniversityCard = ({ title, website, country }) => {
  return (
    <div className="w-full mb-4 p-4 border border-gray-600 rounded-lg shadow hover:bg-gray-700 bg-gray-800">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {title} <span className="font-medium">({country})</span>
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        Website:{" "}
        <a
          href={website}
          target="_blank"
          rel="noreferrer"
          className="text-blue-500"
        >
          {website}
        </a>
      </p>
    </div>
  );
};

export const Shimmer = () => {
  return (
    <div className="relative w-[400px] overflow-hidden h-[130px] mb-4 p-4 border border-gray-600 rounded-lg shadow bg-gray-800">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-800 animate-shimmer"></div>
    </div>
  );
};
