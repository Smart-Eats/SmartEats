import React from 'react';

const FoodDetail = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-green-800 mb-2">Nutrition Finder</h1>
          <p className="text-lg text-gray-600">Discover the nutritional value of your favorite foods</p>
        </header>
        
        {/* Search Section */}
        <div className="mb-12">
          <div className="relative flex items-center max-w-xl mx-auto shadow-lg rounded-full bg-white">
            <input
              type="text"
              placeholder="Search for a food (e.g., banana, paneer, dosa...)"
              className="w-full py-4 px-6 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button className="absolute right-2 bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Food Result */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Basic Info */}
          <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-start">
            <div className="mb-4 sm:mb-0 sm:mr-6 flex-shrink-0 bg-yellow-100 p-4 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
              </svg>
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Banana</h2>
              <p className="text-gray-600 max-w-md">A sweet, elongated, yellow fruit rich in potassium and other essential nutrients.</p>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100 mx-6"></div>

          {/* Nutrition Facts */}
          <div className="p-6 sm:p-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Nutrition Facts <span className="text-sm font-normal text-gray-500">(per 100g)</span></h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {/* Calories */}
              <div className="bg-green-50 p-4 rounded-xl text-center">
                <div className="text-2xl font-bold text-green-700">89</div>
                <div className="text-sm text-gray-600 mt-1">Calories</div>
              </div>
              
              {/* Fat */}
              <div className="bg-blue-50 p-4 rounded-xl text-center">
                <div className="text-2xl font-bold text-blue-700">0.3g</div>
                <div className="text-sm text-gray-600 mt-1">Fat</div>
              </div>
              
              {/* Carbs */}
              <div className="bg-yellow-50 p-4 rounded-xl text-center">
                <div className="text-2xl font-bold text-yellow-700">23g</div>
                <div className="text-sm text-gray-600 mt-1">Carbs</div>
              </div>
              
              {/* Protein */}
              <div className="bg-red-50 p-4 rounded-xl text-center">
                <div className="text-2xl font-bold text-red-700">1.1g</div>
                <div className="text-sm text-gray-600 mt-1">Protein</div>
              </div>
              
              {/* Fiber */}
              <div className="bg-purple-50 p-4 rounded-xl text-center">
                <div className="text-2xl font-bold text-purple-700">2.6g</div>
                <div className="text-sm text-gray-600 mt-1">Fiber</div>
              </div>
              
              {/* Sugar */}
              <div className="bg-pink-50 p-4 rounded-xl text-center">
                <div className="text-2xl font-bold text-pink-700">12g</div>
                <div className="text-sm text-gray-600 mt-1">Sugar</div>
              </div>
              
              {/* Potassium */}
              <div className="bg-indigo-50 p-4 rounded-xl text-center">
                <div className="text-2xl font-bold text-indigo-700">358mg</div>
                <div className="text-sm text-gray-600 mt-1">Potassium</div>
              </div>
              
              {/* Vitamin C */}
              <div className="bg-orange-50 p-4 rounded-xl text-center">
                <div className="text-2xl font-bold text-orange-700">8.7mg</div>
                <div className="text-sm text-gray-600 mt-1">Vitamin C</div>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-gray-50 p-6 sm:p-8">
            <h4 className="font-medium text-gray-800 mb-3">Health Benefits</h4>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              <li>Rich in potassium which supports heart health</li>
              <li>Good source of fiber for digestive health</li>
              <li>Contains antioxidants that may reduce inflammation</li>
              <li>Provides quick energy from natural sugars</li>
            </ul>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-xs text-gray-500 mt-8">
          Nutritional values may vary depending on size and ripeness.
        </p>
      </div>
    </div>
  );
};

export default FoodDetail;