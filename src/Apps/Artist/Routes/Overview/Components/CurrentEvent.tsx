import { Sans, Serif } from "@artsy/palette"
import { CurrentEvent_artist } from "__generated__/CurrentEvent_artist.graphql"
import React, { Component, SFC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Box } from "Styleguide/Elements/Box"
import { Flex } from "Styleguide/Elements/Flex"
import { Image } from "Styleguide/Elements/Image"
import { Responsive } from "Utils/Responsive"

export interface CurrentEventProps {
  artist: CurrentEvent_artist
}

export class CurrentEvent extends Component<CurrentEventProps> {
  render() {
    return (
      <Responsive>
        {({ xs }) => {
          if (xs) return null
          else return <LargeCurrentEvent {...this.props} />
        }}
      </Responsive>
    )
  }
}

export const LargeCurrentEvent: SFC<CurrentEventProps> = props => {
  if (!props.artist.currentEvent) {
    return null
  }
  const {
    currentEvent: { image, headline, name, subHeadline },
  } = props.artist

  return (
    <Flex flexDirection="column">
      <Box width="100%" height="auto">
        <Image src={image.resized.url} width="100%" mb={1} />
      </Box>
      <Sans size="2" weight="medium" my={0.5}>
        {headline}
      </Sans>
      <Serif size="3t">{name}</Serif>
      <Serif size="2" color="black60">
        {subHeadline}
      </Serif>
    </Flex>
  )
}

export const CurrentEventFragmentContainer = createFragmentContainer(
  CurrentEvent,
  graphql`
    fragment CurrentEvent_artist on Artist {
      currentEvent {
        image {
          resized(width: 300) {
            url
          }
        }
        name
        subHeadline
        headline
      }
    }
  `
)
