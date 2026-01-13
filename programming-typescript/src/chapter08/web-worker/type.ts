export type Message = string;
export type ThreadID = number;
export type UserID = number;
export type Participants = UserID[];

export type Commands = {
  sendMessageToThread: [ThreadID, Message];
  createThread: [Participants];
  addUserToThread: [ThreadID, UserID];
  removeUserFromThread: [ThreadID, UserID];
};

export type Events = {
  receivedMessage: [ThreadID, UserID, Message];
  createdThread: [ThreadID, Participants];
  addedUserToThread: [ThreadID, UserID];
  removedUserFromThread: [ThreadID, UserID];
};

export interface SafeEmitter<Events extends Record<PropertyKey, unknown[]>> {
  emit<K extends keyof Events>(channel: K, ...data: Events[K]): boolean;
  on<K extends keyof Events>(
    channel: K,
    listener: (...data: Events[K]) => void
  ): this;
  on(channel: never, listener: (...data: unknown[]) => void): this;
}
