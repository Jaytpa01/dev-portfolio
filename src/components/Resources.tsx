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

interface ResourceDisplayProps {
	rootFolderId: string;
	folderMap: Record<string, Folder>;
	subfolderMap: Record<string, string[]>;
	folderResourceMap: Record<string, Resource[]>;
}

export function ResourceDisplay({
	rootFolderId,
	folderMap,
	subfolderMap,
	folderResourceMap,
}: ResourceDisplayProps) {
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

	const subfolders = subfolderMap[currentFolder.id]?.map(
		(subfolderId) => folderMap[subfolderId],
	);

	const resources = folderResourceMap[currentFolder.id];

	return (
		<div class="space-y-2 text-base sm:text-sm">
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
		</div>
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
		<nav>
			<ol class="flex space-x-2 font-bold">
				{breadcrumbs?.map((crumb) => (
					<li class="space-x-2">
						<button onClick={() => onCrumbClick(crumb.id)}>{crumb.name}</button>

						<span>{">"}</span>
					</li>
				))}

				<li>{currentFolder.name}</li>
			</ol>
		</nav>
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
				<li class="space-x-1">
					<span>📦</span>
					<button
						class="underline decoration-transparent underline-offset-2 transition duration-100 ease-in hover:decoration-inherit"
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
		<ul class="space-y-1">
			{resources.map((resource) => (
				<li class="space-x-1">
					<span>↗</span>
					<a
						href={resource.href}
						class="underline decoration-transparent underline-offset-2 transition duration-100 ease-in hover:decoration-inherit"
					>
						{resource.name}
					</a>
				</li>
			))}
		</ul>
	);
}
