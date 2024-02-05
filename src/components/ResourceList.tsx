export interface Folder {
	id: string;
	name: string;

	parentFolder?: string;
}

export interface Resource {
	name: string;
	href: string;

	folderId: string;
}

export function ResourceList() {
	return <div>Resource List</div>;
}
