const backbone = require("@aboutyou/backbone");
require("dotenv").config();

async function fetchProducts() {
  const client = new backbone.BapiClient({
    host: `https://${process.env.TENANT_KEY}.storefront.api.scayle.cloud/v1/`,
    shopId: process.env.SHOP_ID,
    auth: {
      type: "token",
      token: process.env.STOREFRONT_API_TOKEN,
    },
  });
  try {
    const products = await client.products.query({
      with: {
        attributes: {
          withKey: ["color"],
        },
        variants: {
          attributes: {
            withKey: ["size"],
          },
        },
      },
      where: {
        categoryId: 8,
        attributes: [
          {
            type: "attributes",
            key: "color",
            values: [4], // ID of color "weiß"
          },
        ],
      },
    });
    console.log("Fetched products", products);
  } catch (error) {
    console.error("Unable to fetch products", error);
  }
}

fetchProducts();
