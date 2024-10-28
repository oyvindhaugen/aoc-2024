export const getTodayLines = async (year: number, day: number) => {
  const headers = {
    headers: {
      Cookie: `session=${process.env.SESSION_COOKIE}`,
      'User-Agent': process.env.USER_AGENT || '',
    },
  };
  const res = await fetch(
    `https://adventofcode.com/${year}/day/${day}/input`,
    headers,
  );
  const text = await res.text();
  return text.split('\n');
};
