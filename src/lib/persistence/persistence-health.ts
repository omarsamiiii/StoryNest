import type { PersistenceHealth, SqlClient } from "@/types/persistence";

export class PersistenceHealthService {
  constructor(private readonly sqlClient?: SqlClient) {}

  async check(): Promise<PersistenceHealth> {
    if (!this.sqlClient) {
      return {
        ok: true,
        mode: "mock",
        checkedAt: new Date().toISOString(),
        detail: "Using the local in-memory repository implementation for development and tests."
      };
    }

    try {
      await this.sqlClient.query<{ ok: number }>({ text: "select 1 as ok", values: [] });
      return {
        ok: true,
        mode: "postgres",
        checkedAt: new Date().toISOString(),
        detail: "PostgreSQL connectivity check succeeded."
      };
    } catch (error) {
      return {
        ok: false,
        mode: "postgres",
        checkedAt: new Date().toISOString(),
        detail: error instanceof Error ? error.message : "Unknown database connectivity failure."
      };
    }
  }
}

export const persistenceHealthService = new PersistenceHealthService();

