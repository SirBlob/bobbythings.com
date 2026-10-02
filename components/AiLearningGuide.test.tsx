import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test } from "vitest";
import { AiLearningGuide } from "./AiLearningGuide";

const topics = [
  {
    title: "AI Basics",
    summary: "Core language and model concepts.",
    general: { src: "/general-basics.png", alt: "General AI basics diagram" },
    technical: { src: "/technical-basics.png", alt: "Technical AI basics diagram" },
    references: [{ label: "Google ML Glossary", href: "https://developers.google.com/machine-learning/glossary/" }],
  },
  {
    title: "AI Agents",
    summary: "How agent systems organize work.",
    general: { src: "/general-agents.png", alt: "General AI agents diagram" },
    technical: { src: "/technical-agents.png", alt: "Technical AI agents diagram" },
    references: [{ label: "Anthropic Agent Design", href: "https://www.anthropic.com/engineering/building-effective-agents" }],
  },
  {
    title: "AI Systems & Governance",
    summary: "How AI systems are configured and governed.",
    general: { src: "/general-systems.png", alt: "General AI systems diagram" },
    technical: { src: "/technical-systems.png", alt: "Technical AI systems diagram" },
    references: [{ label: "MCP Documentation", href: "https://modelcontextprotocol.io/" }],
  },
] as const;

describe("AiLearningGuide", () => {
  test("switches every topic diagram between general and technical views", async () => {
    const user = userEvent.setup();
    render(<AiLearningGuide topics={topics} />);

    expect(screen.getByRole("button", { name: "General" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("img", { name: "General AI basics diagram" })).toBeVisible();
    expect(screen.getByRole("img", { name: "General AI agents diagram" })).toBeVisible();

    await user.click(screen.getByRole("button", { name: "Technical" }));

    expect(screen.getByRole("button", { name: "Technical" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("img", { name: "Technical AI basics diagram" })).toBeVisible();
    expect(screen.getByRole("img", { name: "Technical AI agents diagram" })).toBeVisible();
    expect(screen.queryByRole("img", { name: "General AI basics diagram" })).not.toBeInTheDocument();
  });

  test("renders the original source links beneath their diagrams", () => {
    render(<AiLearningGuide topics={topics} />);

    expect(screen.getByRole("link", { name: "Google ML Glossary" })).toHaveAttribute(
      "href",
      "https://developers.google.com/machine-learning/glossary/",
    );
    expect(screen.getByRole("link", { name: "Anthropic Agent Design" })).toHaveAttribute(
      "href",
      "https://www.anthropic.com/engineering/building-effective-agents",
    );
  });

  test("links the table of contents to each guide section", () => {
    render(<AiLearningGuide topics={topics} />);

    expect(screen.getByRole("navigation", { name: "AI guide contents" })).toBeVisible();
    expect(screen.getByRole("link", { name: "AI Basics" })).toHaveAttribute("href", "#ai-basics");
    expect(screen.getByRole("link", { name: "AI Agents" })).toHaveAttribute("href", "#ai-agents");
    expect(screen.getByRole("link", { name: "AI Systems & Governance" })).toHaveAttribute(
      "href",
      "#ai-systems-governance",
    );
    expect(document.querySelector("section#ai-systems-governance")).toBeInTheDocument();
  });

  test("highlights the section selected in the table of contents", async () => {
    const user = userEvent.setup();
    render(<AiLearningGuide topics={topics} />);

    expect(screen.getByRole("link", { name: "AI Basics" })).toHaveAttribute("aria-current", "location");

    await user.click(screen.getByRole("link", { name: "AI Agents" }));

    expect(screen.getByRole("link", { name: "AI Agents" })).toHaveAttribute("aria-current", "location");
    expect(screen.getByRole("link", { name: "AI Basics" })).not.toHaveAttribute("aria-current");
  });

});
