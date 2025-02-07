# Recipe Sharing Application 🚀

## Overview

The Recipe Sharing Application is a web application built with Angular 18 that allows users to create, view, edit, and delete recipes. It demonstrates core Angular concepts such as components, services, routing, and forms while ensuring a responsive UI using Angular Material.

## Features

### 1. Home Page (Recipe List & Search)

- Displays a list of available recipes with titles, short descriptions, and thumbnail images.
- Includes a search bar to filter recipes by title or ingredients.

### 2. Recipe Details Page

- Displays full details of a selected recipe, including ingredients and cooking instructions.

### 3. Adding Recipes

- Users can submit new recipes through a dedicated form.
- The form includes fields for:
  - Title
  - Description
  - Ingredients
  - Instructions
  - Thumbnail Image Upload (via ImgBB)
- Uses Angular Reactive Forms for proper form handling and validation.

### 4. Editing & Deleting Recipes

- Users have the ability to edit or delete recipes.

### 5. Routing & Navigation

- Uses Angular Router to navigate between different pages:
  - Home Page (Recipe List)
  - Recipe Details Page
  - Recipe Create/Edit Page
- A layout component loads the router outlet and header.
- A 404 Not Found page handles unmatched routes.

### 6. UI & Notifications

- Uses Angular Material for UI components, including buttons and Snackbar notifications.
- Fully responsive design.

### 7. Image Upload

- ImgBB is integrated for dynamic image uploads.

### 8. Validation & Error Handling

- Form validation ensures all required fields are correctly filled before submission.
- Displays appropriate error messages when needed.
- Error handling includes displaying an error message via a Snackbar.

## Technical Details

### 1. Application Structure

- **Home Page:** Displays the recipe list and includes a search bar.
- **Recipe Details Page:** Shows the full recipe information.
- **Recipe Create/Edit Page:** Allows users to add or edit recipes.
- **Layout Component:** Contains the router outlet and header.

### 2. Components

- **Recipe List:** Displays all recipes.
- **Recipe Details:** Shows individual recipe information.
- **Recipe Form:** Handles adding/editing recipes.
- **Shared Card Component:** Displays individual recipe items.
- Data Flow: Uses `input()` and `output()` signals for data flow between components.

### 3. Services

- **RecipeService** manages:

  - Fetching, adding, editing, and deleting recipes.
  - Interaction with a mock backend (json-server).

- **ImageService** manages:
  - Upload Image: A method to upload an image to ImgBB.

### 4. Mock Backend

- Uses **json-server** to simulate a backend data store.

## How to Run the Project

### 1.Clone the repository:

```sh
git clone https://github.com/tkopadze2004/ng-recipe
```

### 2. Install Dependencies

```sh
npm install
```

### 3. Build the project:

```sh
ng build
```

### 4. Start the Backend Server

Run json-server with:

```sh
npm run server
```

Or manually:

```sh
json-server --watch db.json --port 3000
```

### 5. Start the Angular Application

```sh
ng serve
```

### 6. Access the Application

Open your browser and visit:

```
http://localhost:4200
```

## Notes

- The application follows Angular best practices for maintainability and scalability.
- The UI is built using Angular Material for a clean and intuitive design.
- ImgBB API: The application uploads images to the [ImgBB API](https://imgbb.com/) and receives a link for each uploaded image. Visit their website for more details.

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page. 🔥 🔥
