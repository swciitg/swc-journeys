import React from 'react'
import Joyride from 'react-joyride'

export default class Tour extends React.Component {
  state = {
    steps: [
      {
        target: '.abc',
        content: 'This is my awesome feature!',
      },
    ],
  }

  render() {
    const { steps } = this.state
    console.log('Tour should start')
    return (
      <div className="joyride">
        <Joyride run={true} callback={() => null} steps={steps} />
      </div>
    )
  }
}
