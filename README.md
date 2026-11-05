# BackSpace

Company portfolio site for BackSpace, carrying forward the existing video editing, thumbnail design, Minecraft development, and CWR Network experience.

## Run locally

Requires Node.js and npm.

```sh
npm install
npm run dev
```

Open the local address printed by Vite. Create a production bundle with `npm run build`.

## Deploy to GitHub Pages

In the GitHub repository, open **Settings > Pages** and select **GitHub Actions** as the source. Push these changes to `main`; the deployment workflow installs dependencies, typechecks, builds, and publishes `dist`.

The site will be available at https://devil-dhissa.github.io/Backspace/. Routes use hashes (for example, `/Backspace/#/work`) so direct links and refreshes work on GitHub Pages.

The Vite base path is `/Backspace/`. If the repository name changes or you use a custom domain, update `base` in `vite.config.ts`. Component asset URLs use `import.meta.env.BASE_URL`; Vite handles URLs in HTML and CSS during the build.

To check the production site locally, run `npm run build` and `npm run preview`, then open the printed URL with `/Backspace/`.

The contact form opens the visitor’s email application with a prefilled message to the portfolio contact address.
