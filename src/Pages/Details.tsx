import React, { useEffect, useState, FC } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface ProductAttributes {
  title: string;
  price: number;
  image: string;
  description: string;
  colors: string[];
}

interface Product {
  id: string;
  attributes: ProductAttributes;
}

const Details: FC = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const [color, setColor] = useState<string>('');
  const [amount, setAmount] = useState<number>(1);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    axios.get(`https://strapi-store-server.onrender.com/api/products/${id}`)
      .then(response => {
        if (response.status === 200) {
          setProduct(response.data.data);
          setColor(response.data.data.attributes.colors[0]);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, [id]);

  function addToCart() {
    if (!product) return;
    alert('Added to cart!');
  }
  return (
    <div className="p-8 flex gap-8">
      {product && (
        <>
          <img src={product.attributes.image} alt={product.attributes.title} className="mr-10 rounded-md h-[370px] w-[510px] object-cover" />
          <div className="details">
            <h2 className="text-3xl mb-3 text-black font-semibold">{product.attributes.title}</h2>
            <h2 className='text-[20px] text-gray-500'>Luxora</h2>
            <h3 className="text-xl mb-3 text-gray-500">${product.attributes.price}</h3>
            <p className="text-gray-500 mb-5 w-[480px]">{product.attributes.description}</p>
            
            <div className="mb-4">
              <h4 className="font-semibold mt-10 mb-2 text-gray-600">Colors</h4>
              <div className="flex gap-2">
                {product.attributes.colors.map((colorProduct) => (
                  <span
                    key={colorProduct}
                    style={{
                      backgroundColor: colorProduct,
                      border: color === colorProduct ? '2px solid black' : 'none',
                    }}
                    className="block w-6 h-6 rounded-full cursor-pointer"
                    onClick={() => setColor(colorProduct)}
                  ></span>
                ))}
              </div>
            </div>
            
            <div className="mb-4">
              <h4 className="font-semibold text-gray-600 mb-3">Amount</h4>
              <select
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="text-slate-950 border w-72 p-3 rounded"
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>
            <button onClick={addToCart} className="bg-blue-500 text-white px-4 py-2 rounded">ADD TO BAG</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Details;
