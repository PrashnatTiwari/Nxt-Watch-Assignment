import {IoIosMoon} from 'react-icons/io'

import './index.css'

const Navbar = () => (
  <div className="nav-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
      className="navbar-website-logo"
    />
    <div className="nav-data-container">
      <IoIosMoon className="moon-image" />
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
        className="profile-image"
      />
      <button className="logout-button">Logout</button>
    </div>
  </div>
)

export default Navbar
