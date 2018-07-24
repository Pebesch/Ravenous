const apiKey = 'hCSXTrJ8e5Anhg1wQxekehC-Sqq4PzECkCEI6DDEjRNpvdVLzvAdO9zM1y5PbxQH3hqYR9ZwurS_5FYtnlDslgrn4zUolieLTPW7Xo2ri291i8_zeZ619p_jEg1XW3Yx';

const Yelp = {
  search: (term, location, sortBy) => {
    const prefix = 'https://cors-anywhere.herokuapp.com/';
    const url = `https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`;
    return fetch(prefix + url, {
      headers: {
        Authorization: `Bearer ${apiKey}`
      }
    }).then(response => {
      return response.json();
    }).then(jsonResponse => {
      if(jsonResponse.businesses){
        return jsonResponse.businesses.map(business => ({
          id: business.id,
          imageSrc: business.image_url,
          name: business.name,
          address: business.location.address1,
          city: business.location.city,
          state: business.location.state,
          zipCode: business.location.zip_code,
          category: business.categories[0].title,
          rating: business.rating,
          reviewCount: business.review_count
        }));
      }
    });
  }
}

export default Yelp;
