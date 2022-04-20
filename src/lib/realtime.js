import ioClient from "socket.io-client";
const ENDPOINT = "http://localhost:3000/";

const socket = ioClient()

export const io = socket