const SwaggerClient = require("swagger-client");
require("dotenv").config();

async function createMasterCategories() {
  const client = await new SwaggerClient({
    url: `https://${process.env.TENANT_KEY}.admin.api.scayle.cloud/api/admin/v1/admin-api.json`,
    authorizations: {
      accessToken: {
        value: process.env.ADMIN_API_TOKEN,
      },
    },
  });

  const masterCategories = [
    {
      path: ["Men"],
    },
    {
      path: ["Men", "Clothing"],
      attributes: [
        {
          name: "color",
          type: "simple",
          isMandatory: true,
        },
      ],
    },
    {
      path: ["Men", "Clothing", "Shirts"], // We don't need to define mandatory attributes here, as this has been covered by the Clothing Category
    },
  ];

  for (const masterCategory of masterCategories) {
    try {
      const response = await client.apis.MasterCategories.createMasterCategory(
        {},
        { requestBody: masterCategory }
      );
      const createdMasterCategory = response.body;
      console.log(createdMasterCategory);
    } catch (error) {
      console.error(
        "Unable to create master category",
        error.response.body.errors
      );
    }
  }
}

createMasterCategories();
