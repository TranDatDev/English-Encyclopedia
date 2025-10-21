import { ReactLenis } from "lenis/react";
import type { PropsWithChildren } from "react";

export default function ScrollProvider({ children }: PropsWithChildren) {
  return (
    <ReactLenis
      root
      options={{
        easing: (t) => 1 - Math.pow(1 - t, 3),
        touchMultiplier: 1.2,
        wheelMultiplier: 1.5,
      }}
    >
      {children}
    </ReactLenis>
  );
}
