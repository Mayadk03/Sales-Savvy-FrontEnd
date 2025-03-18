export function ProductList({ products, onAddToCart }) {
  console.log("Rendering ProductList with products:", products); // Debugging log

  if (!products || products.length === 0) {
    return <p className="no-products">No products available.</p>;
  }

  return (
    <div className="product-list">
      <div className="product-grid">
        {products.map((product) => {
          console.log("Product in List:", product); // Log each product to check structure

          // Ensure the correct product ID is used (Check all possible cases)
          const productId = product.Product_id;
          if (!productId) {
            console.error("Missing Product ID for product:", product);
          }

          return (
            <div key={productId} className="product-card">
              <img
                src={product.images && product.images.length > 0 ? product.images[0] : "https://via.placeholder.com/150"}
                alt={product.name || "Product Image"}
                className="product-image"
                loading="lazy"
              />
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-description">{product.description}</p>
                <p className="product-price">₹{product.price}</p>
                <button
                  className="add-to-cart-btn"
                  onClick={() => {
                    console.log("Clicked Add to Cart, Product ID:", productId);
                    if (productId) {
                      onAddToCart(productId);
                    } else {
                      console.error("Cannot add to cart: Missing Product ID");
                    }
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
