export interface TokenPayload {
  userId: string;
  type: "access" | "refresh";
}