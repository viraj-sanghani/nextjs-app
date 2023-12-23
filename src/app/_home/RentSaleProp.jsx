import PropertySwiper from "@/components/Swiper/PropertySwiper";
import Loading from "@/components/Loading";
import { useGetHomePage } from "@/queryHooks/useHomePage";

function RentSaleProp() {
  const { data, isLoading: loading, isFetching } = useGetHomePage();

  return (
    <>
      {data?.sale && data?.sale.length > 0 ? (
        <>
          <div className="s-section-title max-width">
            <h3>SALE</h3>
            <h2>PROJECTS</h2>
          </div>

          <PropertySwiper data={data.sale} />
        </>
      ) : (
        <div className="data-loader">
          <Loading />
        </div>
      )}

      {data?.rental && data?.rental.length > 0 ? (
        <>
          <div className="s-section-title max-width">
            <h3>RENTAL</h3>
            <h2>PROJECTS</h2>
          </div>

          <PropertySwiper data={data.rental} />
        </>
      ) : (
        <div className="data-loader">
          <Loading />
        </div>
      )}
    </>
  );
}

export default RentSaleProp;
