const React = require('react');
const Root = require('../components/Root');
const Button = require('../components/Button');
const Screens = require('./Screens');
const Navigation = require('../services/Navigation');
const { stack } = require('../commons/Layouts');
const {
  PUSH_BTN,
  MODAL_BTN,
  REGISTER_MODAL_DISMISS_EVENT_BTN
} = require('../testIDs');

class ExternalComponentScreen extends React.Component {
  static options() {
    return {
      topBar: {
        title: {
          text: 'External Component'
        }
      }
    }
  }

  render() {
    return (
      <Root componentId={this.props.componentId}>
        <Button label='Push' testID={PUSH_BTN} onPress={this.push} />
        <Button label='Show Modal' testID={MODAL_BTN} onPress={this.modal} />
        <Button label='Register modal dismiss event' testID={REGISTER_MODAL_DISMISS_EVENT_BTN} onPress={this.registerModalDismissEvent} />
      </Root>
    );
  }

  registerModalDismissEvent = () => Navigation.events().registerModalDismissedListener(() => {
    
  });

  push = () => Navigation.push(this, {
    externalComponent: {
      name: Screens.NativeScreen,
      passProps: {
        text: 'This is an external component'
      }
    }
  });
  modal = () => Navigation.showModal(
    stack([
      Screens.Pushed,
      {
        externalComponent: {
          name: Screens.NativeScreen,
          passProps: {
            text: 'External component in deep stack'
          },
          options: {
            topBar: {
              title: {
                text: 'External Component'
              }
            }
          }
        }
      }
    ])
  );
}

module.exports = ExternalComponentScreen;
