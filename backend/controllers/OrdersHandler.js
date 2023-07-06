const Orders = require('../models/OrderModel');

const createOrder = async (req, res) => {
    let data = req.body.order_data;
    await data.splice(0, 0, { order_date: req.body.order_date });

    let eId = await Orders.findOne({ email: req.body.email });
    console.log(eId);

    if (!eId) {
        try {
            await Orders.create({
                email: req.body.email,
                order_data: [data]
            })

            res.status(203).json({ success: true });
        } catch (err) {
            console.log(err.message);
            res.send("Server Error", err.message);
        }
    }
    else {
        try {
            await Orders.findOneAndUpdate({ email: req.body.email },
                { $push: { order_data: data } }
            )

            res.status(203).json({ success: true });
        } catch (err) {
            console.log(err.message);
            res.send("Server Error", err.message);
        }
    }
}

module.exports = createOrder;