import { billingProvider } from "@/lib/billing/mock-billing-provider";
import { repositories } from "@/lib/repositories";
import { storyGenerationService } from "@/lib/services/story-generation-service";

export async function seedDemoParent() {
  const existing = await repositories.users.findByEmail("parent@example.com");
  if (existing) return existing;

  const user = await repositories.users.create({
    name: "Demo Parent",
    email: "parent@example.com",
    passwordHash: "demo-local-only"
  });
  await billingProvider.upgrade(user.id, "premium");
  const child = await repositories.children.create(user.id, {
    nickname: "Mira",
    ageRange: "5-6",
    interests: ["space", "friendship", "magic"],
    preferredTone: "calm",
    bedtimeSafeDefault: true
  });
  await storyGenerationService.generate({
    userId: user.id,
    childProfileId: child.id,
    theme: "moonlit garden",
    lesson: "kindness grows when shared",
    length: "short",
    tone: "calm",
    bedtimeSafe: true
  });
  return user;
}
