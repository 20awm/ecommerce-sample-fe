import { fetchImage } from "../../services/images";
import { useRouter } from "next/router";
import Button from "@/components/atoms/Button";
import CardProduct from "@/components/molecules/CardProduct";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { getProducts } from "@/services/products";
import useLogin from "@/hooks/useLogin";
import formatCurrency from "@/helpers/utils/formatCurrency";
import Modal from "@/components/atoms/Modal";
import ModalCart from "@/components/atoms/ModalCart";

function ProductsPage({ products }) {
  const username = useLogin();
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalCart, setShowModalCart] = useState(false);
  const [imageUrls, setImageUrls] = useState({});
  const router = useRouter();
  const [storedRole, setStoredRole] = useState(""); // Initialize with an empty string

  useEffect(() => {
    // Fetch the role from localStorage when the component mounts
    const roleFromLocalStorage = localStorage.getItem("role");
    setStoredRole(roleFromLocalStorage);
  }, []);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    if (savedCart) {
      setCart(savedCart);
    }
  }, []);

  useEffect(() => {
    async function loadImages() {
      const urls = {};
      for (const item of cart) {
        const url = await fetchImage(item.id);
        if (url) {
          urls[item.id] = url;
        }
      }
      setImageUrls(urls);
    }
    if (cart.length > 0) {
      loadImages();
    }
  }, [cart]);

  const searchProduct = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, products]);

  const handleClose = () => {
    setShowModal(false);
  };

  const handleCloseCart = () => {
    setShowModalCart(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
    window.location.href = "/login";
  };

  const handleEdit = () => {
    console.log("Edit button is clicked");
  };
  
  const handleAddToCart = useCallback(
    (productId) => {
      setCart((prevCart) => {
        const existingItem = prevCart.find((item) => item.id === productId);
        if (existingItem) {
          return prevCart.map((item) =>
            item.id === productId ? { ...item, qty: item.qty + 1 } : item
          );
        } else {
          const product = products.find(
            (product) => product.productId === productId
          );
          if (product) {
            const newItem = {
              id: productId,
              qty: 1,
              name: product.name,
              price: product.price,
              imageUrl: product.imageUrl,
            };
            return [...prevCart, newItem];
          }
        }
        return prevCart;
      });
    },
    [products]
  );

  const handleReduceQuantity = (productId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) => {
        if (item.id === productId) {
          // Decrease quantity by 1 (ensure it doesn't go below zero)
          const newQty = Math.max(item.qty - 1, 0);
          return { ...item, qty: newQty };
        }
        return item;
      });
      // Remove items with zero quantity
      return updatedCart.filter((item) => item.qty > 0);
    });
  };

  const handleProductClick = (productId) => {
    router.push(`/products/${productId}`);
  };

  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => {
      const product = products.find((product) => product.productId === item.id);
      if (product) {
        return total + product.price * item.qty;
      }
      return total;
    }, 0);
  }, [cart, products]);

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      localStorage.removeItem("cart");
    }
  }, [cart]);

  return (
    <>
      <div className="flex justify-between items-center bg-blue-500 px-5 py-4">
        <h1 className="text-xl">Welcome, {username}</h1>
        <div className="w-[380px]">
          <input
            type="text"
            placeholder="Search..."
            className="py-2 px-4 rounded-full w-[300px]"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setShowSearch(e.target.value !== "");
            }}
          />
          {showSearch && searchProduct.length > 0 && (
            <ul className="absolute bg-white text-black w-[300px] mt-1 py-2 px-3 rounded-lg">
              {searchProduct.map((product) => (
                <li key={product.productId} className="my-1">
                  {product.name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <Button
          color="bg-red-500"
          textButton="Logout"
          onClick={() => {
            setShowModal(true);
          }}
        />
        {showModal && (
          <Modal handleClose={handleClose} handleLogout={handleLogout} />
        )}
      </div>

      <div className="flex px-5 py-4">
        <div className="flex flex-col w-2/3">
          <h1 className="text-3xl font-bold mb-2 uppercase">Products</h1>

          <div className="flex flex-wrap gap-4">
            {searchProduct.map((item) => (
              <CardProduct key={item.productId}>
                <CardProduct.Header productId={item.productId} />
                <CardProduct.Body
                  title={item.name}
                  desc={item.description}
                  onClick={() => handleProductClick(item.productId)}
                />
                <CardProduct.Footer
                  price={item.price}
                  onClick={() => handleAddToCart(item.productId)}
                />
              </CardProduct>
            ))}
          </div>
        </div>
        {cart.length > 0 && (
          <div className="cart w-1/3">
            <h1 className="text-3xl font-bold mb-2 uppercase">Cart</h1>
            <div className="flex flex-col gap-2">
              {cart.map((item) => {
                const product = products.find(
                  (product) => product.productId === item.id
                );
                if (!product) {
                  return null; // Skip rendering if product is not found
                }
                return (
                  <div key={item.id} className="flex p-4 border rounded-lg">
                    <img
                      src={imageUrls[item.id] || product.imageUrl}
                      alt="cart item"
                      className="max-w-[100px]"
                    />
                    <div className="flex justify-between w-full">
                      <div className="flex flex-col justify-between ml-3">
                        <span className="font-bold text-xl">
                          {product.name}
                        </span>
                        <span className="font-semibold">
                          {formatCurrency(product.price * item.qty)}
                        </span>
                      </div>
                      <div className="flex flex-col justify-center items-center">
                        <span className="mb-1">Qty</span>
                        <button
                          className="text-lg font-bold"
                          onClick={() => handleAddToCart(item.id)}
                        >
                          +
                        </button>
                        <span className="flex-justify-center items-center font-semibold p-2 border rounded-sm text-center w-10 h-10">
                          {item.qty}
                        </span>
                        <button
                          className="text-lg font-bold"
                          onClick={() => handleReduceQuantity(item.id)}
                        >
                          -
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-between px-4 py-2 border mt-2 rounded-lg">
              <span className="font-bold mt-1 text-lg">Total</span>
              <span className="font-semibold mt-2">
                {formatCurrency(cartTotal)}
              </span>
              <Button
                color="bg-blue-500"
                textButton="Checkout"
                onClick={() => {
                  setShowModalCart(true);
                }}
              />
              {showModalCart && (
                <ModalCart handleCloseCart={handleCloseCart} cart={cart} />
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export async function getStaticProps() {
  try {
    const productResults = await getProducts();
    const slicedProducts = productResults.slice(0, 16);
    return {
      props: {
        products: slicedProducts || [],
      },
      revalidate: 60,
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        products: [],
      },
    };
  }
}

export default ProductsPage;
