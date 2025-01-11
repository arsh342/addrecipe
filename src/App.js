import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars, faUtensils, faList, faPlus, faBlog, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp, faTwitter, faInstagram, faFacebook } from '@fortawesome/free-brands-svg-icons';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('addRecipe');
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [newRecipe, setNewRecipe] = useState({
    title: '',
    description: '',
    ingredients: '',
    steps: '',
    image: null
  });

  useEffect(() => {
    const storedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
    setRecipes(storedRecipes);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecipe(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewRecipe(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedRecipes = [...recipes, newRecipe];
    setRecipes(updatedRecipes);
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
    setNewRecipe({ title: '', description: '', ingredients: '', steps: '', image: null });
    setActiveTab('sharedRecipes');
  };

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleBackClick = () => {
    setSelectedRecipe(null);
  };

  return (
      <div className="min-h-screen flex flex-col bg-gray-100 text-gray-800 font-sans">
        <header className="bg-white shadow-md">
          <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center">
              <img src="https://i.postimg.cc/mDBsM7gV/Untitled-5-2-removebg-preview.png" alt="cookbook" className="w-16 h-16 object-contain mr-2" />
            </div>
            <ul className="hidden md:flex space-x-6">
              <li><a href="https://cookbookrecipes.vercel.app/" className="flex items-center hover:text-CookBookDark transition-colors duration-200">Home</a></li>
              <li><a href="https://cookbookrecipes.vercel.app/meal-index.html" className="flex items-center hover:text-CookBookDark transition-colors duration-200">Recipes</a></li>
              <li><a href="#" className="flex items-center hover:text-CookBookDark transition-colors duration-200">Add Recipes</a></li>
              <li><a href="https://cookbookrecipes.vercel.app/blog-list.html" className="flex items-center hover:text-CookBookDark transition-colors duration-200">Blog</a></li>
            </ul>
            <div className="md:hidden cursor-pointer" onClick={toggleMenu}>
              <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} size="lg" />
            </div>
          </nav>
          {isMenuOpen && (
              <div className="md:hidden bg-white shadow-lg rounded-b-lg">
                <ul className="flex flex-col items-center py-2">
                  <li className="py-2"><a href="https://cookbookrecipes.vercel.app/" className="hover:text-CookBookDark transition-colors duration-200">Home</a></li>
                  <li className="py-2"><a href="https://cookbookrecipes.vercel.app/meal-index.html" className="hover:text-CookBookDark transition-colors duration-200">Recipes</a></li>
                  <li className="py-2"><a href="#" className="hover:text-CookBookDark transition-colors duration-200">Add Recipes</a></li>
                  <li className="py-2"><a href="https://cookbookrecipes.vercel.app/blog-list.html" className="hover:text-CookBookDark transition-colors duration-200">Blog</a></li>
                </ul>
              </div>
          )}
        </header>

        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="flex justify-center mb-8">
            <button
                className={`mr-4 px-6 py-2 rounded-full text-lg font-semibold transition-colors duration-200 ${activeTab === 'addRecipe' ? 'bg-CookBookGreen text-white' : 'bg-white text-CookBookGreen hover:bg-CookBookDark'}`}
                onClick={() => setActiveTab('addRecipe')}
            >
              Add Recipe
            </button>
            <button
                className={`px-6 py-2 rounded-full text-lg font-semibold transition-colors duration-200 ${activeTab === 'sharedRecipes' ? 'bg-CookBookGreen text-white' : 'bg-white text-CookBookGreen hover:bg-CookBookDark'}`}
                onClick={() => setActiveTab('sharedRecipes')}
            >
              Shared Recipes
            </button>
          </div>

          {activeTab === 'addRecipe' && (
              <section className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold mb-6 text-center text-CookBookGreen">Submit Your Recipe</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="recipeTitle" className="block mb-2 font-semibold text-gray-700">Recipe Title</label>
                    <input
                        type="text"
                        id="recipeTitle"
                        name="title"
                        value={newRecipe.title}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-CookBookGreen focus:border-transparent transition duration-200"
                        required
                    />
                  </div>
                  <div>
                    <label htmlFor="recipeDescription" className="block mb-2 font-semibold text-gray-700">Recipe Description</label>
                    <textarea
                        id="recipeDescription"
                        name="description"
                        value={newRecipe.description}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-CookBookGreen focus:border-transparent transition duration-200"
                        rows="3"
                        required
                    ></textarea>
                  </div>
                  <div>
                    <label htmlFor="recipeIngredients" className="block mb-2 font-semibold text-gray-700">Ingredients</label>
                    <textarea
                        id="recipeIngredients"
                        name="ingredients"
                        value={newRecipe.ingredients}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-CookBookGreen focus:border-transparent transition duration-200"
                        rows="4"
                        required
                    ></textarea>
                  </div>
                  <div>
                    <label htmlFor="recipeSteps" className="block mb-2 font-semibold text-gray-700">Preparation Steps</label>
                    <textarea
                        id="recipeSteps"
                        name="steps"
                        value={newRecipe.steps}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-CookBookGreen focus:border-transparent transition duration-200"
                        rows="6"
                        required
                    ></textarea>
                  </div>
                  <div>
                    <label htmlFor="recipeImage" className="block mb-2 font-semibold text-gray-700">Recipe Image</label>
                    <input
                        type="file"
                        id="recipeImage"
                        onChange={handleImageChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-CookBookGreen focus:border-transparent transition duration-200"
                        accept="image/*"
                    />
                  </div>
                  <button type="submit" className="w-full bg-CookBookGreen text-white py-3 rounded-md text-lg font-semibold hover:bg-CookBookGreen transition duration-200">
                    Submit Recipe
                  </button>
                </form>
              </section>
          )}

          {activeTab === 'sharedRecipes' && (
              <section className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold mb-6 text-center text-CookBookGreen">Shared Recipes</h2>
                {selectedRecipe ? (
                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md">
                      <div className="p-6">
                        <button onClick={handleBackClick} className="mb-4 flex items-center text-CookBookGreen hover:text-CookBookDark transition duration-200">
                          <FontAwesomeIcon icon={faChevronLeft} className="mr-2" />
                          Back to recipes
                        </button>
                        {selectedRecipe.image && <img src={selectedRecipe.image} alt={selectedRecipe.title} className="w-full h-64 object-cover rounded-lg mb-4" />}
                        <h3 className="text-2xl font-semibold text-CookBookGreen mb-2">{selectedRecipe.title}</h3>
                        <p className="text-gray-600 mb-4">{selectedRecipe.description}</p>
                        <h4 className="font-semibold text-gray-700 mb-2">Ingredients:</h4>
                        <p className="text-gray-600 mb-4">{selectedRecipe.ingredients}</p>
                        <h4 className="font-semibold text-gray-700 mb-2">Steps:</h4>
                        <p className="text-gray-600">{selectedRecipe.steps}</p>
                      </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {recipes.map((recipe, index) => (
                          <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 cursor-pointer" onClick={() => handleRecipeClick(recipe)}>
                            {recipe.image && <img src={recipe.image} alt={recipe.title} className="w-full h-48 object-cover" />}
                            <div className="p-6">
                              <h3 className="text-xl font-semibold text-CookBookGreen mb-2">{recipe.title}</h3>
                              <p className="text-gray-600 line-clamp-3">{recipe.description}</p>
                            </div>
                          </div>
                      ))}
                    </div>
                )}
              </section>
          )}
        </main>

        <footer className="bg-CookBookGreen text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h5 className="font-bold text-lg mb-4">Explore</h5>
                <ul className="space-y-2">
                  <li><a href="https://cookbookrecipes.vercel.app/" className="hover:underline transition duration-200">Home</a></li>
                  <li><a href="https://cookbookrecipes.vercel.app/meal-index.html" className="hover:underline transition duration-200">Recipes</a></li>
                  <li><a href="#" className="hover:underline transition duration-200">Add Recipes</a></li>
                  <li><a href="https://cookbookrecipes.vercel.app/blog-list.html" className="hover:underline transition duration-200">Blog</a></li>
                </ul>
              </div>
              <div>
                <h5 className="font-bold text-lg mb-4">Learn</h5>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:underline transition duration-200">About</a></li>
                </ul>
              </div>
              <div>
                <h5 className="font-bold text-lg mb-4">Legal</h5>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:underline transition duration-200">Privacy Policy</a></li>
                </ul>
              </div>
              <div>
                <h5 className="font-bold text-lg mb-4">Subscribe to our newsletter</h5>
                <p className="mb-4">Monthly digest of what's new and exciting from us.</p>
                <form className="flex">
                  <input type="email" placeholder="Email address" className="flex-grow p-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-300" />
                  <button type="submit" className="bg-white text-CookBookGreen px-4 py-2 rounded-r-md font-semibold hover:bg-gray-100 transition duration-200">
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-CookBookDark flex flex-col sm:flex-row justify-between items-center">
              <p>&copy; 2024 Cookbook, Inc. All rights reserved.</p>
              <div className="flex space-x-6 mt-4 sm:mt-0">
                <a href="#" className="text-2xl hover:text-green-200 transition duration-200"><FontAwesomeIcon icon={faWhatsapp} /></a>
                <a href="#" className="text-2xl hover:text-green-200 transition duration-200"><FontAwesomeIcon icon={faTwitter} /></a>
                <a href="#" className="text-2xl hover:text-green-200 transition duration-200"><FontAwesomeIcon icon={faInstagram} /></a>
                <a href="#" className="text-2xl hover:text-green-200 transition duration-200"><FontAwesomeIcon icon={faFacebook} /></a>
              </div>
            </div>
          </div>
        </footer>
      </div>
  );
};

export default App;
