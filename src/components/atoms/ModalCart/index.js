import React, { useEffect, useState } from "react";
import Button from "../Button"; // Make sure to import your Button component
import formatCurrency from "@/helpers/utils/formatCurrency";
import { fetchImage } from "@/services/images"; // Import your image fetching function
import { purchaseOrder } from "@/services/purchase";

const ModalCart = ({ handleCloseCart, cart }) => {
  const [imageUrls, setImageUrls] = useState({});
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(
    "Credit Card"
  );

  const shippingAddresses = [
    {
      id: 1,
      label: "111 Second St, Midtown, UK",
      value: "111 Second St, Midtown, UK",
    },
    {
      id: 2,
      label: "123 Main St, Downtown, USA",
      value: "123 Main St, Downtown, USA",
    },
    // Add more address options as needed
  ];
  const [selectedShippingAddress, setSelectedShippingAddress] = useState(null); // Initialize with null or a default address

  useEffect(() => {
    // setSelectedShippingAddress(shippingAddresses[0]);
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

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  const handlePaymentMethodChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
  };

  const handlePayment = async (paymentRequestBody) => {
    try {
      const orderResponse = await purchaseOrder(paymentRequestBody);
      console.log("Order placed successfully:", orderResponse);
      // Handle success (e.g., show a success message, redirect to order confirmation page)
    } catch (error) {
      // Handle error (e.g., show an error message)
      console.error("Error placing order:", error);
    }
  };

  const handleAddressChange = (event) => {
    const selectedAddress = event.target.value;
    setSelectedShippingAddress(selectedAddress);
    console.log("selectedAddress: ", selectedShippingAddress);
  };

  const paymentRequestBody = {
    customerId: 1,
    shippingAddress: selectedShippingAddress || shippingAddresses[0]?.value,
    orderStatus: "PENDING",
    orderDetails: cart.map((item) => ({
      productId: item.id,
      quantity: item.qty,
      price: item.price,
    })),
    payment: {
      amount: cartTotal,
      paymentMethod: selectedPaymentMethod,
      paymentStatus: "PAID",
    },
  };

  return (
    <>
      <div className="fixed z-10 inset-0">
        <div className="min-h-screen">
          <div className="flex justify-center items-center inset-0 bg-gray-500 bg-opacity-75 h-screen">
            <div className="inline-block bg-white rounded-xl p-5 max-w-lg align-middle w-full shadow-xl overflow-hidden transform">
              <div className="flex flex-col">
                <span className="font-bold text-lg mb-2">
                  Checkout Confirmation
                </span>

                <div className="flex flex-col gap-4">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col p-4 border rounded-lg"
                    >
                      <div className="flex items-center">
                        <img
                          src={imageUrls[item.id] || "/placeholder-image.png"}
                          alt={item.name}
                          className="w-24 h-24 rounded-md mr-4"
                        />
                        <div>
                          <span className="font-bold text-xl">{item.name}</span>
                        </div>
                      </div>
                      <div className="flex justify-between mt-4 ml-4">
                        <span>
                          <b className="font-bold">Qty: </b> {item.qty}
                        </span>
                        <span className="font-semibold">
                          {formatCurrency(item.price * item.qty)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4">
                  <label htmlFor="shippingAddress" className="font-semibold">
                    Select Shipping Address:
                  </label>
                  <select
                    id="shippingAddress"
                    className="block w-full mt-1 p-2 border rounded-md"
                    // value={selectedShippingAddress?.value || ""}
                    onChange={handleAddressChange}
                  >
                    {/* <option value="">Select an address</option> */}
                    {shippingAddresses.map((address) => (
                      <option key={address.id} value={address.value}>
                        {address.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-4">
                  <label htmlFor="paymentMethod" className="font-semibold">
                    Select Payment Method:
                  </label>
                  <select
                    id="paymentMethod"
                    className="block w-full mt-1 p-2 border rounded-md"
                    value={selectedPaymentMethod}
                    onChange={handlePaymentMethodChange}
                  >
                    <option value="Credit Card">Credit Card</option>
                    <option value="PayPal">PayPal</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    {/* Add other payment methods as needed */}
                  </select>
                </div>

                <div className="flex justify-between px-4 py-2 border mt-2 rounded-lg">
                  <span className="font-bold text-lg">Total</span>
                  <span className="font-semibold mt-1">
                    {formatCurrency(cartTotal)}
                  </span>
                </div>

                <div className="flex justify-end mt-5 gap-3">
                  <Button
                    color="bg-gray-500 text-white"
                    textButton="Close"
                    onClick={handleCloseCart}
                  />
                  <Button
                    color="bg-green-500 text-white"
                    textButton="Pay"
                    onClick={() => handlePayment(paymentRequestBody)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalCart;
