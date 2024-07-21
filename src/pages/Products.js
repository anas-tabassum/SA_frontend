import React, { useState, useEffect } from "react";
import "../App.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("Loading...");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    setUserId(localStorage.getItem("id"));
  }, []);

  useEffect(() => {
    if (userId) {
      fetch(`https://sa-backend-7q7c.onrender.com/products?id=${userId}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.status === "success") {
            setProducts(data.products);

            if (data.products.length === 0) {
              setMessage("No products found");
            }
          } else {
            console.error("Failed to fetch products");
          }
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
    } else {
      console.log("Please try to login again");
    }
  }, [userId]);

  const handleDelete = (id) => {
    const filter = products.filter((item) => item._id !== id);
    filter.length === 0 && setMessage("No products found");
    fetch(`https://sa-backend-7q7c.onrender.com/delete?id=${id}`, {
      method: "delete",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          setProducts(filter);
        } else {
          alert("Failed to delete product");
        }
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      });
  };

  return (
    <div className="text-center mt-6 flex justify-around flex-wrap">
      {!products.length && <h2 className="text-xl">{message}</h2>}
      {products &&
        products.map((product, key) => (
          <div key={key} className="product_container hover:cursor-pointer">
            <h3 className="product_title">{product.title}</h3>
            <p className="product_description">{product.description}</p>
            <p className="product_price">${product.price}</p>

            <div className="product_images">
              {product.images &&
                product.images.map((image, index) => (
                  <img
                    key={index}
                    src={`https://sa-backend-7q7c.onrender.com/images/${image.filename}`}
                    alt={"Media not found"}
                    style={{ width: "200px", margin: "10px" }}
                  />
                ))}
            </div>
            <button
              className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded mt-2"
              onClick={() => handleDelete(product._id)}
            >
              Delete
            </button>
          </div>
        ))}
    </div>
  );
};

export default Products;
