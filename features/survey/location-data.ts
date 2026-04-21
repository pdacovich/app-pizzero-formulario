export interface LocationNode {
  country: string;
  cities: Array<{
    city: string;
    localities: string[];
  }>;
}

export const locationTree: LocationNode[] = [
  {
    country: "Argentina",
    cities: [
      { city: "Buenos Aires", localities: ["CABA", "La Plata", "Mar del Plata", "Bahia Blanca"] },
      { city: "Cordoba", localities: ["Cordoba Capital", "Villa Carlos Paz", "Rio Cuarto", "Villa Maria"] },
      { city: "Santa Fe", localities: ["Rosario", "Santa Fe Capital", "Rafaela", "Venado Tuerto"] },
      { city: "Mendoza", localities: ["Mendoza Capital", "Godoy Cruz", "Guaymallen", "San Rafael"] }
    ]
  },
  {
    country: "Uruguay",
    cities: [
      { city: "Montevideo", localities: ["Centro", "Pocitos", "Cordón", "Carrasco"] },
      { city: "Canelones", localities: ["Ciudad de la Costa", "Las Piedras", "Pando", "Atlántida"] },
      { city: "Maldonado", localities: ["Punta del Este", "Maldonado", "San Carlos", "Piriápolis"] }
    ]
  },
  {
    country: "Chile",
    cities: [
      { city: "Santiago", localities: ["Las Condes", "Providencia", "Maipu", "La Florida"] },
      { city: "Valparaiso", localities: ["Valparaiso", "Vina del Mar", "Quilpue", "Villa Alemana"] },
      { city: "Concepcion", localities: ["Concepcion", "Talcahuano", "Chiguayante", "San Pedro de la Paz"] }
    ]
  },
  {
    country: "Mexico",
    cities: [
      { city: "Ciudad de Mexico", localities: ["Coyoacan", "Roma Norte", "Polanco", "Benito Juarez"] },
      { city: "Guadalajara", localities: ["Zapopan", "Tlaquepaque", "Tonala", "Centro"] },
      { city: "Monterrey", localities: ["San Pedro", "Guadalupe", "Apodaca", "Santa Catarina"] }
    ]
  },
  {
    country: "Espana",
    cities: [
      { city: "Madrid", localities: ["Centro", "Salamanca", "Chamartin", "Arganzuela"] },
      { city: "Barcelona", localities: ["Eixample", "Gracia", "Sants", "Poblenou"] },
      { city: "Valencia", localities: ["Ciutat Vella", "Ruzafa", "Benimaclet", "Patraix"] }
    ]
  }
];

export function getCitiesByCountry(countryName: string) {
  return locationTree.find((item) => item.country === countryName)?.cities ?? [];
}

export function getLocalitiesByCountryAndCity(countryName: string, cityName: string) {
  return getCitiesByCountry(countryName).find((item) => item.city === cityName)?.localities ?? [];
}
