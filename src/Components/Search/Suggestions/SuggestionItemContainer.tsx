import { Flex } from "@artsy/palette"
import React, { SFC } from "react"

interface Props {
  children: React.ReactNode
}

export const SuggestionItemContainer: SFC<Props> = ({ children }) => (
  <Flex flexDirection="column" justifyContent="center" height="62px" pl={3}>
    {children}
  </Flex>
)