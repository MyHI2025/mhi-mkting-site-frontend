export {};

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          callback?: (token: string) => void;
          "error-callback"?: () => void;
          "expired-callback"?: () => void;
          size?: "normal" | "compact" | "invisible";
          theme?: "light" | "dark" | "auto";
        }
      ) => string;

      execute?: (container: HTMLElement) => void;
      reset?: (container?: HTMLElement) => void;
    };
  }
}
