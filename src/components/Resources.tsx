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
		<div class="space-y-2 text-base ">
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
						<button
							onClick={() => onCrumbClick(crumb.id)}
							class="underline decoration-transparent underline-offset-2 transition duration-150 ease-in hover:decoration-inherit"
						>
							{crumb.name}
						</button>

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
				<li class="flex items-center space-x-3">
					<div class="h-4 w-4">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
						>
							<path d="M2 4.75C2 3.784 2.784 3 3.75 3h4.971c.58 0 1.12.286 1.447.765l1.404 2.063c.046.069.124.11.207.11h8.471c.966 0 1.75.783 1.75 1.75V19.25A1.75 1.75 0 0 1 20.25 21H3.75A1.75 1.75 0 0 1 2 19.25Zm1.75-.25a.25.25 0 0 0-.25.25v14.5c0 .138.112.25.25.25h16.5a.25.25 0 0 0 .25-.25V7.687a.25.25 0 0 0-.25-.25h-8.471a1.75 1.75 0 0 1-1.447-.765L8.928 4.61a.252.252 0 0 0-.208-.11Z"></path>
						</svg>
					</div>
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
				<li class="space-x-3">
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
