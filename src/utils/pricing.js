// Central pricing logic for the store.
//
// Priority of discounts (highest first):
//   1. Product level  -> product.discount (%) or product.discountprice (absolute)
//   2. Subcategory    -> category.subDiscounts[product.ptype]  e.g. { Shoes: 10, Shirts: 15 }
//   3. Category       -> category.discount (%)  applies to the whole category
//
// This lets the admin set different sale percentages for different things
// (e.g. Shoes 10%, Shirts 15%) from the admin "Sale" page.

// Returns the applicable category / subcategory sale percentage for a product.
export const getCategorySale = (product) => {
  const cat = product?.catid && typeof product.catid === 'object' ? product.catid : null;
  if (!cat) return 0;

  const subDiscounts = cat.subDiscounts || {};
  const subValue = product?.ptype ? Number(subDiscounts[product.ptype]) : 0;
  if (subValue > 0) return subValue;

  return Number(cat.discount) || 0;
};

// Returns everything the UI needs to render a product price.
export const getPricing = (product) => {
  const price = Number(product?.price) || 0;
  let finalPrice = price;
  let discountPercent = Number(product?.discount) || 0;

  const explicitSalePrice = Number(product?.discountprice) || 0;
  const categorySale = getCategorySale(product);

  if (explicitSalePrice > 0 && explicitSalePrice < price) {
    // Product has an explicit discounted price set by the admin.
    finalPrice = explicitSalePrice;
    discountPercent =
      discountPercent > 0
        ? discountPercent
        : Math.round(((price - explicitSalePrice) / price) * 100);
  } else if (discountPercent > 0) {
    // Product has its own discount percentage.
    finalPrice = Math.round(price - (price * discountPercent) / 100);
  } else if (categorySale > 0) {
    // Fall back to the category / subcategory sale percentage.
    discountPercent = categorySale;
    finalPrice = Math.round(price - (price * categorySale) / 100);
  }

  const hasDiscount = discountPercent > 0 && finalPrice < price;

  return {
    price,
    finalPrice,
    discountPercent: hasDiscount ? discountPercent : 0,
    hasDiscount,
    saved: hasDiscount ? price - finalPrice : 0,
  };
};
