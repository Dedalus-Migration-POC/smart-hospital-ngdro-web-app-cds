import { Logger } from './logger';

const webChannel = (window as any).mobileWebChannel as Pick<
  typeof window,
  'postMessage'
>;

type StringMessage =
  | 'closeLoginWebView'
  | 'closeKeyboard'
  | 'removePageTitle'
  | 'passwordRestoreRequestSuccess'
  | 'switchedToSignup'
  | 'signUpSuccess'
  | 'fetchingProfile'
  | 'fetchedProfile'
  | 'profileEditSuccess'
  | 'fetchProfileError';

type ObjectMessage = 'setAppbarTitle' | 'setPageTitle' | 'consoleLog';

export const WebChannel = {
  isPresent: !!webChannel,
  postString: (message: StringMessage) => {
    if (webChannel) {
      Logger.log('WebChannel postString: ', message);
      webChannel.postMessage(JSON.stringify({ title: message }));
    }
  },
  postObject: (title: ObjectMessage, message: string) => {
    if (webChannel) {
      Logger.log('WebChannel postObject: ', message);
      webChannel.postMessage(JSON.stringify({ title, message }));
    }
  },
};
