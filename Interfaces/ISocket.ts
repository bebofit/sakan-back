import socketio from "socket.io";
import { IUser } from "../database/models";

export interface ISocket extends socketio.Socket {
  user?: IUser;
}
