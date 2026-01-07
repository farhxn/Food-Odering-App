import SideOptionCard from "@/components/SideOptionCard"
import ToppingCard from "@/components/ToppingCard"
import { getFoodEmoji } from "@/constants/foodIcons"
import { getCustomizations } from "@/lib/appwrite"
import useAppwrite from "@/lib/useAppwrite"
import { useCartStore } from "@/store/cart.store"
import { router, useLocalSearchParams } from "expo-router"
import { useState } from "react"
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

const ItemDetail = () => {
    const params = useLocalSearchParams()

    const id = params.id as string || ""
    const itemName = params.name as string || "Menu Item"
    const itemPrice = parseFloat(params.price as string) || 10.02
    const itemImage = params.image_url as string
    const itemDescription = params.description as string || "Delicious food item"
    const itemCalories = params.calories as string || "365"
    const itemProtein = params.protein as string || "35"
    const itemRating = parseFloat(params.rating as string) || 4.5

    const [quantity, setQuantity] = useState(1)
    const [selectedToppings, setSelectedToppings] = useState<any[]>([])
    const [selectedSides, setSelectedSides] = useState<any[]>([])

    const totalPrice = (itemPrice * quantity).toFixed(2)

    const { data: customizations } = useAppwrite({ fn: getCustomizations });
    const { addItem } = useCartStore();

    const toppings = customizations?.filter((item: any) => item.type === 'topping') || []
    const sideOptions = customizations?.filter((item: any) => item.type === 'side') || []

    const handleToppingToggle = (topping: any, selected: boolean) => {
        if (selected) {
            setSelectedToppings([...selectedToppings, { id: topping.$id, name: topping.name, price: topping.price, type: 'topping' }])
        } else {
            setSelectedToppings(selectedToppings.filter(t => t.id !== topping.$id))
        }
    }

    const handleSideToggle = (side: any, selected: boolean) => {
        if (selected) {
            setSelectedSides([...selectedSides, { id: side.$id, name: side.name, price: side.price, type: 'side' }])
        } else {
            setSelectedSides(selectedSides.filter(s => s.id !== side.$id))
        }
    }

    const decreaseQuantity = () => {
        if (quantity > 1) setQuantity(quantity - 1)
    }

    const increaseQuantity = () => {
        setQuantity(quantity + 1)
    }

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View className="flex-row items-center justify-between px-5 py-4">
                    <TouchableOpacity onPress={() => router.back()}>
                        <Image
                            source={require('@/assets/icons/arrow-back.png')}
                            className="w-6 h-6"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image
                            source={require('@/assets/icons/search.png')}
                            className="w-6 h-6"
                        />
                    </TouchableOpacity>
                </View>

                {/* Product Image */}
                <View className="items-center mb-4">
                    {itemImage ? (
                        <Image
                            source={{ uri: itemImage }}
                            className="w-64 h-64"
                            resizeMode="contain"
                        />
                    ) : (
                        <Image
                            source={require('@/assets/icons/bag.png')}
                            className="w-64 h-64"
                            resizeMode="contain"
                        />
                    )}
                </View>


                <View className="px-5">
                    <Text className="text-2xl font-bold text-gray-900 mb-1">{itemName}</Text>
                    <Text className="text-base text-gray-500 mb-2">{itemDescription.substring(0, 50)}...</Text>

                    {/* Rating */}
                    <View className="flex-row items-center mb-4">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Image
                                key={star}
                                source={require('@/assets/icons/star.png')}
                                className="w-4 h-4 mr-1"
                                tintColor="#FFA500"
                            />
                        ))}
                        <Text className="text-gray-900 font-semibold ml-1">{itemRating.toFixed(1)}/5</Text>
                    </View>

                    {/* Price */}
                    <Text className="text-3xl font-bold text-orange-500 mb-4">Rs. {itemPrice.toFixed(2)}</Text>

                    {/* Nutritional Info */}
                    <View className="flex-row mb-4">
                        <View className="mr-8">
                            <Text className="text-gray-500 text-sm">Calories</Text>
                            <Text className="text-gray-900 font-semibold">{itemCalories} Cal</Text>
                        </View>
                        <View>
                            <Text className="text-gray-500 text-sm">Protein</Text>
                            <Text className="text-gray-900 font-semibold">{itemProtein}g</Text>
                        </View>
                    </View>

                    {/* Info Badges */}
                    <View className="flex-row items-center mb-6">
                        <View className="flex-row items-center mr-4">
                            <Image
                                source={require('@/assets/icons/dollar.png')}
                                className="w-4 h-4 mr-1"
                                tintColor="#FFA500"
                            />
                            <Text className="text-sm text-gray-700">Free Delivery</Text>
                        </View>
                        <View className="flex-row items-center mr-4">
                            <Image
                                source={require('@/assets/icons/clock.png')}
                                className="w-4 h-4 mr-1"
                                tintColor="#FFA500"
                            />
                            <Text className="text-sm text-gray-700">20 - 30 mins</Text>
                        </View>
                        <View className="flex-row items-center">
                            <Image
                                source={require('@/assets/icons/star.png')}
                                className="w-4 h-4 mr-1"
                                tintColor="#FFA500"
                            />
                            <Text className="text-sm text-gray-700">{itemRating.toFixed(1)}</Text>
                        </View>
                    </View>

                    {/* Description */}
                    <Text className="text-gray-600 text-sm leading-6 mb-6">
                        {itemDescription}
                    </Text>

                    {/* Toppings */}
                    <Text className="text-lg font-bold text-gray-900 mb-3">Toppings</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
                        {toppings.map((topping: any) => (
                            <ToppingCard
                                key={topping.$id}
                                name={topping.name}
                                emoji={getFoodEmoji(topping.name)}
                                onToggle={(selected) => handleToppingToggle(topping, selected)}
                            />
                        ))}
                    </ScrollView>

                    {/* Side Options */}
                    <Text className="text-lg font-bold text-gray-900 mb-3">Side options</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
                        {sideOptions.map((option: any) => (
                            <SideOptionCard
                                key={option.$id}
                                name={option.name}
                                emoji={getFoodEmoji(option.name)}
                                onToggle={(selected) => handleSideToggle(option, selected)}
                            />
                        ))}
                    </ScrollView>
                </View>
            </ScrollView>

            {/* Bottom Bar */}
            <View className="flex-row items-center justify-between px-5 py-4 border-t border-gray-200">
                {/* Quantity Selector */}
                <View className="flex-row items-center bg-orange-100 rounded-full px-4 py-2">
                    <TouchableOpacity onPress={decreaseQuantity} className="w-8 h-8 items-center justify-center">
                        <Text className="text-orange-500 text-xl font-bold">−</Text>
                    </TouchableOpacity>
                    <Text className="text-gray-900 font-bold text-lg mx-4">{quantity}</Text>
                    <TouchableOpacity onPress={increaseQuantity} className="w-8 h-8 items-center justify-center">
                        <Text className="text-orange-500 text-xl font-bold">+</Text>
                    </TouchableOpacity>
                </View>

                {/* Add to Cart Button */}
                <TouchableOpacity
                    onPress={() => {
                        const allCustomizations = [...selectedToppings, ...selectedSides]
                        addItem({
                            id: id,
                            name: itemName,
                            price: itemPrice,
                            image_url: itemImage,
                            customizations: allCustomizations
                        })
                        router.back()
                    }}
                    className="bg-orange-500 rounded-full px-8 py-4 flex-row items-center"
                >
                    <Image
                        source={require('@/assets/icons/bag.png')}
                        className="w-5 h-5 mr-2"
                        tintColor="#FFFFFF"
                    />
                    <Text className="text-white font-bold text-base">Add to cart (Rs. {totalPrice})</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default ItemDetail
