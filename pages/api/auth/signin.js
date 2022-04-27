import connectDb from "../../../connection/config";
import nc from "next-connect";
import bcryptjs from 'bcryptjs'
import User from "../../../models/User";
import jwt from 'jsonwebtoken'
import { serialize } from 'cookie'
connectDb();

const handler = nc()
    // user login
    .post(async (req, res) => {
        const { email, password } = req.body;
        if (!email || !password) {
            res.send({
                success: false,
                message: 'Please fill all field'
            });
        } else {
            const users = await User.findOne({ email: email });
            if (users) {
                const cPassword = await bcryptjs.compare(password, users.password);
                if (cPassword) {
                    const user_id = { user_id: users._id };
                    const token = jwt.sign(user_id, 'hilalahmadkhanfrompakistanandfullstackwebdevelooperinnnodenextreactandvueandlaravel')
                    const cookies = serialize('access_token', token, {
                        httpOnly: true,
                        secure: 'development',
                        maxAge: 60 * 60 * 24 * 30,// 30days
                        path: '/'
                    })
                    res.setHeader('Set-Cookie', cookies)
                    res.send({
                        token: token,
                        success: true,
                        message: 'User Login Successfully'
                    })
                } else {
                    res.send({
                        success: false,
                        message: 'Invalid Email and Password'
                    })
                }
            } else {
                res.send({
                    success: false,
                    message: 'User Not Found'
                })
            }
        }
    })
export default handler;