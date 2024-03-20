const SwaggerClient = require("swagger-client");
require("dotenv").config();

async function createShopCategories() {
  const client = await new SwaggerClient({
    url: `https://${process.env.TENANT_KEY}.admin.api.scayle.cloud/api/admin/v1/admin-api.json`,
    authorizations: {
      accessToken: {
        value: process.env.ADMIN_API_TOKEN,
      },
    },
  });

  const categories = [
    {
      parentId: null,
      name: {
        de_DE: "Male",
        en_GB: "Male",
      },
      isActive: true,
      isVisible: true,
      productSets: [
        {
          attributes: [
            {
              name: "category",
              include: ["Men"],
            },
          ],
        },
      ],
    },
    {
      parentId: null,
      name: {
        de_DE: "Clothing",
        en_GB: "Clothing",
      },
      productSets: [
        {
          attributes: [
            {
              name: "category",
              include: ["Men|Clothing"],
            },
          ],
        },
      ],
      isActive: true,
      isVisible: true,
    },
    {
      parentId: null,
      name: {
        de_DE: "Shirts",
        en_GB: "Shirts",
      },
      productSets: [
        {
          attributes: [
            {
              name: "category",
              include: ["Men|Clothing|Shirts"],
            },
          ],
        },
      ],
      isActive: true,
      isVisible: true,
    },
  ];

  let parentID = null;
  for (let category of categories) {
    category.parentId = parentID;

    try {
      const response = await client.apis.ShopCategories.createShopCategory(
        { shopKey: "ms" },
        { requestBody: category }
      );
      const createdShopCategory = response.body;
      parentID = createdShopCategory.id;
      console.info("Created Category", createdShopCategory);
    } catch (error) {
      console.error(
        "Unable to create shop category",
        error.response.body.errors
      );
    }
  }
}
createShopCategories();
