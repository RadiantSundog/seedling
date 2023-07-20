# APIs

## Garden

- **Method**: `POST`, `GET`, `PUT`, `DELETE`,
- **Path**: `/gardens`, `/gardens/{garden_id}`

Input:

```json
{
    "name": str,
    "location": str,
    "inside": Optional[bool],
    "outside": Optional[bool],
    "plant_ids": Optional[list],
}
```

Output:

```json
{
    "id": str,
    "name": str,
    "location": str,
    "inside": Optional[bool],
    "outside": Optional[bool],
    "plants": Optional[list],
}
```

Creating a new Garden saves the name, location, whether the garden is located indoors or outdoors, and the included plants. This adds a new existing Garden to the database which can be viewed, deleted, and have additional plants added to it.

## Plants

- **Method**: `GET`, `PUT`, `DELETE`,
- **Path**: `/plants`, `/plants/{plant_id}`,

Input:

```json
{
  "name": str,
  "plant_picture": HttpUrl,
  "description": Optional[str],
  "garden_id": str,
}
```

Output:

```json
{
  "id": str,
  "name": str,
  "plant_picture": HttpUrl,
  "description": Optional[str],
  "garden_id": str,
}
```

Creating a new plant saves the name, picture, description, and associated garden. This adds a new existing Plant to the database which can be viewed in the plants list and detail pages, and can be added to existing Gardens.

## Accounts

- Method: `GET`, `POST`, `PUT`, `DELETE`
- Path: `/api/protected`, `/token`, `/queries/accounts`

Input:

```json
{
  "email": str,
  "password": str,
  "username": str,
}
```

Output:

```json
{
  "id": str,
  "email": str,
  "username": str,
}
```

Accounts will create, update, or delete an account for a user on the Seedling website. There is back-end authentication implemented in the API that converts the user-entered password into a hashed password that is then used to log in to the website, but is never saved or displayed on the front-end.

## Journals

- Method: `GET`, `POST`, `PUT`, `DELETE`
- Path: `/journals`, `/journals/{journal_id}`

Input:

```json
{
  "created_on": datetime,
  "title": str,
  "description": str,
  "picture": Optional[str]
}
```

Output:

```json
{
  "id": str,
  "created_on": datetime,
  "title": str,
  "description": str,
  "picture": Optional[str]
}
```

Journal allows signed in users to create, update, or delete their journal which can be used to document information about plants. The user has the option of adding a picture of their plant in the case that they would like to document ongoing treatment or growth of their plants.

## Tasks

- Method: `POST`, `GET`, `PUT`, `DELETE`
- Path: `/tasks`, `/tasks/{task_id}`

Input:

```json
{
  "title": Optional[str],
  "description": str,
  "due_date": datetime,
}
```

Output:

```json
{
  "id": str,
  "title": Optional[str],
  "description": str,
  "due_date": datetime,
}
```

Tasks allows a user to create, edit, and delete various tasks for caring for their plants and are able to track it via a calendar.

## Identify

- Method: `POST`
- Path: `/identify-plant`

Input:

```json
{
  "plant_picture": HttpUrl,
}
```

Output:

```json
{
  "name": str,
  "similar_images": HttpUrl,
  "water_max": str,
  "water_recommend": str,
}
```

Identify allows a user to upload a picture of their plant to the app using an http url. The app will then attempt to identify the plant using a third party machine learning API and will display the common name of the plant, similar images for the user to compare their image to, a recommendation for how often to water the plant, and a maximum amount of water that the user is discouraged from exceeding.
