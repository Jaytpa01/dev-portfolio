export type ContributionType = "pull-request" | "issue" | "other";

export const getContributionTypeFromURL = (url: string): ContributionType => {
	if (url.includes("/pull/")) {
		return "pull-request";
	}

	if (url.includes("/issues/")) {
		return "issue";
	}

	return "other";
};
