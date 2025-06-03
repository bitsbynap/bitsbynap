import { useNavigate } from 'react-router-dom';

const Card = ({ title, description, image, serviceId }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/services/${serviceId}`, { state: { title, description, image } });
  };

  return (
    <div 
      onClick={handleClick}
      className="bg-white dark:bg-dark-card rounded-2xl shadow-xl h-full transition-transform duration-500 hover:scale-105 hover:shadow-2xl overflow-hidden group relative cursor-pointer"
    >
      {image && (
        <div className="h-52 w-full overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 relative z-10"
          />
        </div>
      )}
      <div className="p-6 relative z-10">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
        {/* Optional buttons or links */}
        {/* <div className="flex gap-4">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">Demo</button>
          <button className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition">Code</button>
        </div> */}
      </div>
    </div>
  );
};

export default Card;
