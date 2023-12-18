const finalData = {
  city: ["Mumbai", "Thane", "Pune", "Navi Mumbai", "Raigarh"],
  propertyType: [
    "Flat/Apartment",
    "Residential House",
    "Villa",
    "Builder Floor Apartment",
    "Residential Land/Plot",
    "Penthouse",
    "Studio Apartment",
    "Commercial Office Space",
    "Office in IT Park/SEZ",
    "Commercial Shop",
    "Commercial Showroom",
    "Commercial Land",
    "Warehouse/Godown",
    "Industrial Land",
    "Industrial Building",
    "Industrial Shed",
    "Agricultural Land",
    "Farm House",
  ],
  postFor: ["Sale", "Rent"],
  constructionStatus: ["Ready to Move", "Under Construction"],
  postBy: ["Channel Partner", "Owner", "Builder"],
  furnishing: ["Furnished", "Unfurnished", "Semi-Furnished"],
};

export const processSearch = (text) => {
  const result = {
    bedRoom: [],
    city: [],
    propertyType: [],
    constructionStatus: [],
    postFor: [],
    postBy: [],
    furnishing: [],
  };

  const bedroomRegex = /\b(\d+)\s*(bhk|bedroom|bed|bedrooms)\b/i;
  const cityRegex = /\b(?:Mumbai|Thane|Pune|Navi Mumbai|Raigarh)\b/i;
  const propertyTypeRegex =
    /\b(?:Flat|Apartment|Residential|House|Villa|Residential Land|Plot|Penthouse|Studio Apartment|Commercial|Commercial Office|Office|Commercial Shop|Shop|Showroom|Commercial Land|Warehouse|Godown|Industrial Land|Building|Shed|Agricultural Land|Land|Farm House)\b/i;
  const postForRegex = /\b(?:Sale|Rent)\b/i;
  const constructionStatusRegex =
    /\b(?:Ready to Move|Ready|Under Construction|Construction)\b/i;
  const postByRegex = /\b(?:Channel Partner|Owner|Builder)\b/i;
  const furnishingRegex =
    /\b(?:Furnished|Unfurnished|Semi-Furnished|Semi Furnished)\b/i;

  const bedroomMatch = text.match(bedroomRegex);
  const cityMatch = text.match(cityRegex);
  const propertyTypeMatch = text.match(propertyTypeRegex);
  const postForMatch = text.match(postForRegex);
  const constructionStatusMatch = text.match(constructionStatusRegex);
  const postByMatch = text.match(postByRegex);
  const furnishingMatch = text.match(furnishingRegex);

  if (bedroomMatch) {
    const bedroomNumber = bedroomMatch[1];
    result.bedRoom.push(bedroomNumber);
  }

  if (cityMatch) {
    const matched = finalData.city.filter((type) =>
      cityMatch.some((ele) => type.toLowerCase().includes(ele.toLowerCase()))
    );
    result.city.push(...matched);
  }

  if (propertyTypeMatch) {
    const matched = finalData.propertyType.filter((type) =>
      propertyTypeMatch.some((ele) =>
        type.toLowerCase().includes(ele.toLowerCase())
      )
    );
    result.propertyType.push(...matched);
  }

  if (postForMatch) {
    const matched = finalData.postFor.filter((type) =>
      postForMatch.some((ele) => type.toLowerCase().includes(ele.toLowerCase()))
    );
    result.postFor.push(...matched);
  }

  if (constructionStatusMatch) {
    const matched = finalData.constructionStatus.filter((type) =>
      constructionStatusMatch.some((ele) =>
        type.toLowerCase().includes(ele.toLowerCase())
      )
    );
    result.constructionStatus.push(...matched);
  }

  if (postByMatch) {
    const matched = finalData.postBy.filter((type) =>
      postByMatch.some((ele) => type.toLowerCase().includes(ele.toLowerCase()))
    );
    result.postBy.push(...matched);
  }

  if (furnishingMatch) {
    const matched = finalData.furnishing.filter((type) =>
      furnishingMatch.some((ele) => {
        return (
          type.toLowerCase() == ele.toLowerCase() ||
          type.toLowerCase() == ele.toLowerCase().replace(" ", "-")
        );
      })
    );
    result.furnishing.push(...matched);
  }

  return result;
};
