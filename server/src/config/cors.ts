import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

// TODO: put all the origins in environment variable.
export const corsOptions: CorsOptions = {
  origin: [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://localhost:3001',
    'https://s13-02-m-node-react.vercel.app/',
    'https://s13-02-m-node-react.vercel.app',
    'https://nekode.vercel.app',
    'https://nekode.vercel.app/',
  ],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  credentials: true,
};
