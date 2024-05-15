import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class DetailVideo extends Component {
  componentDidMount() {
    this.getDetailData()
  }

  getDetailData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    console.log(data)
  }

  renderVideoContainer = () => (
    <div className="detail-video-main-container">
      <p>Prashnat Tiwari</p>
    </div>
  )

  render() {
    return <>{this.renderVideoContainer()}</>
  }
}

export default withRouter(DetailVideo)
