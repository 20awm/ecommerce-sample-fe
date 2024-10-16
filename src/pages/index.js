import Button from "@/components/atoms/Button";
// import Card from "@/components/molecules/CardWithChildren";
import { isMobileScreenAtom } from "@/jotai/atoms";
import { useAtom } from "jotai";
import { getProducts } from "@/services/products";
import CardProduct from "@/components/molecules/CardProduct";

export default function Home({ products }) {
  const [isMobileScreen] = useAtom(isMobileScreenAtom);
  console.log("isMobileScreen (jotai): ", isMobileScreen);

  console.log("Product List: ", products);

  return (
    <div class="p-4 font-poppins flex justify-center items-center min-h-screen">
      {isMobileScreen ? (
        <h1 class>This is Mobile View</h1>
      ) : (
        <h1 class>This is Desktop View</h1>
      )}
      <Button />
      {products.map((item) => (
        <CardProduct key={item.product_id}>
          <CardProduct.Body title={item.name} desc={item.description} />
          {item.price}
        </CardProduct>
      ))}
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const [productResult] = await Promise.all([getProducts()]);

    return {
      props: {
        events: productResult,
      },
    };
  } catch (error) {
    console.log(error);
  }
}
