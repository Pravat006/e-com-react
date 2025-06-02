import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import RandomProductCard from "../products/RandomProductCard";
import ProductService from "../../services/product.service.js";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function RandomProduct() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await ProductService.getRandomProducts()
        if (res.success) {
          setData(res?.data);
          console.log(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);


  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full max-w-[1800px]"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {data?.map((item) => (
          <CarouselItem key={item?._id} className="md:basis-1/3  lg:basis-1/4">
            <RandomProductCard
              image={item?.image}
              name={item?.name}
              price={item?.price}
              product={item}
              id={item?._id}
            />
          </CarouselItem>
        ))}
        ;
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
