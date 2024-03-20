const SwaggerClient = require("swagger-client");
require("dotenv").config();

const Papa = require("papaparse");
const fs = require("fs");

async function deleteProduct(client, referenceKey) {
  try {
    let response = await client.apis.Products.deleteProduct({
      productIdentifier: `key=${referenceKey}`,
    });
    console.info(`Deleted product with reference key ${referenceKey}`);
  } catch (error) {
    console.error("Unable to delete product", error.response.body.errors);
  }
}

async function deleteProducts() {
  const client = await new SwaggerClient({
    url: `https://${process.env.TENANT_KEY}.admin.api.scayle.cloud/api/admin/v1/admin-api.json`,
    authorizations: {
      accessToken: {
        value: process.env.ADMIN_API_TOKEN,
      },
    },
  });
  fs.readFile("./data/products.csv", "utf8", function (err, data) {
    if (err) {
      console.error("Error reading the CSV file:", err);
      process.exit(1);
    }

    Papa.parse(data, {
      header: true,
      //   dynamicTyping: true,
      complete: function (results) {
        console.log("Parsed results:", results.data);
        for (const product of results.data) {
          deleteProduct(client, product.referenceKey);
        }
      },
      error: function (error) {
        console.log("ERROR", error);
      },
    });
  });
}

deleteProducts();
