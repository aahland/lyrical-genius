import ioClient from "socket.io-client";
const ENDPOINT = "https://lyrical-genius.pages.dev/";

const socket = ioClient(ENDPOINT)

export const io = socket