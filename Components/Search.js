import React from 'react'
import { StyleSheet, View, TextInput, Button, Text, FlatList, ActivityIndicator, SafeAreaView } from 'react-native'
import FilmList from './FilmList'
import FilmItem from './FilmItem'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi'

class Search extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      films: [],
      searchedText: "",
      isLoading: false,
      page: 0,
      totalPages: 1
    }

    this._loadFilms = this._loadFilms.bind(this)
  }

  _searchTextInputChanged(text) {
    this.setState({ searchedText: text })
  }

  _searchFilms() {
    this.setState({
      films: [],
      page: 0,
      totalPages: 1
    }, () => { this._loadFilms() })
  }

  _loadFilms() {
    if (this.state.searchedText.length > 0) {
      this.setState({ isLoading: true })
      getFilmsFromApiWithSearchedText(this.state.searchedText, this.state.page+1).then(data => {
        this.setState({
          films: [ ...this.state.films, ...data.results ],
          isLoading: false,
          page: data.page,
          totalPages: data.total_pages
        })
      })
    }
  }

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading_container}>
          <ActivityIndicator size='large' />
        </View>
      )
    }
  }

  render() {
    console.log("TEST Chrome Developer Tools")
    return (
      <SafeAreaView style={styles.main_container}>
        <TextInput
          style={styles.textinput}
          placeholder='Titre du film'
          onChangeText={(text) => this._searchTextInputChanged(text)}
          onSubmitEditing={() => this._searchFilms()}
        />
        <Button style={{ height: 50 }} title='Rechercher' onPress={() => this._searchFilms()}/>
        <FilmList
          films={this.state.films}
          navigation={this.props.navigation}
          loadFilms={this._loadFilms}
          page={this.state.page}
          totalPages={this.state.totalPages}
          favoriteList={false}
        />
        {this._displayLoading()}
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1
  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default Search
