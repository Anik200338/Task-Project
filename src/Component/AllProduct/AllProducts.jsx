import React, { useState, useEffect } from 'react';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import ProductCard from '../ProductCard/ProductCard';

const AllProducts = () => {
  const axiosPublic = useAxiosPublic();
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState(''); // Separate state for input field
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [brand, setBrand] = useState('');
  const [sort, setSort] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axiosPublic.get(
          `/products?search=${search}&category=${category}&minPrice=${priceRange.min}&maxPrice=${priceRange.max}&brand=${brand}&sort=${sort}&page=${page}&limit=10`
        );
        setProducts(res.data.products);
        setTotalPages(res.data.totalPages);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [search, category, priceRange, brand, sort, page, axiosPublic]);

  const handleSearch = e => {
    e.preventDefault();
    setSearch(searchInput); // Update search state with input value
    setPage(1); // Reset page to 1 when searching
  };

  const handleCategoryChange = e => {
    setCategory(e.target.value);
    setPage(1); // Reset page to 1 when category changes
  };

  const handleBrandChange = e => {
    setBrand(e.target.value);
    setPage(1); // Reset page to 1 when brand changes
  };

  const handlePriceRangeChange = e => {
    const { name, value } = e.target;
    setPriceRange(prevState => ({
      ...prevState,
      [name]: value,
    }));
    setPage(1); // Reset page to 1 when price range changes
  };

  const handleSortChange = e => {
    setSort(e.target.value);
    setPage(1); // Reset page to 1 when sorting changes
  };

  const handleReset = () => {
    setSearch('');
    setSearchInput(''); // Reset the search input field
    setCategory('');
    setPriceRange({ min: '', max: '' });
    setBrand('');
    setSort('');
    setPage(1); // Reset page to 1 when resetting filters
  };

  const handlePageChange = newPage => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSearch} className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Search here..."
          name="search"
          value={searchInput} // Bind the input field to searchInput
          onChange={e => setSearchInput(e.target.value)} // Update the input field state
          className="input input-bordered w-full max-w-xs mr-2"
        />
        <button className="btn btn-warning" type="submit">
          Search
        </button>
        <button
          type="button"
          className="btn btn-secondary ml-2"
          onClick={handleReset}
        >
          Reset
        </button>
      </form>
      <div className="flex mb-4 justify-center">
        <select
          onChange={handleCategoryChange}
          value={category}
          className="select select-bordered w-full max-w-xs mr-2"
        >
          <option value="">All Categories</option>
          {/* Add more categories as needed */}
          <option value="Mobile Phones">Mobile Phones</option>
          <option value="Laptops">Laptops</option>
          <option value="Televisions">Televisions</option>
          <option value="Headphones">Headphones</option>
          <option value="Speakers">Speakers</option>
          <option value="Wearables">Wearables</option>
          <option value="Cycling Accessories">Cycling Accessories</option>
          <option value="Computer Accessories">Computer Accessories</option>
          <option value="Computer Components">Computer Components</option>
          <option value="Graphics Cards">Graphics Cards</option>
          <option value="Computer Cases">Computer Cases</option>
          <option value="Tablets">Tablets</option>
          <option value="Smart Home">Smart Home</option>
          <option value="Monitors">Monitors</option>
          <option value="Cameras">Cameras</option>
          <option value="Desktop Computers">Desktop Computers</option>
          <option value="Electric Vehicles">Electric Vehicles</option>
          <option value="Desktops">Desktops</option>
          <option value="Cooling">Cooling</option>
          <option value="Gaming Accessories">Gaming Accessories</option>
        </select>
        <select
          onChange={handleBrandChange}
          value={brand}
          className="select select-bordered w-full max-w-xs mr-2"
        >
          <option value="">All Brands</option>
          {/* Add more brands as needed */}
          <option value="Apple">Apple</option>
          <option value="Samsung">Samsung</option>
          <option value="Google">Google</option>
          <option value="Dell">Dell</option>
          <option value="OnePlus">OnePlus</option>
          <option value="HP">HP</option>
          <option value="Xiaomi">Xiaomi</option>
          <option value="Lenovo">Lenovo</option>
          <option value="Sony">Sony</option>
          <option value="Bose">Bose</option>
          <option value="Garmin">Garmin</option>
          <option value="JBL">JBL</option>
          <option value="Jabra">Jabra</option>
          <option value="Ultimate Ears">Ultimate Ears</option>
          <option value="Marshall">Marshall</option>
          <option value="Razer">Razer</option>
          <option value="Logitech">Logitech</option>
          <option value="Corsair">Corsair</option>
          <option value="Asus">Asus</option>
          <option value="NZXT">NZXT</option>
        </select>
        <input
          type="number"
          placeholder="Min Price"
          name="min"
          value={priceRange.min}
          onChange={handlePriceRangeChange}
          className="input input-bordered w-full max-w-xs mr-2"
        />
        <input
          type="number"
          placeholder="Max Price"
          name="max"
          value={priceRange.max}
          onChange={handlePriceRangeChange}
          className="input input-bordered w-full max-w-xs"
        />
        <select
          onChange={handleSortChange}
          value={sort}
          className="select select-bordered w-full max-w-xs"
        >
          <option value="">Sort By</option>
          <option value="priceAsc">Price: Low to High</option>
          <option value="priceDesc">Price: High to Low</option>
          <option value="dateDesc">Date Added: Newest First</option>
        </select>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="btn btn-primary mr-2"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`btn ${
                  page === index + 1 ? 'btn-primary' : 'btn-secondary'
                } mx-1`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className="btn btn-primary ml-2"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllProducts;
