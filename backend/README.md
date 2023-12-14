# Maps-aleblan2-ssanu

# Frontend:

Our frontend is made up of two basic components, a map and a REPL. The map acts as a home for all of our overlaid
redlining data, and the REPL is a place for other relevant data to be displayed whether that be a csv or an other
data from an API call. Users are free to scroll around and view info on the map interface. This data can be edited
byt the backend via API calls.

# Backend:

Our backend hs a few functions: run a Server, and take in a geoJSON file which is then parsed by Moshi into a
List<Feature> that we can then perform operations on. We satisfy two user stories in the GeoHandler/GeoSearchHandler classes 
where all interaction with the API and our code happens - we can use the filter and search functions to either filter
data by bound box coordinates or by a search query.

# Mini-Reflection:

Front-end: TypeScript, HTML, CSS, React, Mapbox, npm, vite
Back-end: Java, Spark, Moshi, GeoJSON, Maven

By using all of these pre-made languages, packages, and APIs, we are able to make a full running program that otherwise would be much more complicated. We were really easily able to create a localhost with npm and make calls to the Mapbox API to completely set the foundation of the frontend in a few files of code. Because we had such limited time to finish, it would have been impossible to build a project like this without the help of all 12 of these systems and their ability to work together - the seamless use of multiple systems together made possible by developers leave more room for us to be creative and problem solving, instead of spending our time figuring out basic functionality.