
import React, {
  Component,
  PropTypes,
  StyleSheet,
  ActionSheetIOS,
  Text,
  View,
  TouchableHighlight,
  NativeAppEventEmitter,
 } from 'react-native';
import Collapsible from 'react-native-collapsible';
import _ from 'lodash';
import moment from 'moment';
import RNCalendarEvents from 'react-native-calendar-events';

const Icon = require('react-native-vector-icons/FontAwesome');

class Col extends Component {
  static propTypes = {
    address: PropTypes.string.isRequired,
    day: PropTypes.string.isRequired,
    notificationAdd: PropTypes.func.isRequired,
    schedules: PropTypes.arrayOf(PropTypes.shape({
      code: PropTypes.string.isRequired,
      day: PropTypes.string.isRequired,
      dayCode: PropTypes.number.isRequired,
      endTime: PropTypes.string.isRequired,
      startTime: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })).isRequired,
  }
  componentWillMount(){
    console.log(this.props);
    this.eventEmitter = NativeAppEventEmitter.addListener('eventSaveSuccess', (id) => {
      console.log(`Evento ${id} agregado`);
    });
    this.eventEmitter2 = NativeAppEventEmitter.addListener('eventSaveError', (err) => {
      console.log(err)
    });
  }
  componentWillUnMount(){
    this.eventEmitter.remove();
    this.eventEmitter2.remove();
  }
  constructor() {
    super();
    this.state = {collapsed: true}
    this._toggleExpanded = this._toggleExpanded.bind(this);
    this.showActionSheet = this.showActionSheet.bind(this);
    this.addEvent = this.addEvent.bind(this);
  }
  _toggleExpanded() {
    this.setState({collapsed: !this.state.collapsed});
  }
  _animate() {
  }
  addEvent(el){
    const startTime = el.startTime.split(':');
    const endTime = el.endTime.split(':');
    const startDate=  moment().weekday(el.dayCode).hour(startTime[0]).minute(startTime[1]).second(0);
    const startDateString = startDate.format('YYYY-MM-DDTHH:mm:ss').toString() + '.000-03:00';

    const startDateAlarm1=  startDate.subtract(1,'hours')
    const startDateAlarm1String = startDateAlarm1.format('YYYY-MM-DDTHH:mm:ss').toString() + '.000-03:00';

    const startDateAlarm2=  startDate.subtract(1,'days')
    const startDateAlarm2String = startDateAlarm2.format('YYYY-MM-DDTHH:mm:ss').toString() + '.000-03:00';

    const reminderOb = {
      location: this.props.address,
      notes: 'notes',
      recurrence: 'weekly',
      startDate: startDateString,
      endDate: moment().weekday(el.dayCode).hour(endTime[0]).minute(endTime[1]).second(0).format('YYYY-MM-DDTHH:mm:ss').toString() + '.000-03:00',
      alarms: [{
        date: startDateAlarm2String
      },{
        date: startDateAlarm1String
      }]
    };
    const reminderName = _.upperFirst(el.name) + ' - ' + _.upperFirst(el.code);
    RNCalendarEvents.saveEvent(reminderName, reminderOb);
    this.props.notificationAdd('Recordatorio agregado')
  }
  showActionSheet(el) {
    const that = this;
    ActionSheetIOS.showActionSheetWithOptions({
      options: ['Agregar al Calendario', 'Cancelar'],
      cancelButtonIndex: 1,
      destructiveButtonIndex: 2,
    }, (buttonIndex) => {
      // Check reminder permissions
      if (buttonIndex === 0) {
        RNCalendarEvents.authorizationStatus(({status}) => {
          console.log(status);
          if (status === 'authorized') {
            that.addEvent(el);
          } else {
            RNCalendarEvents.authorizeEventStore((err, auth) => {
              that.addEvent(el);
            });
          }
        });
      }
    },  (buttonIndex) => {
      console.log('Error');
      console.log(buttonIndex);
    });
  }
  showShareActionSheet(el) {
    console.log(el);
    ActionSheetIOS.showShareActionSheetWithOptions({
      message:'Clases de salsa!',
    }, (buttonIndex) => {
      console.log(buttonIndex);
    }, (buttonIndex) => {
      console.log('error!');
      console.log(buttonIndex);
    });
  }
  render() {
    const { schedules } = this.props;
    const caretIcon = ()=>{
      if(this.state.collapsed){
        return (
          <Icon
              name={'caret-down'}
              onPress={() => {console.log(this.props);}}
              style={styles.headerIcon}
          />
        )
      } else {
        return (
          <Icon
              name={'caret-up'}
              onPress={() => {console.log(this.props);}}
              style={styles.headerIcon}
          />
        )
      }
    }
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={this._toggleExpanded}>
          <View style={styles.header}>
            {caretIcon()}
            <Text style={styles.headerText}>{_.upperFirst(this.props.day)}</Text>
          </View>
        </TouchableHighlight>
        <Collapsible align="center" collapsed={this.state.collapsed} >
          {schedules.map((el, i)=>{
            return (
              <View key={i} style={styles.content} >
                <View style={styles.horas}>
                  <View style={styles.iconWrapper}>
                    <Icon
                        name={'clock-o'}
                        onPress={() => {console.log(this.props);}}
                        style={styles.icon}
                    />
                  </View>
                  <Text style={styles.startTime}>{el.startTime}</Text>
                  <Text style={styles.hourMiddleText}>a</Text>
                  <Text style={styles.endTime}>{el.endTime}</Text>
                </View>
                <View style={styles.descripcion}>
                  <Text style={styles.className}>{_.upperFirst(el.name)}</Text>
                  <Text style={styles.classCode}>{_.upperFirst(el.code)}</Text>
                </View>
                <View style={styles.addToCalendar}>
                  <Icon
                      name={'ellipsis-h'}
                      onPress={()=>{this.showActionSheet(el)}}
                      style={styles.calendarIcon}
                  />
                  <Icon
                      name={'share-square-o'}
                      onPress={()=>{this.showShareActionSheet(el)}}
                      style={styles.calendarIcon}
                  />
                </View>
              </View>
            )
          })}
        </Collapsible>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    left:0,
    right:0,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    paddingLeft: 13,
    paddingTop: 15,
    paddingBottom: 8,
    borderBottomColor: 'rgba(220,220,220,1)',
    borderBottomWidth: 1,
  },
  headerIcon: {
    color: 'black',
    fontSize: 16,
    paddingRight: 5,
  },
  headerText: {
    textAlign: 'left',
    padding: 5,
    fontSize: 18,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 5,
    paddingRight: 15,
    backgroundColor:'rgba(230,230,230,0)',
    borderBottomColor: 'rgba(220,220,220,0.6)',
    borderBottomWidth: 1,
  },
  horas:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 12,
  },
  iconWrapper: {
    flex: 1,
    borderRadius: 1000,
    padding: 5,
    paddingLeft: 7,
    paddingRight: 7,
  },
  icon: {
    color: 'black',
    fontSize: 21,
  },
  startTime: {
    color: 'black',
    fontSize: 17,
  },
  hourMiddleText: {
    color: 'black',
    padding: 3,
    fontSize: 12,
  },
  endTime: {
    color: 'black',
    fontSize: 15,
  },
  descripcion:{
    flex: 3,
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'column',
    paddingTop: 10,
    paddingBottom: 10,
  },
  className: {
    color: 'black',
    fontSize: 20,
    paddingBottom:10,
  },
  classCode: {
    color: 'black',
    fontSize: 15,
  },
  addToCalendar:{
    flex: 1,
    alignItems:'center',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 0,
  },
  calendarIcon:{
    fontSize: 18,
    color: 'rgba(0,0,0,0.5)',
    padding: 16,
  },
});

export default Col;
