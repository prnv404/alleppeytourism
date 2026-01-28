import DodoPayments from 'dodopayments';
import { NextResponse } from 'next/server';

const client = new DodoPayments({
    bearerToken: process.env['DODO_PAYMENTS_API_KEY'],
    environment: process.env['DODO_PAYMENTS_ENVIRONMENT'] as 'live_mode' | 'test_mode',
});

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const product = await client.products.create({
            name: body.name,
            price: {
                currency: 'INR',
                discount: 0,
                price: body.price,
                purchasing_power_parity: true,
                type: 'one_time_price',
            },
            description: body.description ?? '',
            tax_category: 'digital_products', // Ensure this category is valid for your use case or optional
        });

        return NextResponse.json(product);
    } catch (error: any) {
        console.error("Product creation error:", error);
        return NextResponse.json(
            { error: error?.message || "Failed to create product" },
            { status: 500 }
        );
    }
}
