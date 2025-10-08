# Supabase to Firebase Migration Guide

This guide will help you migrate your Stravex website from Supabase to Firebase.

## Prerequisites

1. **Firebase Project Setup**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project or use an existing one
   - Enable Firestore Database
   - Get your Firebase configuration

2. **Firebase CLI Installation**
   ```bash
   npm install -g firebase-tools
   firebase login
   ```

## Step 1: Environment Configuration

1. Copy the environment template:
   ```bash
   cp env.example .env
   ```

2. Update `.env` with your Firebase configuration:
   ```env
   # Firebase Configuration
   VITE_FIREBASE_API_KEY=your_firebase_api_key_here
   VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id_here
   VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
   VITE_FIREBASE_APP_ID=your_app_id_here
   ```

3. Keep your Supabase credentials for migration:
   ```env
   # Supabase Configuration (for migration)
   VITE_SUPABASE_URL=your_supabase_url_here
   VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key_here
   ```

## Step 2: Firestore Security Rules

Set up Firestore security rules in the Firebase Console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow anyone to create contact submissions
    match /contact_submissions/{document} {
      allow create: if true;
      allow read, update, delete: if true; // Adjust based on your needs
    }
  }
}
```

## Step 3: Data Migration

Run the migration script to transfer your existing data:

```bash
npm run migrate:supabase-to-firebase
```

This will:
- Fetch all contact submissions from Supabase
- Transfer them to Firebase Firestore
- Preserve timestamps and add migration metadata

## Step 4: Test the Migration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Test the contact form:
   - Submit a new contact form
   - Check Firebase Console to verify data is being saved

3. Test the admin panel:
   - View existing submissions
   - Delete a submission
   - Verify operations work correctly

## Step 5: Clean Up (Optional)

After successful migration and testing:

1. Remove Supabase dependencies:
   ```bash
   npm uninstall @supabase/supabase-js
   ```

2. Delete Supabase integration files:
   ```bash
   rm -rf src/integrations/supabase/
   rm -rf supabase/
   ```

3. Remove migration files:
   ```bash
   rm migrate-to-firebase.js
   rm env.example
   ```

## Firebase vs Supabase Differences

### Database Structure
- **Supabase**: PostgreSQL with tables, rows, columns
- **Firebase**: NoSQL document database with collections and documents

### Data Types
- **Supabase**: Structured data with defined schemas
- **Firebase**: Flexible document structure with nested objects

### Queries
- **Supabase**: SQL-like queries with `.from()`, `.select()`, `.where()`
- **Firebase**: Document-based queries with `.collection()`, `.doc()`, `.where()`

### Real-time Features
- **Supabase**: Built-in real-time subscriptions
- **Firebase**: Real-time listeners with `.onSnapshot()`

## Troubleshooting

### Common Issues

1. **Firebase Config Error**
   - Ensure all environment variables are set correctly
   - Check Firebase project settings

2. **Permission Denied**
   - Verify Firestore security rules
   - Check if Firestore is enabled in Firebase Console

3. **Migration Fails**
   - Verify Supabase credentials are correct
   - Check network connectivity
   - Review error logs in console

### Getting Help

- Check Firebase documentation: https://firebase.google.com/docs
- Review Firestore security rules: https://firebase.google.com/docs/firestore/security/get-started
- Contact support if issues persist

## Next Steps

After successful migration:

1. **Monitor Performance**: Check Firebase Console for usage metrics
2. **Set Up Backups**: Configure Firestore backups
3. **Optimize Queries**: Review and optimize database queries
4. **Security Review**: Audit security rules and access patterns
5. **Documentation**: Update team documentation with new Firebase setup

## Rollback Plan

If you need to rollback to Supabase:

1. Keep Supabase credentials in environment variables
2. Revert code changes to use Supabase client
3. Reinstall Supabase dependencies
4. Test functionality before removing Firebase setup

---

**Note**: This migration preserves all existing data and maintains the same functionality. The main difference is the underlying database technology from PostgreSQL (Supabase) to Firestore (Firebase).
