import React, { useState, useEffect } from "react";
import { CategoryNavigation } from "./CategoryNavigation";
import { ProductList } from "./ProductList";
import { Footer } from "./Footer";
import { Header } from "./Header";
import "./styles.css";

export default function CustomerHomePage() {
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [username, setUsername] = useState("");
  const [cartError, setCartError] = useState(false);
  const [isCartLoading, setIsCartLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []); // Runs only once on component mount

  useEffect(() => {
    if (username) {
      fetchCartCount();
    }
  }, [username]); // Fetch cart count only when username is set

  const fetchProducts = async (category = "Shirts") => {
    try {
      const response = await fetch(`http://localhost:9090/api/products?category=${category}`, {
        credentials: "include",
      });
      const data = await response.json();
  
      console.log("✅ Product API Response:", data); // Log API response
  
      if (data && data.user) {
        setUsername(data.user.name || "Guest");
      } else {
        setUsername("Guest");
      }
  
      console.log("✅ Extracted Products:", data.products); // Log extracted products
      setProducts(data.products || []);
    } catch (error) {
      console.error("❌ Error fetching products:", error);
      setProducts([]);
    }
  };
  

  const fetchCartCount = async () => {
    setIsCartLoading(true);
    try {
      console.log("Fetching cart count for:", username);
      const response = await fetch(
        `http://localhost:9090/api/cart/items/count?username=${username}`,
        { credentials: "include" }
      );

      const count = await response.json();
      console.log("Cart Count:", count);
      setCartCount(count);
      setCartError(false);
    } catch (error) {
      console.error("Error fetching cart count:", error);
      setCartError(true);
    } finally {
      setIsCartLoading(false);
    }
  };

  const handleCategoryClick = (category) => {
    fetchProducts(category);
  };

  const handleAddToCart = async (productId) => {
    console.log("Adding to cart, Username:", username, "Product ID:", productId); // Debugging log
  
    if (!username || !productId) {
      console.error("Username or productId is missing.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:9090/api/cart/add", {
        credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, productId }), // Ensure correct request body
      });
  
      const result = await response.json();
      console.log("Add to Cart Response:", result); // Log response
  
      if (response.ok) {
        fetchCartCount(); // Update cart count
      } else {
        console.error("Failed to add product to cart:", result);
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };
  
  return (
    <div className="customer-homepage">
      <Header
        cartCount={isCartLoading ? "..." : cartError ? "Error" : cartCount}
        username={username}
      />
      <nav className="navigation">
        <CategoryNavigation onCategoryClick={handleCategoryClick} />
      </nav>
      <main className="main-content">
        <ProductList products={products} onAddToCart={handleAddToCart} />
      </main>
      <Footer />
    </div>
  );
}
