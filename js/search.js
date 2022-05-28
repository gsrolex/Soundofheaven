import React, { useEffect } from "react";

function ProductSearch({ input, brands }) {
  let searchInput = "";
  useEffect(() => {
    searchInput = document.getElementById("textbox_id").value;
  }, []);

  return brands.find((product) => {
    if (product.name === { search_input }) {
      return true;
    }
  });
}

export default ProductSearch;
