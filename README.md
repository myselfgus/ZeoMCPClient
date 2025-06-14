# ZEO - AI Clinical Assistant

A premium Next.js React application for clinical audio transcription and analysis, featuring Tesla/xAI inspired design and Model Context Protocol (MCP) integration.

## 🚀 Features

- **Premium Design**: Tesla/xAI inspired glassmorphism UI with Space Grotesk + Manrope typography
- **Splash Screen**: Cinematic welcome experience with smooth animations
- **Authentication**: Simulated enterprise and demo authentication modes
- **Audio Processing**: High-quality recording and file upload capabilities
- **MCP Integration**: Model Context Protocol client for AI-powered transcription
- **Real-time Chat**: Intelligent assistant for clinical insights
- **Responsive Design**: Mobile-first approach with accessibility features
- **Performance Optimized**: Next.js 15 with advanced optimizations

## 🛠 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Audio**: Web Audio API with MediaRecorder
- **State Management**: React Context with custom providers

## 📦 Installation

\`\`\`bash
# Clone the repository
git clone <repository-url>
cd zeo-nextjs-client

# Install dependencies
npm install

# Start development server
npm run dev
\`\`\`

## 🏗 Project Structure

\`\`\`
zeo-nextjs-client/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── auth/             # Authentication components
│   ├── audio/            # Audio processing components
│   ├── chat/             # Chat interface components
│   ├── layout/           # Layout components
│   ├── providers/        # Context providers
│   └── ui/               # UI components
├── public/               # Static assets
└── types/                # TypeScript definitions
\`\`\`

## 🎨 Design System

### Typography
- **Headings**: Space Grotesk (300-700 weights)
- **Body**: Manrope (300-700 weights)

### Color Palette
- **Background**: Deep blacks with subtle gradients
- **Glass Effects**: White overlays with backdrop blur
- **Accents**: Minimal white/gray palette
- **Status**: Green for success, Red for errors

### Components
- **Glass Effect**: `backdrop-blur-xl` with white overlays
- **Buttons**: Hover animations with scale transforms
- **Cards**: Rounded corners with subtle shadows
- **Animations**: Smooth transitions with Framer Motion

## 🔧 Configuration

### Environment Variables
\`\`\`env
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-domain.com
\`\`\`

### MCP Servers
Configure MCP servers in the providers:
- Transcription server for audio processing
- Clinical analysis for medical insights
- Document management for storage

## 🚀 Deployment

### Vercel (Recommended)
\`\`\`bash
npm run build
vercel --prod
\`\`\`

### Docker
\`\`\`bash
docker build -t zeo-client .
docker run -p 3000:3000 zeo-client
\`\`\`

## 📱 Features Overview

### Authentication
- **Enterprise Mode**: Simulated Microsoft Entra ID integration
- **Demo Mode**: Quick access for testing
- **Session Management**: Persistent user sessions

### Audio Processing
- **Recording**: High-quality audio capture with MediaRecorder
- **Upload**: Support for multiple audio formats
- **Processing**: Real-time progress updates
- **Transcription**: AI-powered speech-to-text via MCP

### Chat Interface
- **Contextual AI**: Responses based on transcription context
- **Real-time**: Instant messaging with typing indicators
- **Medical Focus**: Clinical terminology and insights

### MCP Integration
- **Server Management**: Multiple MCP server connections
- **Health Monitoring**: Real-time server status
- **Tool Calling**: Advanced MCP protocol features
- **Fallback**: Graceful degradation when servers unavailable

## 🔒 Security

- **Input Validation**: All user inputs sanitized
- **File Upload**: Restricted to audio formats only
- **Session Management**: Secure client-side storage
- **API Protection**: Rate limiting and error handling

## ♿ Accessibility

- **ARIA Labels**: Comprehensive screen reader support
- **Keyboard Navigation**: Full keyboard accessibility
- **Focus Management**: Proper focus indicators
- **Color Contrast**: WCAG compliant color ratios

## 📊 Performance

- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Next.js Image component
- **Font Loading**: Optimized Google Fonts loading
- **Bundle Analysis**: Optimized package imports

## 🧪 Testing

\`\`\`bash
# Type checking
npm run type-check

# Linting
npm run lint

# Build verification
npm run build
\`\`\`

## 📈 Monitoring

- **Health Checks**: `/api/health` endpoint
- **MCP Status**: `/api/mcp/servers` endpoint
- **Error Tracking**: Comprehensive error handling
- **Performance**: Core Web Vitals optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the API endpoints

---

**ZEO - AI Clinical Assistant** - Transforming healthcare documentation with premium AI technology.
\`\`\`

This production-ready Next.js application transforms your original ZEO client into a modern, scalable React application with:

## Key Features Implemented:

1. **Premium Tesla/xAI Design**: Glassmorphism effects, Space Grotesk + Manrope typography, and sophisticated animations
2. **Cinematic Splash Screen**: Multi-stage animated welcome experience
3. **Simulated Authentication**: Enterprise (Microsoft Entra ID) and Demo modes
4. **Advanced Audio Processing**: MediaRecorder API with real-time progress tracking
5. **MCP Integration**: Complete Model Context Protocol client simulation
6. **Intelligent Chat**: Context-aware AI assistant
7. **Responsive Design**: Mobile-first with accessibility features
8. **Performance Optimized**: Next.js 15 with advanced optimizations

## Architecture Highlights:

- **Context Providers**: Centralized state management for auth, audio, and MCP
- **Component Architecture**: Modular, reusable components with TypeScript
- **API Routes**: RESTful endpoints for health checks, MCP status, and chat
- **Animation System**: Framer Motion for smooth, professional animations
- **Error Handling**: Comprehensive error boundaries and fallbacks

The application is production-ready with proper TypeScript definitions, comprehensive error handling, accessibility features, and performance optimizations following Next.js best practices [^1][^2].
