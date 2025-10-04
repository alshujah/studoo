import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile | Zenith',
};

const profileModules = [
    { title: "Goal Setting Tools", description: "Define and track your wellness goals." },
    { title: "Vision Board Creation", description: "Visualize your ideal future." },
    { title: "Habit Building Support", description: "Form positive, lasting habits." },
    { title: "Achievement Badges", description: "Celebrate your progress and milestones." },
    { title: "Streak Tracking", description: "Maintain momentum with daily streaks." },
    { title: "Personal Growth Metrics", description: "Track your journey over time." },
    { title: "Coping Skills Library", description: "Your personalized coping toolbox." },
    { title: "Progress Reports", description: "Exportable summaries for your therapist." },
    { title: "Success Visualization", description: "Mentally rehearse achieving your goals." },
    { title: "Before & After Comparisons", description: "See how far you've come." },
    { title: "Avatar Customization", description: "Personalize your in-app identity." },
    { title: "Points/Rewards System", description: "Earn points for completing activities." },
    { title: "Level Progression", description: "Level up as you build skills." },
    { title: "Challenges/Quests", description: "Tangible daily and weekly tasks." },
    { title: "Motivational Quotes", description: "Daily inspiration to keep you going." },
    { title: "Reward Scheduling", description: "Plan rewards for achieving your goals." },
    { title: "Milestone Celebrations", description: "Acknowledge significant achievements." },
    { title: "Wellness Score Calculation", description: "Get a score of your overall well-being." },
    { title: "Push Notifications", description: "Customizable reminders and alerts." },
    { title: "Personalized Themes", description: "Customize the look and feel of the app." },
    { title: "Community Forum", description: "Connect with others in a safe space." },
    { title: "Peer Support Groups", description: "Join groups based on shared experiences." },
    { title: "Emergency Contacts", description: "Quick access to your support network." },
    { title: "Privacy Settings", description: "Control your data and privacy." },
    { title: "Data Deletion Options", description: "Request deletion of your personal data." },
    { title: "Password Protection", description: "Secure your account with a password." },
    { title: "Biometric Login", description: "Use fingerprint or face ID to log in." },
    { title: "Two-Factor Authentication", description: "Add an extra layer of security." },
    { title: "Data Export Options", description: "Export your data for your own records." },
    { title: "Third-Party Sharing Controls", description: "Manage how your data is shared." },
    { title: "Loved One/Supporter Portal", description: "Share progress with trusted contacts." },
    { title: "Leaderboards", description: "Optional leaderboards for motivation." },
    { title: "Virtual Rewards/Unlockables", description: "Unlock new content and features." },
    { title: "Experience Points (XP)", description: "Earn XP for using the app." },
    { title: "Daily/Weekly Missions", description: "Complete missions for rewards." },
    { title: "Collectibles", description: "Collect items as you progress." },
    { title: "Mini-Games", description: "Therapeutic or relaxation-focused games." },
    { title: "Gentle Nudges", description: "Autonomy-preserving reminders." },
    { title: "Location-Based Reminders", description: "Reminders based on your location." },
    { title: "Mood Check-in Prompts", description: "Prompts to check in with your mood." },
    { title: "Cloud Backup", description: "Keep your data safe and synced." },
    { title: "Data Portability", description: "Take your data with you." },
    { title: "Account Recovery Options", description: "Recover your account if you lose access." },
    { title: "Multi-User Support", description: "Support for family accounts." },
    { title: "Data Retention Policies", description: "Clear policies on how your data is stored." },
    { title: "Audit Logs", description: "Track access to your data." },
    { title: "Simple, Intuitive Navigation", description: "Easy to find what you need." },
    { title: "Clean, Minimalist Design", description: "A calming and focused interface." },
    { title: "Accessibility Features", description: "Support for screen readers and more." },
    { title: "Dark Mode Option", description: "A dark theme for your comfort." }
];

export default function ProfilePage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center">
        <h1 className="font-headline text-2xl font-semibold md:text-3xl">Profile & Settings</h1>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {profileModules.map((module) => (
            <Card key={module.title}>
                <CardHeader>
                    <CardTitle>{module.title}</CardTitle>
                    <CardDescription>{module.description}</CardDescription>
                </CardHeader>
            </Card>
        ))}
      </div>
    </main>
  );
}
