# Copy Page Sync Rule

When updating Chapter.tsx page content (adding/modifying/removing visual components,
code examples, tips, flow diagrams, or any inline content), you MUST also update
`site/src/utils/generateMarkdown.ts` to keep the "Copy Page" markdown output in sync.

## Architecture

- **Chapter.tsx** renders page content from two sources:
  1. Data files (`chapters.ts`, `qa.ts`) — automatically included via `generateChapterMarkdown()`
  2. Inline JSX components (visual aids, code blocks, tips, flow tables) — must be manually synced

- **generateMarkdown.ts** has two mechanisms for inline content:
  1. `getInlineSectionContent(chapterId, sectionId)` — content inserted after specific sections
  2. `getChapterSpecificMarkdown(chapterId)` — standalone chapter content (code examples, etc.)

## Checklist for page updates

- [ ] If you added/changed inline content after a section in Chapter.tsx, update `getInlineSectionContent()` for the matching `chapterId:sectionId` key
- [ ] If you added/changed standalone chapter content (code examples, etc.), update `getChapterSpecificMarkdown()`
- [ ] If you added a new chapter or section, add corresponding cases to both functions
- [ ] Run `npx tsc --noEmit` to verify the build
- [ ] Test the copy button to verify the markdown output matches the page
