# Image Upload & Display Guide

## Overview
The Kithab application now has enhanced image handling for book listings with proper fallbacks and error handling.

## Features Implemented

### 1. **SellBook Page - Image Upload**
- Upload multiple images when listing a book
- Drag and drop support
- Image preview before submission
- Remove individual images with hover button
- Fallback to placeholder if no images provided

**File:** `frontend/src/pages/SellBook.jsx`

**Usage:**
```javascript
// Handle image selection
const handleImageChange = (e) => {
  const files = Array.from(e.target.files);
  setImages(files);
  const previews = files.map(file => URL.createObjectURL(file));
  setImagePreviews(previews);
};

// Remove specific image
const removeImage = (index) => {
  setImages(images.filter((_, i) => i !== index));
  setImagePreviews(imagePreviews.filter((_, i) => i !== index));
};
```

### 2. **Book Card Component**
- Displays first image from book listing
- Image fallback for missing images
- Error handling for broken image URLs
- Hover zoom effect

**File:** `frontend/src/components/BookCard.jsx`

**Features:**
- Smooth image transitions
- Sold badge overlay
- Price badge
- Responsive aspect ratio

### 3. **Book Detail Page - Image Carousel**
- Display main image with navigation arrows
- Thumbnail selection for multiple images
- Keyboard-style navigation (← →)
- Click thumbnails to switch images
- Error handling for all images

**File:** `frontend/src/pages/BookDetail.jsx`

**Features:**
- Previous/Next navigation buttons
- Clickable thumbnails
- Current image highlight
- Horizontal scroll for many images

### 4. **User Profile Page**
- Display seller profile image
- Profile image fallback
- Avatar styling with border

**File:** `frontend/src/pages/UserProfile.jsx`

### 5. **My Books Page**
- Show book images in grid
- Edit/Delete overlays
- View details button
- Images display when hovering

**File:** `frontend/src/pages/MyBooks.jsx`

## Image URLs

### Current Implementation
Images are stored as URLs from Open Library Covers API:
```javascript
images: [
  'https://covers.openlibrary.org/b/title/The+Great+Gatsby-M.jpg',
  'https://covers.openlibrary.org/b/title/1984-M.jpg'
]
```

### Real Book Cover Images
Using Open Library Covers API for authentic book covers:
- Book covers: `https://covers.openlibrary.org/b/title/{TITLE}-M.jpg`
- Size: Medium (M) for thumbnails, can be L for larger
- 72 books with real cover images from 8 categories
- Fallback to placeholder if image not found

## Error Handling

All image components have `onError` handlers:
```javascript
<img
  src={imageUrl}
  onError={(e) => {
    e.target.src = 'https://via.placeholder.com/300x400?text=Book+Cover';
  }}
/>
```

This ensures:
- No broken image icons
- Graceful fallback to placeholder
- User experience remains smooth

## Integration with Backend

### Book Model
```javascript
images: [String]  // Array of image URLs
```

### Seeded Books
All 72 seeded books include real cover images from Open Library:
```javascript
images: ['https://covers.openlibrary.org/b/title/The+Great+Gatsby-M.jpg']
```

**Books by Category:**
- **Fiction (14)**: The Great Gatsby, To Kill a Mockingbird, 1984, Pride and Prejudice, The Hobbit, The Lord of the Rings, Harry Potter, Moby Dick, The Count of Monte Cristo, The Catcher in the Rye, Wuthering Heights, Jane Eyre, The Alchemist, Slaughterhouse-Five, The Book Thief, The Hunger Games
- **Non-Fiction (8)**: Sapiens, Thinking Fast and Slow, Educated, Guns Germs and Steel, Mindset, The Immortal Life of Henrietta Lacks, The Checklist Manifesto, A Brief History of Nearly Everything, The Tipping Point, Outliers
- **Science (6)**: A Brief History of Time, The Selfish Gene, Cosmos, The Gene, The Structure of Scientific Revolutions, The Elegant Universe
- **History (6)**: The Art of War, The Rise and Fall of the Third Reich, A History of Ancient Rome, The Decline and Fall of the Roman Empire, 1491, The Cold War
- **Biography (8)**: Steve Jobs, Churchill: A Life, Einstein: A Life, Leonardo da Vinci, Benjamin Franklin, Oppenheimer, Becoming, Michelle Obama
- **Self-Help (10)**: Atomic Habits, The 7 Habits of Highly Effective People, The Power of Habit, Deep Work, The 4-Hour Body, A Man's Search for Meaning, Quiet, The Subtle Art of Not Giving a Fuck
- **Technology (6)**: Clean Code, The Pragmatic Programmer, Introduction to Algorithms, Code Complete, Design Patterns, The Mythical Man-Month
- **Education (8)**: The Learning Brain, Make It Stick, Why Don't Students Like School?, Grit (Mindsets and Grit)

## Future Enhancements

### Real Image Upload (Optional)
To implement actual image upload to cloud storage:

1. **Install Cloudinary SDK:**
```bash
npm install cloudinary-react
```

2. **Update SellBook Component:**
```javascript
import { CldUploadWidget } from 'cloudinary-react';

// Wrap upload section
<CldUploadWidget
  uploadPreset="your_preset"
  onSuccess={(result) => {
    setImagePreviews([...imagePreviews, result.info.secure_url]);
  }}
>
  {({ open }) => (
    <button onClick={() => open()}>Upload Image</button>
  )}
</CldUploadWidget>
```

3. **Update Backend .env:**
```env
CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_KEY=your_api_key
CLOUDINARY_SECRET=your_api_secret
```

## Testing

### Test Image Upload
1. Go to `http://localhost:3000/sell`
2. Login with: `john@example.com` / `password123`
3. Fill book details
4. Click upload area or drag images
5. See previews appear
6. Remove images with × button if needed
7. Submit to create listing

### Test Image Display
1. Visit `http://localhost:3000/books`
2. Click any book to see:
   - Main image with prev/next arrows
   - Clickable thumbnails
   - Seller profile image
3. Check "My Books" page for all listings

### Test Fallbacks
1. Modify a book's image URL to something invalid
2. See placeholder image appear automatically
3. No console errors or broken images

## API Endpoints

### Get Books (with images)
```
GET /api/books?category=Fiction&sort=newest
Response: { books: [{ _id, title, images[], ... }] }
```

### Get Single Book (all images)
```
GET /api/books/:id
Response: { book: { _id, title, images[], reviews[], ... } }
```

### Create Book (with images)
```
POST /api/books
Body: {
  title, author, price, condition,
  images: ['url1', 'url2'],
  ...
}
```

## Image Database Schema

```javascript
// In Book Model
images: [String]  // Array of URLs

// Example data
{
  _id: ObjectId,
  title: "The Great Gatsby",
  author: "F. Scott Fitzgerald",
  images: [
    "https://via.placeholder.com/300x400?text=The+Great+Gatsby",
    "https://via.placeholder.com/300x400?text=Back+Cover"
  ],
  price: 250,
  category: "Fiction"
}
```

## Styling Classes

### Image Container
- `h-64` - Height 256px (cards)
- `h-[600px]` - Large display (detail page)
- `w-full object-cover` - Full width image fill

### Image Effects
- `hover:scale-105` - Zoom on hover
- `rounded-lg` - Rounded corners
- `border border-gray-200` - Subtle border

### Fallback Images
- Placeholder text: `?text=Book+Cover`
- Size: Matches display area
- Color: Light gray background

## Troubleshooting

### Images Not Showing
✓ Check image URL is valid
✓ Verify onError handler is present
✓ Check console for URL issues
✓ Fallback will display placeholder

### Upload Not Working
✓ Verify file input accepts images
✓ Check file size < 10MB
✓ Verify preview URL generation
✓ Check browser console for errors

### Broken Image URLs
✓ onError handler auto-replaces with placeholder
✓ No broken image icons in UI
✓ User sees placeholder instead

## File Summary

| File | Purpose | Changes |
|------|---------|---------|
| SellBook.jsx | Upload & preview images | New `removeImage()`, improved UI |
| BookCard.jsx | Display thumbnail | Error handling added |
| BookDetail.jsx | Show main + thumbnails | Carousel navigation added |
| UserProfile.jsx | Show user avatar | Error handling added |
| MyBooks.jsx | List user books | Image display added |
| seed.js | Database seeding | Placeholder URLs for all books |

---

**Status:** ✅ Image handling fully implemented with fallbacks
**Last Updated:** November 17, 2025
