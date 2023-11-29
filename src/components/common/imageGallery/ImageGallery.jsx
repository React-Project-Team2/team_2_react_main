import React, { useState } from 'react'
import '../../../styles/ImageGallery.css'
import { useNavigate } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'

const ImageGallery = ({path}) => {
  const navigate = useNavigate()

  return (
    <Row>
      <Col className='col-md-8 col-sm-12 co-xs-12'>
        <Row className=" gal-item" onClick={() => navigate(`/${path}`)}>
          <Col className="box-1 box">
            <div className='link-box rounded'>
              <div className='slide-box'>
                <h3 className='p-4 text-white bg-dark'>About</h3>
                <p className='px-4 text-white'>
                  textarea 
                </p>
              </div>
              <img src="https://www.his-j.com/kokunai/kanto/tour_info/okinawa/catchy/wp-content/uploads/2021/02/post_10242_01-730x410.jpg" className="img-ht img-fluid " />
            </div>
          </Col>
        </Row>
        <Row >
          <Col className="gal-item">
            <div className="box-2 box">
              <img src="https://www.welcomekyushu.jp/article/photo/image/1638431999.jpg" className="img-ht img-fluid rounded" />
            </div>
          </Col>
          <Col className="gal-item">
            <div className="box-2 box">
              <img src="https://travel.rakuten.co.jp/mytrip/sites/mytrip/files/styles/main_image/public/migration_article_images/ranking/spot-itoshima-key.jpg?itok=1ff5szrC" className="img-ht img-fluid rounded" />
            </div>
          </Col>
        </Row>
      </Col>
      <Col className="col-md-4 col-sm-6 co-xs-12 d-none d-md-block">
        <Row className="gal-item">
          <div className="box-4 box">
            <img src="https://uyamaresort.com/column/wp-content/uploads/sites/7/2023/06/2804a103f342f32108c302586813b7d2-640x427-1.webp" className="img-ht img-fluid rounded" />
          </div>
        </Row>
        <Row className="gal-item">
          <div className="box-5 box">
            <img src="https://www.img-ikyu.com/contents/dg/special/kankou/area/headbk_fukuoka_sd.jpg" className="img-ht img-fluid rounded" />
          </div>
        </Row>
      </Col>
    </Row>
  )
}

export default ImageGallery