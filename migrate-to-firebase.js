#!/usr/bin/env node

/**
 * Migration script to transfer data from Supabase to Firebase
 * 
 * Prerequisites:
 * 1. Set up Firebase project and get config
 * 2. Install Firebase CLI: npm install -g firebase-tools
 * 3. Login to Firebase: firebase login
 * 4. Initialize Firestore: firebase init firestore
 * 5. Set environment variables for both Supabase and Firebase
 */

import { createClient } from '@supabase/supabase-js';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Supabase configuration
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};

async function migrateData() {
  try {
    console.log('🚀 Starting migration from Supabase to Firebase...');

    // Initialize Supabase client
    const supabase = createClient(supabaseUrl, supabaseKey);
    console.log('✅ Supabase client initialized');

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    console.log('✅ Firebase client initialized');

    // Fetch data from Supabase
    console.log('📥 Fetching data from Supabase...');
    const { data: submissions, error: fetchError } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: true });

    if (fetchError) {
      throw new Error(`Failed to fetch data from Supabase: ${fetchError.message}`);
    }

    console.log(`📊 Found ${submissions.length} contact submissions to migrate`);

    if (submissions.length === 0) {
      console.log('ℹ️  No data to migrate');
      return;
    }

    // Migrate data to Firebase
    console.log('📤 Migrating data to Firebase...');
    let successCount = 0;
    let errorCount = 0;

    for (const submission of submissions) {
      try {
        await addDoc(collection(db, 'contact_submissions'), {
          name: submission.name,
          email: submission.email,
          message: submission.message,
          created_at: new Date(submission.created_at),
          updated_at: new Date(submission.updated_at),
          migrated_at: serverTimestamp()
        });
        successCount++;
        console.log(`✅ Migrated submission: ${submission.name} (${submission.email})`);
      } catch (error) {
        errorCount++;
        console.error(`❌ Failed to migrate submission ${submission.id}:`, error.message);
      }
    }

    console.log('\n🎉 Migration completed!');
    console.log(`✅ Successfully migrated: ${successCount} submissions`);
    if (errorCount > 0) {
      console.log(`❌ Failed to migrate: ${errorCount} submissions`);
    }

  } catch (error) {
    console.error('💥 Migration failed:', error.message);
    process.exit(1);
  }
}

// Run migration
migrateData();
