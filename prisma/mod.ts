import { PrismaClient } from '@prisma/client';
import { isDev } from '@utils/constants.ts';

const dbUrl = isDev
	? Deno.env.get('DATABASE_URL_DATAPROXY')
	: Deno.env.get('DATABASE_URL');

export const prisma = new PrismaClient({
	datasources: {
		db: {
			url: dbUrl,
		},
	},
});
