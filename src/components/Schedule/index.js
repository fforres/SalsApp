import React, { Component, PropTypes, StyleSheet, View, Text } from 'react-native';
import Col from '../Collapsible';
import Spinner from 'react-native-spinkit';

class Schedule extends Component {
  static propTypes = {
    address: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    profileImage: PropTypes.string.isRequired,
    schedule: PropTypes.object.isRequired,
  };
  constructor() {
    super();
  }
  render() {
    const { schedule } = this.props;
    const DAYS = [];
    Object.keys(schedule).forEach(function(el){
      if (!DAYS[schedule[el].dayCode]) {
        DAYS[schedule[el].dayCode] = {
          day: schedule[el].day,
          hours: [],
        };
      }
      DAYS[schedule[el].dayCode].hours.push(schedule[el]);
    })
    const Schedules = Object.keys(DAYS).map((el, i) => {
      return <Col day={DAYS[el].day} key={i} schedules={DAYS[el].hours} />;
    });
    if(Schedules.length > 0){
      return (
        <View>
          {Schedules}
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View style={styles.loadingWrapper}>
            <Text style={styles.loadingText}> Cargando </Text>
            <Spinner
                isVisible
                size={80}
                style={styles.loadingSpinner}
                type={'ThreeBounce'}
            />
          </View>
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 25,
    flex: 1,
  },
  loadingSpinner: {
    marginLeft:20,
  },
})
export default Schedule;
