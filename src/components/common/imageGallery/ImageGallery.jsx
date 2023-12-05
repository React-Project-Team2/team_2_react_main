import React, { useEffect, useState } from 'react'
import '../../../styles/ImageGallery.css'
import { useNavigate } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'
import axios from 'axios'

const ImageGallery = ({path}) => {
  const [introduction, setIntroduction] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3300/about');
        const data = response.data[0];
        
        setIntroduction(data.introduction);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };
    fetchData();
  }, []); 

  const navigate = useNavigate()

  return (
    <Row>
      <Col className='col-md-8 col-sm-12 co-xs-12'>
        <Row className=" gal-item" onClick={() => navigate(`/${path}`)}>
          <Col className="box-1 box">
            <div className='link-box rounded'>
              <div className='slide-box'>
                <h3 className='p-4 text-white bg-dark'>소개글</h3>
                <p className='px-4 text-white'>
                  {introduction}
                </p>
              </div>
              <img src="https://s30876.pcdn.co/wp-content/uploads/Japan-e1634207070862.jpg.optimal.jpg" className="img-ht img-fluid " />
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
              <img src="https://www.trafalgar.com/media/kjtp14lq/classic-japan-guided-tour-1.jpg" className="img-ht img-fluid rounded" />
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