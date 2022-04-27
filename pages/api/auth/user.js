import connectDb from "../../../connection/config";
import nc from "next-connect";
import User from "../../../models/User";
import jwt from 'jsonwebtoken'
connectDb();

const handler = nc()
    .get(async (req, res) => {
        try {
            const { cookies } = req;
            const token = cookies.access_token;
            if (!token) {
                res.send({ message: "Unauthorized" })
            } else {
                const { user_id } = jwt.verify(token, 'hilalahmadkhanfrompakistanandfullstackwebdevelooperinnnodenextreactandvueandlaravel');
                const users = await User.findById({ _id: user_id }).select("-password");
                res.send({
                    success: true,
                    users: users
                })
            }
        } catch (error) {
            res.send({ message: error })
        }
    })
export default handler;