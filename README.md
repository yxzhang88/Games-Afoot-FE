# Games-Afoot-FE 🧩

## About 🔍

GamesAfoot is a web application allows users to participate in a scavenger hunt based on real-world locations. Users can input their starting location or use their current location and select the number of locations they want to visit within a specified radius. The app generates a list of locations using OpenAI and provides hints for the user to discover each location. As the user reaches each location, the next hint is revealed until the final destination is found. 🏆 ***Please note that OpenAI may generate unreal locations :) currently, the OpenAI prompt seems to be effectively generating real locations, however our team plans to integrate a locations API in the future!

## Team
- **Jaime Mitchell**: Original concept, Backend
- **Nina Sohn**: Backend
- **Jenny Chen**: Frontend
- **Miranda Zhang**: Frontend


## Overview

This frontend application for the [Games-Afoot] features a user-friendly interface designed for an engaging and interactive gaming experience. 🚀 

## Features

- Location-Based Scavenger Hunts: Users can start a scavenger hunt based on their current location.
- Hints for Locations: The application generates 3 hints for users to discover the next location in the hunt.
- Progress Tracking: Users progresses are stored in database
- Interactive Map: Users will see their location on the map and marker will turn different colors depend on their distance.

## Tech Stack

Backend
- Java 21
- Spring Boot 3.3.2
- Spring MVC (RESTful APIs)
- Spring Data JPA (Database access)
- PostgreSQL (Database)
- Maven (Build Tool)
- JUnit & Mockito (Testing)

Frontend
- React
- Leaflet
- Vitest (Testing)

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/Games-Afoot-FE.git
   
    ```

2. **Navigate to the project directory**:
    ```bash
     cd Games-Afoot-FE
    ```

3. **Install dependencies**:
    ```bash
    npm install
    ```

4. **Start the development server**:
    ```bash
    npm run dev
    ```
Frontend will start on: `http://localhost:5173` .

5. **Testing**:
    ```bash
    npm run test
    ```
6. Backend Setup
    🔗 (https://github.com/enigmatic-loop/Games-Afoot-BE)
   






