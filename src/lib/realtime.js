import ioClient from "socket.io-client";
const ENDPOINT = "https://lyrical-genius.vercel.app/";

const socket = ioClient()

export const io = socket