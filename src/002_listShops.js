const SwaggerClient = require("swagger-client");
require("dotenv").config();

// List your shops to see that the creation was successful.
async function listShops() {
  const client = await new SwaggerClient({
    url: `https://${process.env.TENANT_KEY}.admin.api.scayle.cloud/api/admin/v1/admin-api.json`,
    authorizations: {
      accessToken: {
        value: process.env.ADMIN_API_TOKEN,
      },
    },
  });
  try {
    let response = await client.apis.Shops.getShops();
    let shops = response.body.entities;
    for (let shop of shops) {
      console.log(`${shop.name}: ${shop.id}`);
    }
  } catch (error) {
    console.error("Unable to fetch shops", error);
  }
}

listShops();
