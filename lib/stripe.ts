import { appwriteConfig } from "./appwrite";

// TODO: Replace with your Appwrite function ID after deployment
const PAYMENT_FUNCTION_ID = '695e6f1e0005a204d1ee';

// Stripe payment intent creation via Appwrite function
export const createPaymentIntent = async (amount: number, currency: string = 'pkr') => {
    // Validate setup
    try {
        // Appwrite function executions require the data as a JSON string in the 'body' field
        const functionData = {
            amount,
            currency,
        };

        const response = await fetch(
            `${appwriteConfig.endpoint}/functions/${PAYMENT_FUNCTION_ID}/executions`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Appwrite-Project': appwriteConfig.projectId,
                },
                body: JSON.stringify({
                    body: JSON.stringify(functionData), // Double stringify: outer for fetch, inner for Appwrite
                }),
            }
        );

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Server error response:', errorText);
            throw new Error(`Server error: ${response.status} - ${errorText}`);
        }

        const executionData = await response.json();

        // Debug: Log the full execution response
        console.log('Full Appwrite execution response:', JSON.stringify(executionData, null, 2));

        // Appwrite returns execution data with responseBody containing the actual function response
        let data;
        if (executionData.responseBody) {
            // Parse the responseBody which contains the actual function return value
            data = typeof executionData.responseBody === 'string'
                ? JSON.parse(executionData.responseBody)
                : executionData.responseBody;
        } else {
            data = executionData;
        }

        console.log('Parsed function data:', JSON.stringify(data, null, 2));

        if (data.error) {
            throw new Error(data.error);
        }

        // Check if we got the required fields
        if (!data.paymentIntent || !data.ephemeralKey || !data.customer) {
            console.error('Missing fields in response:', {
                hasPaymentIntent: !!data.paymentIntent,
                hasEphemeralKey: !!data.ephemeralKey,
                hasCustomer: !!data.customer,
                actualData: data
            });
            throw new Error('Invalid response from payment server. Check Appwrite function logs.');
        }

        return data;
    } catch (error: any) {
        console.error('Payment intent creation error:', error);
        throw new Error(error.message || 'Failed to create payment intent');
    }
};
