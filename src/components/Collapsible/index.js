
import React, {
  Component,
  PropTypes,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
 } from 'react-native';
import Collapsible from 'react-native-collapsible';
import _ from 'lodash';
import Dimensions from 'Dimensions';
const window = Dimensions.get('window');
const Icon = require('react-native-vector-icons/FontAwesome');

class Col extends Component {
  static propTypes = {
    day: PropTypes.string.isRequired,
    schedules: PropTypes.arrayOf(PropTypes.shape({
      code: PropTypes.string.isRequired,
      day: PropTypes.string.isRequired,
      dayCode: PropTypes.number.isRequired,
      endTime: PropTypes.string.isRequired,
      startTime: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })).isRequired,
  }
  constructor() {
    super();
    this.state = {collapsed: true}
    this._toggleExpanded = this._toggleExpanded.bind(this);
  }
  _toggleExpanded() {
    this.setState({collapsed: !this.state.collapsed });
  }
  render() {
    const { schedules } = this.props;
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={this._toggleExpanded}>
          <View style={styles.header}>
            <Text style={styles.headerText}>{_.upperFirst(this.props.day)}</Text>
          </View>
        </TouchableHighlight>
        <Collapsible align="center" collapsed={this.state.collapsed} >
          {schedules.map((el, i)=>{
            return (
              <View key={i} style={styles.content} >
                <View style={styles.horas}>
                  <View
                      style={styles.iconWrapper}
                  >
                    <Icon
                        name={'clock-o'}
                        onPress={() => {console.log(this.props);}}
                        style={styles.icon}
                    />
                  </View>
                  <Text style={styles.startTime}>{el.startTime}</Text>
                  <Text style={styles.endTime}>a {el.endTime}</Text>
                </View>
                <View style={styles.descripcion}>
                  <Text style={styles.className}>{_.upperFirst(el.name)}</Text>
                  <Text style={styles.classCode}>{_.upperFirst(el.code)}</Text>
                </View>
                <View style={styles.addToCalendar}>
                  <View
                      style={styles.iconWrapper}
                  >
                    <Icon
                        name={'calendar'}
                        onPress={() => {console.log(this.props);}}
                        style={styles.calendarIcon}
                    />
                  </View>
                  <View style={styles.calendarText}>
                    <Text style={styles.addText}>Agregar al</Text>
                    <Text style={styles.addText}>calendario</Text>
                  </View>
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
    width: window.width,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  header: {
    backgroundColor: '#F5FCFF',
    padding: 10,
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
    padding: 20,
    backgroundColor:'rgba(230,230,230,0)',
  },
  horas:{
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
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
    fontSize: 28,
  },
  startTime: {
    color: 'black',
    fontSize: 20,
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
    padding: 23,
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
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  calendarIcon:{
    fontSize: 28,
    paddingBottom: 8,
  },
  calendarText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 14,
  },

});

export default Col;
