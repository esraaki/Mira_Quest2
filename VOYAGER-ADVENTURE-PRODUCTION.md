# Voyager Adventure — Media Placement & Production Map

The interactive game lives in `src/voyager-adventure.js`, styled by `voyager-adventure.css`. Both load from `index.html` after the legacy Voyager files, preserving Opportunity and Eagle.

## Already bundled and functioning
- Voyager spacecraft artist concept — `assets/voyager/voyager-space.jpg`
- NASA/JPL Jupiter image — `assets/voyager/jupiter.jpg`
- Voyager Io eruption photograph — `assets/voyager/io.jpg`
- Saturn image — `assets/voyager/saturn.jpg`
- Titan image — `assets/voyager/titan.jpg`
- Original Pale Blue Dot — `assets/voyager/pale-blue-dot.jpg`
- Golden Record cover — `assets/voyager/golden-record.jpg`
- Existing interaction SFX in `assets/audio/`: scan, dialogue, correct.

## Deliberate media placeholders (visible in-game)
1. **A glint in the dark** — cinematic spacecraft rush, 1977 launch film, sunlight glint; flyby/antenna sounds.
2. **Io** — real NASA photograph used for evidence, with optional original eruption reconstruction and instrument scan.
3. **Saturn / Titan** — ring approach transition followed by haze over Titan.
4. **Pale Blue Dot** — slow reveal, magnifier, original image held in silence after the discovery.
5. **Golden Record** — annotated original cover; playable sound categories and tracks (not bundled until rights and provenance are checked). User can choose greetings, natural sounds, music, images, pulsar map and playback instructions. Never auto-play copyrighted tracks.
6. **Heliopause** — supplied NASA diagram showing the heliosphere, termination shock, heliosheath, and spacecraft positions. Animated transition through an invisible boundary. Schematic, not a photograph.
7. **Deep Space Network** — Earth antenna scene, binary animation and a dramatically accelerated two-way radio transmission.
8. **Power / mission operations** — archival hardware and RTG illustrations; a chronological sequence of selective power conservation and instrument shutdown decisions.
9. **Long future** — Voyager fades among stars; Gliese 445 trajectory illustration with *not to scale* disclaimer.

## Source collection
NASA Voyager: https://science.nasa.gov/mission/voyager/
NASA Golden Record: https://science.nasa.gov/mission/voyager/golden-record-contents/
NASA 2026 one-light-day: https://science.nasa.gov/resource/voyager-one-light-day-downloads/
NASA Nov 18, 2026 communications status: https://science.nasa.gov/blogs/voyager/2026/11/18/voyager-1-engineers-analyze-data-issue-ready-to-confirm-light-day/
NASA Gliese 445: https://science.nasa.gov/photojournal/heading-toward-gliese-445/

## Experience principles
- Discovery before explanation; show the evidence and let the player find it.
- Use previous chapters' glass dialogue styling.
- No progress bar, no numbered slideshow framing, no compulsory timed advance.
- Interesting questions and choices, not trivia quizzes.
- Specific engineering facts and NASA archival credit; distinguish archival photos, diagrams and fictional reconstruction.
- Player choice at the finale changes what the player tells Voyager about Earth.
- Keep original two missions and their source files intact.

## QA
GitHub's `verify-voyager.yml` now checks `src/voyager-adventure.js` syntax. `smoke-test.cjs` exercises the restored intro, Voyager inspection, archive and returning to Opportunity. These automated checks do not replace a live browser visual/audio QA pass.
