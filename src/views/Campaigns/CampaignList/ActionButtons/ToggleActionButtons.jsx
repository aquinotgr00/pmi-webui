import React from 'react'
import { ToggleActionButton } from './ToggleActionButton'

export function ToggleActionButtons (props) {
  return (
    <>
      { props.condition
        ? <ToggleActionButton className={props.classTrue} {...props} />
        : <ToggleActionButton className={props.classFalse} {...props} />
      }
    </>
  )
}
