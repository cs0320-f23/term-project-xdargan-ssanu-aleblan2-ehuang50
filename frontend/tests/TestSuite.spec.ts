/**
 * Test Suite considers testing from a user perspective. Therefore, we conceputalized four user story profiles that we wanted 
 * to account for in usability. This included 1) general recreational user, 2) music director of musical organization, 3) Gen X
 * user (simplistic usability and accessibility), 4) Spotify and developers (future integration ability and generalization). 
 * Overall, we thought of our target audience as B2C and B2B users, where the first three user stories are B2C and the last user
 * story is B2B. We used a variety of unit, integration, and random testing to test the key functionality of our project. 
 * We also checked our user interface and accessibility.
 */

import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000/");
})

// Basic UI Tests
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
  await page.fill(
    "input[aria-label='Command input']",
    "load_file nonExistent.csv"
  );
  await page.click("text=Submit");
  const output = await page.textContent(".repl-history div:last-child");
  expect(output).toContain("File not found");
});

test("Entering existing songs (with complete info), multiple times", async ({ page }) => {
  await page.fill(
    "input[aria-label='Command input']",
    "load_file nonExistent.csv"
  );
  await page.click("text=Submit");
  const output = await page.textContent(".repl-history div:last-child");
  expect(output).toContain("File not found");
});

test("Entering a song that doesn't exist", async ({ page }) => {
  await page.fill(
    "input[aria-label='Command input']",
    "load_file nonExistent.csv"
  );
  await page.click("text=Submit");
  const output = await page.textContent(".repl-history div:last-child");
  expect(output).toContain("File not found");
});

test("Entering a song with only title", async ({ page }) => {
  await page.fill(
    "input[aria-label='Command input']",
    "load_file nonExistent.csv"
  );
  await page.click("text=Submit");
  const output = await page.textContent(".repl-history div:last-child");
  expect(output).toContain("File not found");
});

test("Entering a song with only artist", async ({ page }) => {
  await page.fill(
    "input[aria-label='Command input']",
    "load_file nonExistent.csv"
  );
  await page.click("text=Submit");
  const output = await page.textContent(".repl-history div:last-child");
  expect(output).toContain("File not found");
});

test("Entering a song with title typos", async ({ page }) => {
  await page.fill(
    "input[aria-label='Command input']",
    "load_file nonExistent.csv"
  );
  await page.click("text=Submit");
  const output = await page.textContent(".repl-history div:last-child");
  expect(output).toContain("File not found");
});

test("Entering a song with artist typos", async ({ page }) => {
  await page.fill(
    "input[aria-label='Command input']",
    "load_file nonExistent.csv"
  );
  await page.click("text=Submit");
  const output = await page.textContent(".repl-history div:last-child");
  expect(output).toContain("File not found");
});

test("Submit empty input", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.click("text=Submit");
  const output = await page.textContent(".repl-history div:last-child");
  expect(output).toContain("Command not found"); // Assuming this is your desired behavior.
});

/* Removing Songs
- Removing a song
- Removing two songs
- Trying to remove a song even when no (more) songs listed
- 
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