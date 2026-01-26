# Design File Structure Documentation

This document describes the complete design file structure used in the Poster Maker application, including all interfaces, state management, and data relationships.

## Overview

The Poster Maker application uses a hierarchical design file structure that supports multi-page designs with rich content including canvas layouts, grid systems, and various element types. The structure is defined in TypeScript interfaces and managed through centralized state composables.

## Core Design File Structure

### DesignFile (Root Level)

```typescript
interface DesignFile {
  metadata: FileMetadata;  // File information and versioning
  unit: 'px' | 'mm' | 'cm' | 'inch';  // Global unit system for entire design (default: 'px')
  dpi: number;  // For print units (default: 150)
  pages: FilePage[];       // Array of pages in the design
}
```

The `DesignFile` is the top-level container that holds all design information, including metadata, unit system, DPI settings, and an array of pages.

### File Metadata

```typescript
interface FileMetadata {
  id: string;              // Unique identifier
  name: string;            // Display name (default: 'Untitled Design')
  description?: string;    // Optional description (default: 'New design file')
  createdAt: string;       // ISO timestamp
  updatedAt: string;       // ISO timestamp
  version: string;         // File format version (default: '1.0.0')
  author?: {               // Creator information
    name: string;          // default: ''
    email?: string;        // default: undefined
  };
  tags?: string[];         // Categorization tags (default: [])
  thumbnail?: string;      // Base64 or URL to preview image (default: undefined)
  usedFonts?: UsedFont[];  // Array of font family names used in the design (default: [])
}
```

## Page Structure

### FilePage

```typescript
interface FilePage {
  id: string;              // Unique page identifier
  name: string;            // Page name (e.g., "Page 1")
  description?: string;    // Optional page description (default: '')
  content: PageContent;    // The actual design content
  thumbnail?: string;      // Page preview image (default: '')
}
```

### PageContent

```typescript
interface PageContent {
  id: string;              // Unique content identifier
  name: string;            // Content name (default: 'Page content')
  canvas: Canvas;          // Canvas properties and grid
  elements: Element[];     // All design elements on the page (default: [])
  settings?: {             // Optional page-level settings
    locked?: boolean;      // default: false
    visible?: boolean;     // default: true
    opacity?: number;      // default: 1
  };
}
```

## Canvas and Grid System

### Canvas

```typescript
interface Canvas {
  id: string;                    // Unique canvas identifier
  width: number;                 // Canvas width in pixels (default: 600)
  height: number;                // Canvas height in pixels (default: 900)
  aspectRatio: string;           // Aspect ratio string (default: "2:3")
  backgroundColor?: ColorStyle;  // Background color styling
  backgroundImageUrl?: string;   // Background image URL (default: null)
  backgroundImageFit?: 'cover' | 'contain' | 'fill';  // default: 'cover'
  backgroundImagePosition?: ImagePosition;  // default: 'center'
  backgroundImageRepeat?: 'no-repeat' | 'repeat' | 'repeat-x' | 'repeat-y';  // default: 'no-repeat'
  gridEnabled?: boolean;         // default: false
  grid: Grid | null;            // Optional grid system (default: null)
}
```

### Grid System

```typescript
interface Grid {
  id: string;              // Unique grid identifier
  name: string;            // Grid name (default: 'Single')
  rows: number;            // Number of rows (default: 1)
  columns: number;         // Number of columns (default: 1)
  cells: GridCell[];       // Individual grid cells (default: [])
  innerSpacing: number;    // Spacing between cells (default: 4px)
  outerSpacing?: number;   // Outer margin (default: 16px)
  cornerRadius?: number;   // Rounded corners (default: 0px)
}
```

### Grid Cells

```typescript
interface GridCell {
  id: string;              // Unique cell identifier
  name?: string;           // Cell name (default: '')
  x: number;               // X position (default: 0)
  y: number;               // Y position (default: 0)
  width: number;           // Cell width (default: 1)
  height: number;          // Cell height (default: 1)
  stroke?: Stroke;         // Border styling (default: { width: 0, color: { type: 'empty' }, style: 'solid' })
  fill?: ColorStyle;       // Fill color (default: { type: 'solid', solidColor: { color: '#e5e7eb', opacity: 1 } })
  image?: CellImage;       // Background image (default: undefined)
  shadow?: Shadow;         // Shadow effect (default: undefined)
  opacity?: number;        // Opacity (default: 1)
  zIndex?: number;         // Stacking order (default: 0)
  locked?: boolean;        // Lock state (default: false)
  visible?: boolean;       // Visibility state (default: true)
}
```

### Cell Images

```typescript
interface CellImage {
  id: string;              // Image ID from library
  url: string;             // Image URL
  source: 'library' | 'upload' | 'ai-generated';  // default: 'library'
  fit: 'cover' | 'contain' | 'fill' | 'scale-down';  // default: 'cover'
  position: ImagePosition; // Position as ImagePosition type (default: 'center')
  scale: number;           // Scale factor (default: 1)
  rotation: number;        // Rotation in degrees (default: 0)
  filters?: {              // Image filters
    brightness?: number;    // default: 100
    contrast?: number;     // default: 100
    saturation?: number;   // default: 100
    blur?: number;         // default: 0
    sepia?: number;        // default: 0
  };
}
```

### Shape Images

```typescript
interface ShapeImage {
  id: string;              // Image ID from library
  url: string;             // Image URL
  fileName?: string;       // Original fileName for download (default: undefined)
  source: 'library' | 'upload' | 'ai-generated';  // default: 'library'
  fit: 'cover' | 'contain' | 'fill' | 'scale-down';  // default: 'cover'
  position: ImagePosition; // Position as ImagePosition type (default: 'center')
  scale: number;           // Scale factor (default: 1)
  rotation: number;        // Rotation in degrees (default: 0)
  filters?: {              // Image filters
    brightness?: number;    // default: 100
    contrast?: number;     // default: 100
    saturation?: number;   // default: 100
    blur?: number;         // default: 0
    sepia?: number;        // default: 0
  };
}
```

## Element System

The application supports 3 types of elements, all extending a common base:

### BaseElement

```typescript
interface BaseElement {
  id: string;              // Unique element identifier
  type: 'text' | 'shape' | 'group';
  x: number;               // X position (default: 100)
  y: number;               // Y position (default: 100)
  width: number;           // Element width (varies by element type)
  height: number;          // Element height (varies by element type)
  rotation: number;        // Rotation in degrees (default: 0)
  scaleX: number;          // Horizontal scale (default: 1)
  scaleY: number;          // Vertical scale (default: 1)
  zIndex: number;          // Stacking order (default: 0)
  opacity: number;         // Opacity (default: 1)
  visible: boolean;        // Visibility state (default: true)
  locked: boolean;         // Lock state (default: false)
  name?: string;           // Optional element name
}
```

### Text Elements

```typescript
interface TextElement extends BaseElement {
  type: 'text';
  content: string;                           // Text content (default: 'Text')
  fontSize: number;                          // Font size in pixels (default: 24)
  fontFamily: string;                        // Font family (default: 'Arial')
  fontName?: Record<string, string>;         // Localized font names (JSONB): {"zh": "思源宋体", "en": "Source Sans Pro"} (default: { en: 'Arial' })
  fontCode?: string;                        // Specific font identifier for CSS (e.g., "TsangerFeiBai W03") (default: 'arial')
  fontStyle: 'normal' | 'italic';           // Font style (default: 'normal')
  fontWeight: number;                       // Current effective font weight: 100, 200, 300, 400, 500, 600, 700, 800, 900 (default: 400)
  fontThickness: number;                     // Visual boldness scale: 10-90 (unique identifier for font variant) (default: 40)
  fill?: ColorStyle;                         // Text color (default: { type: 'solid', solidColor: { color: '#000000', opacity: 1 } })
  align: 'left' | 'center' | 'right';       // Text alignment (default: 'left')
  verticalAlign?: 'top' | 'middle' | 'bottom'; // Vertical alignment (default: 'top')
  padding?: number;                          // default: 0
  lineHeight: number;                       // Line height multiplier (default: 1.2)
  letterSpacing: number;                    // Letter spacing (default: 0)
  textDecoration: 'none' | 'underline' | 'line-through'; // Text decoration (default: 'none')
  stroke?: Stroke;                           // Text outline (default: undefined)
  shadow?: Shadow;                           // Text shadow (default: undefined)
  backgroundFill?: ColorStyle;               // Background color (default: undefined)
  backgroundStroke?: Stroke;                 // Background border (default: undefined)
  backgroundOpacity?: number;                // Background opacity (default: 1)
  backgroundCornerRadius?: number;           // Background corner radius (default: 0)
  backgroundFillGradient?: GradientColor;   // Background gradient (default: undefined)
}
```

### Shape Elements

```typescript
interface ShapeElement extends BaseElement {
  type: 'shape';
  shapeType: 'rectangle' | 'circle' | 'polygon' | 'star' | 'ellipse' | 'line' | 'arrow' | 'wedge';
  fill?: ColorStyle;       // Shape fill color (varies by shape type)
  image?: ShapeImage;      // Shape image (default: undefined)
  stroke?: Stroke;         // Shape border (default: { width: 0, color: { type: 'solid', solidColor: { color: '#000000', opacity: 1 } }, style: 'solid' })
  cornerRadius?: number;   // Corner radius (for rectangles) (default: 0)
  shadow?: Shadow;         // Shadow effect (default: undefined)
  radius?: number;         // Radius (for circles) (varies by shape type)
  innerRadius?: number;    // Inner radius (for stars) (default: 20)
  outerRadius?: number;    // Outer radius (for stars) (default: 40)
  numPoints?: number;      // Number of points (default: 5 for star, 3 for triangle, 6 for polygon)
  points?: number[];        // Point coordinates (varies by shape type)
  pointerLength?: number;  // default: 10 (for arrow)
  pointerWidth?: number;   // default: 10 (for arrow)
  pointerAtBeginning?: boolean; // default: false (for arrow)
  pointerAtEnding?: boolean;   // default: true (for arrow)
  angle?: number;          // default: 60 (for wedge) - angle in degrees
  clockwise?: boolean;     // default: true (for wedge) - direction of the wedge
}
```

### Group Elements

```typescript
interface GroupElement extends BaseElement {
  type: 'group';
  children: Element[];     // Can contain text, shape, and other group elements (default: [])
}
```

## Color System

The application uses a sophisticated color system supporting solid colors and gradients:

### ColorStyle

```typescript
interface ColorStyle {
  type: 'solid' | 'gradient' | 'empty';
  solidColor?: SolidColor;
  gradient?: GradientColor;
}
```

### Solid Colors

```typescript
interface SolidColor {
  color: string;           // Hex color code
  opacity?: number;        // Opacity (default: 1, range: 0-1)
}
```

### Gradient Colors

```typescript
interface GradientColor {
  priority?: 'linear-gradient' | 'radial-gradient';  // default: 'linear-gradient'
  linearGradient?: LinearGradient;
  radialGradient?: RadialGradient;
}

interface LinearGradient {
  startPoint: { x: number; y: number };  // default: { x: 0, y: 0 }
  endPoint: { x: number; y: number };    // default: { x: 1, y: 1 }
  colorStops: string[];                  // Array of exactly 2 hex color strings: [startColor, endColor] like ['#000000', '#ffffff']
  startOpacity?: number;                 // default: 1, range: 0-1
  endOpacity?: number;                   // default: 1, range: 0-1
  angle: number;                         // default: 0
}

interface RadialGradient {
  startPoint: { x: number; y: number };  // default: { x: 0.5, y: 0.5 }
  endPoint: { x: number; y: number };    // default: { x: 1, y: 1 }
  startRadius: number;                  // default: 0
  endRadius: number;                    // default: 100
  colorStops: string[];                  // Array of exactly 2 hex color strings: [startColor, endColor] like ['#000000', '#ffffff']
  startOpacity?: number;                 // default: 1, range: 0-1
  endOpacity?: number;                   // default: 1, range: 0-1
}
```

## Styling Interfaces

### Stroke (Borders)

```typescript
interface Stroke {
  width: number;                              // Border width (default: 0)
  color?: ColorStyle;                         // Border color (default: undefined)
  style: 'solid' | 'dashed' | 'dotted' | 'double'; // Border style (default: 'solid')
}
```

### Shadow Effects

```typescript
interface Shadow {
  offsetX: number;         // Horizontal offset (default: 0)
  offsetY: number;         // Vertical offset (default: 0)
  blur: number;            // Blur radius (default: 0)
  color?: ColorStyle;      // Shadow color (default: undefined)
}
```

## State Management

The application uses centralized state management through composables defined in `useData.ts`. The state architecture has been streamlined to eliminate redundancy and improve maintainability.

### State Architecture Changes

**Current Architecture:**
- `usePayloadState` serves as the primary source of truth for design file data
- All design-related operations should use `usePayloadState` instead of the deprecated `useActiveDesignState`
- State synchronization is handled automatically between canvas/element states and the payload state

### State Categories

1. **Authentication State** (`useAuthState`)
   - User session and profile data
   - Authentication status and user information
   - Login/logout state management

2. **Basic State** (`useBasicState`)
   - Active mode (template, canvas, image, element, ai, raw)
   - Uploaded images and poster text
   - Core application mode switching

3. **File State** (`useFileState`)
   - Current file and modification status
   - User files list and loading states
   - File operations tracking

4. **Design Payload State** (`usePayloadState`)
   - Complete design file data (DesignFile interface)
   - Primary source of truth for design content
   - Replaces the deprecated `useActiveDesignState`

5. **Canvas State** (`useCanvasState`)
   - Canvas dimensions and properties
   - Background colors and images
   - Grid configuration and cell management

6. **Element State** (`useElementState`)
   - Elements array and type-specific defaults
   - Element configurations for text, shapes, and groups
   - Element positioning and styling defaults

7. **Page State** (`usePageState`)
   - Page preview and generation status
   - Page-level operations

8. **Workspace State** (`useWorkspaceState`)
   - Undo/redo history management
   - Zoom, pan, and selection modes
   - Color panel positioning and drag states
   - Element and cell selection tracking
   - Stage interaction states

9. **Template State** (`useTemplateState`)
   - Selected templates and template information
   - Loaded templates cache
   - Template loading states

10. **AI Chat State** (`useAIChatState`)
    - AI processing and streaming status
    - Chat sessions and message history
    - User ID and session management
    - Stream buffer for real-time responses

11. **Color State** (`useColorState`)
    - Current color style and context
    - Recent colors history
    - Color picker state management

12. **Image State** (`useImageState`)
    - Image library management
    - Selected image tracking
    - Search and filter functionality

### Special State Composables

- **`useActivePageState`**: Provides direct access to the currently active page (FilePage object)
- **`usePayloadState`**: Manages the complete design payload and serves as the primary design file state
- **`useImageState`**: Manages image library state and image selection

### State Synchronization and Data Flow

The application maintains data consistency through a structured synchronization system:

**Primary Data Flow:**
1. `usePayloadState` holds the complete DesignFile structure
2. `useActivePageState` references the current page from the payload
3. `useCanvasState` and `useElementState` provide working copies for real-time editing
4. Changes are synchronized back to the payload through dedicated sync functions

**Synchronization Functions:**
- `syncCanvasToPayload()`: Updates canvas data in the active page
- `syncElementsToPayload()`: Updates elements array in the active page
- `applyPageContent()`: Loads page content into working states

**State Relationships:**
- File operations modify `usePayloadState` directly
- Canvas operations work through `useCanvasState` with automatic sync
- Element operations work through `useElementState` with automatic sync
- Page switching triggers `applyPageContent()` to load new working states

**Best Practices:**
- Always use `usePayloadState` for file-level operations
- Use working states (`useCanvasState`, `useElementState`) for UI interactions
- Ensure sync functions are called after batch operations
- Avoid direct manipulation of payload state during active editing

## Default Values

The system provides comprehensive default values for all data structures defined in `useData.ts`:

### Core Defaults
- **Canvas**: 600x900px, 2:3 aspect ratio, white background
- **Grid**: Single cell (1x1), 4px inner spacing, 16px outer spacing, 0px corner radius
- **Grid Cell**: Gray fill (#e5e7eb), no stroke, positioned at (0,0) with 1x1 dimensions
- **File Metadata**: Versioned structure (v1.0.0) with timestamps and author information
- **Design Payload**: Complete DesignFile structure with single default page

### Element Defaults
- **Common Properties**: 100x100px positioning, no rotation, visible, unlocked, full opacity
- **Text Elements**: Arial font, 24px size, black color, left alignment, "Text" content
- **Shape Elements**: Type-specific colors and dimensions (rectangles, circles, polygons, stars, ellipses, lines, arrows, wedges)
- **Group Elements**: Empty children array, standard positioning

### State Defaults
- **Authentication**: Null session, not authenticated, no pending operations
- **Workspace**: 1.0x zoom, selection mode enabled, no active selections
- **AI Chat**: No active sessions, empty message history, not processing
- **Colors**: Solid colors with full opacity, empty recent colors history
- **Templates**: No selected template, empty cache, not loading

## File Operations

The system supports comprehensive file operations through the `FileOperations` interface:

- **Creation**: `createFile`, `createNewFile`
- **Loading**: `loadFileIntoState`, `fetchFileFromServer`
- **Saving**: `saveFileToServer`
- **Export**: `exportFile` (JSON/ZIP formats)
- **Management**: `duplicateFile`, `deleteFile`
- **Validation**: `validateFile`
- **Thumbnails**: `generateThumbnail`

## Integration Points

### Templates

Templates use the same `DesignFile` structure and can be applied to create new designs or modify existing ones.

### AI Integration

AI-generated content integrates seamlessly with the element system, supporting text generation, image creation, and design suggestions.

### Image Library

Images from the library integrate with both canvas backgrounds and shape images, supporting various sources (library, upload, AI-generated).

### Authentication

User authentication integrates with file ownership, sharing permissions, and AI usage tracking.

This structure provides a comprehensive foundation for the Poster Maker application, supporting complex designs while maintaining data integrity and performance through efficient state management.
