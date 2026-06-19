import Razorpay from "razorpay";

let razorpayClient: Razorpay | null = null;

/**
 * Lazy initializer wrapper for Razorpay Client SDK.
 * Prevents initial startup crashes by checking configuration parameters on first access request.
 */
export const getRazorpayInstance = (): Razorpay => {
  if (!razorpayClient) {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      throw new Error(
        "Missing Razorpay credentials. Please configure RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET inside environment settings."
      );
    }

    razorpayClient = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });
  }

  return razorpayClient;
};
