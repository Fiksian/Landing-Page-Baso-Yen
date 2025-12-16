import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';

import gambar1 from '../assets/Photo/foto baru/foto_Salinan R 11.jpg';
import gambar2 from '../assets/Photo/foto baru/foto_DSCF9834.jpg'; 
import gambar3 from '../assets/Photo/foto baru/foto_Salinan R 5.jpg'; 

const carouselData = [
    {
        image: gambar1,
        title: "Sajian Praktis Istimewa Baso Yen",
        text: "Kualitas premium, rasa otentik, solusi mudah untuk dapur profesional Anda.",
        alt: "Slide 1: Bakso dan Mie"
    },
    {
        image: gambar2,
        title: "Inovasi Rasa Tiada Batas",
        text: "Berbagai pilihan produk, mulai dari bakso, mie, hingga kulit pangsit premium.",
        alt: "Slide 2: Sosis dan Pelengkap"
    },
    {
        image: gambar3,
        title: "Mitra Terpercaya Bisnis Kuliner",
        text: "Telah dipercaya oleh hotel, restoran, dan katering ternama.",
        alt: "Slide 3: Bahan Baku Kualitas"
    }
];

function Hero() {
  return (
    <section id="home">
        <Carousel fade> 
            {carouselData.map((slide, index) => (
                <Carousel.Item key={index} interval={5000}>
                    <Image 
                        src={slide.image} 
                        className="d-block w-100 hero-img"
                        alt={slide.alt}
                        fluid
                    />
                    <Carousel.Caption className="text-start">
                        <h1 className="display-4 fw-bolder mb-3">{slide.title}</h1>
                        <p className="fs-5">{slide.text}</p>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    </section>
  );
}

export default Hero;