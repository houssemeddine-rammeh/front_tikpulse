# TikPluse Advanced Dashboard System

## Overview

The TikPluse Advanced Dashboard is a comprehensive, interactive analytics platform that provides real-time insights into your TikTok agency's performance. Built with React, TypeScript, and Chart.js, it offers a modern, responsive interface with advanced visualization capabilities.

## Features

### 🎯 Core Features

- **Real-time Data Updates**: Live metrics that update every 5 seconds
- **Interactive Charts**: Zoom, pan, and filter capabilities
- **Customizable Layout**: Drag-and-drop grid system with responsive breakpoints
- **Multiple Chart Types**: Line, area, bar, pie, doughnut, heatmap, and funnel charts
- **Data Export**: CSV, JSON, and PDF export options
- **Security Integration**: Built-in security monitoring and threat detection
- **Mobile Responsive**: Optimized for all device sizes

### 📊 Chart Components

#### 1. Engagement Chart (`EngagementChart.tsx`)
- **Type**: Line/Area chart with time series data
- **Features**: 
  - Toggle between line and area chart modes
  - Multi-metric visualization (views, likes, shares, comments, engagement rate)
  - Zoom and pan functionality
  - Average engagement line annotation
  - Dual Y-axis for different metric scales

#### 2. Real-time Chart (`RealtimeChart.tsx`)
- **Type**: Live updating line chart
- **Features**:
  - 60-second rolling window
  - Real-time active user tracking
  - Change indicators with percentage calculations
  - Animation controls

#### 3. Audience Chart (`AudienceChart.tsx`)
- **Type**: Pie/Doughnut chart
- **Features**:
  - Age group demographics
  - Toggle between pie and doughnut modes
  - Percentage display options
  - Interactive legend

#### 4. Performance Chart (`PerformanceChart.tsx`)
- **Type**: Bar chart
- **Features**:
  - Content performance comparison
  - Metric filtering (views, likes, shares)
  - Horizontal/vertical orientation
  - Top performer identification

#### 5. Heatmap Chart (`HeatmapChart.tsx`)
- **Type**: Custom heatmap visualization
- **Features**:
  - 24-hour x 7-day engagement patterns
  - Color intensity mapping
  - Hover tooltips
  - Responsive grid layout

#### 6. Security Chart (`SecurityChart.tsx`)
- **Type**: Doughnut chart with status indicators
- **Features**:
  - Security score visualization
  - Threat level indicators
  - Status-based color coding
  - Real-time security metrics

#### 7. Geographic Chart (`GeoChart.tsx`)
- **Type**: Horizontal bar chart
- **Features**:
  - Country-based audience distribution
  - Percentage calculations
  - Progressive bar fills

#### 8. Funnel Chart (`FunnelChart.tsx`)
- **Type**: Custom funnel visualization
- **Features**:
  - Conversion rate tracking
  - Step-by-step analysis
  - Percentage calculations

### 🎛️ Widget Components

#### 1. Metric Cards (`MetricCard.tsx`)
- **Features**:
  - 8 key performance indicators
  - Trend indicators (up/down/stable)
  - Color-coded gradients
  - Responsive grid layout

#### 2. Top Content (`TopContent.tsx`)
- **Features**:
  - Ranked content list
  - View and engagement metrics
  - Performance indicators

#### 3. Trending Hashtags (`TrendingHashtags.tsx`)
- **Features**:
  - Hashtag performance tracking
  - Growth rate indicators
  - Usage statistics

#### 4. Audience Insights (`AudienceInsights.tsx`)
- **Features**:
  - Key audience metrics
  - Trend analysis
  - Behavioral insights

#### 5. Security Overview (`SecurityOverview.tsx`)
- **Features**:
  - Threat level monitoring
  - Security score tracking
  - Active threat counts

## Installation & Setup

### Prerequisites
- Node.js 18+
- npm 8+
- React 18+
- TypeScript 4.9+

### Dependencies
```json
{
  "chart.js": "^4.4.9",
  "react-chartjs-2": "^5.3.0",
  "chartjs-adapter-date-fns": "^3.0.0",
  "chartjs-plugin-zoom": "^2.0.1",
  "chartjs-plugin-annotation": "^3.0.1",
  "react-grid-layout": "^1.4.4",
  "date-fns": "^4.1.0",
  "lucide-react": "^0.511.0",
  "d3": "^7.8.5"
}
```

### Installation Steps

1. **Install Dependencies**
   ```bash
   npm install chart.js react-chartjs-2 chartjs-adapter-date-fns
   npm install chartjs-plugin-zoom chartjs-plugin-annotation
   npm install react-grid-layout @types/react-grid-layout
   npm install d3 @types/d3
   ```

2. **Import Styles**
   ```tsx
   import 'react-grid-layout/css/styles.css';
   import 'react-resizable/css/styles.css';
   ```

3. **Add Route**
   ```tsx
   <Route path="/advanced-dashboard" element={
     <ProtectedRoute allowedRoles={[UserRole.CREATOR, UserRole.MANAGER, UserRole.ADMIN]}>
       <AdvancedDashboard />
     </ProtectedRoute>
   } />
   ```

## Usage

### Basic Implementation

```tsx
import AdvancedDashboard from './components/AdvancedDashboard/AdvancedDashboard';

function App() {
  return (
    <div className="App">
      <AdvancedDashboard />
    </div>
  );
}
```

### Customization Options

#### Layout Customization
- **Drag & Drop**: Rearrange widgets by dragging
- **Resize**: Adjust widget sizes using resize handles
- **Responsive**: Automatic layout adjustments for different screen sizes
- **Save State**: Layout preferences saved to localStorage

#### Metric Selection
- **Toggle Metrics**: Show/hide specific metrics
- **Date Range**: Custom date range selection
- **Real-time Control**: Enable/disable live updates
- **Export Options**: Multiple export formats

#### Chart Interactions
- **Zoom**: Mouse wheel or pinch to zoom
- **Pan**: Click and drag to pan
- **Filter**: Toggle data series on/off
- **Hover**: Detailed tooltips on hover

## API Integration

### Backend Endpoints

The dashboard integrates with the following API endpoints:

```typescript
// Metrics endpoint
POST /api/v1/analytics/metrics
{
  "dateRange": {
    "start": "2024-01-01",
    "end": "2024-01-31"
  },
  "metrics": ["views", "likes", "shares"]
}

// Time series data
POST /api/v1/analytics/timeseries
{
  "dateRange": {
    "start": "2024-01-01",
    "end": "2024-01-31"
  }
}

// Real-time data
GET /api/v1/analytics/realtime

// Export data
POST /api/v1/analytics/export
{
  "format": "csv|json|pdf",
  "dateRange": {...},
  "metrics": [...]
}

// Security dashboard
GET /api/v1/security/dashboard
```

### Data Formats

#### Metrics Response
```typescript
interface MetricsData {
  totalViews: number;
  totalLikes: number;
  totalShares: number;
  totalComments: number;
  engagementRate: number;
  followerGrowth: number;
  reachGrowth: number;
  conversionRate: number;
  activeUsers: number;
  sessionDuration: number;
}
```

#### Time Series Response
```typescript
interface TimeSeriesData {
  date: string;
  views: number;
  likes: number;
  shares: number;
  comments: number;
  engagement: number;
}[]
```

## Security Features

### Built-in Security Monitoring
- **Threat Detection**: Real-time security threat monitoring
- **Access Control**: Role-based access restrictions
- **Audit Trail**: Comprehensive logging of all dashboard activities
- **Data Encryption**: Encrypted data transmission and storage
- **Session Management**: Secure session handling with timeout controls

### Security Dashboard Integration
- **Security Score**: Overall security health indicator
- **Active Threats**: Real-time threat count
- **Blocked Attempts**: Failed login attempt tracking
- **IP Monitoring**: Geographic access pattern analysis

## Performance Optimization

### Rendering Optimizations
- **React.memo**: Memoized components to prevent unnecessary re-renders
- **useCallback**: Optimized event handlers
- **useMemo**: Cached expensive calculations
- **Lazy Loading**: Components loaded on demand

### Data Management
- **Efficient Updates**: Incremental data updates for real-time charts
- **Caching**: Local storage for layout preferences
- **Debouncing**: Optimized API calls
- **Pagination**: Large dataset handling

### Bundle Optimization
- **Code Splitting**: Dynamic imports for chart components
- **Tree Shaking**: Unused code elimination
- **Compression**: Gzipped assets
- **CDN Integration**: External library optimization

## Responsive Design

### Breakpoints
- **Large (lg)**: 1200px+ (12 columns)
- **Medium (md)**: 996px+ (10 columns)
- **Small (sm)**: 768px+ (6 columns)
- **Extra Small (xs)**: 480px+ (4 columns)
- **Extra Extra Small (xxs)**: <480px (2 columns)

### Mobile Optimizations
- **Touch Gestures**: Pinch to zoom, swipe to pan
- **Responsive Charts**: Automatic scaling and font adjustments
- **Simplified UI**: Streamlined controls for mobile devices
- **Performance**: Optimized rendering for mobile browsers

## Accessibility

### WCAG 2.1 Compliance
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Support**: ARIA labels and descriptions
- **Color Contrast**: High contrast mode support
- **Focus Management**: Proper focus indicators
- **Reduced Motion**: Respects user motion preferences

### Accessibility Features
- **Alt Text**: Descriptive chart alternatives
- **Semantic HTML**: Proper heading structure
- **Focus Traps**: Modal and panel focus management
- **Announcements**: Screen reader notifications for data updates

## Browser Support

### Supported Browsers
- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+
- **Mobile Safari**: 14+
- **Chrome Mobile**: 90+

### Polyfills Included
- **ResizeObserver**: Chart responsiveness
- **IntersectionObserver**: Lazy loading
- **CSS Grid**: Layout support
- **Flexbox**: Component alignment

## Troubleshooting

### Common Issues

#### Charts Not Rendering
```typescript
// Ensure Chart.js is properly registered
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
```

#### Layout Issues
```css
/* Ensure grid layout CSS is imported */
@import '~react-grid-layout/css/styles.css';
@import '~react-resizable/css/styles.css';
```

#### Performance Issues
- Check for memory leaks in useEffect cleanup
- Verify chart destruction on component unmount
- Monitor bundle size and lazy load heavy components

### Debug Mode
Enable debug logging:
```typescript
// Add to environment variables
REACT_APP_DEBUG_DASHBOARD=true
```

## Contributing

### Development Setup
1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm start`
4. Run tests: `npm test`

### Code Style
- **ESLint**: Configured with React and TypeScript rules
- **Prettier**: Code formatting
- **TypeScript**: Strict mode enabled
- **Testing**: Jest and React Testing Library

### Pull Request Guidelines
1. Follow existing code patterns
2. Add tests for new features
3. Update documentation
4. Ensure accessibility compliance
5. Test on multiple browsers

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Support

For support and questions:
- **Documentation**: Check this README and inline code comments
- **Issues**: Create GitHub issues for bugs and feature requests
- **Discussions**: Use GitHub Discussions for questions and ideas

---

**Built with ❤️ for the TikPluse platform** 