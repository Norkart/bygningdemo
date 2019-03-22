export const getFontIcon = bygningstype => {
  switch (bygningstype) {
    case "Rekkehus":
      return "home";
    case "Jernbane- og T-banestasjon":
      return "train";
    case "Garasjeuthus anneks til bolig":
      return "warehouse";
    case "Kontor- og adm.bygning rådhus":
      return "landmark";
    case "Hotellbygning":
      return "hotel";
    case "Annen kontorbygning":
      return "briefcase";
    case "Bo- og behandlingssenter":
      return "clinic-medical";
    case "Sykehjem":
      return "clinic-medical";
    case "Sykehus":
      return "hospital-alt";
    case "Lagerhall":
      return "th";
    case "Barnehage":
      return "school";
    case "Butikk/forretningsbygning":
      return "store-alt";
    case "Kirkesogn":
      return "place-of-worship";
    case "Kloster":
      return "place-of-worship";
    case "Kirke kapell":
      return "place-of-worship";
    case "Monument":
      return "monument";
    default:
      if (bygningstype.toLowerCase().includes("bolig")) return "home";
      else if (bygningstype.toLowerCase().includes("skole")) return "school";
      return "building";
  }
};
