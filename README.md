## Eko Delivery Service
Eko decide to introduce new delivery services  to market in order to support growth of E-commerce business in Thailand. 
Due to innovative nature of the company, the ways to use their service is very innovative one. 

To use Eko Delivery Service, their customer s​​have to define delivery route by themselves.  They can construct it by 
choosing multiple routes between two towns that Eko provided. 

The delivery cost is equal to summation of these routes that they have chosen.

Each routes in the list is only ‘one-way’, That is, a route from town A to town B does not imply the existence of a 
route from town B to town A. Even if both of these routes do exist, they are distinct and are not necessarily have 
same cost. 

The purpose of this assignments is to help Eko building the system that provide their customers with 
information about delivery route. You will compute delivery cost of the certain route and number of possible delivery 
route​s between two towns.

### Input Data
A directed graph where a node represents a town and an edge represents a route between two towns. The weighting of the 
edge represent the delivery cost between two towns. The towns are named using the first letters of the alphabet. 
A route between two town A to town B with cost of 1 is represented as AB1

Example:

`AB1, AC4, AD10, BE3, CD4, CF2, DE1, EB3, EA2, FD1`

## This data is mocked and stored in `src/api/mockData.json`

## Available Scripts

In the project directory, you can run:

### `npm i`

Install required packages

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
