export class ConversationModel {
  id?: string;
  userId?: string;
  displayName: string;
  avatar?: string;
  message: string;
  date?: number;
  users?: [];
}
