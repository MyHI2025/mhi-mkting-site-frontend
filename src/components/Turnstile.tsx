import { useEffect, useRef } from "react";

type Props = {
  onVerify: (token: string) => void;
};

export default function Turnstile({ onVerify }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.turnstile || !ref.current) return;

    window.turnstile.render(ref.current, {
      sitekey: import.meta.env.VITE_TURNSTILE_SITE_KEY,
      callback: onVerify,
      theme: "auto"
    });

    return () => {
      if (ref.current) {
        ref.current.innerHTML = "";
      }
    };
  }, [onVerify]);

  return <div ref={ref} />;
}
