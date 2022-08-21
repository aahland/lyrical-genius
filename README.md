## About the project

This is Lyrical Genius. It is a realtime multiplayer game played in the browser. The goal of the game is to match a snippet of a song lyric to the correct song. In other words, a music quiz where song lyrics are the essential part of the question.

The project is built with Sveltekit and socket.io. 

## Game play (how to play)

1. The players sign in on the first page. 
2. When all 4 players are signed in they are redirected to the first round. 
3. All players have to press the button "start round" and when everyone has done that the round begins. 
4. All players are displayed the same snippet of a song lyric together with 3 answer alternatives. 
5. The players choose the answer that they think is correct. 
6. After answering the question the players are send forward to round 2. 
7. The game continues like this for four rounds. 
8. After the fourth round the players submit their scores and wait for the result/stats to be displayed.

## Run project locally 

1. Clone github repository https://github.com/aahland/lyrical-genius
2. Install dependencies: `npm install`
3. Open the code in your prefered code editor
4. Go to lib/realtime.js and set the endpoint variable to http://localhost:3000/ if it is set to something else
5. Run `npm run dev` to start the development server. 
6. Navigate to http://localhost:3000/ in four instances (preferably different browsers)
7. Play the game or continue developing it

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.
As for now the preview version doesn't work. The game has to be played locally. 

## Testing 

The project has 3 unit tests testing functions. 
To run the test use `npm run test`

## Production

The application is live at https://lg-quiz.herokuapp.com/

## Issues & Backlog

22022-08-21 - issues with the song lyric api. Can´t fetch

Lyrics sometimes contains the portuguese sentence for "Song lyrics for the song XX by XX". This seems to happen randomly. The solution for handeling this is not good. This should be rewritten, maybe with a recursive function(?). Look in to that. 

There is still issues with the realtime socket functionality that needs to be taken care of

One player mode should be added

Refactior, refactor, refactor








