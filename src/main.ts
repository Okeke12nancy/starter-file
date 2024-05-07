import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';

const mergedConfig = {
  ...appConfig, // Spread operator to include providers from appConfig
  providers: [...(appConfig?.providers || []), provideHttpClient()],
};

bootstrapApplication(AppComponent, mergedConfig).catch((error) => {
  console.error('Error bootstrapping Angular application:', error);
  throw error;
});
