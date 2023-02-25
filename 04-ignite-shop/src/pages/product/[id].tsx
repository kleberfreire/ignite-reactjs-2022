import { useRouter } from "next/router"

export default  function Product() {

  const { query } = useRouter()
  console.log(query.id)

  return (
    <h1>Produtos</h1>
  )
}