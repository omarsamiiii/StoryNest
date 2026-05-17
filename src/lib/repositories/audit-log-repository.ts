import { createId, nowIso } from "@/lib/db/id";
import { getLocalStore } from "@/lib/db/local-store";
import type { AuditAction, AuditLogEntry, AuditTimelineGroup } from "@/types/audit";

export class AuditLogRepository {
  async record(input: {
    userId: string;
    action: AuditAction;
    entityType: string;
    entityId?: string;
    metadata?: Record<string, string | number | boolean | null>;
  }): Promise<AuditLogEntry> {
    const entry: AuditLogEntry = {
      id: createId("audit"),
      userId: input.userId,
      action: input.action,
      entityType: input.entityType,
      entityId: input.entityId,
      metadata: input.metadata ?? {},
      createdAt: nowIso()
    };
    getLocalStore().auditLogs.push(entry);
    return entry;
  }

  async listByUser(userId: string, limit = 50) {
    return getLocalStore()
      .auditLogs.filter((entry) => entry.userId === userId)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
      .slice(0, limit);
  }

  async timeline(userId: string): Promise<AuditTimelineGroup[]> {
    const entries = await this.listByUser(userId, 200);
    const groups = new Map<string, AuditLogEntry[]>();
    for (const entry of entries) {
      const day = entry.createdAt.slice(0, 10);
      groups.set(day, [...(groups.get(day) ?? []), entry]);
    }
    return Array.from(groups.entries()).map(([date, groupedEntries]) => ({
      date,
      entries: groupedEntries
    }));
  }
}
