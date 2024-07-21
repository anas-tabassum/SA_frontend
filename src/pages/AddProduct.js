import { useEffect, useRef, useState } from "react";

const AddProduct = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [images, setImages] = useState([]);
  const [flag, setFlag] = useState(false);
  const [userId, setUserId] = useState();

  const [limit, setLimit] = useState(false);

  const imageRef = useRef(null);
  const titleHandler = (e) => {
    setTitle(e.target.value);
  };
  const priceHandler = (e) => {
    setPrice(e.target.value);
  };
  const quantityHandler = (e) => {
    setQuantity(e.target.value);
  };
  const imageHandler = (e) => {
    setImages(Array.from(e.target.files));
  };

  useEffect(() => {
    setUserId(localStorage.getItem("id"));
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("userId", userId);
    images.forEach((image, index) => {
      formData.append("images", image); // Ensure this field name matches
    });

    try {
      const response = await fetch("https://sa-backend-7q7c.onrender.com/add", {
        method: "POST",
        body: formData,
      });
      let result = await response.json();
      if (result.status === "success") {
        setTitle("");
        setPrice(1);
        setQuantity(1);
        setImages([]);
        setFlag(true);
        imageRef.current.value = "";

        setTimeout(() => {
          setFlag(false);
        }, 1700);
      }

      if (result.status === "limit") {
        setLimit(true);
      } else {
        setLimit(false);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-[90vh]">
      <form
        className="w-full max-w-lg"
        onSubmit={submitHandler}
        encType="multipart/form-data"
      >
        {flag && (
          <h2 className="text-xl text-center bg-green-900 border-2 border-green-600 p-2 text-white rounded-sm mb-2 success-message">
            New product added
          </h2>
        )}
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="title"
            >
              Product title
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="title"
              type="text"
              placeholder="Product title"
              autoFocus={true}
              value={title}
              onChange={titleHandler}
              name="title"
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="price"
            >
              Price
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="price"
              type="number"
              placeholder="$99"
              value={price}
              onChange={priceHandler}
              name="price"
              min="1"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label
              htmlFor="quantity"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              placeholder="Enter product quantity here..."
              value={quantity}
              min="1"
              onChange={quantityHandler}
              name="quantity"
            />
          </div>
        </div>
        <div>
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="images"
          >
            Choose product Images (1-6)
          </label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            aria-describedby="image_help"
            id="images"
            type="file"
            ref={imageRef}
            onChange={imageHandler}
            name="images"
            multiple
            accept="image/*"
          />
          <p
            className="mt-1 text-sm text-gray-500 dark:text-gray-300"
            id="image_help"
          >
            PNG, JPG (MAX 5MB)
          </p>
          {images.length > 0 && (
            <div
              className="flex flex-wrap mt-4"
              style={{ height: "10rem", overflow: "scroll" }}
            >
              {images.map((image, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(image)}
                  alt={`Selected Product ${index + 1}`}
                  className="w-[30%] mx-auto max-h-[8rem] m-2"
                />
              ))}
            </div>
          )}
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800 mt-5"
          >
            Add Product
          </button>
        </div>

        {limit && (
          <div className="text-red-600 mb-2 border border-red-500 p-4 bg-red-50 rounded-lg text-center">
            Image can only be uploaded in the range of 1 and 6
          </div>
        )}
      </form>
    </div>
  );
};

export default AddProduct;
