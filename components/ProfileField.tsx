import { ProfileFieldProps } from '@/type'
import { Image, Text, View } from 'react-native'

const ProfileField = ({ label, value, icon }: ProfileFieldProps) => {
    return (
        <View className="bg-white rounded-2xl p-4 mb-3 flex-row items-center shadow-sm">
            <View className="w-10 h-10 bg-orange-50 rounded-full items-center justify-center mr-3">
                <Image
                    source={icon}
                    className="w-5 h-5"
                    tintColor="#FF8C00"
                />
            </View>
            <View className="flex-1">
                <Text className="text-gray-500 text-xs mb-1">{label}</Text>
                <Text className="text-gray-900 text-base font-medium">{value}</Text>
            </View>
        </View>
    )
}

export default ProfileField
