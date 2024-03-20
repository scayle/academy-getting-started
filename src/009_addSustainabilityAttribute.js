const Papa = require("papaparse");
const fs = require("fs");

const SwaggerClient = require("swagger-client");
require("dotenv").config();

async function updateAttribute(client, product) {
  let attribute = {
    name: "sustainable",
    type: "simple",
    value: product.sustainable,
  };

  try {
    let response = await client.apis.Attributes.updateOrCreateProductAttribute(
      { productIdentifier: `key=${product.referenceKey}` },
      { requestBody: attribute }
    );

    const createdAttribute = response.body;
    console.info("Created Attribute:", createdAttribute);
  } catch (error) {
    console.error("Unable to update attribute", error.response.body.errors);
  }
}

async function addSustainabilityAttribute() {
  const client = await new SwaggerClient({
    url: `https://${process.env.TENANT_KEY}.admin.api.scayle.cloud/api/admin/v1/admin-api.json`,
    authorizations: {
      accessToken: {
        value: process.env.ADMIN_API_TOKEN,
      },
    },
  });

  const newAttributeGroup = {
    name: "sustainable2",
    frontendName: {
      de_DE: "Sustainable",
      en_GB: "Sustainable",
    },
    type: "simple",
    isShared: true,
    level: "product",
  };
  try {
    const response = await client.apis.AttributeGroups.createAttributeGroup(
      {},
      { requestBody: newAttributeGroup }
    );
    const createdAttributeGroup = response.body;
    console.info("Created Attribute Group:", createdAttributeGroup);
  } catch (error) {
    console.error(
      "Unable to create attribute group:",
      error.response.body.errors
    );
  }

  fs.readFile("./data/products.csv", "utf8", function (err, data) {
    if (err) {
      console.error("Error reading the CSV file:", err);
      process.exit(1);
    }

    Papa.parse(data, {
      header: true,
      complete: function (results) {
        console.log("Parsed results:", results.data);
        for (const product of results.data) {
          updateAttribute(client, product);
        }
      },
      error: function (error) {
        console.log("Unable to parse CSV", error);
      },
    });
  });
}

addSustainabilityAttribute();
