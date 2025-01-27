import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Pagination, Stack } from '@mui/material';

type Product = {
  id: number;
  attributes: {
    image: string;
    title: string;
    price: number;
    category: string;
    company: string;
  };
};

const Products: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCompany, setSelectedCompany] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    axios
      .get('https://strapi-store-server.onrender.com/api/products')
      .then((response) => {
        if (response.status === 200) {
          setProducts(response.data.data);
          setFilteredProducts(response.data.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleFilter = () => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.attributes.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(
        (product) => product.attributes.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (selectedCompany !== 'all') {
      filtered = filtered.filter(
        (product) => product.attributes.company.toLowerCase() === selectedCompany.toLowerCase()
      );
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedCompany('all');
    setFilteredProducts(products);
    setCurrentPage(1);
  };

  useEffect(() => {
    handleFilter();
  }, [searchTerm, selectedCategory, selectedCompany]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="bg-white text-black min-h-screen">
      <div className="flex gap-6 justify-center py-5 bg-gray-100 shadow-md">
        <label className="input input-bordered flex items-center gap-2 text-black">
          <input
            type="text"
            className="grow placeholder-gray-600 text-black"
            placeholder="Search product"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </label>

        <select
          className="select select-bordered w-full max-w-xs text-black border-gray-400"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="Kids">Kids</option>
          <option value="Tables">Tables</option>
          <option value="Chairs">Chairs</option>
          <option value="Sofas">Sofas</option>
          <option value="Beds">Beds</option>
        </select>

        <select
          className="select select-bordered w-full max-w-xs text-black border-gray-400"
          value={selectedCompany}
          onChange={(e) => setSelectedCompany(e.target.value)}
        >
          <option value="all">All Companies</option>
          <option value="Modenza">Modenza</option>
          <option value="Luxora">Luxora</option>
          <option value="Artifex">Artifex</option>
          <option value="Comfora">Comfora</option>
          <option value="Homestead">Homestead</option>
        </select>

        <button
          className="btn bg-blue-500 text-white px-4 py-2 rounded-lg"
          onClick={resetFilters}
        >
          Reset Filters
        </button>
      </div>

      <div className="grid grid-cols-3 gap-8 p-8">
        {currentItems.map((product) => (
          <div key={product.id} className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300">
            <Link to={`/products/${product.id}`}>
              <img
                src={product.attributes.image}
                alt={product.attributes.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-black">{product.attributes.title}</h2>
                <p className="text-gray-700">${product.attributes.price}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <Stack spacing={2} alignItems="center" className="mt-4">
        <Pagination
          count={Math.ceil(filteredProducts.length / itemsPerPage)}
          page={currentPage}
          onChange={(_, value) => setCurrentPage(value)}
          color="primary"
          variant="outlined"
          shape="rounded"
        />
      </Stack>
    </div>
  );
};

export default Products;
