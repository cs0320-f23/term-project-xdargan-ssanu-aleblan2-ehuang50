/**
 * Test Suite considers testing from a user perspective. Therefore, we conceputalized four user story profiles that we wanted 
 * to account for in usability. This included 1) general recreational user, 2) music director of musical organization, 3) Gen X
 * user (simplistic usability and accessibility), 4) Spotify and developers (future integration ability and generalization). 
 * Overall, we thought of our target audience as B2C and B2B users, where the first three user stories are B2C and the last user
 * story is B2B. We used a variety of unit, integration, and random testing to test the key functionality of our project. 
 * We also checked our user interface and accessibility.
 * 
 * This test suite covers
 * - Integration testing
 * - Random testing 
 */

import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000/");
})

/** Basic UI Tests
 */
test("Load the Plotify interface and verify all elements present", async ({ page }) => {
  // Verify the presence of Logo, Stats, Graph, and TrackDisplay components
  await expect(page.locator('data-testid=logo')).toBeTruthy();
  await expect(page.locator('data-testid=stats')).toBeTruthy();
  await expect(page.locator('data-testid=graph')).toBeTruthy();
  await expect(page.locator('data-testid=track-display')).toBeTruthy();
});

// Checks if dropdown / axis label options present in Stats
test('should have correct text content in Stats component', async ({ page }) => {
  // You can add assertions to check specific text content within the Stats component
  const statsText = await page.textContent('data-testid=stats');
  expect(statsText).toContain('Popularity');
  expect(statsText).toContain('Energy');
});


/**
 * Testing Loading and Viewing Songs - handleAddSong in InputBar (US1)
 * In summary, we have tests for:
 * - Entering an existing song, with complete info
 * - Entering multiple existing songs
 * - Entering a song that doesn't exist
 * - Entering a song with only title (incomplete info)
 * - Entering a song with only artist (incomplete info)
 * - Entering a song with typos in information
 * - Submitting empty input
 * - Entering a song then removing it (and then adding another one)
 * - Entering the same song twice - this is a bug
 * - Entering song that has multiple versions available (i.e. instrumental)
 */

test("Enter an existing song, with title and artist", async ({ page }) => {
  const inputTitleSelector = 'input[placeholder="Enter song title..."]';
  const inputArtistSelector = 'input[placeholder="Enter artist..."]';
  const addSongButtonSelector = 'button:has-text("Add Song")';

  // Add a song
  await page.fill(inputTitleSelector, 'Baby');
  await page.fill(inputArtistSelector, 'Justin Bieber');
  await page.click(addSongButtonSelector);

  // Verify that the song was added
  const addedSongSelector = '.added-song';
  await page.waitForSelector(addedSongSelector);

  const addedSongText = await page.textContent(addedSongSelector);
  expect(addedSongText).toContain('Baby');
});

test("Entering existing songs (with complete info), multiple times", async ({ page }) => {

  const inputTitleSelector = 'input[placeholder="Enter song title..."]';
  const inputArtistSelector = 'input[placeholder="Enter artist..."]';
  const addSongButtonSelector = 'button:has-text("Add Song")';

  // Add multiple songs
  await page.fill(inputTitleSelector, 'Baby');
  await page.fill(inputArtistSelector, 'Justin Bieber');
  await page.click(addSongButtonSelector);
  await page.fill(inputTitleSelector, 'Losing It');
  await page.fill(inputArtistSelector, 'Fisher');
  await page.click(addSongButtonSelector);
  await page.fill(inputTitleSelector, 'vampire');
  await page.fill(inputArtistSelector, 'Olivia Rodrigo');
  await page.click(addSongButtonSelector);

  // Verify that the songs were added
  const addedSongSelector = '.added-song';
  await page.waitForSelector(addedSongSelector);

  const addedSongText = await page.textContent(addedSongSelector);
  expect(addedSongText).toContain('Baby', 'Losing It', 'vampire');
});

test("Entering multiple existing songs and removing song", async ({ page }) => {
  const inputTitleSelector = 'input[placeholder="Enter song title..."]';
  const inputArtistSelector = 'input[placeholder="Enter artist..."]';
  const addSongButtonSelector = 'button:has-text("Add Song")';
  const removeSongButtonSelector = 'button:has-text("Remove Song")';

  // Add multiple songs
  await page.fill(inputTitleSelector, 'Baby');
  await page.fill(inputArtistSelector, 'Justin Bieber');
  await page.click(addSongButtonSelector);
  await page.fill(inputTitleSelector, 'Losing It');
  await page.fill(inputArtistSelector, 'Fisher');
  await page.click(addSongButtonSelector);
  await page.fill(inputTitleSelector, 'vampire');
  await page.fill(inputArtistSelector, 'Olivia Rodrigo');
  await page.click(addSongButtonSelector);

  // Verify that the songs were added
  const addedSongSelector = '.added-song';
  await page.waitForSelector(addedSongSelector);

  const addedSongText = await page.textContent(addedSongSelector);
  expect(addedSongText).toContain('Baby', 'Losing It', 'vampire');

  // Remove a song
  await page.fill(inputTitleSelector, 'Losing It');
  await page.click(removeSongButtonSelector);

  // Verify that the song is removed
  await page.waitForSelector(addedSongSelector, { state: 'hidden' });
  expect(addedSongText).toContain('Baby', 'vampire');

});

test("Entering existing songs and then a non existing song", async ({ page }) => {
  const inputTitleSelector = 'input[placeholder="Enter song title..."]';
  const inputArtistSelector = 'input[placeholder="Enter artist..."]';
  const addSongButtonSelector = 'button:has-text("Add Song")';

  // Add multiple songs
  await page.fill(inputTitleSelector, 'Baby');
  await page.fill(inputArtistSelector, 'Justin Bieber');
  await page.click(addSongButtonSelector);
  await page.fill(inputTitleSelector, 'Losing It');
  await page.fill(inputArtistSelector, 'Fisher');
  await page.click(addSongButtonSelector);
  await page.fill(inputTitleSelector, 'h');
  await page.fill(inputArtistSelector, 'da baby');
  await page.click(addSongButtonSelector);

  // Verify that the songs were added
  const addedSongSelector = '.added-song';
  await page.waitForSelector(addedSongSelector);

  const addedSongText = await page.textContent(addedSongSelector);
  expect(addedSongText).toContain('Baby', 'Losing It');
});

test("Entering a song that doesn't exist", async ({ page }) => {
  const inputTitleSelector = 'input[placeholder="Enter song title..."]';
  const inputArtistSelector = 'input[placeholder="Enter artist..."]';

  // Add a song
  await page.fill(inputTitleSelector, 'hi');
  await page.fill(inputArtistSelector, 'Emma Beri');

  // Verify that the non existent song was not added
  const addedSongSelector = '.added-song';
  await page.waitForSelector(addedSongSelector);
  const addedSongText = await page.textContent(addedSongSelector);
  expect(addedSongText).toContain('');
});

test("Entering a song with only title", async ({ page }) => {
  const inputTitleSelector = 'input[placeholder="Enter song title..."]';
  const inputArtistSelector = 'input[placeholder="Enter artist..."]';

  // Add a song just title
  await page.fill(inputTitleSelector, 'Let It Go');
  await page.fill(inputArtistSelector, '');
  

  // Verify that the song was not added
  const addedSongSelector = '.added-song';
  await page.waitForSelector(addedSongSelector);
  const addedSongText = await page.textContent(addedSongSelector);
  expect(addedSongText).toContain('');
});

test("Entering a song with only artist", async ({ page }) => {
  const inputTitleSelector = 'input[placeholder="Enter song title..."]';
  const inputArtistSelector = 'input[placeholder="Enter artist..."]';

  // Add a song just artist
  await page.fill(inputTitleSelector, '');
  await page.fill(inputArtistSelector, 'Idina Menzel');
  

  // Verify that the song was not added
  const addedSongSelector = '.added-song';
  await page.waitForSelector(addedSongSelector);
  const addedSongText = await page.textContent(addedSongSelector);
  expect(addedSongText).toContain('');
});

test("Entering a song with title typos", async ({ page }) => {
  const inputTitleSelector = 'input[placeholder="Enter song title..."]';
  const inputArtistSelector = 'input[placeholder="Enter artist..."]';

  // Add a song with typos
  await page.fill(inputTitleSelector, 'L8sing It');
  await page.fill(inputArtistSelector, 'Fisher');
  

  // Verify that the song was not added
  const addedSongSelector = '.added-song';
  await page.waitForSelector(addedSongSelector);
  const addedSongText = await page.textContent(addedSongSelector);
  expect(addedSongText).toContain('');
});

test("Entering a song with artist typos", async ({ page }) => {
  const inputTitleSelector = 'input[placeholder="Enter song title..."]';
  const inputArtistSelector = 'input[placeholder="Enter artist..."]';

  // Add a song typos
  await page.fill(inputTitleSelector, 'Losing It');
  await page.fill(inputArtistSelector, 'Fesher');
  

  // Verify that the song was not added
  const addedSongSelector = '.added-song';
  await page.waitForSelector(addedSongSelector);
  const addedSongText = await page.textContent(addedSongSelector);
  expect(addedSongText).toContain('');
});

test("Submit empty input", async ({ page }) => {
  const inputTitleSelector = 'input[placeholder="Enter song title..."]';
  const inputArtistSelector = 'input[placeholder="Enter artist..."]';

  // Add a song just title
  await page.fill(inputTitleSelector, '');
  await page.fill(inputArtistSelector, '');
  

  // Verify that the song was not added
  const addedSongSelector = '.added-song';
  await page.waitForSelector(addedSongSelector);
  const addedSongText = await page.textContent(addedSongSelector);
  expect(addedSongText).toContain('');
});

/* Removing Songs
- Removing a song
- Removing two songs
- Trying to remove a song even when no (more) songs listed
- Removing song after recommendations generated
- Removing all songs after recommendations generated
 */

test("Entering a song and removing a song", async ({ page }) => {
  
  const inputTitleSelector = 'input[placeholder="Enter song title..."]';
  const inputArtistSelector = 'input[placeholder="Enter artist..."]';
  const addSongButtonSelector = 'button:has-text("Add Song")';
  const removeSongButtonSelector = 'button:has-text("Remove Song")';

  // Add a song first
  await page.fill(inputTitleSelector, 'Your Song Title');
  await page.fill(inputArtistSelector, 'Your Artist');
  await page.click(addSongButtonSelector);

  // Verify that the song was added
  const addedSongSelector = '.added-song';
  await page.waitForSelector(addedSongSelector);

  // Remove the song
  await page.click(removeSongButtonSelector);

  // Verify that the song is removed
  await page.waitForSelector(addedSongSelector, { state: 'hidden' });
});

test("Removing two songs", async ({ page }) => {
  const inputTitleSelector = 'input[placeholder="Enter song title..."]';
  const inputArtistSelector = 'input[placeholder="Enter artist..."]';
  const addSongButtonSelector = 'button:has-text("Add Song")';
  const removeSongButtonSelector = 'button:has-text("Remove Song")';

  // Add songs first
  await page.fill(inputTitleSelector, 'Your Song Title');
  await page.fill(inputArtistSelector, 'Your Artist');
  await page.click(addSongButtonSelector);
  await page.click(addSongButtonSelector);
  await page.click(addSongButtonSelector);

  // Verify that songs were added
  const addedSongSelector = '.added-song';
  await page.waitForSelector(addedSongSelector);

  // Remove two songs
  await page.click(removeSongButtonSelector);
  await page.click(removeSongButtonSelector);

  // Verify that the song is removed
  await page.waitForSelector(addedSongSelector, { state: 'hidden' });
});

test("Removing a song when there are no songs", async ({ page }) => {
  await page.click("text=Submit");
  const output = await page.textContent(".repl-history div:last-child");
  expect(output).toContain("Command not found"); // Assuming this is your desired behavior.
});

test("Removing a song after recommendations generated", async ({ page }) => {
  const inputTitleSelector = 'input[placeholder="Enter song title..."]';
  const inputArtistSelector = 'input[placeholder="Enter artist..."]';
  const addSongButtonSelector = 'button:has-text("Add Song")';
  const removeSongButtonSelector = 'button:has-text("Remove Song")';
  const generateRecommendationsButtonSelector = 'button:has-text("Generate Recommendations")';

  // Add songs
  await page.fill(inputTitleSelector, 'Your Song Title');
  await page.fill(inputArtistSelector, 'Your Artist');
  await page.click(addSongButtonSelector);
  await page.click(addSongButtonSelector);
  await page.click(addSongButtonSelector);

  // Generate recommendations
  await page.click(generateRecommendationsButtonSelector);

  // Wait for recommendations to be generated
  const recommendationsSelector = '.recommendations';
  await page.waitForSelector(recommendationsSelector);

  // Remove a song from recommendations
  await page.click(removeSongButtonSelector);

  // Verify that the song is removed from recommendations
  const removedSongSelector = '.removed-song';
  await page.waitForSelector(removedSongSelector, { state: 'hidden' });

});

test("Removing all songs after recommendations generated", async ({ page }) => {
  const inputTitleSelector = 'input[placeholder="Enter song title..."]';
  const inputArtistSelector = 'input[placeholder="Enter artist..."]';
  const addSongButtonSelector = 'button:has-text("Add Song")';
  const removeSongButtonSelector = 'button:has-text("Remove Song")';
  const generateRecommendationsButtonSelector = 'button:has-text("Generate Recommendations")';

  await page.fill(inputTitleSelector, 'Your Song Title');
  await page.fill(inputArtistSelector, 'Your Artist');
  await page.click(addSongButtonSelector);
  await page.click(addSongButtonSelector);
  await page.click(addSongButtonSelector);

  // Generate recommendations
  await page.click(generateRecommendationsButtonSelector);

  // Wait for recommendations to be generated
  const recommendationsSelector = '.recommendations';
  await page.waitForSelector(recommendationsSelector);

  // Remove all songs from recommendations
  await page.click(removeSongButtonSelector);
  await page.click(removeSongButtonSelector);
  await page.click(removeSongButtonSelector);

  // Verify that the songs are removed from recommendations
  const removedSongSelector = '.removed-song';
  await page.waitForSelector(removedSongSelector, { state: 'hidden' });

  // No recommendations
  await page.click(generateRecommendationsButtonSelector);
});

/* Generating Recommendations
- Trying to generate recommendations with no songs entered
- Generating recommendations with one song entered
- Generating recommendations with two songs entered
- Generating recommendations with five songs entered
- Generating recommendations with ten songs entered
- Generating recommendations with one song removed (above)
- Generating recommendations with two songs removed 
- Generating recommendations with all songs removed 
*/

 
/* Graph
- Checking if data point corresponds accurately (placement)
- Checking if data point changes color / visualizes accurately
- Checking that data point removes when song is removed
- Checking that Stats corresponds with Graph
- Checking that all combinations of labels are available and reflected
*/

/* Funcationality so far:
Loading Song, Song Displays in List, Corresponding Data Point (for plot) is created with song
*/ 

// State Change tests - applicable, and how so?
// Loading multiple songs in, and checking accuracy
// Checking if data point corresponds accurately
// Checking if data point corresponds accurately after loading multiple songs

// Test for searching/locating song by data point
// Test for searching/locating data point by song name
// Test for searching/locating data point by Artist
// (partially covered) Entering song that doesn't exist (trying to get empty response)
// Entering song of same name
// Enteirng song of same artist, twice
// Entering song of same ariist, with break in between
// Entering song name just name, no Artist name
// Entering song just Artist, no name
test("load then view", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.fill(
    "input[aria-label='Command input']",
    "load_file starData.csv"
  );
  await page.click("button:has-text('Submit')");
  await page.fill("input[aria-label='Command input']", "view");
  await page.click("button:has-text('Submit')");
  const tableElement = await page.$("table.tablecenter");
  expect(tableElement).not.toBeNull();
});

/** 
 * Integration Testing (to backend API) 
 */

/**
 * Error Handling
 */

/**
 * Random and Fuzz Testing Testing
 */



/* ACCESSIBILITY TESTS (US3)
*/ 

// Verify alt text exists 
test('images should have alt text', async ({ page }) => {
  const images = await page.$$('img');
  
  for (const image of images) {
    const altText = await image.evaluate(img => img.alt);
    expect(altText).toBeTruthy();
  }
});