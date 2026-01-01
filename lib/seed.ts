import { ID } from "react-native-appwrite";
import { appwriteConfig, databases, storage } from "./appwrite";
import dummyData from "./data";

interface Category {
    name: string;
    description: string;
}

interface Customization {
    name: string;
    price: number;
    type: "topping" | "side" | "size" | "crust" | string; // extend as needed
}

interface MenuItem {
    name: string;
    description: string;
    image_url: string;
    price: number;
    rating: number;
    calories: number;
    protein: number;
    category_name: string;
    customizations: string[]; // list of customization names
}

interface DummyData {
    categories: Category[];
    customizations: Customization[];
    menu: MenuItem[];
}

// ensure dummyData has correct shape
const data = dummyData as DummyData;

// Helper function to add delay between requests
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function clearAll(collectionId: string): Promise<void> {
    const list = await databases.listDocuments(
        appwriteConfig.databaseId,
        collectionId
    );

    await Promise.all(
        list.documents.map((doc) =>
            databases.deleteDocument(appwriteConfig.databaseId, collectionId, doc.$id)
        )
    );
}

async function clearStorage(): Promise<void> {
    const list = await storage.listFiles(appwriteConfig.bucketId);

    await Promise.all(
        list.files.map((file) =>
            storage.deleteFile(appwriteConfig.bucketId, file.$id)
        )
    );
}

async function uploadImageToStorage(imageUrl: string) {
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    const fileObj = {
        name: imageUrl.split("/").pop() || `file-${Date.now()}.jpg`,
        type: blob.type,
        size: blob.size,
        uri: imageUrl,
    };

    const file = await storage.createFile(
        appwriteConfig.bucketId,
        ID.unique(),
        fileObj
    );

    return storage.getFileViewURL(appwriteConfig.bucketId, file.$id);
}

async function seed(): Promise<void> {
    // 1. Clear all
    console.log("Clearing all...");
    await clearAll(appwriteConfig.categoriesCollectionId);
    await clearAll(appwriteConfig.customizationsCollectionId);
    await clearAll(appwriteConfig.menuCollectionId);
    await clearAll(appwriteConfig.menuCustomizationsCollectionId);
    // Skip clearing storage since we're using external URLs
    // await clearStorage();

    // 2. Create Categories
    console.log("Creating categories...");
    const categoryMap: Record<string, string> = {};
    for (const cat of data.categories) {
        try {
            const doc = await databases.createDocument(
                appwriteConfig.databaseId,
                appwriteConfig.categoriesCollectionId,
                ID.unique(),
                cat
            );
            categoryMap[cat.name] = doc.$id;
            console.log(`✓ Created category: ${cat.name}`);
            await delay(100); // Add small delay to prevent rate limiting
        } catch (error) {
            console.error(`✗ Failed to create category: ${cat.name}`, error);
            throw error;
        }
    }
    console.log("Categories created");

    // 3. Create Customizations
    console.log("Creating customizations...");
    const customizationMap: Record<string, string> = {};
    for (const cus of data.customizations) {
        try {
            const doc = await databases.createDocument(
                appwriteConfig.databaseId,
                appwriteConfig.customizationsCollectionId,
                ID.unique(),
                {
                    name: cus.name,
                    price: cus.price,
                    type: cus.type,
                }
            );
            customizationMap[cus.name] = doc.$id;
            console.log(`✓ Created customization: ${cus.name}`);
            await delay(100); // Add small delay to prevent rate limiting
        } catch (error) {
            console.error(`✗ Failed to create customization: ${cus.name}`, error);
            throw error;
        }
    }
    console.log("Customizations created");

    // 4. Create Menu Items
    console.log("Creating menu items...");
    const menuMap: Record<string, string> = {};
    for (const item of data.menu) {
        try {
            // Use external URL directly instead of uploading to storage
            // This avoids network issues with fetching and uploading images
            const imageUrl = item.image_url;
            console.log(`Using external image URL for: ${item.name}`);

            const doc = await databases.createDocument(
                appwriteConfig.databaseId,
                appwriteConfig.menuCollectionId,
                ID.unique(),
                {
                    name: item.name,
                    description: item.description,
                    image_url: imageUrl,
                    price: item.price,
                    rating: item.rating,
                    calories: item.calories,
                    protein: item.protein,
                    categories: categoryMap[item.category_name],
                }
            );
            console.log(`✓ Created menu item: ${item.name}`);


            
            menuMap[item.name] = doc.$id;
            await delay(100); // Delay between menu items

            // 5. Create menu_customizations
            for (const cusName of item.customizations) {
                try {
                    await databases.createDocument(
                        appwriteConfig.databaseId,
                        appwriteConfig.menuCustomizationsCollectionId,
                        ID.unique(),
                        {
                            menu: doc.$id,
                            customizations: customizationMap[cusName],
                        }
                    );
                    console.log(`  ✓ Linked customization: ${cusName}`);
                    await delay(50); // Small delay between customization links
                } catch (error) {
                    console.error(`  ✗ Failed to link customization: ${cusName}`, error);
                    throw error;
                }
            }
        } catch (error) {
            console.error(`✗ Failed to create menu item: ${item.name}`, error);
            throw error;
        }
    }
    console.log("Menu customizations created");

    console.log("✅ Seeding complete.");
}

export default seed;
