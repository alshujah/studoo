
import { redirect } from 'next/navigation';

// This is the main entry point of the app.
// It will redirect the user to the dashboard, where authentication status is handled client-side.
export default function RootPage() {
    redirect('/dashboard');
}
