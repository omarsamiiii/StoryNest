export type ReminderChannel = "in_app" | "email_mock";
export type ReminderStatus = "scheduled" | "sent" | "skipped" | "canceled";

export interface BedtimeReminder {
  id: string;
  userId: string;
  childProfileId: string;
  channel: ReminderChannel;
  status: ReminderStatus;
  localTime: string;
  message: string;
  scheduledForDay: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReminderPreview {
  childNickname: string;
  localTime: string;
  message: string;
  windDownSuggestion: string;
}
