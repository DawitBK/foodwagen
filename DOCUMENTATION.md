# FoodWagen Project Documentation

## Overview

FoodWagen is a web application for managing food items, built with Next.js and TypeScript. Users can search, add, edit, and delete food items via a mock API.

## Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Custom CSS (`.food-` prefix)
- **State Management**: Redux Toolkit + React-Redux
- **HTTP Client**: Axios with try-catch error handling
- **Testing**: Jest + React Testing Library
- **API**: MockAPI.io

## Project Structure

```
/app
  layout.tsx       # Root layout with ReduxProvider
  page.tsx         # HomePage with Hero, Search, Food Grid
  providers.tsx    # Redux Provider wrapper
  globals.css      # Global styles
/components
  FoodCard.tsx     # Food item card with edit/delete menu
  FoodForm.tsx     # Form for adding/editing food
  Header.tsx       # Application header
  Footer.tsx       # Application footer
  Modal.tsx        # Reusable modal component
/store
  index.ts         # Redux store configuration
  foodSlice.ts     # Food reducer with async thunks
  hooks.ts         # Typed Redux hooks
/app/api
  food.ts          # API service functions with axios and error handling
/types
  food.ts          # TypeScript interfaces
/tests
  FoodCard.test.tsx
  FoodForm.test.tsx
```

## Features

- **List**: View food items in responsive grid
- **Search**: Filter by name via Hero search bar
- **Add**: Create via modal (Header + Featured section buttons)
- **Edit**: Update via 3-dot menu on cards
- **Delete**: Remove via 3-dot menu with confirmation
- **Load More**: Pagination (8 items initially)

## Redux State Management

### Store Structure

```typescript
{
  food: {
    foods: Food[],
    loading: boolean,
    error: string | null
  }
}
```

### Async Thunks

- `fetchFoods(searchTerm?)` - Fetch/search foods
- `createFood(payload)` - Create food
- `updateFood({ id, payload })` - Update food
- `deleteFood(id)` - Delete food

## Setup & Running

### Installation

```bash
npm install
```

### Environment Configuration (Optional)

Create a `.env.local` file in the root directory to customize the API base URL:

```env
NEXT_PUBLIC_API_BASE_URL=https://your-api-url.com
```

### Development

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Tests

```bash
npm test
```

### Build

```bash
npm run build
```

The build process:
- Compiles TypeScript to JavaScript
- Validates types with strict TypeScript checking
- Lints code for errors
- Optimizes and bundles the application
- Generates static pages where possible

**Note**: The project uses strict TypeScript mode. All async thunks are properly typed for type safety and successful builds.

## API Configuration

### Base URL

The API base URL is configured in `app/api/food.ts` and can be customized via environment variable:

- **Default**: `https://6852821e0594059b23cdd834.mockapi.io`
- **Environment Variable**: `NEXT_PUBLIC_API_BASE_URL` (optional)

### HTTP Client

All API calls use **Axios** with a configured instance that includes:

- Base URL configuration
- Default headers (`Content-Type: application/json`)
- 10-second timeout
- Comprehensive error handling with try-catch blocks

### Error Handling

All API functions implement try-catch error handling with a centralized error handler (`handleApiError`) that:

- Handles server response errors (4xx/5xx status codes)
- Handles network errors (no response received)
- Handles request setup errors
- Provides descriptive error messages

### API Endpoints

Base URL: `https://6852821e0594059b23cdd834.mockapi.io` (configurable via `NEXT_PUBLIC_API_BASE_URL`)

| Method | Endpoint            | Description               |
| ------ | ------------------- | ------------------------- |
| GET    | `/Food`             | Fetch all foods           |
| GET    | `/Food?name=[term]` | Search foods by name      |
| POST   | `/Food`             | Create new food item      |
| PUT    | `/Food/[id]`        | Update existing food item |
| DELETE | `/Food/[id]`        | Delete food item          |

### API Functions

All functions are located in `app/api/food.ts`:

- `fetchFoods(name?: string)` - Fetch all foods or search by name
- `createFood(payload: Partial<Food>)` - Create a new food item
- `updateFood(id: string, payload: Partial<Food>)` - Update an existing food item
- `deleteFood(id: string)` - Delete a food item

Each function:

- Uses axios with try-catch error handling
- Returns typed promises
- Throws descriptive errors on failure
- Handles all error scenarios (network, server, request errors)

## Error Handling

### API Level

All API functions in `app/api/food.ts` use try-catch blocks and throw descriptive errors that are caught by:

- Redux async thunks (automatically handled in `foodSlice.ts` rejected states)
- Component-level try-catch blocks (for direct API calls)

### Component Level

Components implement error handling for user-facing operations:

- **FoodForm.tsx**: Catches errors from `createFood`/`updateFood` and displays alert with error message
- **FoodCard.tsx**: Catches errors from `deleteFood` and displays alert with error message
- **page.tsx**: Search function catches errors and logs them (errors displayed via Redux state)

All errors are logged to the console for debugging purposes.

### Redux Error State

The Redux store includes an `error` field in the food state that is automatically populated when API calls fail through async thunks. This error is displayed in the UI (e.g., in the main page when loading foods fails).

## Deployment

### Vercel Deployment

The project is configured for seamless deployment on Vercel:

1. **Connect Repository**: Link your GitHub repository to Vercel
2. **Automatic Builds**: Vercel automatically detects Next.js and configures:
   - Build Command: `npm run build`
   - Output Directory: `.next` (Next.js default)
   - Install Command: `npm install`

3. **Environment Variables** (Optional):
   - `NEXT_PUBLIC_API_BASE_URL` - Custom API base URL (if different from default)

4. **No Additional Configuration Required**:
   - The project builds successfully with strict TypeScript checking
   - All async thunks are properly typed
   - All dependencies are correctly configured

### Build Verification

Before deploying, ensure the build succeeds locally:

```bash
npm run build
```

Expected output should show:
- ✓ Compiled successfully
- ✓ Linting and checking validity of types
- ✓ Collecting page data
- ✓ Generating static pages

## TypeScript Configuration

The project uses strict TypeScript mode with the following configuration:

- **Strict Mode**: Enabled for type safety
- **Type Checking**: All Redux thunks are explicitly typed
- **Async Thunks**: Properly typed with generic parameters:
  ```typescript
  createAsyncThunk<ReturnType, ParameterType, ThunkAPI>
  ```

## Form Validation

| Field             | Input Name          | Error ID                  |
| ----------------- | ------------------- | ------------------------- |
| Food Name         | `food_name`         | `food-name-error`         |
| Food Rating       | `food_rating`       | `food-rating-error`       |
| Food Image        | `food_image`        | `food-image-error`        |
| Restaurant Name   | `restaurant_name`   | `restaurant-name-error`   |
| Restaurant Logo   | `restaurant_logo`   | `restaurant-logo-error`   |
| Restaurant Status | `restaurant_status` | `restaurant-status-error` |
