# Integrations

The application will need to get the following kinds of data from third-party sources:

- via AI machine learning data from Plant.id API:

  - Plant identification
  - Similar images
  - Plant watering schedule

  Plant watering information is presented using a minimum and maximum score. The scores mean the following:
  1 - Plant prefers dry environment
  2 - Plant prefers medium wetness environment
  3 - Plant prefers wet environment

  To read the scores:
  A plant being identified with a watering_min listed as a value of 1, and watering_max listed as a value of 2 would mean that the plant prefers something between a dry and medium wetness environment.
