import * as socketio from "socket.io";
import * as chatsService from "../../api/chats/service";
import * as chatsValidations from "../../api/Chats/validations";
import usersService from "../../api/User/UserService";
import validation from "../../api/Utils/Validation";
import jwt, { VerifyErrors } from "jsonwebtoken";
import { promises as fs } from "fs";
import path from "path";
import { ISocket } from "../../Interfaces/ISocket";

class Socket {
  io: socketio.Server;
  constructor() {}

  init(server: any) {
    this.io = socketio.listen(server);
    this.io.use(async (socket: any, next) => {
      if (socket.handshake.query && socket.handshake.query.token) {
        const publicKey = await fs.readFile(
          path.join(__dirname, "../../keys/jwtRS256.key.pub")
        );
        jwt.verify(
          socket.handshake.query.token,
          publicKey,
          (err: VerifyErrors, decoded: string | object) => {
            if (err) return next(new Error("Authentication error"));
            socket.user = decoded;
            next();
          }
        );
      } else {
        next(new Error("Authentication error"));
      }
    });

    this.io.on("connection", (socket: ISocket) => {
      console.log("user connected");
      // insert socket events here

      socket.on("chat", async (data: any) => {
        const userId = socket.user.id;
        const body = validation.validateBody(data, chatsValidations.MESSAGE);
        body.sender = await usersService.getUserById(userId);
        body.receiver = await usersService.getUserById(body.receiver);

        const chat = JSON.parse(
          JSON.stringify(await chatsService.createChat(body))
        );
        if (!chat) {
          throw { error: "didn't find chat" };
        }
        const isUpdated = await chatsService.readMessages(chat.id, userId);
        if (!isUpdated) {
          throw { error: " can not read messages" };
        }
        this.io.sockets.emit(chat.id, { message: chat.lastMessage });
        this.io.sockets.emit(`${body.receiver.id}-chats`, chat);
      });

      socket.on("disconnect", () => {
        console.log("user disconnected");
      });
    });
  }
}

export default new Socket();
