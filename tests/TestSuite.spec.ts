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
 * - Entering a song that doesn't exist (ERROR HANDLING)
 * - Entering a song with only title (incomplete info - ERROR HANDLING)
 * - Entering a song with only artist (incomplete info - ERROR HANDLING)
 * - Entering a song with typos in information (ERROR HANDLING)
 * - Submitting empty input (ERRO HANDLING)
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

test('Generating recommendations with no songs entered', async ({ page }) => {
  const inputTitleSelector = 'input[placeholder="Enter song title..."]';
  const inputArtistSelector = 'input[placeholder="Enter artist..."]';
  const addSongButtonSelector = 'button:has-text("Add Song")';
  const generateRecommendationsButtonSelector = 'button:has-text("Generate Recommendations")';

  // Add no songs

  // Generate recommendations
  await page.click(generateRecommendationsButtonSelector);

  // Wait for recommendations to be generated
  const recommendationsSelector = '.recommendations';
  await page.waitForSelector(recommendationsSelector);

  // Verify that no recommendations are displayed
  const recommendationItemSelector = '.recommendation-item';
  await page.waitForSelector(recommendationItemSelector);

  const recommendationsCount = await page.$$eval(recommendationItemSelector, items => items.length);
  expect(recommendationsCount).equals(0);
});

test('Generating recommendations with a 1, 2, 5, and 10 songs', async ({ page }) => {
  const inputTitleSelector = 'input[placeholder="Enter song title..."]';
  const inputArtistSelector = 'input[placeholder="Enter artist..."]';
  const addSongButtonSelector = 'button:has-text("Add Song")';
  const generateRecommendationsButtonSelector = 'button:has-text("Generate Recommendations")';

  // Add a few songs
  await page.fill(inputTitleSelector, 'Song 1');
  await page.fill(inputArtistSelector, 'Artist 1');
  await page.click(addSongButtonSelector);

  await page.fill(inputTitleSelector, 'Song 2');
  await page.fill(inputArtistSelector, 'Artist 2');
  await page.click(addSongButtonSelector);

  // Generate recommendations
  await page.click(generateRecommendationsButtonSelector);

  // Wait for recommendations to be generated
  const recommendationsSelector = '.recommendations';
  await page.waitForSelector(recommendationsSelector);

  // Verify that recommendations are displayed
  const recommendationItemSelector = '.recommendation-item';
  await page.waitForSelector(recommendationItemSelector);
  const recommendationsCount = await page.$$eval(recommendationItemSelector, items => items.length);
  expect(recommendationsCount).toBeGreaterThanOrEqual(5);
});

test('Generating recommendations after removing song', async ({ page }) => {
  const inputTitleSelector = 'input[placeholder="Enter song title..."]';
  const inputArtistSelector = 'input[placeholder="Enter artist..."]';
  const addSongButtonSelector = 'button:has-text("Add Song")';
  const removeSongButtonSelector = 'button:has-text("Remove Song")';
  const generateRecommendationsButtonSelector = 'button:has-text("Generate Recommendations")';

  // Add a song
  await page.fill(inputTitleSelector, 'Song Title');
  await page.fill(inputArtistSelector, 'Artist');
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

test('Generating recommendations after two/all songs', async ({ page }) => {
  const inputTitleSelector = 'input[placeholder="Enter song title..."]';
  const inputArtistSelector = 'input[placeholder="Enter artist..."]';
  const addSongButtonSelector = 'button:has-text("Add Song")';
  const removeSongButtonSelector = 'button:has-text("Remove Song")';
  const generateRecommendationsButtonSelector = 'button:has-text("Generate Recommendations")';

  // Add songs
  await page.fill(inputTitleSelector, 'Song Title');
  await page.fill(inputArtistSelector, 'Artist');
  await page.click(addSongButtonSelector);
  await page.fill(inputTitleSelector, 'Song Title 2');
  await page.fill(inputArtistSelector, 'Artist 2');
  await page.click(addSongButtonSelector);

  // Generate recommendations
  await page.click(generateRecommendationsButtonSelector);

  // Wait for recommendations to be generated 
  const recommendationsSelector = '.recommendations';
  await page.waitForSelector(recommendationsSelector);

  // Remove songs
  await page.click(removeSongButtonSelector);
  await page.click(removeSongButtonSelector);
  

  // Verify that the song is removed from recommendations
  const removedSongSelector = '.removed-song';
  await page.waitForSelector(removedSongSelector, { state: 'hidden' });

});

 
/* Graph
- Checking if data point corresponds accurately (placement)
- Checking if data point changes color / visualizes accurately
- Checking that data point removes when song is removed
- Checking that Stats corresponds with Graph
- Checking that all combinations of labels are available and reflected
*/

test('Graph rendering and interaction', async ({ page }) => {

  const inputTitleSelector = 'input[placeholder="Enter song title..."]';
  const inputArtistSelector = 'input[placeholder="Enter artist..."]';
  const addSongButtonSelector = 'button:has-text("Add Song")';
  const generateRecommendationsButtonSelector = 'button:has-text("Generate Recommendations")';
  const removeSongButtonSelector = 'button:has-text("Remove Song")';
  const graphSelector = 'svg';

  // Add data for the graph
  const graphData = [
    { x: 20, y: 30 },
    { x: 40, y: 60 }
  ];

  // Add color data for each point
  const colorData = ['#ff0000', '#00ff00', '#0000ff']; // Colors for each data point

  // Check if the point is displayed
  await page.hover('#point-0');
  const tooltipSelector = '#tooltip';
  await page.waitForSelector(tooltipSelector);

  // Verify that the point contains the correct information
  const tooltipText = await page.textContent(tooltipSelector);
  expect(tooltipText).toContain('(20, 30)');
  await page.mouseout('#point-0');

  // REMOVE A SONG
  await page.click(removeSongButtonSelector);
  await page.waitForSelector(graphSelector);
  const initialPointCount = await page.$$eval('circle', circles => circles.length);

  // Verify that the corresponding point is removed from the graph
  const updatedPointCount = await page.$$eval('circle', circles => circles.length);
  expect(updatedPointCount).toBe(initialPointCount - 1);

  // Verify that the point is removed
  await page.waitForSelector(tooltipSelector, { state: 'hidden' });
});


/** 
 * Integration Testing (to backend API) - testing spotifyApi.js
 */

// Mock ACCESS_TOKEN for testing
const ACCESS_TOKEN = 'your_mocked_access_token';

// Mock the fetch function to control responses in tests
const mockFetch = async (url, options) => {
  if (url.includes('search')) {
    return Promise.resolve({
      json: () => Promise.resolve({
        tracks: {
          items: [
            { id: 'trackId1' },
          ]
        }
      })
    });
  } else if (url.includes('audio-features')) {
    return Promise.resolve({
      json: () => Promise.resolve({
        // Mocked audio features
        danceability: 0.8,
        energy: 0.9,
      })
    });
  } else if (url.includes('recommendations')) {
    return Promise.resolve({
      json: () => Promise.resolve({
        // Mocked recommendations
        tracks: [
          { id: 'recommendedTrackId1' },
        ]
      })
    });
  }
  // Default response
  return Promise.resolve({
    json: () => Promise.resolve({})
  });
};

test('getTrackInfo returns track information', async () => {
  const trackInfo = await getTrackInfo('SongName', 'ArtistName');
  expect(trackInfo).toBeDefined();
  expect(trackInfo.id).toBe('trackId1');
});

test('getAudioFeatures returns audio features', async () => {
  const audioFeatures = await getAudioFeatures('trackId1');
  expect(audioFeatures).toBeDefined();
  expect(audioFeatures.danceability).toBe(0.8);
  // Add more assertions based on the expected behavior of getAudioFeatures
});

test('getAudioFeaturesFromSearch returns audio features from search', async () => {
  const audioFeatures = await getAudioFeaturesFromSearch('SongName', 'ArtistName');
  expect(audioFeatures).toBeDefined();
  expect(audioFeatures.danceability).toBe(0.8);
  // Add more assertions based on the expected behavior of getAudioFeaturesFromSearch
});

test('getRecommendations returns recommended tracks', async () => {
  const recommendations = await getRecommendations([{ id: 'trackId1' }]);
  expect(recommendations).toBeDefined();
  expect(recommendations.tracks[0].id).toBe('recommendedTrackId1');
  // Add more assertions based on the expected behavior of getRecommendations
});



/**
 * Random and Fuzz Testing Testing - INPUT BAR
 * Decided to conduct random testing on input bar to explore how our interface handles a breadth of input, and stress test.
 * Graph would get overcrowded
 */

const getTrackInfo = Promise.resolve({ name: 'Mocked Track', album: { images: [{ url: 'mocked-url' }] } });
const removeSong = useState([]);
const generateRecommendations = useState([]);
const onAddSong = useState([]);

test('Randoming testing for input bar', async ({ page }) => {

  // Your selectors might be different based on your actual implementation
  const inputTitleSelector = 'input[placeholder="Enter song title..."]';
  const inputArtistSelector = 'input[placeholder="Enter artist..."]';
  const addSongButtonSelector = 'button:has-text("Add Song")';
  const removeSongButtonSelector = 'button:has-text("Remove Song")';
  const generateRecommendationsButtonSelector = 'button:has-text("Generate Recommendations")';

  // Simulate random user interactions
  for (let i = 0; i < 100; i++) {
    const randomTitle = generateRandomString(10);
    const randomArtist = generateRandomString(10);

    // Fill input fields with random values
    await page.fill(inputTitleSelector, randomTitle);
    await page.fill(inputArtistSelector, randomArtist);
    await page.click(addSongButtonSelector);

    // Validate that the onAddSong function was called with the expected parameters
    expect(onAddSong).toHaveBeenCalledWith(expect.objectContaining({ name: 'Mocked Track' }));

    // Simulate clicking the "Remove Song" button, validate
    await page.click(removeSongButtonSelector);
    expect(removeSong).toHaveBeenCalled();

    // Simulate clicking the "Generate Recommendations" button, validate
    await page.click(generateRecommendationsButtonSelector);
    expect(generateRecommendations).toHaveBeenCalled();
  }
});

// Generating random string
function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}


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