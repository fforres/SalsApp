import React, {
  Component,
  PropTypes,
  Text,
  Animated,
  Dimensions,
  StyleSheet,
} from 'react-native';

const Screen = Dimensions.get('window');

class Notification extends Component {
  static propTypes = {
    callback: PropTypes.func.isRequired,
    children: PropTypes.node,
    message:  PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.node,
    ]),
    minOpacity: PropTypes.number.isRequired,
    type: PropTypes.string,
    visible: PropTypes.bool,
  };

  static defaultProps = {
    visible: true,
    fadeTime: 750,
    showTime: 5000,
    minOpacity: 0.0,
    maxOpacity: 0.9,
    type: 'info',
  };

  constructor(props) {
    super(props);
    this.state = {
      opacityValue: new Animated.Value(this.props.minOpacity),
      fadingOut: false,
    };
    this.fadeIn = this.fadeIn.bind(this);
    this.fadeOut = this.fadeOut.bind(this);
    this.notificationBackgroundColor = this.notificationBackgroundColor.bind(this);
    this.notificationTextColor = this.notificationTextColor.bind(this);
  }

  componentWillMount() {
  }

  componentDidMount() {
    if (this.props.visible && !this.state.fadingOut) {
      this.fadeIn();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.visible && !this.props.visible) {
      this.fadeIn();
    } else {
      if (!nextProps.visible && this.props.visible) {
        this.fadeOut();
      }
    }
  }

  shouldComponentUpdate(nextProps) {
    // TODO: Compare the messages with each other
    if (this.props.visible !== nextProps.visible) {
      return true;
    }
    // TODO: Is there a reliable way not use `__getValue` and something else that may not be as unstable
    if (this.state.opacityValue.__getValue() !== this.state.opacityValue.__getValue()) {
      return true;
    }
    return false;
  }

  fadeIn() {
    const that = this;
    Animated.timing(that.state.opacityValue, {
      duration: that.props.fadeTime,
      toValue: that.props.maxOpacity,
    }).start();
    setTimeout(function () {
      that.fadeOut();
    }, (that.props.fadeTime + that.props.showTime));
  }

  fadeOut() {
    const that = this;
    if(this.state.fadingOut !== true){
      this.setState({fadingOut:true});
      Animated.timing(that.state.opacityValue, {
        duration: that.props.fadeTime,
        toValue: that.props.minOpacity,
      }).start();
      setTimeout(function () {
        that.props.callback(that.props.id);
      }, (that.props.fadeTime));
    }

  }

  notificationBackgroundColor(){
    const that = this;
    switch (that.props.type.toLowerCase()) {
    case 'error':
      return '#FFBABA';
    case 'warning':
      return '#FEEFB3';
    case 'success':
      return '#4F8A10';
    case 'info':
    default:
      return '#BDE5F8';
    }
  }
  notificationTextColor() {
    const that = this;
    switch (that.props.type.toLowerCase()) {
    case 'error':
      return '#D8000C';
    case 'warning':
      return '#9F6000';
    case 'success':
      return '#FFFFFF';
    case 'info':
    default:
      return '#00529B';
    }
  }
  render() {
    let message = this.props.children;
    if (!message) {
      message = this.props.message;
    }
    if (!message) {
      message = null;
    }
    return (
      <Animated.View
          onTouchStart={this.fadeOut}
          style={[styles.container, {opacity: this.state.opacityValue}, {backgroundColor: this.notificationBackgroundColor()}]}
      >
        <Text style={[styles.message, {color: this.notificationTextColor()}]} >
          {message}
        </Text>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#444',
    padding: 10,
    margin: 10,
    width: Screen.width*0.8,
    opacity: 1,
    borderRadius: 2,
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 1,
    shadowOffset: {
      width: 0,
      height: 1.5,
    },
  },
  message: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
  },
});

export default Notification;
