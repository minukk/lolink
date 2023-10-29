export const backURL = process.env.NODE_ENV === 'production' ? 'https://api.loink.xyz' : process.env.NODE_ENV === 'development' ? 'https://api.dev.loink.xyz' : 'http://localhost:3333';
