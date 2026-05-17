export type SqlValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | Date
  | string[]
  | number[]
  | boolean[]
  | object;

export interface SqlStatement {
  text: string;
  values: SqlValue[];
}

export interface QueryResult<T> {
  rows: T[];
  rowCount: number;
}

export interface SqlClient {
  query<T = unknown>(statement: SqlStatement): Promise<QueryResult<T>>;
}

export interface InsertOptions<TRecord> {
  table: string;
  values: TRecord;
  returning?: string[];
}

export interface UpdateOptions<TRecord> {
  table: string;
  values: Partial<TRecord>;
  where: Record<string, SqlValue>;
  returning?: string[];
}

export interface SelectOptions {
  table: string;
  columns?: string[];
  where?: Record<string, SqlValue | SqlValue[]>;
  orderBy?: Array<{ column: string; direction: "asc" | "desc" }>;
  limit?: number;
  offset?: number;
}

export interface DeleteOptions {
  table: string;
  where: Record<string, SqlValue>;
  returning?: string[];
}

export interface PersistenceHealth {
  ok: boolean;
  mode: "mock" | "postgres";
  checkedAt: string;
  detail: string;
}
