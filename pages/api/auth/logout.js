import connectDb from "../../../connection/config";
import nc from "next-connect";
import { serialize } from 'cookie'

connectDb();

const handler = nc()
    .get(async (req, res) => {
        try {
            const { cookies } = req;
            const token = cookies.access_token;
            if (!token) {
                res.send({ message: "Unauthorized" })
            } else {
                const cookies = serialize('access_token', null, {
                    httpOnly: true,
                    secure: 'development',
                    maxAge: -1,
                    path: '/'
                })
                res.setHeader('Set-Cookie', cookies)
                // add this line
                res.send({ message: 'logout successfully' })
            }
        } catch (error) {
            res.send({ message: error })
        }
    })
export default handler;