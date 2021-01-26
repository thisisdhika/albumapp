import * as React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Albums, Button } from '../components'
import { getUsers } from '../store/actions/users'
import { getAlbums } from '../store/actions/albums'
import RNPickerSelect from 'react-native-picker-select'
import { SafeAreaView, StyleSheet, View } from 'react-native'

const Home = ({ fetchAlbums, fetchUsers, albums, users, isFetching, navigation }) => {
  const [filter, setFilter] = React.useState(null)
  const [firstLoad, setFirstLoad] = React.useState(true)

  React.useEffect(() => {
    ;(async () => {
      await fetchAlbums()

      if (!users && users.length < 1) {
        await fetchUsers()
      }

      setFirstLoad(false)
    })()
  }, [])

  React.useEffect(() => {
    ;(async () => {
      if (!firstLoad) {
        if (filter) await fetchAlbums({ userId: filter })
        else await fetchAlbums()
      }
    })()
  }, [filter])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.filterBox}>
        <View style={{ flex: 1 }}>
          <RNPickerSelect
            value={filter}
            style={pickerSelectStyles}
            useNativeAndroidPickerStyle={false}
            onValueChange={value => setFilter(value)}
            items={users.map(user => ({ ...user, label: user.name, value: user.id }))}
            placeholder={{
              label: 'Filter by User',
              value: null,
            }}
          />
        </View>
        {!!filter && (
          <Button
            text="Reset"
            color="secondary"
            style={styles.resetButton}
            onPress={() => setFilter(null)}
          />
        )}
      </View>
      <Albums
        isLoading={isFetching}
        items={isFetching ? [] : albums}
        onItemViewPress={data => {
          navigation.navigate('Detail', { album: data })
        }}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  filterBox: {
    marginTop: 20,
    marginBottom: 30,
    flexDirection: 'row',
    paddingHorizontal: 12,
  },
  resetButton: {
    marginLeft: 8,
    paddingHorizontal: 25,
  },
})

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
  },
})

const mapStateToProps = ({ albums, users }) => ({
  isFetching: albums.isFetching,
  fetchError: albums.fetchError,
  albums: albums.data,
  users: users.data,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      fetchAlbums: getAlbums,
      fetchUsers: getUsers,
    },
    dispatch,
  )

export default connect(mapStateToProps, mapDispatchToProps)(Home)
