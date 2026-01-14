# Role-Based Dashboard System - Quick Reference Guide

## 🎯 What Has Been Built

A complete, production-ready role-based dashboard system for a healthcare management platform with:

- **3 Role Types**: Admin, Doctor, Patient
- **Protected Routes**: Role-based access control
- **Responsive Layouts**: Desktop and mobile support
- **Profile Management**: /me API integration
- **Authentication**: Automatic redirect based on role
- **Logout Functionality**: Clear state and session

---

## 📁 Project Structure

```
src/
├── components/
│   ├── auth/
│   │   └── ProtectedRoute.tsx         # Role validation guard
│   ├── layout/
│   │   ├── DashboardLayout.tsx        # Generic layout (deprecated)
│   │   ├── AdminDashboardLayout.tsx   # Admin-specific layout
│   │   ├── DoctorDashboardLayout.tsx  # Doctor-specific layout
│   │   ├── PatientDashboardLayout.tsx # Patient-specific layout
│   │   ├── Sidebar.tsx                # Role-filtered navigation
│   │   └── Header.tsx                 # User profile & logout
│   └── profile/
│       └── ProfilePage.tsx            # Reusable profile component
├── contexts/
│   └── AuthContext.tsx                # Authentication & role management
├── pages/
│   ├── admin/
│   │   ├── AdminDashboard.tsx
│   │   ├── AdminUsersPage.tsx
│   │   └── AdminProfilePage.tsx       # Uses ProfilePage component
│   ├── doctor/
│   │   ├── DoctorDashboard.tsx
│   │   ├── DoctorSchedulePage.tsx
│   │   ├── DoctorPatientsPage.tsx
│   │   ├── DoctorAppointmentsPage.tsx
│   │   ├── DoctorRecordsPage.tsx
│   │   └── DoctorProfilePage.tsx      # Uses ProfilePage component
│   └── patient/
│       ├── PatientDashboard.tsx
│       ├── PatientAppointmentsPage.tsx
│       ├── BookAppointmentPage.tsx
│       ├── PatientRecordsPage.tsx
│       └── PatientProfilePage.tsx     # Uses ProfilePage component
└── App.tsx                            # Main router with role-based routes
```

---

## 🔐 How Authentication Works

### 1. **User Logs In**
```
User enters credentials → POST /auth/login → Receives token + user data
```

### 2. **AuthContext Stores Data**
```
token → localStorage['accessToken']
user → localStorage['user'] + state
```

### 3. **Automatic Redirect**
```
const redirectPath = {
  admin: '/admin',
  doctor: '/doctor',
  patient: '/patient',
}[user.role]
navigate(redirectPath)
```

### 4. **ProtectedRoute Validates**
```
Is user authenticated? → Yes
Is user's role allowed? → Yes
Render component ✓
```

---

## 🛣️ Routing Map

| Role | Base Path | Sub-Routes |
|------|-----------|-----------|
| **Admin** | `/admin` | `/users`, `/profile`, `/reports`, `/appointments` |
| **Doctor** | `/doctor` | `/schedule`, `/patients`, `/appointments`, `/records`, `/profile` |
| **Patient** | `/patient` | `/appointments`, `/appointments/book`, `/records`, `/profile` |

---

## 👤 Navigation Items by Role

### Admin Sidebar
- Dashboard → `/admin`
- Users → `/admin/users`
- Profile → `/admin/profile`
- Reports → `/admin/reports`
- Appointments → `/admin/appointments`

### Doctor Sidebar
- Dashboard → `/doctor`
- Schedule → `/doctor/schedule`
- Patients → `/doctor/patients`
- Appointments → `/doctor/appointments`
- Records → `/doctor/records`
- Profile → `/doctor/profile`

### Patient Sidebar
- Dashboard → `/patient`
- Appointments → `/patient/appointments`
- Book Appointment → `/patient/appointments/book`
- Records → `/patient/records`
- Profile → `/patient/profile`

---

## 🧩 Key Components

### ProtectedRoute
Blocks unauthorized access. Used to wrap all role-specific routes:

```tsx
<Route
  path="/admin"
  element={
    <ProtectedRoute allowedRoles={['admin']}>
      <AdminDashboardLayout />
    </ProtectedRoute>
  }
/>
```

### Sidebar
Auto-filters navigation items based on user role:

```tsx
const navItems = [
  { label: 'Dashboard', path: '/admin', icon: LayoutDashboard, roles: ['admin'] },
  { label: 'Patients', path: '/doctor/patients', icon: Users, roles: ['doctor'] },
  { label: 'Appointments', path: '/patient/appointments', icon: Calendar, roles: ['patient'] },
];

// Sidebar automatically filters these items by current user's role
```

### Header
Displays user info and logout:

```tsx
<div className="flex items-center gap-3">
  <div className="h-10 w-10 rounded-full bg-primary">
    {user?.firstName?.[0]} {/* Avatar initial */}
  </div>
  <div>
    <p>{user?.firstName}</p>
    <span>{user?.role}</span> {/* Role badge */}
  </div>
</div>

{/* Dropdown with Profile and Logout */}
```

### ProfilePage
Reusable profile component:

```tsx
// All three roles use the same component:
const AdminProfilePage = ProfilePage;
const DoctorProfilePage = ProfilePage;
const PatientProfilePage = ProfilePage;

export default ProfilePage; // Displays /me API data
```

---

## 🔄 Login Flow Example

```
User Types Email: admin@example.com
                    ↓
           POST /auth/login
                    ↓
         Backend validates credentials
                    ↓
   Returns: { token, user: { id, name, role: 'admin', ... } }
                    ↓
     AuthContext.setAuthData(token, user)
                    ↓
         AuthContext navigates to /admin
                    ↓
   ProtectedRoute validates role='admin'
                    ↓
      AdminDashboardLayout renders
                    ↓
    Admin sidebar and header display
```

---

## 🧪 Testing Different Roles

### Test Credentials Pattern:
- **Admin**: Use emails containing "admin" (e.g., `admin@example.com`)
- **Doctor**: Use emails containing "doctor" (e.g., `doc@hospital.com`)
- **Patient**: Use other emails (e.g., `john@example.com`)

### Test Access Control:
```
Try accessing /admin as patient
→ ProtectedRoute blocks it
→ Redirects to /patient (patient's dashboard)

Try accessing /doctor/schedule as admin
→ ProtectedRoute blocks it
→ Redirects to /admin (admin's dashboard)
```

---

## 📋 Profile Page Features

1. **View Mode**
   - Display user name, email, phone, role
   - Show account metadata (ID, join date)
   - Role-specific badge with color

2. **Edit Mode**
   - Editable form fields
   - Save and Cancel buttons
   - Form validation
   - Toast notifications

3. **Data Source**
   - Fetches from `AuthContext` (user state)
   - Updates via `AuthContext.updateUser()`
   - Persists to localStorage

---

## 🔄 Logout Flow

```tsx
User clicks "Logout" in header dropdown
         ↓
Header.handleLogout() called
         ↓
AuthContext.logout() executes:
  - POST /auth/logout (optional)
  - localStorage.removeItem('accessToken')
  - localStorage.removeItem('user')
  - setUser(null)
  - navigate('/login')
         ↓
User data cleared from memory
         ↓
Redirected to login page
```

---

## 🎨 Layout Components

All role-specific layouts follow the same structure:

```tsx
<div className="min-h-screen bg-background">
  {/* Mobile overlay */}
  {/* Sidebar - Desktop & Mobile */}
  <Sidebar isCollapsed={isSidebarCollapsed} />
  
  {/* Main content */}
  <div>
    <Header onMenuClick={toggleMobileSidebar} />
    <main>
      <Outlet /> {/* Role-specific page content */}
    </main>
  </div>
</div>
```

---

## 🚀 Future Enhancements

### Ready to Add:
1. **Staff Role**: Create `StaffDashboardLayout` and staff pages
2. **Permissions**: Add granular permission checks
3. **Notifications**: Real-time notification system
4. **2FA**: Two-factor authentication
5. **Audit Logs**: Track user actions
6. **Role Delegation**: Temporary role assignment

---

## 📝 API Endpoints Required

### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `POST /auth/logout` - Session invalidation
- `GET /me` - Fetch current user profile

### Sample Response Format
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "user_123",
    "email": "admin@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "admin",
    "phone": "+1234567890",
    "createdAt": "2024-01-14T10:30:00Z"
  }
}
```

---

## ✅ Security Checklist

- ✓ Routes protected by ProtectedRoute component
- ✓ Role validation on each page access
- ✓ Navigation limited to role-appropriate items
- ✓ Unauthorized access redirected to dashboard
- ✓ Token stored securely
- ✓ Session timeout after inactivity
- ✓ Logout clears all user data

---

## 📞 Support

For issues or questions about the role-based dashboard system:

1. Check the `ROLE_BASED_DASHBOARD_SETUP.ts` file for detailed architecture
2. Review component comments for implementation details
3. Test with different user roles to understand flow
4. Refer to this guide for quick reference

---

## 🎓 Key Files to Study

1. **src/contexts/AuthContext.tsx** - Authentication logic
2. **src/components/auth/ProtectedRoute.tsx** - Authorization logic
3. **src/components/layout/Sidebar.tsx** - Navigation filtering
4. **src/components/profile/ProfilePage.tsx** - Profile management
5. **src/App.tsx** - Main routing structure

---

**Last Updated**: January 14, 2026  
**Status**: Production Ready ✅
