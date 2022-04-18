import ioClient from "socket.io-client";
const ENDPOINT = "https://lyrical-genius-quiz.vercel.app/";

const socket = ioClient(ENDPOINT)

export const io = socket