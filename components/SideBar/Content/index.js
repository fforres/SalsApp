import React, { Component, PropTypes, View, Text, ScrollView, Image, StyleSheet, Dimensions} from 'react-native';
const window = Dimensions.get('window');
const uri = 'http://pickaface.net/includes/themes/clean/img/slide2.png';

class SidebarContent extends Component {
  static propTypes = {
    onItemSelected: PropTypes.func.isRequired,
  };

  render() {
    return (
      <ScrollView scrollsToTop={false} style={styles.menu}>
        <View style={styles.avatarContainer}>
          <Image
              source={{ uri, }}
              style={styles.avatar}
          />
          <Text style={styles.name}>Your name</Text>
        </View>
        <Text
            onPress={() => this.props.onItemSelected('About')}
            style={styles.item}
        >
          About
        </Text>
        <Text
          onPress={() => this.props.onItemSelected('Contacts')}
          style={styles.item}>
          Contacts
        </Text>
      </ScrollView>

    );
  }
}


const styles = StyleSheet.create({
  menu: {
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: 'gray',
    padding: 20,
  },
  avatarContainer: {
    marginBottom: 20,
    marginTop: 20,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    flex: 1,
  },
  name: {
    position: 'absolute',
    left: 70,
    top: 20,
  },
  item: {
    fontSize: 14,
    fontWeight: '300',
    paddingTop: 5,
  },
});
export default SidebarContent;
