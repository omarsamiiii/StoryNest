import { describe, expect, it } from "vitest";
import { PersistenceHealthService } from "@/lib/persistence/persistence-health";
import type { SqlClient } from "@/types/persistence";

describe("PersistenceHealthService", () => {
  it("reports mock mode when no SQL client is configured", async () => {
    const result = await new PersistenceHealthService().check();

    expect(result).toMatchObject({ ok: true, mode: "mock" });
  });

  it("reports postgres health when a SQL client responds", async () => {
    const client: SqlClient = {
      async query<T>() {
        return { rows: [{ ok: 1 } as T], rowCount: 1 };
      }
    };

    const result = await new PersistenceHealthService(client).check();

    expect(result).toMatchObject({ ok: true, mode: "postgres" });
  });

  it("returns an actionable failure detail for database errors", async () => {
    const client: SqlClient = {
      async query() {
        throw new Error("connection refused");
      }
    };

    const result = await new PersistenceHealthService(client).check();

    expect(result).toMatchObject({ ok: false, mode: "postgres", detail: "connection refused" });
  });
});
