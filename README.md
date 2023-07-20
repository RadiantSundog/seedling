# Seedling

- Alexander Levero
- Kyrstin Jones
- Linda Qian
- Johnny Belknap

Seedling – **mission statement**

## Design

- [API design](docs/apis.md)
- [Data model](docs/data-model.md)
- [GHI](docs/ghi.md)
- [Integrations](docs/integrations.md)

## Intended market

We are targeting hobbyist gardeners who are looking for a greater degree of tracking and control over their home or garden planting experience. An array of functions for identifying, caring for, and creating journals for personal house or garden plants allow for a convenient all-in-one solution.

## Functionality

- Accounts
- Account holders can add protected data to track their plants
  - Add virtual gardens to track plants
  - Add individual plants to the virtual gardens
  - Create journal entries for plants
  - Track watering/healing for plants
  <!-- - About Page with company info and useful links
- Social Media Links/Contact at the footer -->
- Contact => Email or Help Chat via Facebook Messenger for questions/suggestions
- Main Page gives a description of how the app works for potential users.

## Project Initialization

To fully enjoy this application on your local machine, please make sure to follow these steps:

1. Clone the repository down to your local machine
2. CD into the new project directory
3. Run `docker volume create db-seedling-db`
4. Run `docker compose build`
5. Run `docker compose up`
6. Enjoy Seedling to its fullest!
