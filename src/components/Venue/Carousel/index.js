import React, {
  Component,
  Dimensions,
  Image,
  ListView,
  PropTypes,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import ScrollableTabView from 'react-native-scrollable-tab-view';

const Icon = require('react-native-vector-icons/FontAwesome');
class Talks extends Component {
  constructor(props) {
    super(props);
    this.state =  {
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2,
      }).cloneWithRows([
        'Simplicity Matters',
        'Hammock Driven Development',
        'Value of Values',
        'Are We There Yet?',
        'The Language of the System',
        'Design, Composition, and Performance',
        'Clojure core.async',
        'The Functional Database',
        'Deconstructing the Database',
        'Hammock Driven Development',
        'Value of Values',
      ]),
    };
  }
  static propTypes = {
    address: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    profileImage: PropTypes.string.isRequired,
  };

  render() {
    const {onScroll = () => {}} = this.props;
    return (
      <ParallaxScrollView
          backgroundSpeed={10}
          headerBackgroundColor="rgba(30,159,117,1)"
          onScroll={onScroll}
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
                  onPress={() => {Actions.profile()}}
                  style={styles.fixedSectionText}
              />
            </View>
          )}
          renderForeground={() => (
            <View key="parallax-header" style={styles.parallaxHeader}>
              <Text style={styles.sectionSpeakerText}>
                {this.props.name}
              </Text>
              <Text style={styles.sectionTitleText}>
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
      <View style={styles.buttonBar}>
        <TouchableHighlight style={styles.buttonBarTouchable}>
          <View style={styles.buttonBarIcon}>
            <Icon
                name={'map'}
                onPress={() => {Actions.map()}}
                style={styles.buttonBarImage}
            />
            <Text
                style={styles.buttonBarText}
            >Mapa</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={styles.buttonBarTouchable}>
          <View style={styles.buttonBarIcon}>
            <Icon
                name={'ticket'}
                onPress={() => {Actions.entradas()}}
                style={styles.buttonBarImageHighlighted}
            />
            <Text
                style={styles.buttonBarText}
            >Entradas</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={styles.buttonBarTouchable}>
          <View style={styles.buttonBarIcon}>
            <Icon
                name={'calendar'}
                onPress={() => {Actions.horarios()}}
                style={styles.buttonBarImage}
            />
            <Text
                style={styles.buttonBarText}
            >Horarios</Text>
          </View>
        </TouchableHighlight>

      </View>
      </ParallaxScrollView>
    );
  }
}

const window = Dimensions.get('window');

const AVATAR_SIZE = 120;
const ROW_HEIGHT = 60;
const PARALLAX_HEADER_HEIGHT = 250;
const STICKY_HEADER_HEIGHT = 60;

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
  sectionSpeakerText: {
    color: 'white',
    fontSize: 24,
    paddingVertical: 5,
  },
  sectionTitleText: {
    color: 'white',
    fontSize: 18,
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
});

export default Talks;
