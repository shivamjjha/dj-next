// get API URL on prod or dev env
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';

// get NEXT FRONTEND URL on prod or dev env
export const NEXT_URL =
  process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000';

export const PER_PAGE = 5;
