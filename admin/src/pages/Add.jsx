import React, { useState } from 'react';
import { assets } from '../assets/assets';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [bestseller, setBestseller] = useState(false);
  // const [sizes, setSizes] = useState([]);
  const [subCategories, setSubCategories] = useState([]); // State for subcategories

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);

    if (selectedCategory === 'Kitchen') {
      setSubCategories(['Induction', 'Mixer', 'Water Purifiers']);
    } else if (selectedCategory === 'Home Decor') {
      setSubCategories(['Show Piece', 'Spiritual Decor', 'Wall Decor']);
    }  else if (selectedCategory === 'Furniture') {
        setSubCategories(['Bed', 'Dining', 'Wardrobes & Dressing']);
    }  else if (selectedCategory === 'Cook Ware') {
        setSubCategories(['Pressure Cooker', 'Gas Stoves']);
    } else {
      setSubCategories([]); // Reset if no valid category
    }

    setSubCategory(''); // Reset subcategory when category changes
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      // formData.append("sizes", JSON.stringify(sizes));

      if (image1) formData.append("image1", image1);
      if (image2) formData.append("image2", image2);
      if (image3) formData.append("image3", image3);
      if (image4) formData.append("image4", image4);

      const response = await axios.post(backendUrl + "/api/product/add", formData, { headers: { token } });

      if (response.data.success) {
        toast.success(response.data.message);
        // Reset fields after successful submission
        setName('');
        setDescription('');
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice('');
        setCategory('');
        setSubCategory('');
        // setSizes([]);
      } else {
        toast.error(response.data.message);
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
      <div>
        <p className='mb-2'>Upload Image</p>
        <div className='flex gap-2'>
          {[image1, image2, image3, image4].map((image, index) => (
            <label htmlFor={`image${index + 1}`} key={index}>
              <img className='w-20' src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="" />
              <input onChange={(e) => {
                switch (index) {
                  case 0: setImage1(e.target.files[0]); break;
                  case 1: setImage2(e.target.files[0]); break;
                  case 2: setImage3(e.target.files[0]); break;
                  case 3: setImage4(e.target.files[0]); break;
                  default: break;
                }
              }} type="file" id={`image${index + 1}`} hidden />
            </label>
          ))}
        </div>
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product name</p>
        <input onChange={(e) => setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type here' required />
      </div>

      <div className='w-full'>
        <p className='mb-2'>Product description</p>
        <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2' placeholder='Write content here' required />
      </div>

      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <p className='mb-2'>Product category</p>
          <select onChange={handleCategoryChange} className='w-full px-3 py-2'>
            <option value="">Select Category</option>
            <option value="Kitchen">Kitchen</option>
            <option value="Home Decor">Home Decor</option>
            <option value="Furniture">Furniture</option>
            <option value="Cook Ware">Cook Ware</option>
          </select>
        </div>

        <div>
          <p className='mb-2'>Sub category</p>
          <select onChange={(e) => setSubCategory(e.target.value)} className='w-full px-3 py-2' value={subCategory}>
            <option value="">Select Subcategory</option>
            {subCategories.map((subCat) => (
              <option key={subCat} value={subCat}>{subCat}</option>
            ))}
          </select>
        </div>

        <div>
          <p className='mb-2'>Product Price</p>
          <input onChange={(e) => setPrice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px]' type="number" placeholder='25' />
        </div>
      </div>

      {/* <div>
        <p className='mb-2'>Product Sizes</p>
        <div className='flex gap-3'>
          {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
            <div key={size} onClick={() => setSizes(prev => prev.includes(size) ? prev.filter(item => item !== size) : [...prev, size])}>
              <p className={`${sizes.includes(size) ? "bg-pink-100" : "bg-slate-200"} px-3 py-1 cursor-pointer`}>{size}</p>
            </div>
          ))}
        </div>
      </div> */}

      <div className='flex gap-2 mt-2'>
        <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} type="checkbox" id='bestseller' />
        <label className='cursor-pointer' htmlFor="bestseller">Add to bestseller</label>
      </div>

      <button type="submit" className='w-28 py-3 mt-4 bg-black text-white'>ADD</button>
    </form>
  );
}

export default Add;
