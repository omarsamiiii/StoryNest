import type { ChildProfile } from "@/types/children";
import type { ChildProfileInput } from "@/validation/children";
import { createId, nowIso } from "@/lib/db/id";
import { getLocalStore } from "@/lib/db/local-store";

export class ChildProfileRepository {
  async listByUser(userId: string) {
    return getLocalStore().children.filter((profile) => profile.userId === userId);
  }

  async findById(userId: string, id: string) {
    return (
      getLocalStore().children.find((profile) => profile.userId === userId && profile.id === id) ?? null
    );
  }

  async create(userId: string, input: ChildProfileInput): Promise<ChildProfile> {
    const timestamp = nowIso();
    const profile: ChildProfile = {
      id: createId("child"),
      userId,
      nickname: input.nickname,
      ageRange: input.ageRange,
      interests: input.interests,
      preferredTone: input.preferredTone,
      bedtimeSafeDefault: input.bedtimeSafeDefault,
      createdAt: timestamp,
      updatedAt: timestamp
    };

    getLocalStore().children.push(profile);
    return profile;
  }

  async update(userId: string, id: string, input: ChildProfileInput) {
    const profile = await this.findById(userId, id);
    if (!profile) return null;

    Object.assign(profile, input, { updatedAt: nowIso() });
    return profile;
  }

  async delete(userId: string, id: string) {
    const store = getLocalStore();
    const initialLength = store.children.length;
    store.children = store.children.filter(
      (profile) => !(profile.userId === userId && profile.id === id)
    );
    return store.children.length !== initialLength;
  }
}
