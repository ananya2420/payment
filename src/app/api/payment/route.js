// app/api/payment/route.js

export async function POST(req) {
    try {
      const body = await req.json();
      const { cardName, cardNumber, expiry, ccv } = body;
  
      if (!cardName || !cardNumber || !expiry || !ccv) {
        return new Response(
          JSON.stringify({ success: false, message: "All fields are required." }),
          { status: 400 }
        );
      }
  
      // Simulate payment processing
      const fakeTransactionId = Math.floor(Math.random() * 1000000);
  
      return new Response(
        JSON.stringify({
          success: true,
          message: "Order placed successfully!",
          transactionId: fakeTransactionId,
        }),
        { status: 200 }
      );
    } catch (err) {
      return new Response(
        JSON.stringify({ success: false, message: "Something went wrong." }),
        { status: 500 }
      );
    }
  }
  