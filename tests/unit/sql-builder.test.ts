import { describe, expect, it } from "vitest";
import { sqlBuilder } from "@/lib/persistence/sql-builder";

describe("SqlBuilder", () => {
  it("builds parameterized inserts", () => {
    const statement = sqlBuilder.insert({
      table: "child_profiles",
      values: {
        id: "child_1",
        user_id: "user_1",
        nickname: "Mira"
      },
      returning: ["id"]
    });

    expect(statement.text).toBe(
      'insert into "child_profiles" ("id", "user_id", "nickname") values ($1, $2, $3) returning "id"'
    );
    expect(statement.values).toEqual(["child_1", "user_1", "Mira"]);
  });

  it("refuses unsafe identifiers", () => {
    expect(() =>
      sqlBuilder.select({
        table: "stories; drop table users"
      })
    ).toThrow("Unsafe SQL identifier");
  });

  it("builds filtered select statements with order and limit", () => {
    const statement = sqlBuilder.select({
      table: "stories",
      where: { user_id: "user_1", favorite: true },
      orderBy: [{ column: "created_at", direction: "desc" }],
      limit: 10
    });

    expect(statement.text).toBe(
      'select * from "stories" where "user_id" = $1 and "favorite" = $2 order by "created_at" desc limit $3'
    );
    expect(statement.values).toEqual(["user_1", true, 10]);
  });
});

