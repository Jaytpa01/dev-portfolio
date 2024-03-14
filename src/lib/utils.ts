import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
	return twMerge(clsx(inputs));
};

export const getRandomUnderlineColor = (): string => {
	const underlineOptions: string[] = [
		"decoration-neo-red",
		"decoration-indigo-400",
		"decoration-yellow-400",
		"decoration-orange-400",
		"decoration-green-400",
	];
	return underlineOptions[Math.floor(Math.random() * underlineOptions.length)];
};
