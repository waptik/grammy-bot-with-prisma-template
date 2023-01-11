import { User } from '~grammy/deps.ts';

export function getFullName(from: User) {
	return from.last_name
		? `${from.first_name} ${from.last_name}`
		: from.first_name;
}
export function getProfileLink(from: User, html = true) {
	return html
		? `<a href="tg://user?id=${from.id}">${getFullName(from)}</a>`
		: `tg://user?id=${from.id}`;
}
