import React, { Component, View, Text, PropTypes, Dimensions, StyleSheet, TouchableHighlight} from 'react-native';
import { connect } from 'react-redux';
import { actions as notificationsActions } from '../Redux/modules/notifications';
import Notification from '../../components/Notifications';
const Screen = Dimensions.get('window');

const mapStateToProps = (state) => {
  return {
    notifications : state.notifications.notifications,
  };
}

class RNNotify extends Component {
  static propTypes = {
    notificationAdd: PropTypes.func.isRequired,
    notificationRemove: PropTypes.func.isRequired,
    notifications: PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);
    this.addNotif = this.addNotif.bind(this);
    this.removeNotif = this.removeNotif.bind(this);
  }
  componentDidMount(){
  }
  addNotif(){
    this.props.notificationAdd('1234567890123');
  }
  removeNotif(id){
    this.props.notificationRemove(id);
  }
  render(){
    const {notifications} = this.props;
    const removeNotif = this.removeNotif;
    console.log(notifications);
    const notifsToShow = Object.keys(notifications).map(function(el){
      return (
        <Notification
            callback={function(id){
              removeNotif(id)
            }}
            id={el}
            key={el}
        >
          {notifications[el].message}
        </Notification>
      );
    });
    if (notifsToShow.length > 0) {
      return (
        <View style={styles.container}>
          {notifsToShow}
        </View>
      );
    } else {
      return null;
    }

  }
}
/*
<TouchableHighlight onPress={this.addNotif}>
  <Text>PRESS ME DAMMIT!</Text>
</TouchableHighlight>
*/
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    flex:1,
    top: 12,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: Screen.width,
  },
});


export default connect(mapStateToProps, notificationsActions)(RNNotify);
