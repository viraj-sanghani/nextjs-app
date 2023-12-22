import Image from "next/image";

const AboutUs = () => {
  return (
    <div>
      <div className="page-title">
        <Image
          height={100}
          width={100}
          src="/img/about-us.png"
          alt="About us"
        />
        <h1>About Us</h1>
      </div>
      <div className="max-width page-content">
        <p>
          Launched in 2023, <b>housingmagic.com</b>, India’s No. 1 property
          portal, deals with every aspect of the consumers’ needs in the real
          estate industry. It is an online forum where buyers, sellers and
          brokers/agents can exchange information about real estate properties
          quickly, effectively and inexpensively. At <b>housingmagic.com</b>,
          you can advertise a property, search for a property, browse through
          properties, build your own property specified microsite, and keep
          yourself updated with the latest news and trends making headlines in
          the realty sector.
        </p>
        <h3 className="page-con-title">
          Why <b>Housingmagic.com</b>?
        </h3>
        <p>
          At present, <b>housingmagic.com</b> prides itself for having around
          seven hundred property listings spanning across 5 cities in India. In
          addition to providing an online platform to real estate developers,
          brokers and property owners for listing their property for sale,
          purchase or rent, <b>housingmagic.com</b> offers advertisement stints
          such as microsites, banners, home page links and project pages to the
          clients for better visibility and branding in the market. With the
          ever-evolving online search behaviour, <b>housingmagic.com</b> shares
          updated information pertinent to real estate activities, assisting
          prospective buyers to make informed buying decision. We make online
          property search easier, quicker and smarter!
        </p>
        <p>
          At Housing Magic we build long-term relationships, which allow us to
          provide personalised, clear and considered advice on all areas of
          property in all key markets. We believe personal interaction is a
          crucial part of ensuring every client is matched to the property that
          suits their needs best – be it commercial or residential.
        </p>
        <p>
          We believe that inspired teams naturally provide excellent and
          dedicated client service. Therefore, we’ve created a workplace where
          opinions are respected, where everyone is invited to contribute to the
          success of our business and where they’re rewarded for excellence. The
          result is that our people are more motivated, ensuring your experience
          with us is the best that it can be.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
