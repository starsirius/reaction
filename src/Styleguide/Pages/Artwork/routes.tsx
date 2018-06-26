import { graphql } from "react-relay"
import { ArtworkAppFragmentContainer as ArtworkApp } from "./ArtworkApp"

// @ts-ignore
import { ComponentClass, StatelessComponent } from "react"

export const routes = [
  {
    path: "/:artworkID",
    Component: ArtworkApp,
    query: graphql`
      query routes_ArtworkQuery($artworkID: String!) {
        viewer {
          ...ArtworkApp_viewer
        }
      }
    `,
  },
]