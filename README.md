# Seedling

- Alexander Levero
- Kyrstin Jones
- Linda Qian
- Johnny Belknap

Seedling – To give users the tools to maintain and care for something beautiful that they helped grow with their own hands.

At Seedling, our mission is to empower and inspire plant enthusiasts like you to create thriving gardens that bring joy, beauty, and connection to nature. We believe that with the right knowledge and tools, anyone can develop their gardening skills and create stunning landscapes that flourish in any environment.

## Design

- [Backend API](docs/api.md)
- [Frontend GHI](docs/ghi.md)
- [Integrations](docs/integrations.md)

## Intended market

We are targeting hobbyist gardeners who are looking for a greater degree of tracking and control over their home or garden planting experience. Seedling includes an array of functions for identifying, caring for, and creating journals for personal house or garden plants allow for a convenient all-in-one solution.

## Functionality

- Accounts
  - Sign up
  - Login
  - Sign out
- Account holders can add protected data to track their plants
  - Add and delete virtual gardens to track plants
  - Add and delete individual plants to the virtual gardens
  - Create and delete journal entries for plants
  - Track watering/healing for plants
  - Upload photos of plants to utilize API to identify them and be provided with general information, habitat, watering schedule, toxicity, etc.
- Company info blurb, useful links for gardening, and contact info in main page footer
- Main Page gives a description of how the app works for potential users

## Project Initialization

To fully enjoy this application on your local machine, please make sure to follow these steps:

1. Clone the repository down to your local machine
2. CD into the new project directory
3. Run `docker volume create mongo/db`
4. Run `docker compose build`
5. Run `docker compose up`
6. Enjoy Seedling to its fullest!
