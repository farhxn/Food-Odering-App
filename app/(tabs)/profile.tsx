import ProfileField from '@/components/ProfileField'
import { getCurrentUser, signOut } from '@/lib/appwrite'
import useAuthStore from '@/store/auth.store'
import { User } from '@/type'
import { router } from 'expo-router'
import { useEffect, useState } from 'react'
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Profile = () => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const { setIsAuthenticated, setUser: setAuthUser } = useAuthStore()

    useEffect(() => {
        loadUserData()
    }, [])

    const loadUserData = async () => {
        try {
            const userData = await getCurrentUser()
            setUser(userData as unknown as User)
        } catch (error) {
            console.error('Error loading user:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleLogout = async () => {
        Alert.alert(
            'Logout',
            'Are you sure you want to logout?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'Logout',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await signOut()
                            // Clear auth store
                            setIsAuthenticated(false)
                            setAuthUser(null)
                            router.replace('/(auth)/sign-in')
                        } catch (error) {
                            console.error('Logout error:', error)
                            Alert.alert('Error', 'Failed to logout. Please try again.')
                        }
                    }
                }
            ]
        )
    }

    if (loading) {
        return (
            <SafeAreaView className="flex-1 bg-gray-50 items-center justify-center">
                <Text className="text-gray-500">Loading...</Text>
            </SafeAreaView>
        )
    }

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <ScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 90 }}
            >
                {/* Header */}
                <View className="flex-row items-center justify-between px-5 py-4">
                    <TouchableOpacity onPress={() => router.back()}>
                        <Image
                            source={require('@/assets/icons/arrow-back.png')}
                            className="w-6 h-6"
                        />
                    </TouchableOpacity>
                    <Text className="text-xl font-semibold text-gray-900">Profile</Text>
                    <TouchableOpacity>
                        {/* <Image
                            source={require('@/assets/icons/search.png')}
                            className="w-6 h-6"
                        /> */}
                    </TouchableOpacity>
                </View>

                {/* Profile Avatar */}
                <View className="items-center mt-6 mb-8">
                    <View className="relative">
                        <View className="w-32 h-32 bg-orange-100 rounded-full items-center justify-center">
                            {user?.avatar ? (
                                <Image
                                    source={{ uri: user.avatar }}
                                    className="w-32 h-32 rounded-full"
                                />
                            ) : (
                                <Image
                                    source={require('@/assets/icons/user.png')}
                                    className="w-16 h-16"
                                    tintColor="#FF8C00"
                                />
                            )}
                        </View>
                        <TouchableOpacity className="absolute bottom-0 right-0 w-10 h-10 bg-orange-500 rounded-full items-center justify-center border-4 border-white">
                            <Image
                                source={require('@/assets/icons/pencil.png')}
                                className="w-4 h-4"
                                tintColor="#FFFFFF"
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* User Information */}
                <View className="px-5">
                    <ProfileField
                        label="Full Name"
                        value={user?.name || 'N/A'}
                        icon={require('@/assets/icons/user.png')}
                    />

                    <ProfileField
                        label="Email"
                        value={user?.email || 'N/A'}
                        icon={require('@/assets/icons/envelope.png')}
                    />

                    <ProfileField
                        label="Phone number"
                        value="N/A"
                        icon={require('@/assets/icons/phone.png')}
                    />

                    <ProfileField
                        label="Address 1 - (Home)"
                        value="N/A"
                        icon={require('@/assets/icons/location.png')}
                    />

                    <ProfileField
                        label="Address 2 - (Work)"
                        value="N/A"
                        icon={require('@/assets/icons/location.png')}
                    />
                </View>

                {/* Action Buttons */}
                <View className="px-5 mt-6 mb-8">
                    {/* <TouchableOpacity className="bg-white border-2 border-orange-500 rounded-full py-4 mb-4">
                        <Text className="text-orange-500 text-center font-semibold text-base">
                            Edit Profile
                        </Text>
                    </TouchableOpacity> */}

                    <TouchableOpacity
                        className="bg-white border-2 border-red-100 rounded-full py-4 flex-row items-center justify-center"
                        onPress={handleLogout}
                    >
                        <Image
                            source={require('@/assets/icons/logout.png')}
                            className="w-5 h-5 mr-2"
                            tintColor="#FF6B6B"
                        />
                        <Text className="text-red-500 text-center font-semibold text-base">
                            Logout
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Profile
