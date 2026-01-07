import { appwriteConfig } from "@/lib/appwrite";
import { useCartStore } from "@/store/cart.store";
import { MenuItem } from "@/type";
import { router } from 'expo-router';
import { Image, Platform, Text, TouchableOpacity } from 'react-native';

const MenuCard = ({ item }: { item: MenuItem }) => {
    const { $id, image_url, name, price, description, calories, protein, rating } = item;
    const imageUrl = `${image_url}?project=${appwriteConfig.projectId}`;
    const { addItem } = useCartStore();

    return (
        <TouchableOpacity
            className="menu-card"
            style={Platform.OS === 'android' ? { elevation: 10, shadowColor: '#878787' } : {}}
            onPress={() => router.push({
                pathname: '/itemDetail',
                params: {
                    id: $id,
                    name,
                    price: price.toString(),
                    image_url: imageUrl,
                    description: description || 'Delicious food item',
                    calories: calories?.toString() || '0',
                    protein: protein?.toString() || '0',
                    rating: rating?.toString() || '4.5'
                }
            })}
        >
            <Image source={{ uri: imageUrl }} className="size-32 absolute -top-10" resizeMode="contain" />
            <Text className="text-center base-bold text-dark-100 mb-2" numberOfLines={1}>{name}</Text>
            <Text className="body-regular text-gray-200 mb-4">From Rs. {price}</Text>
            <TouchableOpacity onPress={() => addItem({ id: $id, name, price, image_url: imageUrl, customizations: [] })}>
                <Text className="paragraph-bold text-primary">Add to Cart +</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    )
}
export default MenuCard
