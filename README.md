# MIRA QUEST 2 · Opportunity, Eagle & Voyager 1

A cinematic, educational visual-novel archive of NASA spacecraft stories. This is the expanded, independent development copy; the original `esraaki/mira_quest` repository is unchanged. The game opens directly to three mission cards without the previous signal-selection sequence.

## Start

Open `index.html` with a local static server (recommended), or deploy the unzipped root directly to Vercel (`Framework Preset: Other`, no build command, output directory `.`). This is a build-free HTML/CSS/JavaScript site.

For local development: `python3 -m http.server 8000` in this directory, then visit `http://localhost:8000`.

## Chapters

- **Opportunity:** Approach Mars, locate the rover, meet it through a long fictional conversation grounded in NASA mission history; study sols, the 2004 landing, Berry Bowl evidence, instruments, hypothetical route planning, historical stops one by one, a second water clue, the 2018 dust storm, and a longer farewell. Selected player response choices change what Opportunity says next.
- **Eagle:** Travel to the Moon through the same arrival structure; find Apollo 11's descent stage, experience a character-led story, learn about the two-stage lunar module, guided landing, EASEP experiments, real Apollo images, ascent-stage departure and the descent-stage legacy. Selected player responses change Eagle’s immediate reply.
- **Voyager 1:** A separate, music-free visual-novel chapter opening with a cinematic still-image flyby through interstellar space, then progressing through Jupiter and Io, Saturn and Titan, the Pale Blue Dot, the Golden Record, the 2012 heliopause crossing, and the November 2026 one-light-day milestone. It includes player-paced dialogue, optional choices, an image archive, and source links. No 3D controls or required video assets.

## Audio

Eight original audio assets are unchanged by filename. One exclusive audio channel handles all current scene music/ambience. It pauses and resets on every scene change; shorter signal and travel files loop if the scene remains active. The 2018 storm video uses its own embedded audio only after the music stops. Audio from the two original mission chapters starts only after a user gesture, because browsers block sound autoplay before a gesture. The Voyager chapter itself uses no music. The volume/mute control is in the top-right menu.

## Structure

- `src/story.js` — Opportunity and Eagle narrative beats.
- `src/voyager-story.js` — Voyager's fictional dialogue and NASA-backed scientific storyline.
- `src/voyager.js` — lightweight Voyager visual-novel engine, player choices, progress and archive.
- `voyager.css` — Voyager and three-card mission hub styling.
- `assets/voyager/` — bundled NASA/JPL images and an artist's concept, with links credited in the chapter.
- `src/game-next.js` — scene engine, image discovery, mission-specific interactions, navigation, audio and progression.
- `game-next.css` — responsive cinematic interface.
- `assets/art/` — generated scene art and the provided transparent cutouts.
- `assets/photos/` — bundled NASA images and references.
- `assets/audio/` — supplied audio filenames retained.
- `assets/video/mars-sandstorm.mp4` — supplied dramatized storm simulation, not actual rover footage.
- `assets/source-originals/` — originals retained for provenance. Not required by the game runtime.

## Accuracy and disclosure

All rover/personified-hardware dialogue is a storytelling reconstruction, not a real communication from a machine. NASA mission science and historical events form the base. Generated scene visuals and storm video are clearly flagged as reconstructions. Some supplied image captions/source records still require final visual-by-visual attribution review; see `CREDITS.md`. Never portray the creative storm simulation as NASA camera footage.

## Important release notes

The original two chapters were copied intact; the new mission-card selection and Voyager entry were smoke-tested with a simulated browser in GitHub Actions. JavaScript syntax and asset-presence checks run in CI. JavaScript syntax and referenced-file checks have been performed. A real-browser visual review is still recommended, particularly for mobile layouts and cinematic timing. The new repository requires its own Vercel project if you want a separate public preview. A 15-minute-plus total reading/exploration duration is the design target, not a guarantee for every player.
