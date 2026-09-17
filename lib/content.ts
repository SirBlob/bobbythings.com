export const projects = [
  { slug: "automatic-sudoku-solver", title: "Automatic Sudoku Solver", summary: "A Python script that solves web-based Sudoku puzzles and enters the answers automatically.", purpose: "Built to expand my Python knowledge by improving an existing solver with safer, faster interaction controls.", tags: ["Python", "PyAutoGUI", "Automation"], highlights: ["Selects and activates the correct Sudoku browser window before running.", "Adds an Escape-key emergency stop for safer automation.", "Reduces PyAutoGUI's action delay from 0.1 seconds to 0.01 seconds."], media: [{ src: "/media/sudoku/original.gif", alt: "Original Sudoku solver entering answers into a web puzzle", caption: "Original code" }, { src: "/media/sudoku/improved.gif", alt: "Improved Sudoku solver entering answers with less delay", caption: "Improved version with less delay" }, { src: "/media/sudoku/escape-key.gif", alt: "Sudoku solver stopping when the Escape key is pressed", caption: "Emergency stop using the Escape key" }], github: "https://github.com/SirBlob/autosudokusolver" },
  { slug: "cybersecurity-news-scraper", title: "Cybersecurity News Scraper", summary: "A Python scraper that gathers security headlines from several sources into one CSV report.", purpose: "Built to make daily security reading faster while learning practical data collection and cleanup.", tags: ["Python", "Pandas", "lxml"], highlights: ["Collects titles, descriptions, and links using requests and XPath selectors.", "Cleans and combines results in pandas before exporting a CSV summary.", "Documents limitations such as brittle selectors, scaling, and error handling."], media: [], github: "https://github.com/SirBlob/webscraper-CyberSecurityNews.git" },
  { slug: "secure-new-environment", title: "Secure New Environment", summary: "A Bash script for applying a basic security baseline to a fresh Kali Linux virtual machine.", purpose: "Built to practice Bash scripting and make common setup steps repeatable.", tags: ["Bash", "Linux", "Hardening"], highlights: ["Changes the current user's password and creates a new user.", "Runs system package updates through apt.", "Replaces the default SSH host keys."], media: [], github: "https://github.com/SirBlob/secure_new_environment/blob/main/update.sh" },
  { slug: "iptables-toolkit", title: "IPTables Toolkit", summary: "A Bash toolkit for learning, applying, backing up, and restoring Linux firewall rules.", purpose: "Built to practice Bash while developing a clearer understanding of networking and host defense.", tags: ["Bash", "Networking", "Security"], highlights: ["Switches between deny-by-default and accept-by-default policies.", "Includes rules for ping floods, SYN floods, malformed packets, and smurf attacks.", "Supports emergency blocking, rule flushing, backups, and restores."], media: [], github: "https://github.com/SirBlob/handyiptablescript/blob/main/iptablesdefense.sh" },
] as const;

export const notes = [
  { slug: "nist-800-37", title: "NIST SP 800-37", summary: "The Risk Management Framework and its role in integrating security and privacy into the system development life cycle.", points: ["Prepare", "Categorize", "Select", "Implement", "Assess", "Authorize", "Monitor"], body: "NIST SP 800-37 describes a repeatable process for managing organizational and system risk. It begins with preparation, uses impact to categorize a system, selects and implements appropriate controls, assesses whether they work, authorizes the remaining risk, and continuously monitors change.", media: [{ src: "/media/notes/nist-800-37/rmf-overview.png", alt: "NIST Risk Management Framework overview", caption: "Risk Management Framework overview" }, { src: "/media/notes/nist-800-37/prepare-organization.png", alt: "NIST RMF organization-level preparation tasks", caption: "Organization-level preparation tasks" }, { src: "/media/notes/nist-800-37/prepare-system.png", alt: "NIST RMF system-level preparation tasks", caption: "System-level preparation tasks" }] },
  { slug: "nist-800-53", title: "NIST SP 800-53", summary: "A catalog of security and privacy controls for protecting systems, organizations, and missions.", points: ["Control families", "Security controls", "Privacy controls", "Control selection"], body: "NIST SP 800-53 provides a structured catalog of controls that organizations can select and tailor to address security and privacy risk. It gives teams a shared vocabulary for planning, implementing, and assessing safeguards.", media: [{ src: "/media/notes/nist-800-53/control-families.png", alt: "NIST SP 800-53 security and privacy control families", caption: "NIST SP 800-53 control families" }] },
  { slug: "cve-cvss", title: "CVE / CVSS", summary: "How vulnerabilities are identified, scored, prioritized, remediated, and verified.", points: ["Discover", "Prioritize", "Assess", "Report", "Remediate", "Verify"], body: "CVE gives publicly known vulnerabilities consistent identifiers. CVSS provides a standard way to describe their severity. Together they help teams communicate about weaknesses, prioritize action, and track remediation through the vulnerability management life cycle.", media: [{ src: "/media/notes/cve-cvss/vulnerability-cycle.png", alt: "Vulnerability management life cycle flowchart", caption: "Vulnerability management life cycle" }, { src: "/media/notes/cve-cvss/vulnerability-cycle-summary.png", alt: "Compact vulnerability management life cycle reference", caption: "Vulnerability life cycle summary" }, { src: "/media/notes/cve-cvss/cve.png", alt: "CVE identifier structure diagram", caption: "Common Vulnerabilities and Exposures" }, { src: "/media/notes/cve-cvss/cvss.png", alt: "CVSS severity and base score chart", caption: "CVSS severity ratings and base scores" }] },
  { slug: "mitre-attack", title: "MITRE ATT&CK", summary: "A common knowledge base for adversary tactics, techniques, and procedures observed in real attacks.", points: ["Tactics", "Techniques", "Procedures", "Detection", "Threat modeling"], body: "MITRE ATT&CK organizes adversary behavior across the phases of an attack. Teams use it to model threats, evaluate security tools, develop detections, prioritize investments, and exchange information using a shared language.", media: [{ src: "/media/notes/mitre-attack/matrix.png", alt: "MITRE ATT&CK Enterprise tactics and techniques matrix", caption: "MITRE ATT&CK Enterprise matrix" }] },
  { slug: "owasp-top-10", title: "OWASP Top 10", summary: "A widely used awareness guide to the most significant categories of web application security risk.", points: ["Web applications", "Common weaknesses", "Risk awareness", "Secure development"], body: "The OWASP Top 10 helps developers and security teams recognize common classes of web application weakness. OWASP also publishes dedicated guidance for APIs and mobile applications, where the threats and defensive priorities differ.", media: [{ src: "/media/notes/owasp-top-10/overview.jpg", alt: "OWASP Top 10 web application security overview", caption: "OWASP Top 10 overview" }] },
] as const;

export type ContentSection = {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  code?: string;
};

export const projectDetails: Record<string, ContentSection[]> = {
  "automatic-sudoku-solver": [
    {
      heading: "Window targeting",
      paragraphs: [
        "The original code only worked when the Sudoku window was already in the foreground. I added a window-selection step so the script looks for a window with “Sudoku” in its title and activates it before starting.",
        "This also gives the script a basic check that the expected site is open before it begins clicking and typing.",
      ],
      code: 'windowselect = pyautogui.getWindowsWithTitle("Sudoku")[1]\nwindowselect.activate()',
    },
    {
      heading: "Safe interruption",
      paragraphs: [
        "There was no way to stop the original script after it started. I added an Escape-key check so the process can be stopped when something goes wrong.",
        "Because the check runs between automated actions, another letter or number pressed while the script is typing may prevent the quit key from being registered immediately.",
      ],
      code: "import keyboard\n\nif keyboard.is_pressed('esc'):\n    quit()",
    },
    {
      heading: "Faster input",
      paragraphs: [
        "PyAutoGUI pauses for 0.1 seconds after each action by default. Setting the pause to 0.01 seconds makes the step that fills the web Sudoku grid about ten times faster.",
      ],
      code: "pyautogui.PAUSE = 0.01",
    },
  ],
  "cybersecurity-news-scraper": [
    {
      heading: "The problem",
      paragraphs: [
        "Instead of visiting several sites every morning for cybersecurity news, I wanted one place that collected their main headlines, descriptions, and links.",
        "I tried Scrapy and Beautiful Soup before choosing requests and lxml for this version. Pandas handles cleanup, combines the results, and exports the finished report to CSV.",
      ],
    },
    {
      heading: "The approach",
      paragraphs: [
        "The script requests each page, parses its HTML, and uses site-specific XPath expressions to select the title, description, and article link. It strips extra characters, removes duplicate links, and stores each site's results in a pandas DataFrame.",
        "A label row identifies the source before the individual DataFrames are combined into the final Summary.csv file.",
      ],
    },
    {
      heading: "Modules and source list",
      paragraphs: [
        "Pandas handles tabular cleanup and export, requests retrieves each page, and lxml parses the HTML. After testing Scrapy and Beautiful Soup, I chose lxml because it fit this small, XPath-driven project well.",
        "The URLs are kept in one list so the main loop can process each source in turn.",
      ],
      code: `import pandas as pd
import requests
import lxml.html

url = [
    "https://cyware.com/cyber-security-news-articles",
    "https://threatpost.com/",
    "https://thehackernews.com/",
    "https://www.securitymagazine.com/topics/2236-cyber-security-news",
    "https://www.bobbythings.com",
]`,
    },
    {
      heading: "Request, parse, and select",
      paragraphs: [
        "For each URL, the script downloads the page and converts the response into an lxml document. Because every publisher structures its HTML differently, each source needs its own XPath selectors for titles, descriptions, and links.",
      ],
      code: `for p in url:
    page = requests.get(p)
    doc = lxml.html.fromstring(page.content)

    if p == "https://cyware.com/cyber-security-news-articles":
        title = doc.xpath(
            '//h1[@class="cy-card__title m-0 cursor-pointer pb-3"]/text()'
        )
        descrip = doc.xpath('//div[@class="cy-card__description"]/text()')
        links = doc.xpath('//div[@class="cy-panel__body"]//a/@href')`,
    },
    {
      heading: "Clean and structure the results",
      paragraphs: [
        "The selected strings are trimmed and split, duplicate links are removed, and alert URLs are filtered out. The cleaned values are stored in a DataFrame, converted back from nested lists into readable strings, and prefixed with a row naming the source.",
      ],
      code: `titlesplit = [item.lstrip().rstrip().split(",") for item in title]
descripsplit = [item.lstrip().rstrip().split(",") for item in descrip]

nodupelink = list(set(links))
linkclean = [item for item in nodupelink if "alert" not in item]
linkssplit = [item.split(",") for item in linkclean]

df = pd.DataFrame({
    "Title": titlesplit,
    "Description": descripsplit,
    "Link": linkssplit,
})

df["Title"] = df["Title"].str.join(", ")
df["Description"] = df["Description"].str.join(", ")
df["Link"] = df["Link"].str.join(", ")

site_row = pd.DataFrame({
    "Title": "Cyware",
    "Description": " ",
    "Link": " ",
}, index=[0])

df = pd.concat([site_row, df]).reset_index(drop=True)`,
    },
    {
      heading: "Handle other sources and export",
      paragraphs: [
        "The remaining publishers follow the same pattern with selectors tailored to their markup. If a URL has no matching branch, the script reports it. Finally, the source DataFrames are combined and written to Summary.csv.",
      ],
      code: `elif p == "https://threatpost.com/":
    title2 = doc.xpath(
        '//div[@class="c-border-layout"]//h2[@class="c-card__title"]//a/text()'
    )
    descrip2 = doc.xpath('//div[@class="c-border-layout"]//p/text()')
    links2 = doc.xpath(
        '//div[@class="c-border-layout"]//h2[@class="c-card__title"]//a/@href'
    )

    df2 = pd.DataFrame({
        "Title": title2,
        "Description": descrip2,
        "Link": links2,
    })
else:
    print(f"Something went wrong with \${p}")

finaldf = pd.concat([df, df2, df3, df4])
finaldf.to_csv("Summary.csv", index=False, header=True)`,
    },
    {
      heading: "What I’d improve next",
      bullets: [
        "Add better error handling for unavailable pages and unexpected responses.",
        "Highlight stories containing specific keywords.",
        "Schedule the script and deliver the report automatically each morning.",
        "Move to Scrapy if the list of sources grows significantly.",
        "Make selectors more resilient because a site's HTML changes can break an XPath.",
      ],
    },
  ],
  "secure-new-environment": [
    {
      heading: "The setup flow",
      paragraphs: [
        "This Bash script applies a basic security setup to a newly deployed Kali Linux VirtualBox image. I built it to practice shell scripting and turn a repeated manual checklist into a single, understandable process.",
      ],
      bullets: [
        "Change the current user's password.",
        "Run the required apt update and upgrade commands.",
        "Replace the default SSH host keys.",
        "Create a new user account.",
      ],
    },
  ],
  "iptables-toolkit": [
    {
      heading: "Policy controls",
      paragraphs: ["This Bash toolkit collects common iptables commands in one menu so I could practice scripting while learning networking and host-security concepts."],
      bullets: ["Apply a deny-by-default policy.", "Apply an accept-by-default policy."],
    },
    {
      heading: "Defensive rules",
      paragraphs: ["The toolkit includes example rules for several common traffic patterns and network attacks."],
      bullets: ["Ping floods", "TCP SYN floods", "Malformed packets", "Smurf attacks"],
    },
    {
      heading: "Recovery controls",
      bullets: ["Block all incoming traffic.", "Flush all current rules.", "Back up the current iptables rules.", "Restore rules from a backup file."],
    },
  ],
};

export type MediaItem = {
  src: string;
  alt: string;
  caption: string;
};

export const projectMedia: Record<string, MediaItem[]> = {
  "secure-new-environment": [
    { src: "/media/projects/secure-new-environment/setup-menu.png", alt: "Secure environment script menu in a Kali Linux terminal", caption: "Security setup menu" },
    { src: "/media/projects/secure-new-environment/ssh-key-reset.png", alt: "Secure environment script replacing the default SSH host keys", caption: "Replacing the default SSH host keys" },
  ],
  "iptables-toolkit": [
    { src: "/media/projects/iptables-toolkit/backup.png", alt: "IPTables toolkit backing up the current firewall rules", caption: "Back up current rules" },
    { src: "/media/projects/iptables-toolkit/restore.png", alt: "IPTables toolkit restoring firewall rules from a backup", caption: "Restore rules from backup" },
    { src: "/media/projects/iptables-toolkit/default-policy.png", alt: "IPTables toolkit changing the default firewall policy", caption: "Change the default policy" },
    { src: "/media/projects/iptables-toolkit/flush-rules.png", alt: "IPTables toolkit flushing all active firewall rules", caption: "Flush all rules" },
  ],
};

export const noteDetails: Record<string, ContentSection[]> = {
  "nist-800-37": [
    {
      heading: "Overview",
      paragraphs: [
        "NIST Special Publication 800-37 describes the process for integrating security and risk management into the system development life cycle. It was written for federal information systems, but the general approach can be applied more broadly.",
        "Revision 2 added Prepare as an overall step and organizes the Risk Management Framework into Prepare, Categorize, Select, Implement, Assess, Authorize, and Monitor.",
      ],
    },
    {
      heading: "Prepare",
      paragraphs: ["Prepare covers organization-level and system-level work needed before the rest of the Risk Management Framework can be applied effectively. It establishes priorities, responsibilities, risk tolerance, stakeholders, system boundaries, information types, and other context used by later steps."],
    },
    {
      heading: "Categorize",
      paragraphs: ["Categorize defines the criticality and sensitivity of an information system according to the worst potential impact on the mission or business."],
      bullets: ["Analyze the system boundary and its components.", "Identify the information types associated with those components.", "Describe each information type's function, type, name, and connections.", "Use the highest confidentiality, integrity, or availability impact as the system's overall impact level."],
    },
    {
      heading: "Select",
      paragraphs: ["Select establishes a baseline of security controls and supplemental controls, then tailors them to the organization using the completed risk assessment."],
      bullets: ["Determine the baseline controls.", "Tailor the controls to the organization.", "Document the selected controls in the System Security Plan.", "Plan how the system will be monitored continuously."],
    },
    {
      heading: "Implement",
      paragraphs: ["Implement turns the selected controls into working safeguards and records how each control is deployed within the system."],
      bullets: ["Coordinate responsibilities with team members who understand each control.", "Document the control implementation and its connection to the system in the System Security Plan."],
    },
    {
      heading: "Assess",
      paragraphs: ["Assess tests whether the implemented controls operate as intended and produce the outcome required by the security plan."],
      bullets: ["Have an independent assessor review the controls.", "Address weaknesses and deficiencies found during assessment.", "Record findings and remediation timelines in the System Security Plan."],
    },
    {
      heading: "Authorize",
      paragraphs: ["Authorize presents the assessment results to the authorizing official, who decides whether the remaining risk is acceptable. Unfinished remediation work is recorded in a Plan of Action and Milestones with an expected timeline."],
    },
    {
      heading: "Monitor",
      paragraphs: ["Monitor is the continuous work of tracking vulnerabilities, configuration changes, new technology, and control performance so the organization's security and privacy posture remains effective."],
      bullets: ["Monitor controls and update them when the system or environment changes.", "Report security status regularly.", "Remediate new weaknesses as they are found.", "Use automation where it helps provide near-real-time visibility."],
    },
  ],
  "nist-800-53": [
    {
      heading: "Overview",
      paragraphs: [
        "NIST Special Publication 800-53 is a catalog of security and privacy controls for information systems and organizations. The controls help protect operations, assets, individuals, missions, business functions, reputation, and other organizational interests from a wide range of threats.",
        "Organizations select and tailor control families to match their systems and risk. The catalog supports a common way to identify safeguards, document how they are implemented, and assess whether they are working.",
      ],
    },
  ],
  "cve-cvss": [
    {
      heading: "The vulnerability workflow",
      bullets: [
        "Discover — identify assets and maintain an inventory.",
        "Prioritize assets — categorize systems by importance and address high-impact systems first.",
        "Assess — scan and check systems continuously for vulnerabilities.",
        "Report — tailor findings to the needs of each intended audience.",
        "Remediate — build a prioritized plan, fix vulnerable systems, and document each step.",
        "Verify — perform follow-up scans to confirm that vulnerabilities and threats were addressed.",
      ],
    },
    {
      heading: "CVE — Common Vulnerabilities and Exposures",
      paragraphs: ["CVE identifiers give publicly known vulnerabilities a standard name. This shared naming system makes it easier for tools, vendors, researchers, and organizations to exchange information about the same security issue. The CVE program is operated by MITRE and assigns each published vulnerability a unique identifier."],
    },
    {
      heading: "CVSS — Common Vulnerability Scoring System",
      paragraphs: ["CVSS measures the characteristics and potential impact of a vulnerability. A base score from 0.0 to 10.0 maps to a severity rating from None through Critical, helping teams compare findings and decide which work should be prioritized. Organizations can use the NVD calculator when they need to calculate or adjust a score."],
    },
  ],
  "mitre-attack": [
    {
      heading: "What ATT&CK captures",
      paragraphs: ["MITRE began ATT&CK in 2013 to document the tactics, techniques, and procedures used by advanced persistent threat groups against enterprise environments. The framework can be applied to any technology or software an attacker may target."],
    },
    {
      heading: "Reading the name",
      bullets: ["MITRE is the organization's name, not an acronym.", "AT means Adversarial Tactics.", "T means Techniques.", "CK means Common Knowledge."],
    },
    {
      heading: "How the framework is organized",
      paragraphs: ["The Enterprise matrix follows the phases of an attack, from initial access through post-compromise activity. Tactics describe an adversary's goal, techniques describe how that goal may be achieved, and procedures describe observed real-world implementations."],
    },
    {
      heading: "How defenders use it",
      paragraphs: ["Organizations use ATT&CK to build threat models, evaluate security tools, develop detections, prioritize security investments, and share threat and defensive information using a common vocabulary."],
    },
  ],
  "owasp-top-10": [
    {
      heading: "A shared security baseline",
      paragraphs: [
        "The OWASP Top 10 is a widely recognized awareness guide to the most significant categories of web application security risk.",
        "Each category connects common weaknesses, associated CWEs, example CVEs, observed prevalence, impact, and practical guidance. This gives developers and security practitioners a starting point for recognizing and addressing recurring application-security problems.",
        "OWASP also publishes dedicated Mobile Top 10 and API Security Top 10 resources because mobile applications and APIs have their own common threats and defensive requirements.",
      ],
    },
  ],
};
