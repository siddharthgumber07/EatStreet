import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

const frontend_url = "http://localhost:5173";

const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    if (!userId || !items?.length || !amount || !address) {
      return res.status(400).json({
        success: false,
        message: "Missing required order fields.",
        redirectUrl: `${frontend_url}/verify?success=false`,
      });
    }

    const newOrder = new orderModel({ userId, items, amount, address });
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    const redirectUrl = `${frontend_url}/verify?success=true&orderId=${newOrder._id}`;
    return res.json({ success: true, redirectUrl });
  } catch (error) {
    console.error("Error placing the order:", error);
    const redirectUrl = `${frontend_url}/verify?success=false`;
    return res.status(500).json({
      success: false,
      message: error.message || "Order placement failed.",
      redirectUrl,
    });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;

  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      return res.json({ success: true, message: "Order verified successfully" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      return res.json({ success: false, message: "Order cancelled" });
    }
  } catch (error) {
    console.error("Verification error:", error);
    return res.json({ success: false, message: "Verification failed" });
  }
};

export { placeOrder, verifyOrder };
