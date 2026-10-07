import type * as React from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "elevenlabs-convai": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        "agent-id"?: string;
        [key: string]: any;
      };
    }
  }

  namespace React {
    interface HTMLAttributes<T> {
      /**
       * Google Preferred Sources publisher attribute.
       * When present on a <div>, Google's publisher.js initialises the
       * element into the official Preferred Sources widget.
       * @see https://developers.google.com/search/docs/appearance/preferred-sources
       */
      "google-add-preferred-source-btn"?: string;
    }
  }
}
