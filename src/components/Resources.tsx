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

interface ResourcesProps {
	rootFolderId: string;
	folderMap: Record<string, Folder>;
	subfolderMap: Record<string, string[]>;
	folderResourceMap: Record<string, Resource[]>;
}

export function Resources({
	rootFolderId,
	folderMap,
	subfolderMap,
	folderResourceMap,
}: ResourcesProps) {
	const [currentFolderId, setCurrentFolderId] = useState(rootFolderId);

	const currentFolder = folderMap[currentFolderId];

	const calculateBreadcrumbs = () => {
		const crumbArray = [];
		let parentFolderId = currentFolder.parentFolder;
		while (parentFolderId) {
			const parentFolder = folderMap[parentFolderId];
			crumbArray.push(parentFolder);

			parentFolderId = parentFolder.parentFolder;
		}

		return crumbArray.reverse();
	};
	const breadcrumbs = calculateBreadcrumbs();
	console.log({ breadcrumbs });

	const subfolders = subfolderMap[currentFolder.id]?.map(
		(subfolderId) => folderMap[subfolderId],
	);

	const resources = folderResourceMap[currentFolder.id];

	return (
		<>
			<Breadcrumbs
				breadcrumbs={breadcrumbs}
				currentFolder={currentFolder}
				onCrumbClick={setCurrentFolderId}
			/>

			<SubfolderList
				onSubfolderClick={setCurrentFolderId}
				subfolders={subfolders}
			/>
			<ResourceList resources={resources} />
		</>
	);
}

interface BreadcrumbProps {
	breadcrumbs: Folder[];
	currentFolder: Folder;
	onCrumbClick: (folderId: string) => void;
}

function Breadcrumbs({
	breadcrumbs,
	currentFolder,
	onCrumbClick,
}: BreadcrumbProps) {
	return (
		<ol class="flex space-x-2 font-bold">
			{breadcrumbs?.map((crumb) => (
				<li class="space-x-2">
					<button onClick={() => onCrumbClick(crumb.id)}>{crumb.name}</button>

					<span>{">"}</span>
				</li>
			))}

			<li>{currentFolder.name}</li>
		</ol>
	);
}

interface SubfolderListProps {
	subfolders: Folder[];
	onSubfolderClick: (subfolderId: string) => void;
}

function SubfolderList({ subfolders, onSubfolderClick }: SubfolderListProps) {
	if (!subfolders) {
		return null;
	}

	return (
		<ul class="space-y-2">
			{subfolders.map((folder) => (
				<li>
					<button
						class="before:pr-1 before:content-['📦']"
						onClick={() => onSubfolderClick(folder.id)}
					>
						{folder.name}
					</button>
				</li>
			))}
		</ul>
	);
}

interface ResourceListProps {
	resources: Resource[];
}

function ResourceList({ resources }: ResourceListProps) {
	if (!resources) {
		return null;
	}

	return (
		<ul class="space-y-2">
			{resources.map((resource) => (
				<li>
					<a
						class="underline"
						href={resource.href}
					>
						{resource.name}
					</a>
				</li>
			))}
		</ul>
	);
}
