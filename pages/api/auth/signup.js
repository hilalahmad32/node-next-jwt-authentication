import connectDb from "../../../connection/config";
import nc from "next-connect";
import bcryptjs from 'bcryptjs'
import User from "../../../models/User";
connectDb();

const handler = nc()
    .post(async (req, res) => {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            res.send({
                success: false,
                message: 'Please fill all the field'
            })
        } else {
            const is_email = await User.findOne({ email: email });
            if (is_email) {
                res.send({
                    success: false,
                    message: 'Email already exist'
                });
            } else {
                const newPassword = await bcryptjs.hash(password, 10);
                const users = new User({ name, email, password: newPassword });
                const user = await users.save();
                if (user) {
                    res.send({
                        success: true,
                        message: 'User Add Successfully'
                    });
                } else {
                    res.send({
                        success: false,
                        message: 'Some problem'
                    });
                }
            }
        }
    })
export default handler;