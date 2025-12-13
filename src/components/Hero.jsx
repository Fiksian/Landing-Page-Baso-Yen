import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import gambar1 from '../assets/Photo/foto baru/Salinan R 11.jpg';

function Hero() {
  return (
    <section id="home">
    <Carousel>
      <Carousel.Item>
        <Image 
          src={gambar1} 
          className="d-block w-100 hero-img"
          alt="Slide 1"
          fluid
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <Image 
          src={gambar1}
          className="d-block w-100 hero-img"
          alt="Slide 2"
          fluid
        />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <Image 
          src={gambar1}
          className="d-block w-100 hero-img"
          alt="Slide 3"
          fluid
        />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </section>
  );
}

export default Hero;
