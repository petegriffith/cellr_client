export const convertSQLTimestamp = (SQLTimestamp: string): string => {
  return new Date(SQLTimestamp).toDateString();
};
