export const ensureValueFrom = <T>(
  from: () => T | undefined,
  refine?: (checking: T) => T
): T extends undefined ? never : T => {
  const checking = from();
  if (checking === undefined) {
    throw new Error(`undefined is not allowed from ${String(from)}`);
  }
  return (refine ? refine(checking) : checking) as never;
};

export const DATAGOLF_API_KEY = ensureValueFrom(
  () => process.env.DATAGOLF_API_KEY
);
