# Matrimonial Portfolio

This repository contains a lightweight matrimonial portfolio web page built with **React 18** and **Tailwind CSS**.  The interface is inspired by traditional matrimonial profiles and features a clean, responsive layout that works across devices.

## Features

- **Profile card** with a placeholder avatar, name and a “View Album” link
- **About Me** section for a brief introduction
- **Image carousel** for the photo album (uses placeholder slides by default but can be replaced with real images)
- **Expandable sections** for **Basic Info** and **Family Details** that toggle open/closed
- Responsive design powered by Tailwind CSS; looks good on mobile, tablet and desktop

## How to run locally

No build step is required.  Simply open the `index.html` file in a web browser that can access the internet to download the CDN‑hosted dependencies.  For example:

```sh
xdg-open index.html  # on Linux
# or double‑click the file from your file manager
```

If you need to work offline you can download local copies of the CDN scripts (`react`, `react‑dom`, `tailwind` and `@babel/standalone`) and update the `<script src="…"></script>` tags accordingly.

## Deploying to Netlify

Netlify can host static sites directly from a folder or a Git repository.  To deploy this portfolio:

1. **Create a new site** in your Netlify dashboard and choose **Import an existing project**.
2. If you have pushed this folder to a Git repository (e.g. GitHub), select that repository.  Otherwise, choose **Deploy manually** and drag‑and‑drop the contents of the `matrimonial-portfolio` folder (or a ZIP of it) into the deploy window.
3. Set the **build command** to `none` (no build is required) and the **publish directory** to the root of the folder (where `index.html` resides).
4. Click **Deploy**.  Netlify will upload the files and provide you with a public URL.

That's it!  Your matrimonial portfolio will be live.  You can customise the text and data in `app.js` (embedded in `index.html`) to reflect your own details.