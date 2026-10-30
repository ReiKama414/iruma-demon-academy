# Scroll, transitions and playback — 2026-10-25

- Vertical wheel input reads the active chapter before changing chapters, even over the other column or a horizontal character gallery.
- The wheel gesture that reaches an edge cannot also change chapters. A fresh gesture is required; animation input and trackpad momentum cannot skip chapters.
- The diagonal chapter reveal, text entrances and stage curtains remain. Forward reveals start at the top, and the outgoing scene stays full size behind the reveal. Each chapter opens at its top.
- Touch reading keeps native scrolling inside the reading panel. A swipe that starts with unread content cannot change chapters when it reaches the edge. Horizontal gestures and pinch zoom remain available.
- Stage videos use react-youtube, autoplay muted, retain their captions, credits and explanatory notes, and unmount when leaving the chapter or opening a dialog.
- The category dialog has a single violet/parchment scroll track, with its source link outside the scrolling list.
- Desktop hero copy and news are in normal flow. At 1280×600, the action row ends at y=460, the metadata at y=481, and news starts at y=509: no overlap and a 28px content gap.

Verified with the in-app browser at 1280×720, 1145×884, 1280×600 and 390×844: reading before navigation, fresh-gesture chapter changes, horizontal lists, hidden scenes, native player autoplay and cleanup, and hero spacing. Viewport override reset afterward. Actual touch hardware gestures were not exercised.

Validation: 11 Node tests pass, TypeScript passes, production build passes.

Screenshots: `preview-hero-spacing.png`, `preview-styled-scrollbar.png`, `preview-mobile-reading.png`.
