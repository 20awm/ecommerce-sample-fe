import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getProducts } from "@/services/products";
import { fetchImage } from "@/services/images";

const ProductDetail = () => {
  const router = useRouter();
  const { productId } = router.query;
  const [product, setProduct] = useState(null);
  const [imageSrc, setImageSrc] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!router.isReady) return; // Wait until the router is ready

    const fetchProduct = async () => {
      try {
        const products = await getProducts();
        const product = products.find(
          (product) => product.productId === parseInt(productId)
        );
        if (product) {
          setProduct(product);
          const imageUrl = await fetchImage(product.productId);
          setImageSrc(imageUrl);
        } else {
          setError("Product not found");
        }
      } catch (error) {
        setError("Error fetching product");
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [router.isReady, productId]);

  if (error) return <p>{error}</p>;
  if (!product) return <p>Loading...</p>;

  return (
    <div>
      <h1>{product.name}</h1>
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={product.name}
          width={500} // Replace with actual width
          height={500} // Replace with actual height
        />
      ) : (
        <p>Loading image...</p>
      )}
      <p>{product.description}</p>
      <p>{product.price}</p>
    </div>
  );
};

export default ProductDetail;
