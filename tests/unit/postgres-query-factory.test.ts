import { describe, expect, it } from "vitest";
import { postgresQueryFactory } from "@/lib/persistence/postgres-query-factory";
import { fixtureStory } from "../fixtures/story";

describe("PostgresQueryFactory", () => {
  it("maps story inserts into PostgreSQL-compatible json and array columns", () => {
    const statement = postgresQueryFactory.stories.insert(fixtureStory({ id: "story_1", userId: "user_1" }));

    expect(statement.text).toContain('insert into "stories"');
    expect(statement.values).toContain("story_1");
    expect(statement.values).toContain("user_1");
    expect(statement.values).toContain("moonlit garden");
    expect(statement.values.some((value) => Array.isArray(value))).toBe(true);
  });

  it("builds a skip-locked queue claim query for future worker deployment", () => {
    const statement = postgresQueryFactory.jobs.claimNext();

    expect(statement.text).toContain("for update skip locked");
    expect(statement.text).toContain("returning *");
    expect(statement.values).toEqual([]);
  });
});

