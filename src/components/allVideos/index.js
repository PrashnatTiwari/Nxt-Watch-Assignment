import './index.css'

const AllVideos = props => {
  const {videosData} = props
  const {name, profileImageUrl, publishedAt, thumbnailUrl, title, viewCount} =
    videosData

  return (
    <li className="all-videos-list">
      <img src={thumbnailUrl} className="thumbnail-image-url" />
      <div className="description-container">
        <img src={profileImageUrl} className="profile-image-url" />
        <div>
          <p className="all-videos-title">{title}</p>
          <p className="all-videos-name">{name}</p>
          <div className="view-publish-container">
            <p className="views-count">
              {viewCount}
            </p>
            <p className="all-videos-published">{publishedAt}</p>
          </div>
        </div>
      </div>
    </li>
  )
}

export default AllVideos
