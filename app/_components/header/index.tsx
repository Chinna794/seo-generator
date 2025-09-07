import TextType from "@/components/TextType";
import React from "react";
import GitHubRepository from "./github-repository";

export default function Header() {
  return (
    <header className="z-10 flex w-full items-center justify-between pt-10">
      <TextType
        text={"SEO Generator"}
        typingSpeed={75}
        pauseDuration={1500}
        showCursor={true}
        cursorCharacter="_"
        as={"h1"}
        loop={false}
        className="max-w-[170px] text-3xl font-bold"
      />
      <nav>
        <ul>
          <li>
            <GitHubRepository />
          </li>
        </ul>
      </nav>
    </header>
  );
}
