const { Client, Databases } = require("appwrite");
const fs = require("fs");

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1") // Replace with your Appwrite endpoint
  .setProject("67a38fa2003d9c716047") // Replace with your project ID
  .setKey("standard_a49bd7f3ddfccf18b3db4de3089761147ec61674cc18254926edd9df8b2aa9ab165794e8d9bb23f74822ba5768d5c88e4ca1f7f65781526f7ee0efedb54ca4f7421c3d25697259261a8e1b3230dea09ca1f31ec38a9d9f5500fd0010cd6cd466d5b76bf6766b92d79c622aff534aed5dd5c87ccf225b0ea920a83be02bda8a04"); // Use a server key

const databases = new Databases(client);
const databaseId = "67a392ac001da686df28";
const collectionId = "67a39339001ff95e2aa2";

async function exportData() {
  try {
    const response = await databases.listDocuments(databaseId, collectionId, [], 1000); // Fetch up to 1000 documents
    fs.writeFileSync("exported_data.json", JSON.stringify(response.documents, null, 2));
    console.log("Data exported successfully to exported_data.json");
  } catch (error) {
    console.error("Error exporting data:", error);
  }
}

exportData();
