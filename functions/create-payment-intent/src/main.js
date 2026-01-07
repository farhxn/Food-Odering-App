import Stripe from 'stripe';

// Initialize Stripe with secret key from environment
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async ({ req, res, log, error }) => {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.json({ error: 'Method not allowed' }, 405);
    }

    try {
        // Parse request body - Appwrite sends body as a string in req.body or req.bodyRaw
        let body;
        try {
            // Try parsing req.body first
            if (typeof req.body === 'string') {
                body = JSON.parse(req.body);
            } else if (req.body) {
                body = req.body;
            } else if (req.bodyRaw) {
                body = JSON.parse(req.bodyRaw);
            } else {
                throw new Error('No request body found');
            }
        } catch (parseError) {
            log(`Body parsing error: ${parseError.message}`);
            log(`req.body type: ${typeof req.body}`);
            log(`req.body value: ${JSON.stringify(req.body)}`);
            log(`req.bodyRaw: ${req.bodyRaw}`);
            return res.json({ error: `Invalid request body: ${parseError.message}` }, 400);
        }

        const { amount, currency = 'pkr' } = body;

        if (!amount || amount <= 0) {
            return res.json({ error: 'Invalid amount' }, 400);
        }

        log(`Creating payment intent for amount: ${amount} ${currency}`);

        // Create Stripe customer
        const customer = await stripe.customers.create();
        log(`Created customer: ${customer.id}`);

        // Create ephemeral key for customer
        const ephemeralKey = await stripe.ephemeralKeys.create(
            { customer: customer.id },
            { apiVersion: '2023-10-16' }
        );
        log(`Created ephemeral key`);

        // Create payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Convert to cents
            currency: 'usd', // Use USD for testing to avoid minimum amount issues
            customer: customer.id,
            automatic_payment_methods: {
                enabled: true,
            },
        });
        log(`Created payment intent: ${paymentIntent.id}`);

        // Return payment details
        return res.json({
            paymentIntent: paymentIntent.client_secret,
            ephemeralKey: ephemeralKey.secret,
            customer: customer.id,
        });

    } catch (err) {
        error(`Payment intent creation failed: ${err.message}`);
        return res.json({
            error: err.message || 'Failed to create payment intent'
        }, 400);
    }
};
