import { getLocalStore } from "@/lib/db/local-store";

export function currentUsageMonth(date = new Date()) {
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}`;
}

export class UsageRepository {
  async get(userId: string, month = currentUsageMonth()) {
    const store = getLocalStore();
    let record = store.usage.find((usage) => usage.userId === userId && usage.month === month);
    if (!record) {
      record = { userId, month, generatedStories: 0 };
      store.usage.push(record);
    }
    return record;
  }

  async incrementStories(userId: string, month = currentUsageMonth()) {
    const record = await this.get(userId, month);
    record.generatedStories += 1;
    return record;
  }
}
