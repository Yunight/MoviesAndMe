import React from 'react'
import { } from 'react-native'
import FilmList from './FilmList'
import { getBestFilmsFromApi } from '../API/TMDBApi'

export default class News extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      films: [],
      isLoading: false,
      page: 0,
      totalPages: 1
    }

    this._loadFilms = this._loadFilms.bind(this)
  }

  componentDidMount() {
    this._loadFilms()
  }

  _loadFilms() {
    this.setState({ isLoading: true })
    getBestFilmsFromApi(this.state.page+1).then(data => {
        this.setState({
        films: [ ...this.state.films, ...data.results ],
        isLoading: false,
        page: data.page,
        totalPages: data.total_pages
      })
    })
  }

  render() {
    return (
      <FilmList
        films={this.state.films}
        navigation={this.props.navigation}
        loadFilms={this._loadFilms}
        page={this.state.page}
        totalPages={this.state.totalPages}
        favoriteList={false}
      />
    )
  }
}
