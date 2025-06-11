import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { useProducts } from "../services/Product";
import Card from "../ui/Card"
import Spinner from '../ui/Spinner'
import Pattern1 from '../assets/images/pattern_1.png'
import Button from "../ui/Button"
import PagesTitle from "../components/PagesTitle";
import ProductCard from "../components/cards/ProductCard";

const Products = () => {
  const { data, error, isLoading } = useProducts();

  return (
    <>
      <div className="flex items-center justify-between">
        <PagesTitle />
        <Button classNames={'bg-brand-primary-blue text-white px-3 py-3'}>Add New Product</Button>
      </div>

      <Card classNames={'px-4 py-5 sm:p-6'} style={{ backgroundImage: `url(${Pattern1})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#4880FF', color: 'white', marginTop: '20px', position: 'relative' }}>
        <div className="px-20">
          <p className="text-[.75rem]">September 12-22</p>
          {/* //fixme - h3-enjoy resize */}
          <h3 className="text-[1.5rem] font-black mt-1 md:w-1/3 ">Enjoy free home delivery this summer</h3>
          <p className="text-[.75rem] mt-1">Designer Dresses - Pick from trendy Designer Dress.</p>
          <Button classNames={'px-5 py-2'} style={{ backgroundColor: '#FF8743', color: 'white', marginTop: '20px' }}>Get Started</Button>
        </div>
        <span className="absolute top-1/2 left-0 right-0 flex items-center justify-between transform -translate-y-1/2 p-5">
          <IoChevronBackOutline className="bg-[rgba(226,234,248,0.8)] text-[#626262] rounded-full p-2 h-8 w-8 flex items-center justify-center cursor-pointer" />
          <IoChevronForwardOutline className="bg-[rgba(226,234,248,0.8)] text-[#626262] rounded-full p-2 h-8 w-8 flex items-center justify-center cursor-pointer" />
        </span>
      </Card>

      {
        error
          ? <h1>Error fetching data: {error.message}</h1>
          : isLoading
            ? <div className="mt-20"><Spinner /></div>
            :
            <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-5">
              {
                data.map((product, index) => (
                  <ProductCard key={index} product={product} />
                ))
              }
            </div>
      }
    </>
  )
}

export default Products