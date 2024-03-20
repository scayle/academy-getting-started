const SwaggerClient = require("swagger-client");
require("dotenv").config();

async function createAttributeGroups() {
  const client = await new SwaggerClient({
    url: `https://${process.env.TENANT_KEY}.admin.api.scayle.cloud/api/admin/v1/admin-api.json`,
    authorizations: {
      accessToken: {
        value: process.env.ADMIN_API_TOKEN,
      },
    },
  });

  const attributes = [
    {
      name: "size",
      frontendName: {
        de_DE: "Groesse",
        en_GB: "Size",
      },
      type: "localizedString", // single select attribute. A product can only have one value for this attribute at a time.
      level: "variant", // Where this attribute is used. Can be master, product or variant
      isDifferentiating: true, // This attribute differentiates between different variants. No two variants can have the same value for this attribute.
    },
    {
      name: "color",
      frontendName: {
        de_DE: "Farbe",
        en_GB: "Color",
      },
      type: "localizedString",
      level: "product",
      isDifferentiating: true,
    },
  ];

  for (const attribute of attributes) {
    try {
      const response = await client.apis.AttributeGroups.createAttributeGroup(
        {},
        { requestBody: attribute }
      );
      const createdAttributeGroup = response.body;
      console.log(createdAttributeGroup);
    } catch (error) {
      console.error(
        "Unable to create attribute group",
        error.response.body.errors
      );
    }
  }
}
createAttributeGroups();
