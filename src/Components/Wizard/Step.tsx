import PropTypes from "prop-types"
import { Component } from "react"
import React from "react"
import { StepProps } from "./types"

/**
 * Step within a Wizard.
 *
 * @example
 *
 * ```javascript
 * <Step label="One">
 *   {context =>
 *    <Button onClick={context.wizard.next}>Next</Button>
 *   }
 * </Step>
 * ```
 */
export class Step extends Component<StepProps> {
  static contextTypes = {
    wizard: PropTypes.object,
    form: PropTypes.object,
  }

  render() {
    if (!this.context.wizard) {
      return null
    }
    const { wizard, form } = this.context
    return React.createElement(this.props.children, { wizard, form })
  }
}
