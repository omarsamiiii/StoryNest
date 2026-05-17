import type { DeleteOptions, InsertOptions, SelectOptions, SqlStatement, SqlValue, UpdateOptions } from "@/types/persistence";

const identifierPattern = /^[a-zA-Z_][a-zA-Z0-9_]*$/;

function assertIdentifier(identifier: string) {
  if (!identifierPattern.test(identifier)) {
    throw new Error(`Unsafe SQL identifier: ${identifier}`);
  }
}

function quoteIdentifier(identifier: string) {
  assertIdentifier(identifier);
  return `"${identifier}"`;
}

function quotePath(path: string) {
  const parts = path.split(".");
  parts.forEach(assertIdentifier);
  return parts.map((part) => `"${part}"`).join(".");
}

function pushValue(values: SqlValue[], value: SqlValue) {
  values.push(value);
  return `$${values.length}`;
}

function buildWhere(where: Record<string, SqlValue | SqlValue[]> | undefined, values: SqlValue[]) {
  if (!where || Object.keys(where).length === 0) return "";

  const clauses = Object.entries(where).map(([column, value]) => {
    const quoted = quoteIdentifier(column);
    if (Array.isArray(value)) {
      if (value.length === 0) return "false";
      return `${quoted} = any(${pushValue(values, value)})`;
    }

    if (value === null) return `${quoted} is null`;
    return `${quoted} = ${pushValue(values, value)}`;
  });

  return ` where ${clauses.join(" and ")}`;
}

function returningClause(returning?: string[]) {
  if (!returning?.length) return "";
  return ` returning ${returning.map(quoteIdentifier).join(", ")}`;
}

export class SqlBuilder {
  insert<TRecord extends Record<string, SqlValue>>(options: InsertOptions<TRecord>): SqlStatement {
    assertIdentifier(options.table);

    const entries = Object.entries(options.values).filter(([, value]) => value !== undefined) as Array<[string, SqlValue]>;
    if (entries.length === 0) throw new Error("Cannot build an insert without values.");

    const values: SqlValue[] = [];
    const columns = entries.map(([column]) => quoteIdentifier(column)).join(", ");
    const placeholders = entries.map(([, value]) => pushValue(values, value)).join(", ");

    return {
      text: `insert into ${quoteIdentifier(options.table)} (${columns}) values (${placeholders})${returningClause(options.returning)}`,
      values
    };
  }

  update<TRecord extends Record<string, SqlValue>>(options: UpdateOptions<TRecord>): SqlStatement {
    assertIdentifier(options.table);

    const entries = Object.entries(options.values).filter(([, value]) => value !== undefined) as Array<[string, SqlValue]>;
    if (entries.length === 0) throw new Error("Cannot build an update without values.");

    const values: SqlValue[] = [];
    const set = entries.map(([column, value]) => `${quoteIdentifier(column)} = ${pushValue(values, value)}`).join(", ");
    const where = buildWhere(options.where, values);
    if (!where) throw new Error("Refusing to build an update without a where clause.");

    return {
      text: `update ${quoteIdentifier(options.table)} set ${set}${where}${returningClause(options.returning)}`,
      values
    };
  }

  select(options: SelectOptions): SqlStatement {
    assertIdentifier(options.table);

    const values: SqlValue[] = [];
    const columns = options.columns?.length ? options.columns.map(quoteIdentifier).join(", ") : "*";
    const where = buildWhere(options.where, values);
    const orderBy = options.orderBy?.length
      ? ` order by ${options.orderBy
          .map((order) => `${quoteIdentifier(order.column)} ${order.direction === "asc" ? "asc" : "desc"}`)
          .join(", ")}`
      : "";
    const limit = options.limit ? ` limit ${pushValue(values, options.limit)}` : "";
    const offset = options.offset ? ` offset ${pushValue(values, options.offset)}` : "";

    return {
      text: `select ${columns} from ${quoteIdentifier(options.table)}${where}${orderBy}${limit}${offset}`,
      values
    };
  }

  delete(options: DeleteOptions): SqlStatement {
    assertIdentifier(options.table);

    const values: SqlValue[] = [];
    const where = buildWhere(options.where, values);
    if (!where) throw new Error("Refusing to build a delete without a where clause.");

    return {
      text: `delete from ${quoteIdentifier(options.table)}${where}${returningClause(options.returning)}`,
      values
    };
  }

  raw(strings: TemplateStringsArray, ...valuesToBind: SqlValue[]): SqlStatement {
    const values: SqlValue[] = [];
    const text = strings.reduce((acc, chunk, index) => {
      const value = valuesToBind[index];
      return value === undefined ? acc + chunk : acc + chunk + pushValue(values, value);
    }, "");
    return { text, values };
  }

  jsonContains(tableAlias: string, column: string, value: object) {
    return `${quotePath(`${tableAlias}.${column}`)} @> '${JSON.stringify(value).replaceAll("'", "''")}'::jsonb`;
  }
}

export const sqlBuilder = new SqlBuilder();

