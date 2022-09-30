# To Do List in Svelte + Firebase

### By RunLin Wang

The code was based off of this series of Youtube tutorials: (https://www.youtube.com/playlist?list=PLm_Qt4aKpfKiGbdjaHdOpry6Neza0etxZ)

Documentation on https://firebase.google.com/docs/firestore/quickstart was also used to help connect Firebase to the app in the correct way.

## How to Run

This app can be run locally. First, download this repository and navigate to the root director. Next, install dependencies with `npm install`. Then, run `npm run dev` and go to the local port link to view and interact with the website.

## Features and Comments 

The basic functionality of adding tasks and checking them / unchecking them is in the application. You can add tasks by clicking the "Add" button or pushing the enter key. You can check and uncheck tasks by clicking the check mark button corresponding to the specific task you want to check.

An additional feature here is the deletion of tasks off of the list. Clicking the x button will delete the app permanently. Another interesting feature that Firebase affords us is the permanent storage of the tasks. If I add tasks to my list and then close the window / terminal and reopen it again later (potentially even on a different machine), then 

The primary work that I did / added is all in the `+page.svelte` in `src/routes`. The vast majority of the comments on the code are also in that file.

## Reflection

Svelte and Firebase is a very powerful combination of tools. The database capabilities of Firebase resemble the capabilities of MongoDB, while the ease of use of Svelte is similar to the way that I would normally integrate React into my websites. This combination of ease of coding and cloud databases is very useful for web apps.

Additionally, from a technical standpoint, Svelte is a compiler that generates the code at build time, which means that we dont need to include the full framework itself as a hard dependency. This has the added benefit of smaller bundle sizes with optimized code for what you are actually using, since you only need to compile the JS code from the frameworks that you actually need to use.