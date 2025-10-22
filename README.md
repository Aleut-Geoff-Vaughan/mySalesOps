# Sales Opportunity Tracker

A comprehensive React-based sales opportunity management system designed for government contracting and business development teams.

## Features

### 🎯 Core Functionality
- **Opportunity Management**: Track sales opportunities with detailed information across multiple categories
- **Agency Management**: Organize government agencies with hierarchical structure (parent/child relationships)
- **Contact Management**: Maintain detailed contact information linked to agencies
- **Pipeline Analytics**: Real-time dashboard showing total pipeline, weighted pipeline, active deals, and closed won deals

### 🔐 User Management & Permissions
- **Role-Based Access Control**:
  - **Admin**: Full access to all features including configuration
  - **Sales**: Create, edit, and delete opportunities, agencies, and contacts
  - **Viewer**: Read-only access to all data
- **User Authentication**: Simple login system with username/password

### 📋 Comprehensive Opportunity Tracking
The opportunity form includes 11 collapsible sections covering:

1. **Basic Information**
   - Opportunity name, agency, primary contact
   - Stage, status, priority
   - Description

2. **Financial Information**
   - Amount, Total Contract Value (TCV)
   - Expected revenue, winning price
   - Target GM % and OI %
   - Probability, P-Go %, forecast category
   - Forecast inclusion flag

3. **Key Dates**
   - Expected close date, project start date
   - Planned/actual RFP release dates
   - Planned/actual proposal submission dates

4. **Contract Information**
   - Contract type (FFP, T&M, Cost Plus, IDIQ)
   - Solicitation number
   - Acquisition type (Full and Open, Set Aside, Sole Source)
   - Duration, place of performance
   - Direct award flag

5. **Competitive Information**
   - Incumbent details (name, contract number, dates)
   - DB competitor, winning competitor

6. **Assessment & Scoring**
   - Competitive positioning (Strong/Medium/Weak)
   - Client intent to buy (High/Medium/Low)
   - Customer insight (Excellent/Good/Fair/Poor)
   - Relationships (Strong/Moderate/Weak)
   - Notes for each assessment

7. **Teaming & Personnel**
   - Teaming strategy (Prime, Subcontractor, Joint Venture, Teaming Partner)
   - Key personnel
   - Proposal manager selection

8. **Business Classification**
   - Primary business line
   - Primary NAICS code
   - Portfolio, revenue stream
   - Solution and solution details

9. **Proposal Information**
   - Proposal tech volume assessment
   - Proposal pricing assessment
   - Orals/site visit requirements
   - Proposal comments
   - Response folder URL

10. **Project Codes & References**
    - B&P code
    - CostPoint project code
    - GovWin ID
    - Legacy ID
    - Opportunity link

11. **Status & Flags**
    - Budget confirmed
    - Discovery completed
    - ROI analysis completed
    - Front door flag
    - Loss/no-bid reason
    - Customer feedback/debrief
    - General notes

### ⚙️ Configuration (Admin Only)
- **Sales Stages**: Customize pipeline stages with ordering and active/inactive status
- **Agency Types**: Define custom agency types (Federal, State, County, Municipal, etc.)
- **User Management**: Create and manage user accounts with role assignments

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Modern web browser

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/sales-opportunity-tracker.git
cd sales-opportunity-tracker
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Install required packages:
```bash
npm install lucide-react
```

4. Start the development server:
```bash
npm start
# or
yarn start
```

5. Open your browser and navigate to `http://localhost:3000`

### Demo Credentials

The application comes with three demo accounts:

- **Admin Account**: 
  - Username: `admin`
  - Password: `password123`
  - Full access to all features including configuration

- **Sales Account**:
  - Username: `sales`
  - Password: `sales123`
  - Can create, edit, and delete opportunities, agencies, and contacts

- **Viewer Account**:
  - Username: `viewer`
  - Password: `viewer123`
  - Read-only access to all data

## Usage

### Creating an Opportunity

1. Log in with an admin or sales account
2. Navigate to the "Opportunities" tab
3. Click "Add Opportunity"
4. Fill in the required fields (marked with *)
5. Expand additional sections to add more details
6. Click "Create Opportunity"

### Managing Agencies

1. Navigate to the "Agencies" tab
2. Click "Add Agency" to create a new agency
3. Select a parent agency if creating a sub-agency (e.g., regional office)
4. Fill in agency details and save

### Managing Contacts

1. Navigate to the "Contacts" tab
2. Click "Add Contact"
3. Select the associated agency
4. Fill in contact information
5. Mark as primary contact if applicable

### Configuration (Admin Only)

1. Log in with an admin account
2. Navigate to the "Configuration" tab
3. Manage:
   - Sales Stages: Add, edit, or deactivate pipeline stages
   - Agency Types: Add or edit agency type categories
   - Users: Create new users and manage existing accounts

## Architecture

### Components

- **SalesTracker**: Main application component with authentication and routing
- **OpportunityFormEnhanced**: Comprehensive form component with collapsible sections
- **Section**: Reusable collapsible section component

### State Management

The application uses React's `useState` hooks for state management with the following key state objects:

- `users`: User accounts and authentication
- `opportunities`: Sales opportunity records
- `agencies`: Agency records with hierarchical structure
- `contacts`: Contact records linked to agencies
- `stages`: Customizable sales pipeline stages
- `agencyTypes`: Customizable agency categories

### Data Structure

#### Opportunity Object
```javascript
{
  id: number,
  opportunity_name: string,
  agency_id: number,
  primary_contact_id: number,
  value: number,
  stage: string,
  probability: number,
  close_date: string,
  // ... 50+ additional fields
}
```

#### Agency Object
```javascript
{
  id: number,
  name: string,
  parentId: number | null,
  agencyType: string,
  address: string,
  city: string,
  state: string,
  zip: string,
  phone: string,
  website: string,
  notes: string
}
```

#### Contact Object
```javascript
{
  id: number,
  agencyId: number,
  firstName: string,
  lastName: string,
  title: string,
  email: string,
  phone: string,
  mobile: string,
  isPrimary: boolean,
  notes: string
}
```

## Customization

### Adding Custom Fields

To add custom fields to opportunities:

1. Update the `formData` initialization in the `openForm` function
2. Add the field to the appropriate `Section` in the `OpportunityFormEnhanced` component
3. Ensure the field is saved in the `handleSubmit` function

### Styling

The application uses Tailwind CSS for styling. You can customize:

- Color schemes by modifying the color classes (e.g., `indigo-600`, `blue-100`)
- Component spacing and sizing
- Border styles and shadows

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Known Limitations

- Data is stored in browser memory (resets on page refresh)
- No backend integration (can be added)
- No data persistence (local storage or database can be implemented)
- No export functionality (can be added)

## Future Enhancements

Potential improvements for future versions:

- [ ] Backend API integration (Node.js/Express, Python/Django, etc.)
- [ ] Database persistence (PostgreSQL, MongoDB, etc.)
- [ ] Data export (Excel, CSV, PDF)
- [ ] Advanced filtering and search
- [ ] Data visualization and reporting
- [ ] Email notifications
- [ ] Document attachment support
- [ ] Activity timeline/audit log
- [ ] Calendar integration
- [ ] Mobile responsive design improvements
- [ ] Dark mode

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with React
- Icons by [Lucide React](https://lucide.dev/)
- Styled with Tailwind CSS

## Support

For issues, questions, or contributions, please open an issue on GitHub.

---

**Note**: This is a demonstration application. For production use, implement proper security measures, backend authentication, data validation, and persistent storage.
