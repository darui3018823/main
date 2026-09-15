/**
 * Edge Worker serving daruks.com directly via Workers Static Assets.
 *
 * - CLI clients (curl/wget/httpie) hitting `/` get a fastfetch-style
 *   ASCII banner instead of the HTML homepage.
 * - Everything else falls through to the static assets binding.
 *   `run_worker_first` is scoped to `/` only, so all other requests
 *   never invoke this script at all.
 */

interface Env {
	ASSETS: Fetcher;
}

const RESET = "\x1b[0m";
const BOLD = "\x1b[1m";
const ORANGE = "\x1b[38;5;208m";
const CYAN = "\x1b[1;38;5;51m";
const GRAY = "\x1b[38;5;245m";

// Cloud silhouette, punched out of Braille block glyphs.
const ART = [
	"⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣤⣤⣤⣤⣄⡀⠀",
	"⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣴⣿⣿⣿⣿⣿⣿⣿⣿⣷⡄",
	"⠀⠀⠀⠀⠀⣠⣴⣶⣤⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡄",
	"⠀⠀⠀⢀⣸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⣀⡀⠀⠀⠀",
	"⠀⣴⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣿⣿⣿⣷⣦⠀",
	"⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇",
	"⠸⠿⠿⠿⠿⠿⠿⠿⠿⠿⠿⠿⠿⠿⠿⠿⠿⠿⠿⠿⠿⠿⠿⠿⠿⠿⠿⠃",
];

function label(text: string): string {
	return `  ${GRAY}${text.padEnd(9)}${RESET}->`;
}

function buildInfoLines(): string[] {
	return [
		`${BOLD}guest${RESET}@${BOLD}${ORANGE}daruks.com${RESET}`,
		"-".repeat("guest@daruks.com".length),
		`${CYAN}Stack${RESET}`,
		`${label("Frontend")} Static HTML / CSS / JS`,
		`${label("Styling")} Tailwind CSS 4.3`,
		`${label("Contact")} React 19.2 + Vite 8 (SPA)`,
		`${CYAN}Platform${RESET}`,
		`${label("Host")} Cloudflare Workers`,
		`${label("Packages")} pnpm 11.7`,
		`${label("Client")} curl`,
		"",
		"  " +
			[40, 41, 42, 43, 44, 45, 46, 47]
				.map((bg) => `\x1b[${bg}m  ${RESET}`)
				.join(""),
	];
}

function buildBanner(): string {
	const info = buildInfoLines();
	const height = Math.max(ART.length, info.length);
	const artWidth = Math.max(...ART.map((l) => l.length));

	const lines: string[] = [];
	for (let i = 0; i < height; i++) {
		const artLine = (ART[i] ?? "").padEnd(artWidth, " ");
		const infoLine = info[i] ?? "";
		lines.push(`  ${ORANGE}${artLine}${RESET}   ${infoLine}`);
	}
	return `\n${lines.join("\n")}\n\n`;
}

const CLI_USER_AGENT = /^(curl|wget|httpie)\//i;

function isCliClient(request: Request): boolean {
	const ua = request.headers.get("user-agent") ?? "";
	return CLI_USER_AGENT.test(ua);
}

export default {
	async fetch(request, env): Promise<Response> {
		const url = new URL(request.url);

		if (url.pathname === "/" && isCliClient(request)) {
			return new Response(buildBanner(), {
				headers: { "content-type": "text/plain; charset=utf-8" },
			});
		}

		return env.ASSETS.fetch(request);
	},
} satisfies ExportedHandler<Env>;
