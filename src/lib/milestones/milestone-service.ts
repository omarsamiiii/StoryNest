import { MILESTONE_RULES } from "@/constants/milestones";
import { repositories } from "@/lib/repositories";
import type { ChildProfile } from "@/types/children";
import type {
  ChildMilestoneBoard,
  MilestoneCategory,
  MilestoneProgress,
  MilestoneRule,
  ParentMilestoneReport
} from "@/types/milestones";
import type { Story } from "@/types/story";

function uniqueCount(values: string[]) {
  return new Set(values.filter(Boolean).map((value) => value.trim().toLowerCase())).size;
}

function encouragement(rule: MilestoneRule, percent: number) {
  if (percent >= 100) return `${rule.title} unlocked. This is ready to celebrate at bedtime.`;
  if (percent >= 75) return `Almost there. One or two cozy sessions may unlock ${rule.title}.`;
  if (percent >= 40) return `${rule.title} is growing steadily. Keep the bedtime rhythm gentle.`;
  return `Start small. ${rule.parentTip}`;
}

function progressForCategory(category: MilestoneCategory, stories: Story[]) {
  switch (category) {
    case "story-count":
      return stories.length;
    case "favorite-habit":
      return stories.filter((story) => story.favorite).length;
    case "bedtime-safe":
      return stories.filter((story) => story.safetyMetadata.bedtimeSafe).length;
    case "variety":
      return uniqueCount(stories.map((story) => story.theme));
    case "discussion":
      return stories.reduce(
        (total, story) => total + story.vocabularyWords.length + story.discussionQuestions.length,
        0
      );
    case "profile-care":
      return stories.length > 0 ? 1 : 0;
    default:
      return 0;
  }
}

function buildProgress(rule: MilestoneRule, stories: Story[]): MilestoneProgress {
  const progress = progressForCategory(rule.category, stories);
  const percent = Math.min(100, Math.round((progress / rule.target) * 100));
  const achieved = progress >= rule.target;

  return {
    rule,
    progress,
    target: rule.target,
    percent,
    achieved,
    achievedAt: achieved ? stories[0]?.createdAt : undefined,
    encouragement: encouragement(rule, percent)
  };
}

function highlights(boards: ChildMilestoneBoard[]) {
  const achieved = boards.reduce(
    (total, board) => total + board.milestones.filter((milestone) => milestone.achieved).length,
    0
  );
  const storyCount = boards.reduce((total, board) => total + board.storyCount, 0);
  const themes = boards.reduce((total, board) => total + board.themeCount, 0);

  return [
    `${achieved} milestone${achieved === 1 ? "" : "s"} unlocked across the family library.`,
    `${storyCount} saved stor${storyCount === 1 ? "y" : "ies"} are ready for repeat bedtime reading.`,
    `${themes} theme${themes === 1 ? "" : "s"} explored through parent-controlled story generation.`
  ];
}

export class MilestoneService {
  rules() {
    return [...MILESTONE_RULES];
  }

  buildChildBoard(child: ChildProfile, stories: Story[]): ChildMilestoneBoard {
    const childStories = stories.filter((story) => story.childProfileId === child.id);
    const milestones = MILESTONE_RULES.map((rule) => buildProgress(rule, childStories));
    const nextMilestone = milestones
      .filter((milestone) => !milestone.achieved)
      .sort((a, b) => b.percent - a.percent || a.rule.title.localeCompare(b.rule.title))[0];

    return {
      childProfileId: child.id,
      childNickname: child.nickname,
      storyCount: childStories.length,
      favoriteCount: childStories.filter((story) => story.favorite).length,
      bedtimeSafeCount: childStories.filter((story) => story.safetyMetadata.bedtimeSafe).length,
      themeCount: uniqueCount(childStories.map((story) => story.theme)),
      vocabularyWordCount: childStories.reduce((total, story) => total + story.vocabularyWords.length, 0),
      discussionQuestionCount: childStories.reduce(
        (total, story) => total + story.discussionQuestions.length,
        0
      ),
      milestones,
      nextMilestone
    };
  }

  async report(userId: string): Promise<ParentMilestoneReport> {
    const [children, stories] = await Promise.all([
      repositories.children.listByUser(userId),
      repositories.stories.listByUser(userId)
    ]);
    const childBoards = children.map((child) => this.buildChildBoard(child, stories));
    const totalAchieved = childBoards.reduce(
      (total, board) => total + board.milestones.filter((milestone) => milestone.achieved).length,
      0
    );

    return {
      userId,
      generatedAt: new Date().toISOString(),
      totalAchieved,
      totalAvailable: childBoards.length * MILESTONE_RULES.length,
      childBoards,
      familyHighlights: highlights(childBoards)
    };
  }
}

export const milestoneService = new MilestoneService();

