import { GetStaticPaths, GetStaticProps } from "next"
import Image from 'next/image'

import { ImageContainer, ProductContainer, ProductDetails } from "@/styles/pages/product"
import { stripe } from "@/lib/stripe"
import Stripe from "stripe"
import { useRouter } from "next/router"

interface ProductProps {
  product: {
      id: string,
      name: string,
      description: string,
      imagesUrl: string,
      price: string
  }
}

export default  function Product({ product }: ProductProps) {
  const { isFallback } = useRouter()
  
  if (isFallback) {
    return <div>Loading...</div>
  }

  return (
    <ProductContainer>
      <ImageContainer>
       <Image src={product.imagesUrl} width={520} height={480} alt=""/>
      </ImageContainer>
      <ProductDetails>
        <h1>{product.name}</h1>
        <span>{ product.price }</span>

        <p>{product.description}</p>
        <button>Compre agora</button>
      </ProductDetails>
    </ProductContainer>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  
  const response = await stripe.products.list()
  
  const productsID = response.data.map((product) => ({ params: { id: product.id} }))
  console.log(productsID)
  return {
    paths: productsID,
    fallback: true
  }
}


export const getStaticProps: GetStaticProps<any, { id: string }> = async ({params}) => {
  
  
  const productId = params?.id || ''
  
  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'] 
  })

  const price = product.default_price as Stripe.Price
 

  return {
    props: {
      product: {
      id: product.id,
      name: product.name,
      description: product.description,
      imagesUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        
      }).format((price.unit_amount as number / 100))
    }
    },
    revalidate: 60 * 60 * 1, // 1 hour
  }
}