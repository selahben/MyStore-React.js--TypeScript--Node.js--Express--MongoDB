import { useStoreContext } from "../../context/store.context";
import { Product } from "./product";

export function Products() {
  const { products } = useStoreContext();

  return (
    <div id="products">
      {products.map((product) => (
        <Product key={product.sn} product={product} fullProduct={product} />
      ))}
    </div>
  );
}
