import { createAPI } from '@repo/api/server';
import { auth } from './auth';
import { db } from './db';

const api = createAPI({ auth, db });

export { api };
