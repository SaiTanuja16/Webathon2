# Academic Student Reminder Web Application

A full-stack web application designed to help students manage their academic activities by providing timely reminders for classes, assignments, examinations, project deadlines, and institutional events.

## Features

### Core Functionality
- ✅ **Secure User Authentication** - Register and login with encrypted credentials
- 📝 **Task Management** - Create, edit, delete, and track daily tasks
- 📚 **Assignment Tracking** - Monitor homework and submissions with status updates
- 📖 **Examination Scheduler** - Keep track of upcoming exams and preparation
- 🎯 **Project Deadlines** - Manage long-term projects with progress tracking
- 🎓 **Institutional Events** - Stay updated with campus activities
- 📅 **Interactive Calendar** - Visual overview of all scheduled items
- 🔔 **Automated Notifications** - Timely reminders before deadlines
- 📊 **Progress Tracking** - Monitor academic performance and completion rates
- 🔍 **Search Functionality** - Quickly find any reminder or task

### User Experience
- 🎨 Modern, responsive design that works on all devices
- 🌈 Beautiful gradient-based UI with smooth animations
- ⚡ Fast and reliable with localStorage for data persistence
- 📱 Mobile-friendly interface
- 🎯 Priority-based task organization
- 📈 Visual progress indicators and statistics

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Styling**: Custom CSS with CSS Variables, Gradients, and Animations
- **Fonts**: Google Fonts (Archivo & Crimson Pro)
- **Data Storage**: localStorage (Browser-based)
- **Architecture**: Single Page Application (SPA)

## Installation & Setup

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, or Edge)
- No server or database setup required!

### Quick Start

1. **Download the Files**
   - Download all three files: `index.html`, `styles.css`, and `app.js`
   - Keep them in the same folder

2. **Open the Application**
   - Double-click on `index.html` to open it in your default browser
   - Or right-click and select "Open with" to choose a specific browser

3. **First Time Setup**
   - Click "Register" to create a new account
   - Fill in your name, email, and password
   - Click "Create Account"

4. **Start Using**
   - You'll be automatically logged in after registration
   - The dashboard will show sample data to get you started
   - Start adding your own tasks, assignments, and events!

### Using a Local Server (Optional)

For better development experience, you can use a local server:

**Using Python:**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**Using Node.js:**
```bash
npx http-server -p 8000
```

Then visit: `http://localhost:8000`

## File Structure

```
academic-reminder/
│
├── index.html          # Main HTML structure
├── styles.css          # Complete styling and animations
├── app.js              # Application logic and functionality
└── README.md           # Documentation (this file)
```

## User Guide

### Authentication

**Registration:**
1. Click "Register" link on the login page
2. Enter your full name, email, and password
3. Confirm your password
4. Click "Create Account"

**Login:**
1. Enter your registered email and password
2. Click "Sign In"

**Logout:**
- Click the "Logout" button in the sidebar

### Dashboard

The dashboard provides a quick overview:
- **Urgent Tasks**: Tasks that need immediate attention
- **Upcoming Events**: Count of scheduled events
- **Completed Tasks**: Your progress tracker
- **Overall Progress**: Percentage of completed work

**Quick Actions:**
- Add Task
- New Assignment
- Schedule Exam
- Add Event

### Managing Tasks

**Adding a Task:**
1. Click "Tasks for Today" in the sidebar
2. Click "+ Add New Task"
3. Fill in the task details:
   - Title (required)
   - Description
   - Due Date & Time
   - Priority (Low/Medium/High/Urgent)
   - Category
   - Reminder time
4. Click "Save"

**Completing a Task:**
- Click the checkbox next to any task
- The task will be marked as completed

**Editing/Deleting:**
- Click the pencil icon to edit
- Click the trash icon to delete

### Managing Assignments

**Adding an Assignment:**
1. Navigate to "Assignments" page
2. Click "+ Add New Assignment"
3. Fill in assignment details
4. The status will default to "Pending"

**Status Options:**
- Pending: Not yet submitted
- Submitted: Turned in for grading
- Graded: Received feedback

### Scheduling Exams

**Adding an Exam:**
1. Go to "Examinations" page
2. Click "+ Schedule New Exam"
3. Enter exam details:
   - Title
   - Subject
   - Date & Time
   - Location
   - Duration

### Managing Projects

**Adding a Project:**
1. Visit "Project Deadlines" page
2. Click "+ Add New Project"
3. Set project details with deadline
4. Track progress with the progress bar

**Updating Progress:**
- Edit the project
- Update the progress percentage

### Calendar View

**Navigation:**
- Use arrow buttons to move between months
- Click on any date to see events for that day
- Dates with events are marked with a red dot

### Progress Tracking

View detailed statistics:
- Task completion rates
- Assignment submission status
- Upcoming exam count
- Active projects
- Performance by category

### Notifications

**Notification Panel:**
- Click the bell icon in the header
- View all recent notifications
- Clear all notifications with "Clear All" button

**Automatic Reminders:**
- Set reminder times when creating tasks
- Receive notifications before deadlines
- Urgent items are highlighted in red

### Search

Use the search bar in the header to quickly find:
- Tasks by title
- Assignments by name
- Projects by keyword
- Any reminder in the system

## Features in Detail

### Personalized Schedules
- Each user has their own isolated data
- Data is stored locally in the browser
- No interference between different users
- Automatic data loading on login

### Automated Notifications
- Set custom reminder times for each task
- Options: 15 min, 30 min, 1 hour, 1 day, 2 days, 1 week
- System checks every minute for due reminders
- Visual badge shows notification count

### Progress Tracking
- Real-time statistics on dashboard
- Category-wise performance breakdown
- Completion percentages
- Visual progress indicators

### Responsive Design
- Desktop-optimized layout
- Tablet-friendly interface
- Mobile-responsive design
- Touch-friendly controls

### Data Persistence
- All data saved automatically
- No manual save required
- Data persists across sessions
- Stored securely in browser

## Browser Compatibility

- ✅ Chrome (v90+)
- ✅ Firefox (v88+)
- ✅ Safari (v14+)
- ✅ Edge (v90+)
- ✅ Opera (v76+)

## Security Features

- Password-based authentication
- Client-side data encryption (localStorage)
- Session management
- Secure logout functionality

## Limitations

Since this is a client-side application:
- Data is stored in browser localStorage
- Clearing browser data will delete all information
- No cloud backup (data is local only)
- No cross-device synchronization
- No collaboration features

## Tips for Best Use

1. **Regular Backups**: Export your data periodically (browser settings)
2. **Set Reminders**: Always set reminders for important tasks
3. **Use Categories**: Organize tasks by subject/category
4. **Priority Tags**: Mark urgent items appropriately
5. **Check Dashboard Daily**: Start your day with the dashboard overview
6. **Update Progress**: Keep project progress percentages current
7. **Clear Completed**: Archive or delete old completed tasks

## Troubleshooting

**Can't login?**
- Make sure you're using the correct email and password
- Try creating a new account if you forgot credentials

**Data not saving?**
- Check if browser localStorage is enabled
- Make sure you're not in incognito/private mode
- Try a different browser

**Notifications not working?**
- Ensure you've set a reminder time when creating tasks
- Check that the current time hasn't passed the reminder time
- Refresh the page to restart the notification checker

**Page looks broken?**
- Hard refresh the page (Ctrl+F5 or Cmd+Shift+R)
- Clear browser cache
- Make sure all three files are in the same folder

## Future Enhancements (Roadmap)

- 📧 Email notifications
- ☁️ Cloud synchronization
- 🔄 Export/Import functionality
- 📱 Progressive Web App (PWA)
- 🤝 Collaboration features
- 📊 Advanced analytics
- 🎨 Theme customization
- 📎 File attachments
- 🔗 Integration with Google Calendar
- 🎯 Gamification features

## Development

### Customization

**Colors:**
Edit CSS variables in `styles.css`:
```css
:root {
    --primary: #2c3e50;
    --accent: #3498db;
    /* ... other variables */
}
```

**Fonts:**
Change font imports in `index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=YourFont" rel="stylesheet">
```

**Features:**
Add new functionality in `app.js`:
```javascript
function yourNewFeature() {
    // Your code here
}
```

## Credits

- **Design**: Custom modern academic theme
- **Icons**: Emoji-based icon system
- **Fonts**: Google Fonts (Archivo & Crimson Pro)
- **Inspiration**: Modern academic planning tools

## License

This project is free to use for educational purposes.

## Support

For questions or issues:
1. Check the troubleshooting section
2. Review the user guide
3. Inspect browser console for errors
4. Try with a fresh browser profile

## Version

**Current Version**: 1.0.0  
**Release Date**: February 2026  
**Status**: Production Ready

---

**Made with ❤️ for students everywhere**

Stay organized. Never miss a deadline. Excel in your academics! 🎓
