# LinkedIn Export Drop Folder

Use this folder for the compliant LinkedIn sync fallback.

1. Download your LinkedIn data export from LinkedIn.
2. Extract the archive locally.
3. Put the extracted CSV files under `data/linkedin/raw/latest/`.
4. Run:

```bash
npm run sync:linkedin
npm run sync:profile
npm run build
```

The raw export folder is ignored by git. The daily automation checks this default location and updates generated profile content when a fresh export is present.
