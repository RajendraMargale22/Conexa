import bcrypt from "bcrypt";
import httpStatus from "http-status";
import crypto from "crypto";
import { User } from "../models/userModel.js";
import { Meeting } from "../models/meetingModel.js";


const login = async (req, res) => {

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(httpStatus.BAD_REQUEST).json({
            message: "Username and password are required"
        });
    }

    try {

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(httpStatus.NOT_FOUND).json({
                message: "User not found"
            });
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordCorrect) {
            return res.status(httpStatus.UNAUTHORIZED).json({
                message: "Invalid password"
            });
        }

        return res.status(httpStatus.OK).json({
            message: "Login successful",
            token: user.token,
            user: {
                name: user.name,
                username: user.username
            }
        });

    } catch (err) {

        console.log(err);

        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong"
        });

    }
};


const register = async (req, res) => {

    const { name, username, password } = req.body;

    if (!name || !username || !password) {
        return res.status(httpStatus.BAD_REQUEST).json({
            message: "All fields are required"
        });
    }

    try {

        const existingUser = await User.findOne({ username });

        if (existingUser) {
            return res.status(httpStatus.CONFLICT).json({
                message: "Username already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            username,
            password: hashedPassword,
            token: crypto.randomBytes(32).toString("hex")
        });

        await user.save();

        return res.status(httpStatus.CREATED).json({
            message: "User registered successfully"
        });

    } catch (err) {

        console.log(err);

        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong"
        });

    }
};


const getUserHistory = async (req, res) => {
    const {token} = req.query;

    try{

        const user = await User.findOne({token: token});

        if(!user){
            return res.status(httpStatus.UNAUTHORIZED).json({
                message: "Invalid token"
            });
        }

        const meetings = await Meeting.find({user_id: user.username})
        res.json(meetings);
    }catch(e){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: `Something went wrong on User History ${e}`})
    }
}


const addToHistory = async (req, res) => {
    const {token, meeting_code} = req.body;

    try{

        const user = await User.findOne({token: token});

        if(!user){
            return res.status(httpStatus.UNAUTHORIZED).json({
                message: "Invalid token"
            });
        }

        const newMeeting = new Meeting({
            user_id: user.username,
            meetingCode: meeting_code
        })

        await newMeeting.save();

        res.status(httpStatus.CREATED).json({message: "Added coe to history"})
    }catch(e){
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message: `Something went wrong at Adding Meeting to History ${e}`})
    }
}

export { login, register, getUserHistory, addToHistory };