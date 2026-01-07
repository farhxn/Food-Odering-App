import CartItem from "@/components/CartItem";
import CustomButton from "@/components/CustomButton";
import CustomHeader from "@/components/CustomHeader";
import { createPaymentIntent } from '@/lib/stripe';
import { useCartStore } from "@/store/cart.store";
import { PaymentInfoStripeProps } from '@/type';
import { useStripe } from '@stripe/stripe-react-native';
import cn from "clsx";
import { useState } from 'react';
import { Alert, FlatList, Image, Text, View } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

const PaymentInfoStripe = ({ label, value, labelStyle, valueStyle, }: PaymentInfoStripeProps) => (
    <View className="flex-between flex-row my-1">
        <Text className={cn("paragraph-medium text-gray-200", labelStyle)}>
            {label}
        </Text>
        <Text className={cn("paragraph-bold text-dark-100", valueStyle)}>
            {value}
        </Text>
    </View>
);

const Cart = () => {
    const { items, getTotalItems, getTotalPrice, clearCart } = useCartStore();
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const [loading, setLoading] = useState(false);

    const totalItems = getTotalItems();
    const totalPrice = getTotalPrice();
    const deliveryFee = 5;
    const finalTotal = totalPrice + deliveryFee;

    const handleCheckout = async () => {
        setLoading(true);

        try {
            // 1. Create payment intent via Appwrite function
            const { paymentIntent, ephemeralKey, customer } = await createPaymentIntent(finalTotal);

            // 2. Initialize payment sheet
            const { error: initError } = await initPaymentSheet({
                merchantDisplayName: 'Food Ordering App',
                customerId: customer,
                customerEphemeralKeySecret: ephemeralKey,
                paymentIntentClientSecret: paymentIntent,
                defaultBillingDetails: {
                    name: 'Customer',
                },
            });

            if (initError) {
                Alert.alert('Error', initError.message);
                setLoading(false);
                return;
            }

            // 3. Present payment sheet
            const { error: paymentError } = await presentPaymentSheet();

            if (paymentError) {
                Alert.alert('Payment Cancelled', paymentError.message);
            } else {
                Alert.alert('Success', 'Your order has been placed!');
                clearCart();
            }
        } catch (error: any) {
            Alert.alert('Error', error.message || 'Payment failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView className="bg-white h-full">
            <FlatList
                data={items}
                renderItem={({ item }) => <CartItem item={item} />}
                keyExtractor={(item) => item.id}
                contentContainerClassName="pb-28 px-5 pt-5"
                ListHeaderComponent={() => <CustomHeader title="Your Cart" />}
                ListEmptyComponent={() => (
                    <View className="flex-1 items-center justify-center mt-20">
                        <Image
                            source={require('@/assets/images/empty-cart.jpg')}
                            className="w-64 h-64"
                            resizeMode="contain"
                        />
                        <Text className="text-gray-500 text-lg mt-4">Your cart is empty</Text>
                    </View>
                )}
                ListFooterComponent={() => totalItems > 0 && (
                    <View className="gap-5">
                        <View className="mt-6 border border-gray-200 p-5 rounded-2xl">
                            <Text className="h3-bold text-dark-100 mb-5">
                                Payment Summary
                            </Text>

                            <PaymentInfoStripe
                                label={`Total Items (${totalItems})`}
                                value={`Rs.${totalPrice.toFixed(2)}`}
                            />
                            <PaymentInfoStripe
                                label={`Delivery Fee`}
                                value={`Rs.${deliveryFee.toFixed(2)}`}
                            />

                            <View className="border-t border-gray-300 my-2" />
                            <PaymentInfoStripe
                                label={`Total`}
                                value={`Rs.${finalTotal.toFixed(2)}`}
                                labelStyle="base-bold !text-dark-100"
                                valueStyle="base-bold !text-dark-100 !text-right"
                            />
                        </View>

                        <CustomButton
                            title={loading ? "Processing..." : "Order Now"}
                            onPress={handleCheckout}
                            disabled={loading}
                        />
                    </View>
                )}
            />
        </SafeAreaView>
    )
}

export default Cart
