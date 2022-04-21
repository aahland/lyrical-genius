import ioClient from "socket.io-client";
const ENDPOINT = "https://lyricalgeniusquiz.herokuapp.com/";

const socket = ioClient(ENDPOINT)

export const io = socket