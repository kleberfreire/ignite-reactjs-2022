import Image from 'next/image'
import { GetStaticProps } from 'next'

import { useKeenSlider } from 'keen-slider/react'

import { HomeContainer, Product } from '@/styles/pages/Home'

import 'keen-slider/keen-slider.min.css'
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'

interface HomeProps {
  products: {
      id: string,
      name: string,
      description: string,
      imagesUrl: string,
      price: number
  }[]
}

export default function Home({products}: HomeProps) {
    const [sliderRef] = useKeenSlider(
      {
        slides: {
          perView: 3,
          spacing: 48
        },

      },
    )

  return (
    <HomeContainer ref={sliderRef} className="keen-slider">
      {products && products.map(product => (
        <Product className="keen-slider__slide" key={product.id+product.name}>
          <Image src={product.imagesUrl} width={520} height={480} alt=""/>
          <footer>
            <strong>{ product.name}</strong>
            <span>R$ {product.price}</span>
          </footer>
        </Product>
      ))}
    </HomeContainer>
  )
}



export const getStaticProps:GetStaticProps = async () => { 
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const formCurrency = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2
  })

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      imagesUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        
      }).format((price.unit_amount as number / 100))
    }
  })
  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2 // 2 hours
  }
}