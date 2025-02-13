const User = require('../models/userModel');

index = async function (req, res) {
    try {
        const users = await User.find().select('name');
        return res.json({ success: true, message: 'Success', data: users });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}

profile = async function (req, res) {
    try {
        var ObjectId = (require('mongoose').Types.ObjectId);

        const user = await User.findOne(new ObjectId(req.user.id));
        return res.json({ success: true, message: 'Success', data: user });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}

module.exports = { index, profile }