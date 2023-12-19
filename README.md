# term-project-xdargan-ssanu-aleblan2-ehuang50-

# Project Details

## Project Name

Plotify
Plot Your Tunes

## Project Description

    Plotify is our Final Project! It is a full-stack web app intended to help language learners on their journey of learning and discovery. The app bridges the enjoyment of listening to music with the task of learning languages to allow for people to learn as they listen. While using the web-app, the user can listen to a song in a language that they are trying to learn, and see the lyrics come up in their native language and the language they are working on learning. Blanks will appear in the lyrics and using what they hear, know from the language that they speak, and from what they have already learned, write in what the word in the blank should be. This will allow them to work on their grammar and comprehension. After the song finishes, if the user enjoyed the song, they will have the option to play with a song that is similar to the song they just used.

## Team members and Contributors

Team members for this project were Aidan LeBlanc (aleblan2), Emma Huang (ehuang50), Sohum Sanu (ssanu), and Xavier Dargan (xdargan).

## Link to Repo

The link to our repo is: https://github.com/cs0320-f23/term-project-xdargan-ssanu-aleblan2-ehuang50

## Hours Worked

We spent an average of 8 hours per week each on this project. Resulting in a total of around 128 cumulative hours for four weeks of work.

# Design Choices

## Relationship between classes/files

This project is split into two components: the frontend and the backend. The frontend and the backend work together for our project to succeed. The frontend works with the user and makes specific requests to the backend in order to recieve information that it needs to display and use. We will describe both the frontend and the backend here:

### Front-End

    . The front-end has as lot of working components and parts. We did this to give our users the best experience possible and make
    the website as visually appealing as possible. The users follow a specific flow from page to page of the frontend that work together to build the project.

        . There are multiple pages that define the flow of the project. Users interact with on page and then after doing all the functionality needed for that page, are redirected to the next page in the sequence. There are CSS files that contain all the styling for those pages.

        . Shared components across pages are stored in separate files and accessed by those pages. There are also other files that create the functionalities and make API calls for certain things, allowing us to have the frontend work with our backend.

        . Everything is divided into files and packages based on what they do and are related to.

### Back-End

    . The back-end has a lot of working parts and moving pieces in order to get the intended function for the webapp.

        . On the surface, there are multiple handlers that take care of the logic for our front-end
        and possibly other front-ends to use. They dictate the information that is required to be passed into the back-end in order for us to execute some functionality and return certain information for the front-end to display and use.

        . We have different handlers that work with the frontend to do different functionalities of our project. For example, we have handlers that take care of getting Spotify tokens to the frontend, parsing a user's search query in order to get songs diaplyed as a user searches in the frontend, generating recommendations to the user for similar songs to use in the game, getting the specific lyrics for a song in different in both the user's language and the intended language, generating point values, turning audio into text, and more. (To see all the handlers, in the back-end folder navigate in the src to the handler package to see all the handlers available and read more about them in their comments).

        . Apart from handlers, we have different classes and interfaces that work together to make API calls to external APIs to fetch needed information when necessary. It then parses that information and verifies differnt properties, retuning a polished version of what the frontend needs. The interfaces allow us to use mocked data when needed in order to be able to run tests (our handlers can use either mocked or real data). Furthermore, some classes utilize the proxy and strategy pattern.

## Specific Data Structures used and other Important Decisions

    . Something that we wanted to highlight was the extensive use of caching done in the backend. Caching is done a lot in order to ensure that our information remains easily accessible on the backend and to reduce redundant API calls. We store the information so that if the front-end decides to make calls to the back-end, we have the information already stored if its repeated so that the web app as a whole can work faster and more efficiently.

    . In order to be able to properly use the web-app a user must be a spotify premium member. This is because the project relies on the spotify web sdk to play songs and time the display of the lyrics. We decided to go with this approach beacuse this was the only well-documented, free, API that contained all the different functionalities that we needed for the rest of the project. Furthermore, due to the size of Spotify and because we noticed that almost all the people we know use spotify, we knew that this would be a safe bet to take on.

    . In order to be able to pass audio files between the front-end and the back-end (to be able to turn the words into text), the back-end needed to be smart. We tried to pass in a base64 encrypted string to the back-end as a query parameter but we ran into the problem that the strings ended up being way too long leading the API call to fail. The way that we were able to circumvent this was by making that audioText handler a post handler and sending a byte array of the audio in the body of the handler. That way, the front-end would be able to send such a large amount of information to the backend to be processed.

# Errors/Bugs

    . There are no known bugs or errors. We tested pretty thoroughly, both through written-out unit and integration tests and from testing the application ourselves as a user, and feel confident in our project.

# Tests

    . There are a lot of tests included in this project. They test that the functionality works both using mocked and real data and also integrating different sections overall. Throughout the project, we created different tests that ensured that lots of different aspects of the project worked properly. For example, not only did we create tests for the different handlers, but we also creted tests ensuring that they worked properly together taking in different calls. Additionally, we tested that different methods worked properly without being integrated into differnt parts of the project with basic unit tests. Additionally, we did some user testing with oursleves and some of our friends allowing us to gage how well the web app was working and if there was anything we needed to change. Lastly, we used lots of mocked data in order to allow for us to run test of our respective components without actually needing them to be connected to the other part of the project or to external APIs.

    Throughout the project, we created different tests that ensured that lots of different aspects of the project worked properly, and conceputalized four user story profiles that we wanted to account for in usability. This included 1. general recreational user, 2. music director of musical organization, 3. Gen X user (simplistic usability and accessibility), 4. Spotify and developers (future integration ability and generalization). Overall, we thought of our target audience as B2C and B2B users, where the first three user stories are B2C and the last user story is B2B. We used a variety of unit, integration, and random testing to test the key functionality of our project. We also checked our user interface and accessibility.

# How To

## How to Run Tests

### Front-End Tests:

    . To run the tests, make sure that you are CD into the front-end directory. You should have playwright installed
        but if you don't, in your terminal type:
                            npx playwright install
        once that is done, go back to your terminal and run the following commands to run the tests:
                            npx playwright test
                                - runs the tests
                            npx playwright test --ui
                                - opens a UI that allows for you to watch and run your tests as if in a live browser
    . To run the jest tests, make sure that you are CD into repl-mmateoos-thuang49.
    	Then run the command: npm test [file name]

        One thing to note is that for integration tests, if some fail, you will
        have to manually run them one-by-one, as they likely failed due to
        conflicting requests to the server.

### Back-End Tests:

    . To run the tests in the backend, navigate individually to the testing files and press the green arrow next to the class declaration for the testing file. This will allow you to run the tests that you want for each individual testing class. Additionally, for some of the tests to run, the server requires for there to be certain API keys and Client Secrets/Ids to be included. There are
    places with TODO comments where these should be included. These are in some tests and if you want to run tests that actully call upon the spotify API, you must put the client id and secret to your Spotify API in the token generator class under the todo comments.

## How to Run Program

### SpotiDuo WebApp (full-stack web app)

An important thing to note, is that if you do not have different dependencies installed it will not run, so please run the following commands in your terminal when first downloading:

    npm install

To run the fron-end, navigate to the front-end directory and in the terminal run the command:

    npm start

This should start the front-end up. You can then follow the link that shows up in the terminal to open the front-end in your web browser. However, before using it, please follow the steps in the just the server section (underneath this) to start your back-end server so that everything functions as intended.

Then, follow the directions that the web app poses in order to use it as intended. To begin, click on the character with the eyes that follows your mouse.

In order for the program to run successfully, it will need an up to date access key, which would be stored as a variable in the api.js file in the src/api/private directory. When an access key is created, it will last for one hour before expiring. An access key can be generated in the terminal using the following command:

    curl -X POST "https://accounts.spotify.com/api/token" -H "Content-Type: application/x-www-form-urlencoded" -d "grant_type=client_credentials&client_id=your-client-id&client_secret=your-client-secret"

your-client-id and your-client-secret should be replaced by those corresponding numbers that describe the Developer Spotify project you need to create in order to run this project.

## Accessibility

    . We paid attention to accessibility when working on this project. Some specific choices that we implemented are the following:

        . Users can click tab to move between different sections of the page.
        . Users can scroll using arrow keys for the list of songs.
        . The character with eyes follows the mouse so that the user will
        know where their mouse is at all times
        . We accept multiple languages to accomodate learners from all over the world and wanting to learn a variety of languages.
        . We chose to use contrasting colors so that is high visibility for people who have trouble discerning between colors.
