/// <reference types="@capawesome/capacitor-android-edge-to-edge-support" />

import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'notturna.gdr.narrazione',
  appName: 'Notturna Master',
  webDir: 'www/browser',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    SystemBars: {
      insetsHandling: 'disable',
    },
    Keyboard: {
      resizeOnFullScreen: false,
    },
  },
};

export default config;
