const OrderModel = require("../models/orderModel");

// ADD NEW ORDER
const addOrder = async (req, res) => {
    const userID = req.params.userID;
    const paymentID = req.params.paymentID;
    const note = req.body.note;
    const total_price = req.body.total_price;
    const total_quantity = req.body.total_quantity;
    const total_discount = req.body.total_discount;
    const price_after_discount = req.body.price_after_discount;
    await OrderModel.create({
        userID: userID,
        paymentID: paymentID,
        note: note,
        total_price: total_price,
        total_quantity: total_quantity,
        total_discount: total_discount,
        price_after_discount: price_after_discount
    }).then(data => {
        res.status(200).json("Đã thêm đơn hàng mới", data)
    }).catch(error => {
        res.status(500).json(error)
    })
}

// GET ORDER APPROVED 
const getOrderApproved = async (req, res) => {
    const orders = await OrderModel.find({order_status: 1})
    if(orders.length > 0){
        res.status(200).json(orders)
    } else {
        res.status(404).json("Không có đơn hàng nào đã được xử lý")
    }
}

// GET ORDER PENDING
const getOrderPending= async (req, res) => {
    const orders = await OrderModel.find({order_status: 0})
    if(orders.length > 0){
        res.status(200).json(orders)
    } else {
        res.status(404).json("Không có đơn hàng nào cần xử lý")
    }
}

// GET ORDER APPROVED BY USER ID
const getOrderApprovedByUserID = async (req, res) => {
    const userID = req.params.userID;
    const orders = await OrderModel.find({userID: userID, order_status: 1})
    if(orders.length > 0){
        res.status(200).json(orders)
    } else {
        res.status(404).json("Không có đơn hàng nào đã được xử lý")
    }
}

// GET ORDER PENDING BY USER ID
const getOrderPendingByUserID = async (req, res) => {
    const userID = req.params.userID;
    const orders = await OrderModel.find({userID: userID, order_status: 0})
    if(orders.length > 0){
        res.status(200).json(orders)
    } else {
        res.status(404).json("Không có đơn hàng nào cần xử lý")
    }
}

// UPDATE ORDER STATUS
const updateOrderStatus = async (req, res) => {
    const orderID = req.params.orderID;
    const userID = req.params.userID;
    await OrderModel.findByIdAndUpdate({
        userID: userID,
        _id: orderID
    },{
        order_status: 1
    }).then(data => {
        res.status(200).json({message: "Đơn hàng đã được xử lý", data})
    }).catch(error => {
        res.status(500).json(error)
    })
}

module.exports= {
   getOrderPendingByUserID , getOrderApprovedByUserID, updateOrderStatus , addOrder, getOrderApproved, getOrderPending
}