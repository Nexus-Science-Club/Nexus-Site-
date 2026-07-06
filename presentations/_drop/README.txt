━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  NEXUS — Presentation Drop Zone
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

HOW TO ADD A NEW PRESENTATION TO THE SITE
──────────────────────────────────────────

STEP 1 — Copy your PDF file(s) into THIS folder.

         ✦  presentations/_drop/My Presentation.pdf

STEP 2 — Open a terminal in the project root and run:

         npm run add-presentation

STEP 3 — The tool will ask you which subject the
         presentation belongs to:

         [1] Microscopy
         [2] Chemistry
         [3] Dissections
         [4] Physics

         Pick the number and press Enter.

STEP 4 — Done! The tool will:
         → Move the PDF to the correct subject folder
         → Update the manifest automatically
         → Tell you to run "npm run deploy" to publish

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

QUICK ALTERNATIVES
──────────────────

You can also pass a file directly (no drop zone needed):

  npm run add-presentation -- "C:\Users\You\Desktop\Chimie.pdf"

Or pass both file and subject at once:

  npm run add-presentation -- "Chimie.pdf" --subject chemistry

Valid subject names: microscopy, chemistry, dissections, physics

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

NOTES
─────
• PDF files you drop here are automatically removed
  from this folder after they are processed.

• To just preview changes locally without publishing:
  npm run dev

• To publish to the live site:
  npm run deploy

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
