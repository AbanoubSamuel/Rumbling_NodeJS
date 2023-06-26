import {Request, Response} from "express";
import axios from "axios";


export const getUsers = async (req: Request, res: Response) =>
{

    try {
        const response = await axios.get("http://127.0.0.1:8000/api/users");
        const data = response.data;

        res.json(data);
    } catch (error) {
        res.status(500).json({error: "Failed to fetch data from the API."});
    }

};




