import { getGeocode, getLatLng } from "use-places-autocomplete";

export async function geocoding(inputBox) {
  const address = {};
  const results = await getGeocode({ address: inputBox });
  results[0].address_components.map((a) => {
    if (a.types.includes("country")) address.country_code = a.short_name;
    if (a.types.includes("administrative_area_level_1")) address.state_code = a.short_name;
    if (a.types.includes("administrative_area_level_2")) address.city = a.short_name;
    if (a.types.includes("sublocality", "sublocality_level_1")) address.district = a.short_name;
    if (a.types.includes("route")) address.street = a.short_name;
    if (a.types.includes("street_number")) address.street_number = a.short_name;
    if (a.types.includes("postal_code")) address.postal_code = a.short_name;
  });

  address.full_address = results[0].formatted_address;

  const latLng = await getLatLng(results[0]);
  const { lat, lng } = latLng;
  address.latitude = lat;
  address.longitude = lng;

  return address;
}
