const express = require("express");
const CartItems = require("../models/CartItems");
const User = require("../models/User");
const { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("./verifyToken");

const router = express.Router();

//create Cart Items
router.post("/", verifyTokenAndAuthorization, async (req, res) => {
    const newCartItems = new Order(req.body);

    try {
        const savedCartItems = await newCartItems.save();
        res.status(200).json({ status: 1, message: "Order submitted successfully", data: savedCartItems })

    } catch (err) {
        res.status(500).json({ status: 0, message: err.message })
    }
});

// Update Cart Items
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {

    try {
        const updatedCartItems = await CartItems.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true });

        if (updatedCartItems == null) {
            res.status(200).json({ success: 0, message: "No Data Found!" });
        } else {
            res.status(200).json({ success: 1, message: "Order state updated successfully", data: [updatedCartItems] })
        }

    } catch (err) {
        res.status(500).json({ status: 0, message: err.message })
    }
});




//Get All Cart Items
router.get("/all", verifyTokenAndAdmin, async (req, res) => {

    try {

        let sortObject = {};
        let sortByField = 'createdAt';

        sortObject[sortByField] = -1; //Sort Order

        const cartItemsData = await CartItems.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "user",
                    foreignField: "_id",
                    as: "user_info"
                }
            },
            {
                $project: {
                    "user_info._id": 0,
                    "user_info.password": 0,
                    "user_info.createdAt": 0,
                    "user_info.updatedAt": 0,
                    "user_info.isAdmin": 0
                }
            }
        ]).sort(sortObject);

        if (cartItemsData) {
            res.status(200).json({ success: 1, message: "", data: cartItemsData });
        } else {
            res.status(200).json({ success: 0, message: "No Data Found!" })
        }

    } catch (err) {
        res.status(500).json({ status: 0, message: err.message })
    }
})

//Get Single Cart Items
router.get("/find/:id", async (req, res) => {

    try {
        const cartItemsData = await CartItems.findById(req.params.id);

        if (cartItemsData) {
            res.status(200).json({ success: 1, message: "", data: cartItemsData });
        } else {
            res.status(200).json({ success: 0, message: "No Data Found!" })
        }

    } catch (err) {
        res.status(500).json({ status: 0, message: err.message })
    }
})

// // Update Order to Delivered
// router.put("/delivered/:id", verifyTokenAndAdmin, async (req, res) => {

//     try {
//         const updatedCartItems = await Order.findByIdAndUpdate(req.params.id, {
//             $set: { isDelivered: true, deliveredAt: Date.now() }
//         }, { new: true });

//         if (updatedCartItems == null) {
//             res.status(200).json({ success: 0, message: "No Data Found!" });
//         } else {
//             res.status(200).json({ success: 1, message: "Order delivered successfully", data: [updatedCartItems] })
//         }

//     } catch (err) {
//         res.status(500).json({ status: 0, message: err.message })
//     }
// });

// Update Cart Items to Approved
router.put("/approved/:id", verifyTokenAndAdmin, async (req, res) => {

    try {
        const updatedCartItems = await CartItems.findByIdAndUpdate(req.params.id, {
            $set: { isApproved: true, approvedAt: Date.now() }
        }, { new: true });

        if (updatedCartItems == null) {
            res.status(200).json({ success: 0, message: "No Data Found!" });
        } else {
            res.status(200).json({ success: 1, message: "Order approved successfully", data: [updatedCartItems] })
        }

    } catch (err) {
        res.status(500).json({ status: 0, message: err.message })
    }
});

// // Delete Cart Items
// router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
//     try {
//         const deletedOrder = await Order.findByIdAndDelete(req.params.id);

//         if (deletedOrder == null) {
//             res.status(200).json({ success: 0, message: "No Data Found!" });
//         } else {
//             res.status(200).json({ success: 1, message: "Order deleted successfully" });
//         }

//     } catch (err) {
//         res.status(500).json({ status: 0, message: err.message })
//     }
// });

module.exports = router;
