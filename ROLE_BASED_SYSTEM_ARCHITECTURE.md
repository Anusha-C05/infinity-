# Role-Based Healthcare Management System Architecture

## System Overview

This document outlines the complete architecture for a production-ready, role-based healthcare management system with Admin, Doctor, Staff, and Patient roles.

---

## 1. Authentication & Authorization Layer

### User Roles
- **Admin**: Full system access, user management, reporting
- **Doctor**: Patient management, appointments, medical records
- **Staff**: Support operations, patient coordination
- **Patient**: Self-service, appointment booking, medical records viewing

### Authentication Flow
```
User Login → Generate Persistent User ID → Store Token + User Data → 
Navigate to Role Dashboard → ProtectedRoute Validates Access
```

### Token Management
- Tokens stored in localStorage with expiration (30 mins)
- User ID format: `user_${email_sanitized}` (ensures persistence across sessions)
- Session recovery on page refresh via `AuthContext.checkAuth()`

---

## 2. Routing Architecture

### Protected Route Structure
```
/login                          → Public
/signup                         → Public
/register                       → Public

/admin                          → ProtectedRoute (role: admin)
  ├── /admin/users             → AdminUsersPage
  ├── /admin/profile           → AdminProfilePage
  ├── /admin/reports           → AdminDashboard (Reports view)
  ├── /admin/appointments      → AdminDashboard (Appointments view)

/doctor                         → ProtectedRoute (role: doctor)
  ├── /doctor/schedule         → DoctorSchedulePage
  ├── /doctor/patients         → DoctorPatientsPage
  ├── /doctor/appointments     → DoctorAppointmentsPage
  ├── /doctor/records          → DoctorRecordsPage
  ├── /doctor/profile          → DoctorProfilePage

/staff                          → ProtectedRoute (role: staff)
  ├── /staff/dashboard         → StaffDashboard
  ├── /staff/profile           → StaffProfilePage
  ├── /staff/support           → StaffSupportPage
  ├── /staff/queue             → PatientQueuePage

/patient                        → ProtectedRoute (role: patient)
  ├── /patient/appointments    → PatientAppointmentsPage
  ├── /patient/appointments/book → BookAppointmentPage
  ├── /patient/records         → PatientRecordsPage
  ├── /patient/profile         → PatientProfilePage
```

---

## 3. Layout Architecture

### DashboardLayout Wrapper
- **Location**: `src/components/layout/DashboardLayout.tsx`
- **Purpose**: Wraps all role-specific layouts with common structure
- **Contains**: Header + Sidebar + Outlet

### Role-Specific Layouts
1. **AdminDashboardLayout** - Administrative dashboard structure
2. **DoctorDashboardLayout** - Clinical dashboard structure
3. **StaffDashboardLayout** - Staff operations dashboard
4. **PatientDashboardLayout** - Patient self-service dashboard

Each includes:
- **Sidebar**: Role-specific navigation items
- **Header**: User info, notifications, settings
- **Outlet**: Dynamic page content

---

## 4. Navigation Components

### Sidebar Features
- **Active Route Highlighting**: Indicates current page
- **Role-Filtered Items**: Only shows accessible menu items
- **Collapsible Design**: Toggle sidebar width (optional)
- **Breadcrumb Support**: Shows navigation path

### Navigation Items by Role

#### Admin Sidebar
- Dashboard
- User Management
- Appointments
- Reports
- Settings
- Profile

#### Doctor Sidebar
- Dashboard
- Schedule
- Patients
- Appointments
- Medical Records
- Profile

#### Staff Sidebar
- Dashboard
- Queue
- Appointments
- Support Tickets
- Profile

#### Patient Sidebar
- Dashboard
- Appointments
- Book Appointment
- Medical Records
- Profile

---

## 5. Profile & User Management

### Profile Page Features
- **View Mode**: Display user information (name, role, email, department)
- **Edit Mode**: Update personal/professional information
- **LocalStorage Persistence**: Data survives logout/login cycles
- **localStorage Key Format**: `${role}_profile_${userId}`

### Logout Flow
1. User clicks Logout
2. Clear localStorage (token, user, profile data)
3. Reset AuthContext state
4. Redirect to /login page
5. Show success toast notification

### User Data Persistence
- **First Login**: Create consistent user ID based on email
- **Store Mapping**: Track email → ID mapping in localStorage
- **Session Recovery**: Restore user data on browser refresh

---

## 6. Data Flow Architecture

### Context Providers (Wrapper Order)
```tsx
<QueryClientProvider>
  <TooltipProvider>
    <BrowserRouter>
      <AuthProvider>           // Authentication state
        <AppointmentProvider>  // Appointment data
          <Routes />           // Application routes
        </AppointmentProvider>
      </AuthProvider>
    </BrowserRouter>
  </TooltipProvider>
</QueryClientProvider>
```

### State Management
- **AuthContext**: User authentication, login/logout, role validation
- **AppointmentContext**: Appointment data, mock doctors
- **QueryClient**: API queries, caching, synchronization

---

## 7. API Integration Points

### Current Mock Implementation
All endpoints currently have frontend-only fallbacks:
- `/auth/login` → Generate user with persistent ID
- `/auth/register` → Create user account
- `/me` → Return current authenticated user
- `/auth/logout` → Clear authentication

### Production Migration Path
1. Remove try/catch fallbacks in services
2. Connect to real backend endpoints
3. Update error handling for real API failures
4. Add request/response interceptors for logging

---

## 8. Error Handling & Edge Cases

### Protected Route Edge Cases
- **No Authentication**: Redirect to /login
- **Invalid Role**: Redirect to user's own dashboard
- **Expired Token**: Trigger logout, redirect to /login
- **Page Not Found**: Show 404 page

### Profile Loading Edge Cases
- **First Time Setup**: Show empty form with prompt to fill details
- **Corrupted localStorage**: Fallback to empty state
- **API Failure**: Use localStorage, show offline indicator
- **Multiple Tabs**: Sync state via storage events

---

## 9. Security Considerations

### Authentication Security
- ✅ Token expiration (30 minutes)
- ✅ Role-based access control (RBAC)
- ✅ Protected route validation
- ✅ Persistent user ID (prevents ID regeneration attacks)

### Data Security
- ✅ localStorage used for client-side data
- ✅ Sensitive data not stored in localStorage
- ✅ HTTPS enforced in production
- ✅ Token validation on every request

---

## 10. Folder Structure

```
src/
├── components/
│   ├── auth/
│   │   └── ProtectedRoute.tsx
│   ├── layout/
│   │   ├── DashboardLayout.tsx
│   │   ├── AdminDashboardLayout.tsx
│   │   ├── DoctorDashboardLayout.tsx
│   │   ├── StaffDashboardLayout.tsx
│   │   ├── PatientDashboardLayout.tsx
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   └── NavLink.tsx
│   ├── forms/
│   │   ├── PatientDetailsForm.tsx
│   │   └── FileUpload.tsx
│   ├── appointments/
│   │   └── DoctorCard.tsx
│   └── ui/
│       └── (shadcn components)
├── contexts/
│   ├── AuthContext.tsx
│   └── AppointmentContext.tsx
├── pages/
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   ├── SignupPage.tsx
│   ├── admin/
│   │   ├── AdminDashboard.tsx
│   │   ├── AdminUsersPage.tsx
│   │   └── AdminProfilePage.tsx
│   ├── doctor/
│   │   ├── DoctorDashboard.tsx
│   │   ├── DoctorSchedulePage.tsx
│   │   ├── DoctorPatientsPage.tsx
│   │   ├── DoctorAppointmentsPage.tsx
│   │   ├── DoctorRecordsPage.tsx
│   │   └── DoctorProfilePage.tsx
│   ├── staff/
│   │   ├── StaffDashboard.tsx
│   │   ├── StaffProfilePage.tsx
│   │   ├── StaffSupportPage.tsx
│   │   └── PatientQueuePage.tsx
│   └── patient/
│       ├── PatientDashboard.tsx
│       ├── PatientAppointmentsPage.tsx
│       ├── BookAppointmentPage.tsx
│       ├── PatientRecordsPage.tsx
│       └── PatientProfilePage.tsx
├── services/
│   ├── authService.ts
│   ├── userService.ts
│   └── appointmentService.ts
├── lib/
│   ├── api.ts
│   └── utils.ts
├── types/
│   └── index.ts
└── App.tsx
```

---

## 11. Next Steps & Expansion

### Completed ✅
- Authentication & role-based routing
- Dashboard layouts for 3 roles
- Protected route component
- Profile pages with localStorage persistence
- User ID persistence across sessions

### In Progress 🔄
- Staff role implementation (DashboardLayout + pages)
- Advanced notifications system
- Real-time appointment updates

### Planned 📋
- Backend API integration
- Advanced analytics & reporting
- Patient queue management
- Prescription management
- Telemedicine integration

---

## 12. Testing Checklist

- [ ] Login with different roles (admin, doctor, staff, patient)
- [ ] Verify role-based dashboard redirect
- [ ] Test protected route access with wrong role
- [ ] Logout and verify data persistence
- [ ] Update profile and verify localStorage persistence
- [ ] Test logout/login cycle
- [ ] Verify sidebar navigation highlighting
- [ ] Test sidebar collapse/expand
- [ ] Test all navigation links
- [ ] Verify error handling for failed API calls
- [ ] Test with expired token
- [ ] Cross-browser compatibility

---

## 13. Environment Setup

### Development
- Node.js 16+
- npm/bun package manager
- Vite development server
- Hot module replacement (HMR)

### Dependencies
- React 18
- React Router 6
- Tailwind CSS
- shadcn/ui
- Lucide React (icons)
- Sonner (toasts)
- React Hook Form
- Zod (validation)
- Axios (HTTP client)

### Start Development
```bash
npm run dev
# App runs at http://localhost:8080/
```

---

## 14. Production Deployment

### Build & Deploy
```bash
npm run build
# Output: dist/

# Deploy to:
- Vercel
- Netlify
- Traditional hosting (Apache/Nginx)
```

### Environment Variables (Production)
```
VITE_API_BASE_URL=https://api.example.com
VITE_APP_NAME=Infinity Health Portal
VITE_TOKEN_EXPIRY=1800000
```

---

Generated: 2026-01-14
Last Updated: 2026-01-14
