import { test, expect } from "@playwright/test";

test("Load the REPL interface and verify title", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await expect(page).toHaveTitle("Mock");
});

/**
 * Adapted from pw-default-example.spec.ts
 */
test("Load a non-existent file", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.fill(
    "input[aria-label='Command input']",
    "load_file nonExistent.csv"
  );
  await page.click("text=Submit");
  const output = await page.textContent(".repl-history div:last-child");
  expect(output).toContain("File not found");
});

// Submitting empty input
test("Submit empty input", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.click("text=Submit");
  const output = await page.textContent(".repl-history div:last-child");
  expect(output).toContain("Command not found"); // Assuming this is your desired behavior.
});

// Submitting invalid input 
// --> we should account for error handling, and how smooth this goes
test("Submit unknown command", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.fill("input[aria-label='Command input']", "unknown_command");
  await page.click("text=Submit");
  const output = await page.textContent(".repl-history div:last-child");
  expect(output).toContain("Command not found");
});

// Search has no results (entering song that does not exist)
test("Search has no results", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.fill(
    "input[aria-label='Command input']",
    "search nonExistentData"
  );
  await page.click("text=Submit");
  const output = await page.textContent(".repl-history div:last-child");
  expect(output).toContain("No results found");
});

// 
test("View single column dataset", async ({ page }) => {
  await page.goto("http://localhost:8000/");
  await page.fill(
    "input[aria-label='Command input']",
    "load_file oneColumnData.csv"
  );
  await page.click("text=Submit");
  await page.fill("input[aria-label='Command input']", "view");
  await page.click("text=Submit");
  const output = await page.textContent(".repl-history div:last-child");
});

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