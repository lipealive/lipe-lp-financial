import "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      /** Web component do player VTurb (smartplayer v4). */
      "vturb-smartplayer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}
