export const parseDates = (from?: string, until?: string) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (from && !regex.test(from)) {
    from = undefined;
  }

  if (until && !regex.test(until)) {
    until = undefined;
  }
  return {
    from: from ? new Date(from) : undefined,
    until: until ? new Date(until) : undefined,
  };
};
