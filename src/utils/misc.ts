import { sweetid } from 'https://deno.land/x/sweetid@0.11.1/mod.ts';

export function getEnvOrThrow(name: string) {
	const value = Deno.env.get(name);
	if (value == null) {
		throw new Error(`Missing env variable: ${name}`);
	}
	return value;
}
export const nanoid = sweetid('xl'); // 7-character random string

export function toUppercase(str: string) {
	return str
		.trim()
		.split(' ')
		.map((word) => word[0].toUpperCase() + word.slice(1))
		.join(' ');
}
