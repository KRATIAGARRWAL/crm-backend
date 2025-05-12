# CRM Backend

## Overview
Backend service for the Mini CRM Platform, providing robust APIs for customer segmentation, campaign management, and intelligent insights.

## Local Setup Instructions

### Prerequisites
- Node.js (recommended version 16+ or latest LTS)
- npm (Node Package Manager)
- MongoDB
- Redis (for caching and pub-sub functionality)

### Installation Steps
1. Clone the repository
```bash
git clone https://github.com/KRATIAGARRWAL/crm-backend.git
cd crm-backend
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
Create a `.env` file in the root directory with the following configuration:
```env
MONGO_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/mini_crm?retryWrites=true&w=majority
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_generated_jwt_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
PORT=5000
FRONTEND_URL=http://localhost:5173
```

**Note:** Replace the placeholder values with your actual credentials:
- `MONGO_URI`: Your MongoDB connection string
- `REDIS_URL`: Your Redis server URL (default is localhost)
- `JWT_SECRET`: A secure randomly generated secret
- `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`: Obtained from Google Developer Console
- `GOOGLE_CALLBACK_URL`: Your backend's OAuth callback endpoint
- `PORT`: Backend server port
- `FRONTEND_URL`: Your frontend application's URL

4. Start the development server
```bash
npm start
```

## Architecture Diagram

```mermaid
graph TD
    A[REST APIs] --> B[Authentication]
    A --> C[Data Ingestion]
    A --> D[Campaign Management]
    B --> E[Google OAuth]
    C --> F[MongoDB]
    D --> F
    F --> G[Redis Caching]
    A --> H[AI Message Generation]
    H --> I[AI Service]
```

## Technology Stack and AI Tools

### Backend Technologies
- Node.js
- Express.js
- MongoDB for data storage
- Redis for caching and pub-sub
- Mongoose ODM
- Passport.js for Google OAuth

### AI Integration
- **AI Message Suggestion Service**: 
  - Located in separate repository: [name-crm-ai-server](https://github.com/KRATIAGARRWAL/crm-ai-server)
  - Provides intelligent message suggestions based on campaign objectives
  - Key Features:
    - Generate 2-3 personalized message variants
    - Tailored to specific campaign goals (e.g., "bring back inactive users")
    - Helps marketers craft more effective communication strategies

### Key Features
- Secure REST APIs
- User authentication with Google OAuth
- Campaign and customer data management
- AI-powered message generation assistance
- Pub-sub architecture for asynchronous processing

## AI Service Functionality
The companion AI service specializes in generating contextual message suggestions:
- Input: Campaign objective (e.g., "reactivate dormant customers")
- Output: Multiple message variants that align with the campaign goal
- Example:
  - Objective: "Bring back inactive users"
  - Generated Suggestions:
    1. "We miss you! Here's 20% off to reignite your shopping experience"
    2. "Your favorite brands are waiting. Come back and enjoy a special welcome back offer!"
    3. "Time to revisit your shopping journey - exclusive comeback deal inside!"

## Known Limitations and Assumptions

### Technical Limitations
- Requires active MongoDB and Redis connections
- Dependent on external AI service availability
- OAuth authentication relies on Google's infrastructure

### Functional Assumptions
- User has valid Google Developer credentials
- Stable network connectivity
- Redis and MongoDB services are running
- AI service is operational and accessible
