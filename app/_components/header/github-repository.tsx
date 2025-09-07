import { Loader } from "@/components/ai-elements/loader";
import { fetcher } from "@/lib/fetcher";
import { GitForkIcon, StarIcon } from "lucide-react";
import React from "react";
import useSWR from "swr";

type Repository = {
  name: string;
  html_url: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
};

export default function GitHubRepository() {
  const { data, error } = useSWR("/api/github-user", fetcher);

  if (error) return <RepositoryLoader />;
  if (!data) return <RepositoryLoader />;

  const repository: Repository = {
    name: data?.name,
    html_url: data?.html_url,
    description: data?.description,
    stargazers_count: data?.stargazers_count,
    forks_count: data?.forks_count,
  };

  return (
    <a
      href={repository.html_url}
      target="_blank"
      rel="noreferrer"
      className="bg-background block max-w-[250px] rounded-md border p-2 shadow-sm transition-all hover:bg-neutral-900"
    >
      <div className="flex items-center justify-between">
        <h3 className="mb-1 font-semibold text-[#539BF5]">{repository.name}</h3>
        <div className="flex gap-2 text-sm text-[#768390]">
          <span className="flex items-center gap-1 text-xs text-yellow-400 transition">
            <StarIcon className="size-4" /> {repository.stargazers_count}
          </span>
          <span className="flex items-center gap-1 text-xs text-purple-400 transition">
            <GitForkIcon className="size-4" /> {repository.forks_count}
          </span>
        </div>
      </div>
      {repository.description && <p className="line-clamp-2 text-xs text-[#8b949e]">{repository.description}</p>}
    </a>
  );
}

function RepositoryLoader() {
  return (
    <div className="bg-background flex w-[250px] items-center justify-center rounded-md border px-2 py-4 shadow-sm transition-all hover:bg-neutral-900">
      <Loader />
    </div>
  );
}
