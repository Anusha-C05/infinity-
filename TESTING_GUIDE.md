# 🧪 Testing Guide - Role-Based Dashboard System

## Quick Test Scenarios

### Scenario 1: Admin Login Flow
```
Step 1: Open application → redirects to /login
Step 2: Enter email: admin@example.com, password: any
Step 3: Click Login
Expected Result:
  ✓ Authenticated
  ✓ Redirected to /admin
  ✓ Sidebar shows Admin items (Dashboard, Users, Profile, Reports, Appointments)
  ✓ Header shows welcome message with name
  ✓ Role indicator shows "Admin"
```

### Scenario 2: Doctor Login Flow
```
Step 1: Open /login
Step 2: Enter email: doctor@example.com, password: any
Step 3: Click Login
Expected Result:
  ✓ Authenticated
  ✓ Redirected to /doctor
  ✓ Sidebar shows Doctor items (Dashboard, Schedule, Patients, Appointments, Records, Profile)
  ✓ Header shows welcome message
  ✓ Role indicator shows "Doctor"
```

### Scenario 3: Patient Login Flow
```
Step 1: Open /login
Step 2: Enter email: patient@example.com, password: any
Step 3: Click Login
Expected Result:
  ✓ Authenticated
  ✓ Redirected to /patient
  ✓ Sidebar shows Patient items (Dashboard, Appointments, Book Appointment, Records, Profile)
  ✓ Header shows welcome message
  ✓ Role indicator shows "Patient"
```

---

## Authorization Tests

### Test 1: Role Isolation - Admin Cannot Access Doctor Routes
```
Step 1: Login as admin@example.com
Step 2: Manually navigate to /doctor in URL bar
Expected Result:
  ✓ Access denied
  ✓ Automatically redirected to /admin
  ✓ User stays authenticated
```

### Test 2: Role Isolation - Doctor Cannot Access Admin Routes
```
Step 1: Login as doctor@example.com
Step 2: Manually navigate to /admin in URL bar
Expected Result:
  ✓ Access denied
  ✓ Automatically redirected to /doctor
  ✓ User stays authenticated
```

### Test 3: Role Isolation - Patient Cannot Access Protected Routes
```
Step 1: Login as patient@example.com
Step 2: Try accessing /admin, /doctor in URL
Expected Result:
  ✓ Access denied to both
  ✓ Redirected to /patient each time
  ✓ User stays authenticated
```

### Test 4: Unauthenticated Access Blocked
```
Step 1: Logout (or open in incognito)
Step 2: Try accessing /admin, /doctor, /patient in URL
Expected Result:
  ✓ Access denied
  ✓ Redirected to /login
  ✓ Required to authenticate
```

---

## Navigation Tests

### Test 1: Admin Sidebar Navigation
```
Admin @ /admin:
  ✓ Dashboard link → /admin
  ✓ Users link → /admin/users
  ✓ Profile link → /admin/profile
  ✓ Reports link → /admin/reports
  ✓ Appointments link → /admin/appointments
  
Sidebar should NOT show:
  ✗ Schedule (doctor-only)
  ✗ Patients (doctor-only)
  ✗ Book Appointment (patient-only)
```

### Test 2: Doctor Sidebar Navigation
```
Doctor @ /doctor:
  ✓ Dashboard link → /doctor
  ✓ Schedule link → /doctor/schedule
  ✓ Patients link → /doctor/patients
  ✓ Appointments link → /doctor/appointments
  ✓ Records link → /doctor/records
  ✓ Profile link → /doctor/profile
  
Sidebar should NOT show:
  ✗ Users (admin-only)
  ✗ Reports (admin-only)
  ✗ Book Appointment (patient-only)
```

### Test 3: Patient Sidebar Navigation
```
Patient @ /patient:
  ✓ Dashboard link → /patient
  ✓ Appointments link → /patient/appointments
  ✓ Book Appointment link → /patient/appointments/book
  ✓ Records link → /patient/records
  ✓ Profile link → /patient/profile
  
Sidebar should NOT show:
  ✗ Users (admin-only)
  ✗ Reports (admin-only)
  ✗ Schedule (doctor-only)
  ✗ Patients (doctor-only)
```

### Test 4: Active Route Highlighting
```
When @ /admin:
  ✓ "Dashboard" is highlighted (blue/primary color)
  
Click "Users":
  ✓ Navigate to /admin/users
  ✓ "Users" is now highlighted
  ✓ "Dashboard" is no longer highlighted
  
Back button:
  ✓ Navigate back to /admin
  ✓ "Dashboard" is highlighted again
```

---

## Profile Tests

### Test 1: View Profile
```
Step 1: Login as any user
Step 2: Click avatar icon in header
Step 3: Select "Profile" from dropdown
Expected Result:
  ✓ Navigate to /{role}/profile
  ✓ Display user name, email, role
  ✓ Show phone number (if provided)
  ✓ Display role badge with color
  ✓ Show user ID
  ✓ Show join date
  ✓ "Edit Profile" button visible
```

### Test 2: Edit Profile
```
Step 1: On profile page, click "Edit Profile"
Step 2: Edit form fields (firstName, lastName, email, phone)
Step 3: Click "Save Changes"
Expected Result:
  ✓ Form becomes editable
  ✓ Buttons appear (Save, Cancel)
  ✓ Changes save successfully
  ✓ Toast notification: "Profile updated successfully"
  ✓ Profile returns to view mode
  ✓ Changes persist on refresh
```

### Test 3: Cancel Profile Edit
```
Step 1: On profile page, click "Edit Profile"
Step 2: Make changes to fields
Step 3: Click "Cancel"
Expected Result:
  ✓ Changes are discarded
  ✓ Original values remain
  ✓ Returns to view mode
  ✓ No toast notification
```

### Test 4: Profile Data Persistence
```
Step 1: Login as user
Step 2: Go to profile, edit details
Step 3: Save changes
Step 4: Refresh page (F5)
Expected Result:
  ✓ Updated profile data still displays
  ✓ Changes persist in localStorage
  ✓ Changes persist in backend (if API connected)
```

---

## Logout Tests

### Test 1: Logout from Header
```
Step 1: Login as any user
Step 2: Click avatar in header
Step 3: Click "Logout"
Expected Result:
  ✓ User state cleared
  ✓ Redirected to /login
  ✓ Cannot access /admin, /doctor, /patient
  ✓ localStorage is cleared
```

### Test 2: Session Cleanup
```
Step 1: Login as admin
Step 2: Open browser DevTools
Step 3: Check localStorage
  - Should contain: accessToken, user
Step 4: Click Logout
Step 5: Check localStorage again
  - accessToken should be gone ✓
  - user should be gone ✓
```

### Test 3: Prevent Re-access After Logout
```
Step 1: Login as doctor
Step 2: Go to /doctor/patients
Step 3: Click Logout
Step 4: Try to go back to /doctor/patients (back button or URL)
Expected Result:
  ✓ Cannot access protected route
  ✓ Redirected to /login
  ✓ Must login again to access
```

---

## Responsive Design Tests

### Test 1: Desktop View (1024px+)
```
✓ Sidebar always visible on left
✓ Content takes up remaining width
✓ Sidebar collapse button visible
✓ Mobile hamburger menu NOT visible
✓ All navigation items visible
✓ Full-width content area
```

### Test 2: Tablet View (768px - 1024px)
```
✓ Sidebar visible by default
✓ Sidebar collapse button functional
✓ When collapsed: only icons visible
✓ When expanded: full sidebar shows
✓ Navigation responsive
✓ Content adapts to available space
```

### Test 3: Mobile View (< 768px)
```
✓ Sidebar hidden by default
✓ Hamburger menu visible in header
✓ Click hamburger: sidebar slides in from left
✓ Click outside sidebar: closes it
✓ Content takes full width
✓ All buttons/links touch-friendly (44px minimum)
✓ No horizontal scrolling needed
```

### Test 4: Responsive Typography
```
On all screen sizes:
✓ Text is readable (not too small)
✓ Headers are appropriately sized
✓ No text cutoff or overflow
✓ Line length reasonable (< 100 chars)
✓ Button text is clear
```

---

## Performance Tests

### Test 1: Page Load Speed
```
✓ Login page loads < 2 seconds
✓ Dashboard loads < 3 seconds
✓ Profile page loads < 2 seconds
✓ Navigation between pages is smooth
✓ No loading lag on route changes
```

### Test 2: Sidebar Collapse Animation
```
✓ Collapse animation is smooth (< 300ms)
✓ Content shift is animated
✓ No janky transitions
✓ Icons properly aligned during animation
```

### Test 3: Form Submission
```
✓ Profile save completes < 1 second
✓ No double-submission with multiple clicks
✓ Loading indicator appears during save
✓ Toast notification appears immediately
```

---

## Edge Cases & Error Handling

### Test 1: Network Error During Login
```
Scenario: Backend temporarily unavailable
Expected:
✓ Error message displayed
✓ User can retry login
✓ No broken state
✓ Session not created
```

### Test 2: Invalid Credentials
```
Scenario: Wrong password entered
Expected:
✓ Error message shown
✓ User not authenticated
✓ Remains on login page
```

### Test 3: Token Expiration
```
Scenario: User's session token expires
Expected:
✓ Next action shows error
✓ User redirected to login
✓ Must re-authenticate
✓ No data loss
```

### Test 4: Inactivity Timeout
```
Scenario: User inactive for 30+ minutes
Expected:
✓ Automatic logout
✓ Redirect to login
✓ Session cleared
✓ Notification (optional)
```

---

## Cross-Browser Testing

Test all scenarios in:
- ✓ Chrome/Chromium (latest)
- ✓ Firefox (latest)
- ✓ Safari (latest)
- ✓ Edge (latest)

Verify:
- ✓ All links work
- ✓ Forms function correctly
- ✓ Styling renders consistently
- ✓ Animations are smooth
- ✓ No console errors

---

## Security Tests

### Test 1: No Role Leakage
```
As admin:
  ✓ Cannot see doctor navigation items
  ✓ Cannot see patient pages
  ✓ Cannot access via URL
  ✓ Backend validation still required

As doctor:
  ✓ Cannot see admin items
  ✓ Cannot see patient features
  ✓ Cannot bypass authorization

As patient:
  ✓ Cannot see admin/doctor items
  ✓ Limited to patient features
```

### Test 2: localStorage Security
```
When logged in:
  ✓ accessToken stored (should be httpOnly in production)
  ✓ user object stored
  
When logout:
  ✓ accessToken removed
  ✓ user removed
  ✓ No sensitive data remains
```

### Test 3: URL Direct Access Prevention
```
Without authentication:
  ✓ /admin forbidden
  ✓ /doctor forbidden
  ✓ /patient forbidden
  ✓ All redirect to /login

With wrong role:
  ✓ /admin forbidden to doctor
  ✓ /doctor forbidden to patient
  ✓ All redirect to correct role dashboard
```

---

## Testing Checklist

Before deployment, verify:

```
□ All three roles can login
□ Role-based redirects work
□ Protected routes block unauthorized access
□ Sidebar shows role-appropriate items
□ Navigation items work correctly
□ Active route highlighting works
□ Profile displays user data
□ Profile edit functionality works
□ Profile changes persist
□ Logout clears session
□ Logout prevents re-access
□ Mobile responsive design works
□ Desktop sidebar collapse works
□ Header shows user info
□ Role badges display correctly
□ Animations are smooth
□ No console errors
□ Cross-browser compatibility
□ Performance acceptable
□ Error handling graceful
□ Security checks pass
```

---

## Automation Testing (Optional)

### Sample Playwright Test
```typescript
import { test, expect } from '@playwright/test';

test('Admin login flow', async ({ page }) => {
  // Navigate to login
  await page.goto('http://localhost:5173/login');
  
  // Fill credentials
  await page.fill('input[type="email"]', 'admin@example.com');
  await page.fill('input[type="password"]', 'password123');
  
  // Submit
  await page.click('button[type="submit"]');
  
  // Wait for redirect
  await page.waitForURL('**/admin');
  
  // Verify sidebar items
  await expect(page.locator('a[href="/admin"]')).toBeVisible();
  await expect(page.locator('a[href="/admin/users"]')).toBeVisible();
  
  // Verify header
  await expect(page.locator('text=Welcome back')).toBeVisible();
});
```

---

## Manual Testing Tips

1. **Use Multiple Windows**: Keep login page in one window while testing in another
2. **Clear Cache**: Use DevTools to clear cache between tests
3. **Use Different Emails**: admin@, doctor@, patient@ patterns
4. **Check Console**: Monitor for errors in DevTools console
5. **Test Mobile**: Use Chrome DevTools device emulation
6. **Test Slow Networks**: Use Chrome DevTools network throttling
7. **Test Offline**: Simulate offline mode to test error handling

---

**Last Updated**: January 14, 2026  
**Status**: Ready for Testing ✅
