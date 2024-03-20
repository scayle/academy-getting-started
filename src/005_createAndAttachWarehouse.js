const SwaggerClient = require("swagger-client");
require("dotenv").config();

async function createAndAttachWarehouse() {
  const client = await new SwaggerClient({
    url: `https://${process.env.TENANT_KEY}.admin.api.scayle.cloud/api/admin/v1/admin-api.json`,
    authorizations: {
      accessToken: {
        value: process.env.ADMIN_API_TOKEN,
      },
    },
  });

  const newWarehouse = {
    referenceKey: "WarehouseDE1",
  };

  let createdWarehouse = null; // we need to store the created warehouse to attach the merchant to it
  try {
    const response = await client.apis.Warehouses.createWarehouse(
      {},
      { requestBody: newWarehouse }
    );
    createdWarehouse = response.body;
  } catch (error) {
    console.error(
      "Unable to create shop country warehouse",
      error.response.body.errors
    );
    process.exit(1);
  }

  try {
    const response = await client.apis.Warehouses.attachMerchantWarehouse({
      merchantIdentifier: 1, // default warehouse that is created with the instance
      warehouseIdentifier: createdWarehouse.id,
    });
    console.log("Attached Merchant to Warehouse", response.body);
  } catch (error) {
    console.error(
      "Unable to attach merchant to warehouse",
      error.response.body.errors
    );
    process.exit(1);
  }

  try {
    const newShopCountryWarehouse = {
      referenceKey: "WarehouseDE1",
      priority: 100,
    };

    const response = await client.apis.Warehouses.createShopCountryWarehouse(
      {
        shopKey: "k2",
        countryCode: "de",
      },
      {
        requestBody: newShopCountryWarehouse,
      }
    );

    const createdShopCountryWarehouse = response.body;
    console.log("Created Shop Country Warehouse", createdShopCountryWarehouse);
  } catch (error) {
    console.error("Unable to create warehouse", error.response.body.errors);
    process.exit(1);
  }
}

createAndAttachWarehouse();
