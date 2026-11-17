'use client';

import { Tab, TabList, TabPanel, Tabs } from '@trellis-ui/react';

export default function TabsDemo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-10">
      <Tabs>
        <TabList aria-label="Account settings">
          <Tab id="profile">Profile</Tab>
          <Tab id="security">Security</Tab>
          <Tab id="billing">Billing</Tab>
        </TabList>
        <TabPanel id="profile">Update your name, avatar and bio.</TabPanel>
        <TabPanel id="security">Change your password and enable two-factor authentication.</TabPanel>
        <TabPanel id="billing">Manage your plan and payment methods.</TabPanel>
      </Tabs>

      <Tabs>
        <TabList aria-label="Project" variant="underline">
          <Tab id="overview">Overview</Tab>
          <Tab id="activity">Activity</Tab>
          <Tab id="settings" isDisabled>
            Settings
          </Tab>
        </TabList>
        <TabPanel id="overview">Underline variant – a classic tab bar.</TabPanel>
        <TabPanel id="activity">Recent activity shows up here.</TabPanel>
        <TabPanel id="settings">Settings</TabPanel>
      </Tabs>
    </div>
  );
}
