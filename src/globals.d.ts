declare interface Window {
    google: {
      accounts: {
        id: {
          initialize: (config: { client_id: string; callback: (response: any) => void }) => void;
          prompt: (callback?: (notification: { isNotDisplayed: () => boolean; isSkipped: () => boolean }) => void) => void;
          renderButton: (element: HTMLElement, options: { theme?: string; size?: string }) => void;
        };
      };
    };
  }