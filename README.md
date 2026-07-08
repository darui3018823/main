# Welcome to daruks.com!<br>
このページはだるかすのただの[ホームページ](https://daruks.com/)です<br>
多分知識がなさ過ぎてろくなもの作れませんゆるしてくださいなんでもしｍ

# Build Stacks!

## Website

| Technology | Purpose |
| --- | --- |
| Static HTML / CSS / JavaScript | Main website pages |
| Hand-written CSS | Shared site styling and page-specific effects |
| Tailwind CSS v4 | Utility CSS compiled into `dist/output.css` |
| Vite + React | Contact page SPA source in `contact-app/` |
| Go local static server | Local development server |
| pnpm workspace | Dependency and workspace management |
| GitHub Pages | Static hosting from committed files |

## Project Structure Diagram

```mermaid
flowchart TD
    source["Source files"]
    home["index.html\nscript.js\nstyles.css"]
    projects["projects/\nprojects page"]
    contactSource["contact-app/\nVite + React source"]
    tailwind["input.css + Tailwind CSS\npnpm css build"]
    contactBuild["pnpm contact:build"]
    cssOutput["dist/output.css\ncommitted CSS output"]
    contactOutput["contact/\ncommitted SPA output"]
    pages["GitHub Pages\nserves repository files"]
    devServer["main.go\nlocal static server"]

    source --> home
    source --> projects
    source --> contactSource
    source --> tailwind

    tailwind --> cssOutput
    contactSource --> contactBuild --> contactOutput

    home --> pages
    projects --> pages
    cssOutput --> pages
    contactOutput --> pages

    devServer -. local preview .-> home
    devServer -. shared assets .-> contactSource
```
