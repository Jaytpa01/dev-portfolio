import { useState } from "preact/hooks";

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

interface ResourceListProps {
	rootFolderId: string;
	folderMap: Record<string, Folder>;
	subfoldersMap: Record<string, string[]>;
	folderResourceMap: Record<string, Resource[]>;
}

export function ResourceList({
	rootFolderId,
	folderMap,
	subfoldersMap,
	folderResourceMap,
}: ResourceListProps) {
	const [currentFolder, setCurrentFolder] = useState(folderMap["articles"]);

	const subfolders = subfoldersMap[currentFolder.id].map(
		(subfolderId) => folderMap[subfolderId],
	);
	const resources = folderResourceMap[currentFolder.id];

	return (
		<div>
			<div>Resource List</div>
			Current:
			<pre>{JSON.stringify(currentFolder, null, "\t")}</pre>
			Sub:
			<pre>{JSON.stringify(subfolders, null, "\t")}</pre>
			Resources:
			<pre>{JSON.stringify(resources, null, "\t")}</pre>
		</div>
	);
}
