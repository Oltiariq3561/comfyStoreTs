import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

type Product = {
  id: number;
  attributes: {
    image: string;
    title: string;
    price: number;
  };
};

const Products: FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get('https://strapi-store-server.onrender.com/api/products')
      .then((response) => {
        if (response.status === 200) {
          setProducts(response.data.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  return (
    <div>
      <form
        method="get"
        action="/products"
        className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center"
      >
        <div className="form-control">
          <label htmlFor="search" className="label">
            <span className="label-text capitalize">Search Product</span>
          </label>
          <input type="search" name="search" className="input input-bordered input-sm" defaultValue="" />
        </div>

        <div className="form-control">
          <label htmlFor="category" className="label">
            <span className="label-text capitalize">Select Category</span>
          </label>
          <select name="category" id="category" className="select select-bordered select-sm">
            <option value="all">All</option>
            <option value="Tables">Tables</option>
            <option value="Chairs">Chairs</option>
            <option value="Kids">Kids</option>
            <option value="Sofas">Sofas</option>
            <option value="Beds">Beds</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary btn-sm">
          Search
        </button>
        <a className="btn btn-accent btn-sm" href="/products">
          Reset
        </a>
      </form>

      <div className="grid grid-cols-3 gap-8 p-8">
        {products.map((product) => (
          <div key={product.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <Link to={`/products/${product.id}`}>
              <img
                src={product.attributes.image}
                alt={product.attributes.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-700">{product.attributes.title}</h2>
                <p className="text-gray-500">${product.attributes.price}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
