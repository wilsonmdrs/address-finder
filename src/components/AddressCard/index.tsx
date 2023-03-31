import { ReactComponent as LocationIcon } from "../../assets/location.svg";
import { PostCode } from "../../hooks/usePostCode";

interface AddressCardProps extends PostCode {}

export const AddressCard = ({
  postcode,
  name,
  country,
  region,
  latitude,
  longitude,
}: AddressCardProps) => {
  const calculateDistance = () => {
    const airportLatitude = 51.4700223;
    const airportLongitude = -0.4542955;
    const R = 3958.8;
    const dLat = deg2rad(airportLatitude - latitude);
    const dLon = deg2rad(airportLongitude - longitude);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(latitude)) *
        Math.cos(deg2rad(airportLatitude)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distanceMiles = R * c;
    const distanceKm = distanceMiles * 1.609344;
    return { distanceKm, distanceMiles };
  };
  const deg2rad = (deg: number) => {
    return deg * (Math.PI / 180);
  };

  return (
    <div className="flex flex-col py-2 pl-2 border-b-[1px] border-blue">
      <p className="text-sm flex gap-2">
        <LocationIcon />
        <span>{`${postcode} - ${name} - ${region} - ${country}`}</span>
      </p>
      <p className="text-xs text-gray-text pl-5">{`${calculateDistance().distanceKm.toFixed(
        2
      )} km from London Heathrow Airport`}</p>
      <p className="text-xs text-gray-text pl-5">{`(${calculateDistance().distanceMiles.toFixed(
        2
      )} Miles)`}</p>
    </div>
  );
};
