import { datadogRum } from '@datadog/browser-rum';

export function initDatadog() {
    datadogRum.init({
        applicationId: 'b1ec4773-1a7c-469f-8389-7a5834c7bcc0',
        clientToken: 'pub7796e5705411855fa201a3adcf907910',
        // `site` refers to the Datadog site parameter of your organization
        // see https://docs.datadoghq.com/getting_started/site/
        site: 'datadoghq.com',
        service: 'qa-base',
        env: 'prod',
        // Specify a version number to identify the deployed version of your application in Datadog
        // version: '1.0.0',
        sessionSampleRate: 100,
        sessionReplaySampleRate: 0,
        trackUserInteractions: true,
        trackResources: true,
        trackLongTasks: true,
        defaultPrivacyLevel: 'mask-user-input',
    });
}
