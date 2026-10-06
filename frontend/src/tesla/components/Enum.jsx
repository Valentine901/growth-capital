// frontend/src/constants.js

export const WheelsEnum = Object.freeze({
  AERO_19: "AERO 19",
  SPORT_20: "SPORTS 20",
  PERFORMANCE_21: "PERFORMANCE 21",
  TURBINE_22: "TURBINE 22",
});

export const CarModelEnum = Object.freeze({
  TESLA_NEURALINK_V1: "TESLA NEURALINK V1",
  TESLA_NEURALINK_X: "TESLA NEURALINK X",
  TESLA_NEURALINK_GT: "TESLA NEURALINK GT",
});

export const InteriorColorEnum = Object.freeze({
  ALL_BLACK: "ALL BLACK",
  BLACK_AND_WHITE: "BLACK AND WHITE",
  PREMIUM_TAN: "PREMIUM TAN",
});

export const ExteriorColorEnum = Object.freeze({
  DEEP_BLUE_METALLIC: "DEEP BLUE METALLIC",
  PEARL_WHITE_MULTI_COAT: "PEARL WHITE MULTI COAT",
  SOLID_BLACK: "SOLID BLACK",
  RED_MULTI_COAT: "RED MULTI COAT",
  MIDNIGHT_SHOW_METALLIC: "MIDNIGHT SILVER METALLIC",
  QUANTUM_GRAY: "QUANTUM GRAY",
});

export const PackagesEnum = Object.freeze({
  PREMIUM_INTERIOR: "PREMIUM INTERIOR",
  ENHANCED_AUTOPILOT: "ENHANCE PILOT",
  FULL_SELF_DRIVING: "Full Self Driving",
  COLD_WEATHER: "Cold Weather",
  TOWING: "Towing",
  TRACK: "Track",
});

export const PaymentMethod = Object.freeze({
  BITCOIN: "Bitcoin",
  ETHEREUM: "Ethereum",
  BNB: "bnb",
  TRON: "Tron",
});

export const PaymentStatus = Object.freeze({
  SUCCESS: "success",
  PENDING: "pending",
  DECLINED: "declined",
});
