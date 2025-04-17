# YouTube Summarizer Browser Extension

A browser extension that provides AI-powered video summaries, timestamped key moments, transcripts, and top comments analysis directly within YouTube's interface.

## Technical Overview

### Architecture

The extension follows a modular component-based architecture with TypeScript/JavaScript:

```
src/
├── components/        # UI Components
├── services/         # API & Business Logic
├── interfaces/       # TypeScript Interfaces
├── styles/          # CSS Styles
└── content.ts       # Content Script Entry
```

### Core Components

- **SummaryContainer**: Main container component that manages the extension's UI state
- **TabManager**: Handles tab switching and content rendering
- **Header**: Navigation and controls UI
- **SummaryContent**: Content rendering with loading states

### Backend Integration

The extension communicates with the backend API through the `SummaryService` class:

```typescript
interface Summary {
  summary: string[];
  timestampedSummary: TimestampedItem[];
  transcript: TranscriptItem[];
  comments: CommentItem[];
}
```

#### API Endpoints

Default API URL: `http://localhost:5000/api/summarize`

POST Request Format:
```json
{
  "videoId": "string",
  "targetLang": "string"
}
```

Response Format:
```typescript
{
  summary: string[];           // Key points summary
  timestampedSummary: {       // Timestamped moments
    time: number;
    seconds: number;
    text: string;
  }[];
  transcript: {               // Video transcript
    start: number;
    duration: number;
    text: string;
  }[];
  comments: {                 // Analyzed comments
    author: string;
    text: string;
    likes: number;
    timestamp?: string;
  }[];
}
```

### Integration Steps

1. Configure Backend URL:
   ```typescript
   // src/services/SummaryService.ts
   private apiUrl = 'YOUR_API_URL';
   ```

2. Initialize the Extension:
   ```typescript
   const container = document.createElement('div');
   container.id = 'youtube-summary-container';
   new SummaryContainer(container);
   ```

3. Handle API Responses:
   ```typescript
   // Fetch summary data
   const data = await SummaryService.getInstance().fetchSummary(videoId);
   
   // Update UI with received data
   tabManager.updateData(data);
   ```

### Features & Customization

#### Tab Types
- `summary`: General video summary
- `timestampedSummary`: Key moments with timestamps
- `transcript`: Enhanced transcript
- `comments`: Top comment analysis

#### Export Formats
- Text
- Markdown
- PDF
- Doc
- TXT

#### Styling
The extension uses Tailwind CSS with custom styles in `src/styles/summary.css`. Dark mode is supported through the `.dark` class modifier.

### Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build the extension:
   ```bash
   npm run build
   ```

3. Load the extension:
   - Open Chrome/Edge
   - Go to Extensions
   - Enable Developer Mode
   - Load Unpacked -> Select `dist` folder

### Error Handling

The extension includes comprehensive error handling:

```typescript
try {
  const sections = await SummaryService.getInstance().fetchSummary(videoId);
  if (!sections) throw new Error('Failed to fetch summary');
  // Handle success
} catch (error) {
  // Show error in UI
  this.content.showError(error.message);
}
```

## Testing

The extension can be tested by:

1. Running a local YouTube video
2. Ensuring the backend API is running
3. Clicking the "Summarize Video" button
4. Verifying the different tab contents
5. Testing export functionality

## Production Configuration

For production deployment:

1. Update the API URL in `SummaryService.ts`
2. Configure CORS settings in the backend
3. Update the manifest.json permissions
4. Build the production bundle

## Known Limitations

- Requires an active backend API connection
- Video must be publicly accessible
- Some features may be limited on embedded videos
- Export to PDF/Doc requires additional backend support

## Security Considerations

- API requests should be HTTPS
- Implement rate limiting
- Validate video IDs
- Sanitize HTML content from API
- Handle CORS properly