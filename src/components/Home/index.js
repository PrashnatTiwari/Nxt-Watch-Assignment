import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import {AiFillHome, AiFillFire} from 'react-icons/ai'

import {SiYoutubegaming} from 'react-icons/si'

import {HiSave} from 'react-icons/hi'

import Navbar from '../Navbar'

import AllVideos from '../allVideos'

import './index.css'

const dashboardData = [
  {
    icon: <AiFillHome className="dashboard-icon" />,
    label: 'Home',
  },
  {
    icon: <AiFillFire className="dashboard-icon" />,
    label: 'Trending',
  },
  {
    icon: <SiYoutubegaming className="dashboard-icon" />,
    label: 'Gaming',
  },
  {
    icon: <HiSave className="dashboard-icon" />,
    label: 'Saved Videos',
  },
]

const apiStatusConstant = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    videoDataList: [],
    apiStatus: apiStatusConstant.initial,
    searchInput: '',
  }

  componentDidMount() {
    this.getallVideosData()
  }

  getallVideosData = async () => {
    this.setState({
      apiStatus: apiStatusConstant.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiurl = 'https://apis.ccbp.in/videos/all'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiurl, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const updatedData = data.videos.map(eachItem => ({
        id: eachItem.id,
        profileImageUrl: eachItem.channel.profile_image_url,
        thumbnailUrl: eachItem.thumbnail_url,
        name: eachItem.channel.name,
        title: eachItem.title,
        viewCount: eachItem.view_count,
        publishedAt: eachItem.published_at,
      }))
      this.setState({
        videoDataList: updatedData,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstant.failure,
      })
    }
  }

  renderDashboardContainer = () => (
    <div className="dashboard-container">
      <div>
        {dashboardData.map(eachItem => (
          <div className="dashboard-flex-container">
            {eachItem.icon}
            <p className="label">{eachItem.label}</p>
          </div>
        ))}
      </div>
      <div className="contact-bottom-full-container">
        <p className="contact-paragraph">CONTACT US</p>
        <div className="contact-logo-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
            alt="facebook logo"
            className="contact-method-logo"
          />
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
            alt="twitter logo"
            className="contact-method-logo"
          />
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
            alt="linked in logo"
            className="contact-method-logo"
          />
        </div>
        <p className="contact-paragraph">
          Enjoy! Now to see your channels and recommendations!
        </p>
      </div>
    </div>
  )

  renderInProgressView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const {videoDataList} = this.state
    return (
      <ul className="unordered-all-videos-item">
        {videoDataList.map(eachItem => (
          <AllVideos key={eachItem.id} videosData={eachItem} />
        ))}
      </ul>
    )
  }

  renderFailureView = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png"
        className="not-found-videos"
      />
    </div>
  )

  onChangeSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  renderAllComponent = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstant.inProgress:
        return this.renderInProgressView()
      case apiStatusConstant.success:
        return this.renderSuccessView()
      case apiStatusConstant.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="home-main-container">
          {this.renderDashboardContainer()}
          {this.renderAllComponent()}
        </div>
      </div>
    )
  }
}

export default Home
