# Contributing Guidelines 

**NOTE:** This app is built with React and Redux, but if you're just looking to add some new content (like a new algorithm or data structure), knowledge of React or Redux _**is not**_ a prerequisite! You need only know a little JavaScript, and, of course, the topic you are looking to add.

### To Install/Run:
- Be sure that you have NodeJS installed
- Fork repo, clone locally, and run `npm install` or `yarn install`
- In the root directory, run `npm start` or `yarn start`

### Adding Challenges / Topics:
To add a new algorithm or data structure, here's what you'll need:
- Some seed, or default code (usually a function or class declaration). This code should not be a complete solution, but it should be able to run without breaking. 
- A working (and ideally good) solution to the problem you are introducing. 
- At least one resource (this could be an article, a youtube video, a link to an interactive challenge that covers the problem, an image, etc.). If your problem does not have any viable associated resources, think of something related as a placeholder (see the Generate Checkerboard Challenge).

To actually add it to the app, you only need to follow a few simple steps:

__Add Seed file:__
- Create a new seed file in the appropriate directory: `src/assets/seed/<type>/<topic>.js`
- Each seed file is a simple export statement, which exports an object with the following structure:
```js
export default {
  title: 'Super Difficult Sorting Algo',
  seed: 
`/**
  * @function superDifficultSortingAlgo
  * @param {number[]} arr
  * @return {number[]}
  */
  
function superDifficultSortingAlgo(arr) {
    return arr;
}
`,
  solution:
`/**
  * @function superDifficultSortingAlgo
  * @param {number[]} arr
  * @return {number[]}
  */
  
function superDifficultSortingAlgo(arr) {
    // perform super difficult sort here
    // this is where the solution goes!
    return arr;
}
`,
  resources: [
    { href: 'https://wikipedia.com/Super_Difficult_Sorting_Algo', caption: 'Wikipedia' }
    // more resources
  ]
};
```
- Note the backticks, and that code inside the template literal strings _must_ start backed all the way up against the gutter to achieve proper formatting in the editor).

__Import seed:__
- Once you have a complete seed file, according to the above format, simply import it into `src/assets/seed/codeRef.js` and add it to the appropriate array. 
- The order that it appears in the array, is the order that it will appear in the UI, so keep this in mind!
- That's it! Once the seed file is imported and added to the array, the rest will happen automatically. 

__Update other files:__
- Once you've confirmed your new challenge is working correctly, be sure to update both the contents section of [README.md](https://github.com/no-stack-dub-sack/cs-playground-react/blob/master/README.md) and add your challenge's resources to [RESOURCES.md](https://github.com/no-stack-dub-sack/cs-playground-react/blob/master/RESOURCES.md). 

### Modifying Challenges / Topics:
- Simply find the seed file in the appropriate `src/assets/seed/<topic>` directory and modify the seed or solution there. 
- To see your updates in the browser, you will need to reset the app's state, since state is saved in local storage. Type `resetState()` anywhere in the editor and hit the "Run Code" button twice (the first time a warning that you are about to reset the app will be logged to the console). After resetting, your changes should show up. 
  
