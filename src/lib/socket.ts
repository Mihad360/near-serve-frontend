import { envConfig } from "@/config/envConfig";
import { io, Socket } from "socket.io-client";
import Cookies from "js-cookie";
import { AUTH_CONFIG } from "@/lib/auth/auth.config";

let socket: Socket | null = null;

export const getSocket = (): Socket => {
  if (!socket) {
    const token =
      typeof window !== "undefined"
        ? Cookies.get(AUTH_CONFIG.TOKEN_COOKIE_KEY)
        : null;

    socket = io(envConfig.socketUrl || "http://localhost:5000", {
      autoConnect: false,
      transports: ["websocket"],
      auth: {
        token: token || "",
      },
    });
  }
  return socket;
};

export const resetSocket = (): void => {
  if (socket) {
    socket.disconnect();
    socket.removeAllListeners();
    socket = null;
  }
};
