import * as socketio from "socket.io";
import chatsService from "../../api/Chats/ChatService";
import * as chatsValidations from "../../api/Chats/ChatValidation";
import usersService from "../../api/User/UserService";
import validation from "../../api/Utils/Validation";

class Socket {
  io: socketio.Server;
  constructor(server: any) {
    this.io = socketio.listen(server);
    this.io.on("connection", function(socket) {
      // insert socket events here
      socket.on("chat", async data => {
        // To-do Create Message in Message Collection
        const body = validation.validateBody(data, chatsValidations.CREATE);
        const message = await chatsService.createOrUpdateChat(body);
        await usersService.updateChatList(body.sender, body.receiver);
        await usersService.updateChatList(body.receiver, body.sender);
        this.io.sockets.emit(body.receiver, message);
      });
    });
  }
}

export default Socket;
