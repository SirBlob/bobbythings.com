import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { AiGovernanceChecklist } from "./AiGovernanceChecklist";

const sections = [
  {
    id: "identity",
    title: "Identity",
    scope: "Controls that apply across approved enterprise AI services.",
    controls: [
      {
        setting: "Personal-account use for company work",
        reason: "Keeps company data within approved workspaces.",
        status: "baseline" as const,
        area: "Identity provider",
      },
      {
        setting: "Persistent memory",
        reason: "Reduces reuse of sensitive context.",
        status: "conditional" as const,
        area: "Admin console",
      },
    ],
    references: [{ label: "Identity documentation", href: "https://example.com/identity" }],
  },
];

describe("AiGovernanceChecklist", () => {
  it("presents navigation, control context, references, and implementation guidance", () => {
    render(<AiGovernanceChecklist sections={sections} reviewed="October 2, 2026" />);

    expect(screen.getByRole("navigation", { name: "Governance checklist sections" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Identity" })).toHaveAttribute("href", "#identity");
    expect(screen.getAllByText("Baseline")).toHaveLength(2);
    expect(screen.getAllByText("Conditional")).toHaveLength(2);
    expect(screen.getByText("Identity provider")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /^Identity documentation/ })).toHaveAttribute("target", "_blank");
    expect(screen.getByRole("heading", { name: "Keep enabled" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Implementation record" })).toBeInTheDocument();
    expect(screen.getByText("Last reviewed October 2, 2026")).toBeInTheDocument();
  });

  it("keeps the selected section marked as current after it is clicked", async () => {
    const user = userEvent.setup();
    const twoSections = [
      sections[0],
      { ...sections[0], id: "chatgpt", title: "ChatGPT" },
    ];

    render(<AiGovernanceChecklist sections={twoSections} reviewed="October 2, 2026" />);

    const identity = screen.getByRole("link", { name: "Identity" });
    const chatgpt = screen.getByRole("link", { name: "ChatGPT" });
    expect(identity).toHaveAttribute("aria-current", "location");

    await user.click(chatgpt);

    expect(chatgpt).toHaveAttribute("aria-current", "location");
    expect(identity).not.toHaveAttribute("aria-current");
  });

  it("moves the horizontal navigation to keep the active section visible", async () => {
    const user = userEvent.setup();
    const scrollTo = vi.fn();
    HTMLElement.prototype.scrollTo = scrollTo;
    const twoSections = [
      sections[0],
      { ...sections[0], id: "chatgpt", title: "ChatGPT" },
    ];

    render(<AiGovernanceChecklist sections={twoSections} reviewed="October 2, 2026" />);
    scrollTo.mockClear();
    await user.click(screen.getByRole("link", { name: "ChatGPT" }));

    await waitFor(() => expect(scrollTo).toHaveBeenCalled());
  });
});
