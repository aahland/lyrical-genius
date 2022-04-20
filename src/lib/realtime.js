import ioClient from "socket.io-client";
const ENDPOINT = "https://lyrical-genius.pages.dev/";

const socket = ioClient()

export const io = socket