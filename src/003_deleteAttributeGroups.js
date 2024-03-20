const SwaggerClient = require("swagger-client");
require("dotenv").config();

async function createAttributeGroup() {
  const client = await new SwaggerClient({
    url: `https://${process.env.TENANT_KEY}.admin.api.scayle.cloud/api/admin/v1/admin-api.json`,
    authorizations: {
      accessToken: {
        value: process.env.ADMIN_API_TOKEN,
      },
    },
  });

  const deleteColorResponse =
    await client.apis.AttributeGroups.deleteAttributeGroup({
      attributeGroupName: "color",
    });

  console.log("delete color", deleteColorResponse);

  const deleteSizeResponse =
    await client.apis.AttributeGroups.deleteAttributeGroup({
      attributeGroupName: "size",
    });

  console.log("delete size", deleteSizeResponse);
}
createAttributeGroup();
