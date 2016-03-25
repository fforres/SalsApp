import React, { Component, Dimensions, Image, PropTypes, StyleSheet, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Orientation from 'react-native-orientation';
import Gmap from '../../Map';
import Schedule from '../../Schedule';

const Icon = require('react-native-vector-icons/FontAwesome');
class Talks extends Component {
  static propTypes = {
    address: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    profileImage: PropTypes.string.isRequired,
  };
  constructor(props) {
    super(props);
  }
  componentDidMount(){
    Orientation.lockToPortrait(); //this will lock the view to Portrait
  }
  componentWillUnmount(){
    Orientation.unlockAllOrientations(); //this will lock the view to Portrait
  }
  render() {
    return (
      <ParallaxScrollView
          backgroundSpeed={10}
          headerBackgroundColor="rgba(30,159,117,1)"
          parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
          ref="ParallaxView"
          renderBackground={() => (
            <View key="background">
              <Image source={{uri: this.props.profileImage,
                              resizeMode: 'cover',
                              flex: 1,
                              justifyContent: 'center',
                              height: PARALLAX_HEADER_HEIGHT}}
              />
              <View style={{position: 'absolute',
                            flex: 1,
                            justifyContent: 'center',
                            top: 0,
                            width: window.height,
                            backgroundColor: 'rgba(0,0,0,.4)',
                            height: PARALLAX_HEADER_HEIGHT}}
              />
            </View>
          )}
          renderFixedHeader={() => (
            <View key="fixed-header" style={styles.fixedSection}>
              <Icon
                  name={'chevron-left'}
                  onPress={() => {Actions.pop()}}
                  style={styles.fixedSectionText}
              />
              <Icon
                  name={'bars'}
                  onPress={() => {Actions.menu()}}
                  style={styles.fixedSectionText}
              />
            </View>
          )}
          renderForeground={() => (
            <View key="parallax-header" style={styles.parallaxHeader}>
              <Text style={styles.titleText}>
                {this.props.name}
              </Text>
              <Text style={styles.subTitleText}>
                {this.props.address}
              </Text>
            </View>
          )}
          renderStickyHeader={() => (
            <View key="sticky-header" style={styles.stickySection}>
              <Text style={styles.stickySectionText}>{this.props.name}</Text>
            </View>
          )}
          stickyHeaderHeight={STICKY_HEADER_HEIGHT}
      >
        <ScrollableTabView initialPage={1}>
          <View
              style={styles.tabViewMapa}
              tabLabel="Mapa"
          >
            <Gmap {...this.props}/>
          </View>
          <View
              style={styles.tabView}
              tabLabel="Entradas" 
          >
            <Text style={styles.message}>
              Here, there's going to be a place for you to buy tickets.
            </Text>
            <Icon
                name={'ticket'}
                onPress={() => {}}
                style={styles.messageIcon}
            />
          </View>
          <View
              style={styles.tabView}
              tabLabel="Horario" 
          >
            <Schedule {...this.props}/>
          </View>
        </ScrollableTabView>
      </ParallaxScrollView>
    );
  }
}

const window = Dimensions.get('window');
const AVATAR_SIZE = 120;
const ROW_HEIGHT = 60;
const PARALLAX_HEADER_HEIGHT = 250;
const STICKY_HEADER_HEIGHT = 60;
const TABVIEW_HEIGHT = window.height - (PARALLAX_HEADER_HEIGHT + 50);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(30,159,117,1)',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: window.width,
    height: PARALLAX_HEADER_HEIGHT,
  },
  stickySection: {
    height: STICKY_HEADER_HEIGHT,
    width: window.width,
    backgroundColor: 'rgba(30,159,117,1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stickySectionText: {
    color: 'white',
    paddingTop: 8,
    fontSize: 20,
  },
  fixedSection: {
    position: 'absolute',
    flex: 1,
    flexDirection: 'row',
    bottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    left: 10,
    right:10,
  },
  fixedSectionText: {
    color: 'white',
    fontSize: 18,
  },
  fixedSectionTextHighlight: {
    color: 'white',
    fontSize: 29,
  },
  parallaxHeader: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column',
    paddingTop: 100,
  },
  avatar: {
    marginBottom: 10,
    borderRadius: AVATAR_SIZE / 2,
  },
  titleText: {
    color: 'white',
    fontSize: 28,
    paddingVertical: 5,
  },
  subTitleText: {
    color: 'white',
    fontSize: 20,
    paddingVertical: 5,
  },
  row: {
    overflow: 'hidden',
    paddingHorizontal: 10,
    height: ROW_HEIGHT,
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderBottomWidth: 1,
    justifyContent: 'center',
  },
  rowText: {
    fontSize: 20,
  },
  buttonBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop:8,
    paddingLeft:10,
    paddingRight:10,
    paddingBottom:8,
    backgroundColor: 'rgba(230,230,230,1)',
  },
  buttonBarTouchable: {
    flex: 1,
  },
  buttonBarIcon: {
    flex: 1,
    alignItems: 'center',
  },
  buttonBarImage: {
    color:'black',
    alignItems: 'center',
    fontSize: 16,
  },
  buttonBarImageHighlighted: {
    color:'black',
    alignItems: 'center',
    fontSize: 24,
  },
  buttonBarText: {
    color:'black',
    paddingTop: 3,
    alignItems: 'center',
    fontSize: 10,
  },
  tabViewMapa:{
    flex: 1,
    alignItems:'stretch',
    height:TABVIEW_HEIGHT,
    top:0,
    bottom:0,
    backgroundColor: 'rgba(120,120,123,1)',
  },
  tabView:{
    flex: 1,
    alignItems:'stretch',
    top:0,
    bottom:0,
    backgroundColor: 'rgba(120,120,123,1)',
  },



  message: {
    fontSize: 30,
    backgroundColor: 'white',
    textAlign: 'center',
    padding: 20,
    paddingTop: 60,
  },
  messageIcon: {
    fontSize: 60,
    backgroundColor: 'white',
    textAlign: 'center',
    padding: 20,
  },
});

export default Talks;
