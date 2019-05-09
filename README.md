# Farm Frenzy - Backend
## Play Live Games Online Against Other Players

#### Joshua Loran and Molly Nemerever

###### Project completed as part of [Flatiron School](https://flatironschool.comcampuses/seattle/) curriculum.

![project gif](https://github.com/WTFCodingPotato/Project4_Frontend_Multigame/blob/master/ezgif.com-video-to-gif.gif)

## Project FAQ
#### 1. What is Farm Frenzy?
Farm Frenzy is an online gaming platform. Players can sign in and play live games against other users. As of 5/8/19 the only game option is tic tac toe. In the future we hope to add various options such as Minesweeper, Connect 4, Simon and Trivia.

#### 2. How does it work?
After creating an account, users can select a game to play as well as their desired icon for that game.  Users will be matched with another player who has selected the same game.  Games will be updated in real time on each player's screen. 

## Access Instructions
1. Clone the frontend repository as well as the backend repository. 
2. Backend: run `bundle install`, `rails db:migrate`, `rails db:seed`, `rails s -p 3001`
3. Frontend: run `bundle install`, `npm start`
4. If you have two players participating, be sure to open two Farm Frenzy pages by running `npm start` in two separate terminal    tabs.

## Project Requirements
1.	Create a fully functioning application.
2.	Build a Rails backend, paired with a React frontend.
3.  Maintain your backend and frontend in different GitHub repositories.
3.	Build a database schema (using Postgres).
5.	Utilize fetch requests to completed CRUD.

#### Time allocated: 4 days

## Link to Backend Repository:
[Backend Repository](https://github.com/WTFCodingPotato/Project4_Backend_Multigame)

## Database Schema Diagram
As of 5/8/19 the User_Games table is not utilized. As soon as multiple games are offered within Farm Frenzy, this table will be used to store the user/games relationships.
![Database Diagram](https://github.com/WTFCodingPotato/Project4_Frontend_Multigame/blob/master/Screen%20Shot%202019-05-08%20at%204.13.53%20PM.png)
