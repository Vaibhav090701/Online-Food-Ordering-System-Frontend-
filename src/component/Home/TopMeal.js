import PaneerButterMasalaImg from '../../assets/Paneer-Butter-Masala.jpg';
import BiryaniImg from '../../assets/Biryani.jpg';
import SamosaImg from '../../assets/Samosa.jpg';
import mobile1 from '../../assets/mobile1.jpg';
import mobile2 from '../../assets/mobile2.jpg';
import mobile3 from '../../assets/mobile3.jpg';
import CT1 from '../../assets/CT1.jpg';
import CT2 from '../../assets/CT2.jpg';
import offer1 from '../../assets/discount.jpg'
import offer2 from '../../assets/But1Get1.jpg'
import CTA from '../../assets/CTA.jpg'



export const featuredDishes = [
    {
      image: PaneerButterMasalaImg,
      name: "Paneer Butter Masala",
    },
    {
      image: BiryaniImg,
      name: "Biryani",
    },
    {
      image: SamosaImg,
      name: "Samosa",
    },
  ];


  export const workProcess=[
    {
        image:mobile1,
        action:"Browse Menu",
        description:"Choose from a variety of mouth-watering dishes."
    },
    {
        image:mobile2,
        action:"Place Order",
        description:"Select your meal and place your order."
    },
    {
        image:mobile3,
        action:"Enjoy Delivery",
        description:"Fast and convenient delivery to your door"
    },

  ]

  export const customerTestimonials=[
    {
        image:CT1,
        description:"The paneer butter masala was amazing! So creamy and flavorful. Delivery was super fast!",
        name:"Ayesha"
    },
    {
        image:CT2,
        description:"I love the vegetable biryani, such a perfect blend of spices and veggies. Definitely ordering again!",
        name:"Rajesh"
    }
  ]

  export const specialOffers=[
    {
        image:offer1,
        description:"Get 15% Off on Your First Order",
        offer:"Use code: FIRST15",
        icon: 'discount',
    },
    {
        image:offer2,
        description:"BOGO on Samosas",
        offer:"Buy one, get one free on all samosas.",
        icon: 'offer',

    }
  ]

