import { useState } from 'react'
import { Image, ImageSourcePropType, Text, TouchableOpacity, View } from 'react-native'

interface ToppingCardProps {
    name: string
    image?: ImageSourcePropType
    emoji?: string
    onToggle: (selected: boolean) => void
}

const ToppingCard = ({ name, image, emoji, onToggle }: ToppingCardProps) => {
    const [isSelected, setIsSelected] = useState(false)

    const handleToggle = () => {
        const newState = !isSelected
        setIsSelected(newState)
        onToggle(newState)
    }

    return (
        <View className="mr-3">
            <View className="w-24 h-24 bg-white rounded-2xl items-center justify-center relative shadow-sm">
                {emoji ? (
                    <Text className="text-5xl">{emoji}</Text>
                ) : image ? (
                    <Image source={image} className="w-16 h-16" resizeMode="contain" />
                ) : null}
                <TouchableOpacity
                    className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full items-center justify-center ${isSelected ? 'bg-red-500' : 'bg-gray-800'}`}
                    onPress={handleToggle}
                >
                    <Text className="text-white text-lg font-bold">
                        {isSelected ? '−' : '+'}
                    </Text>
                </TouchableOpacity>
            </View>
            <Text className="text-white text-xs font-medium mt-2 text-center bg-gray-800 px-2 py-1 rounded-full">
                {name}
            </Text>
        </View>
    )
}

export default ToppingCard

