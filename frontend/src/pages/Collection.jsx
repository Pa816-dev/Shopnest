import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [availableSubCategories, setAvailableSubCategories] = useState([]);
  const [sortType, setSortType] = useState('relevant');

  const categoriesWithSubCategories = {
    Kitchen: ['Induction','Mixer', 'Water Purifiers'],
    'Home Decor': ['Show Piece', 'Spiritual Decor', 'Wall Decor'],
    Furniture: ['Bed',  'Dining', 'Wardrobes & Dressing'],
    'Cook Ware': ['Gas Stoves', 'Pressure Cooker'],
  };

  const toggleCategory = (e) => {
    const selectedCategory = e.target.value;

    if (category.includes(selectedCategory)) {
      setCategory(prev => prev.filter(item => item !== selectedCategory));
      setAvailableSubCategories([]); // Reset available subcategories
    } else {
      setCategory(prev => [...prev, selectedCategory]);
      setAvailableSubCategories(categoriesWithSubCategories[selectedCategory] || []);
      setSubCategory([]); // Reset subcategory when category changes
    }
  };

  const toggleSubCategory = (e) => {
    const selectedSubCategory = e.target.value;

    if (subCategory.includes(selectedSubCategory)) {
      setSubCategory(prev => prev.filter(item => item !== selectedSubCategory));
    } else {
      setSubCategory(prev => [...prev, selectedSubCategory]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    }

    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case 'high-low':
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
      {/* Filter Options */}
      <div className='min-w-60'>
        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
        </p>
        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            {Object.keys(categoriesWithSubCategories).map(cat => (
              <p className='flex gap-2' key={cat}>
                <input className='w-3' type="checkbox" value={cat} onChange={toggleCategory} /> {cat}
              </p>
            ))}
          </div>
        </div>
        {/* SubCategory Filter */}
        {availableSubCategories.length > 0 && (
          <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
            <p className='mb-3 text-sm font-medium'>TYPE</p>
            <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
              {availableSubCategories.map(subCat => (
                <p className='flex gap-2' key={subCat}>
                  <input className='w-3' type="checkbox" value={subCat} onChange={toggleSubCategory} /> {subCat}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Side */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTIONS'} />
          {/* Product Sort */}
          <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Map Products */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {filterProducts.map((item, index) => (
            <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
