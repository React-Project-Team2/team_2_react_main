import React from 'react'
import '../../../styles/ImageGallery.css'
import { useNavigate } from 'react-router-dom'

const ImageGallery = ({path}) => {
  const navigate = useNavigate()
  
  return (
    <div className="row">
      <div className="col-md-8 col-sm-12 co-xs-12 gal-item">
        <div className="row h-50">
            <div className="col-md-12 col-sm-12 co-xs-12 gal-item" onClick={() => navigate(`/${path}`)}>
                <div className="box-1 box">
                  <img src="https://www.his-j.com/kokunai/kanto/tour_info/okinawa/catchy/wp-content/uploads/2021/02/post_10242_01-730x410.jpg" className="img-ht img-fluid rounded" />
                </div>
            </div>
        </div>

        <div className="row h-50">
          <div className="col-md-6 col-sm-6 co-xs-12 gal-item h-100">
            <div className="box-2 box">
              <img src="https://www.welcomekyushu.jp/article/photo/image/1638431999.jpg" className="img-ht img-fluid rounded" />
            </div>
          </div>
          <div className="col-md-6 col-sm-6 co-xs-12 gal-item">
            <div className="box-2 box">
              <img src="https://travel.rakuten.co.jp/mytrip/sites/mytrip/files/styles/main_image/public/migration_article_images/ranking/spot-itoshima-key.jpg?itok=1ff5szrC" className="img-ht img-fluid rounded" />
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-4 col-sm-6 co-xs-12 gal-item">
        <div className="col-md-12 col-sm-6 co-xs-12 gal-item h-25">
          <div className="box-4 box">
            <img src="https://uyamaresort.com/column/wp-content/uploads/sites/7/2023/06/2804a103f342f32108c302586813b7d2-640x427-1.webp" className="img-ht img-fluid rounded" />
          </div>
        </div>
        <div className="col-md-12 col-sm-6 co-xs-12 gal-item h-75">
          <div className="box-5 box">
            <img src="https://www.img-ikyu.com/contents/dg/special/kankou/area/headbk_fukuoka_sd.jpg" className="img-ht img-fluid rounded" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ImageGallery