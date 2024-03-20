const SwaggerClient = require("swagger-client");
require("dotenv").config();

async function addShop() {
  const client = await new SwaggerClient({
    url: `https://${process.env.TENANT_KEY}.admin.api.scayle.cloud/api/admin/v1/admin-api.json`,
    authorizations: {
      accessToken: {
        value: process.env.ADMIN_API_TOKEN,
      },
    },
  });
  const shop = {
    name: "The Kernel Kiosk 3",
    key: "k3", // Must be 2 chars long
    countries: [
      {
        countryCode: "de", // en,gb,de,fr,es
        defaultLanguageCode: "en_GB", // en_GB,en_US,de_DE,fr_FR,es_ES
        currencyCode: "EUR", // USD,EUR,GBP,JPY,CHF
        url: "http://www.kernel_kiosk.com",
      },
    ],
  };
  try {
    let response = await client.apis.Shops.createShop(
      {},
      { requestBody: shop }
    );
    let createdShop = response.body;
    console.log("Created Shop", createdShop);
  } catch (error) {
    console.error("Status Code: ", error.response.status);
    // Here you will find the error message from the API
    console.error("Returned errors", error.response.body.errors);
  }
}

addShop();
