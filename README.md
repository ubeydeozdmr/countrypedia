# Countrypedia

[![Netlify Status](https://api.netlify.com/api/v1/badges/3942ad82-ee34-40dd-8abc-4e586e4e6039/deploy-status)](https://app.netlify.com/sites/simplecountrypedia/deploys)

This web application shows you the list of many countries. You can not only see the list of countries, but also search for countries, get information such as the flag, coat of arms, population, region of the country you selected. [Click here](https://countrypedia.app) for visit website.

## To-do List

You can preview the changes made in the development branch by [clicking here](https://dev.countrypedia.app). As the following todos are completed, the preview version will look more like the full release in the future.

### 1st Priority (Must-do things)

- Update for 08.03.2024: I did something for first three items, but I need to do more for them. I will focus on them in the next days.

- [ ] Project must be initialized
- [ ] Project structure must be created
- [ ] Layout must be created
- [x] Routing structure should be created
- [ ] The project must be responsive
- [x] Dark mode feature must be added
- [x] A home page with all countries must be created.
- [x] When countries are clicked, the details of the clicked country must appear.
- [ ] Search filtering feature must be added to the project
  - [ ] Instead of the country name, the capital of the country, currency, by region, etc. must be searchable
  - [ ] The ordering of countries must be changeable.
  - [x] Pressing the Saved button must only show the saved countries.
- [ ] When the Random button is pressed, the details of a random country must be displayed.
- [ ] Data backup feature (local or cloud) must be added
- [x] Countries should be saved when the bookmark button is pressed
- [ ] The map of the countries must be displayed in the details section.

### 2nd Priority (Should-do things)

- [x] Details of any country should be shared with the link and the details should be displayed directly when the link is clicked.
- [ ] Map page should be added
- [ ] Saved countries should be shown with markers on the map
- [ ] When you click on a certain place on the map, the details page of the country at the selected point should appear.
- [ ] Stats page should be added
- [ ] Preferences or settings page should be added
- [ ] Theme feature (different color options) should be added
- [ ] Data can be backed up on a cloud basis

### 3rd Priority (Nice-to-do things)

- [ ] It would be nice if the user could login.
- [ ] It would be nice if users could share their stats.
- [ ] It would be nice if the data was synced to the Countrypedia account.
- [ ] It would be nice if it was possible to login with the OAuth method (ex: Google login method).

## Development

The data of the countries' information is obtained from the [Rest Countries API](https://restcountries.com).
Map feature added, thanks to [Leaflet](https://leafletjs.com).

For running Countrypedia on your local machine, you need to install [Node.js](https://nodejs.org/en/) and [Yarn](https://yarnpkg.com) (or [npm](https://www.npmjs.com)).

Instructions for running Countrypedia on your local machine (based on npm):

```bash
# Clone the repository
git clone https://github.com/ubeydeozdmr/countrypedia.git
# Go to the project folder
cd countrypedia
# Install dependencies
npm install
# Run the project
npm start
```

## Working on V3

As I stated on [my website](https://ubeydeozdmr.github.io/),

> I plan to write the project from scratch with React and ChakraUI in 2023. This time I want to make improvements on both UI and UX side. Also, if the v3.2 version of the REST Countries API is released before this process is completed, I can add new information and write the object structures more easily in the project.

When I first wrote v2, it was actually just a design change (as you can see in Screenshots section below, because they are outdated), I added almost all of the features I mentioned in the What's new in v2 section below by patching it on the project. This caused the project to be written more cleanly at first, but later the code became harder to understand and the MVC structure was broken. Moreover, the URL based navigation I developed especially for phones caused new bugs.

Some bugs I've discovered so far:

- When you click on the Random button (the one with the 5 dot dice symbol), "cca3 codes" appear instead of the "full name" of the countries in the Borders section of the countries (When you select a country yourself, this part appears correctly)

- Regarding URL navigation: If the user exits the detailsView (closes the modal window) or returns to the main page using only the buttons or just the back button of the phone & PC after opening the site, it's fine. However, if it does both at once, the return function doesn't work as expected (needs to press go back button on browser or navigation drawer all the time).

So the point I want to focus on in v3 will be developability and user experience (UX) rather than design. I will use ChakraUI (probably) as design and write the project with React. As the project grows, it becomes harder to write and add/remove with VanillaJS (also error-prone), while React is quite flexible.

From this point on I will not add any new features to v2, only bug fixes and package updates (Max until end of 2024). I will also add a new section to the README.md file for v3.
