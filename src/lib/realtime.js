import ioClient from "socket.io-client";
const ENDPOINT = "50f31430.lyrical-genius.pages.dev";

const socket = ioClient(ENDPOINT)

export const io = socket