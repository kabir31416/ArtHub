import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/app/lib/stripe";

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      artworkId,
      title,
      image,
      price,
      artistName,
      artistEmail,
      buyerName,
      buyerEmail,
      buyerImage,
    } = body;

    const headersList = await headers();
    const origin = headersList.get("origin");

    const checkoutSession =
      await stripe.checkout.sessions.create({
        mode: "payment",

        payment_method_types: ["card"],

        line_items: [
          {
            price_data: {
              currency: "usd",

              product_data: {
                name: title,
                images: [image],
              },

              unit_amount: Math.round(price * 100),
            },

            quantity: 1,
          },
        ],

        metadata: {
          artworkId,
          title,
          image,
          price: String(price),

          artistName,
          artistEmail,

          buyerName,
          buyerEmail,
          buyerImage,
        },

        success_url:
          `${origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,

        cancel_url:
          `${origin}/artwork/${artworkId}`,
      });

    return NextResponse.json({
      success: true,
      url: checkoutSession.url,
    });

  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}