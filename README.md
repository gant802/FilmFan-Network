# Welcome to the Film Fan Network, powered by "The Movie Data Base" rest API

## Browse through genres or search for specific movies and TV shows. Create a profile to like or favorite anything you'd want to be saved to your profile.

This is a personal project that is frontend only and showcases my knowledge I have aquired from studying frontend development in React JS. This application fetches data from TMDB rest API and displays movies and TV shows from it. It will allow the user to do the following:

## Demonstration video
https://www.youtube.com/watch?v=ZKOYcFlZhDc&ab_channel=GrantCummings


* Browse through genres of movies and TV shows
* Click on a movie or TV show to bring you to a page to show the details of that movie
* Use the search feature by clicking "Search" on the navigation bar at the top of the page
* To like or favorite movies on the details page, you must first login or create an account. Do so by clicking "Login", located at the top right of the page
* All liked and favorited movies will be displayed within your profile. (Navigate to your profile by clicking "My Profile" at the top right of the page where "Login" used to be)


## How to install and use this application in your local computer

1. Fork and clone the repo to a repository within your GitHub.
2. Run $ npm install    (to install all of the dependencies of this application)
3. Run $ json-server --watch db.json --port 3030  (to have your computer be able to see data within the db.json file for saving things to your profile)
4. Run $ npm start     (redirects you to a internet page to use the aplication)


## Known Bugs

1. There is only one known bug that I have not figured out how to work around yet. When you click any movie or TV show and you load the deatiled description of it, before the poster is rendered it briefly shows a "no poster found" photo. This is due to some movies or TV shows that do not have a poster (it fills in the poster photo with this). But I have not figured out a way to get rid of it as the default rendered poster photo before the real poster loads.


## Find a bug? 

If you find a bug that needs to be fixed within this application, please feel free to create a pull request that I can take a look at. Also, you can email me at grantcumming47@gmail.com to connect with me and discuss ways to improve this



## Final Note

This is a frontend only application, there are a lot of things that would work better with user authentification when using a backend. This is why I do not want to deploy this as a website to visit. I did not implement a password for this reason. This is only a showcase of my skills in frontend development. 
