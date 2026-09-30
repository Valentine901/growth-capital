import enum 

class WheelsEnum(str, enum.Enum):
    AERO_19 = "AERO 19"
    SPORT_20 = "SPORTS 20"
    PERFORMANCE_21 = "PERFORMANCE 21"
    TURBINE_22 = "TURBINE 22"

class CarModelEnum(str, enum.Enum):
    TESLA_NEURALINK_V1 = "TESLA NEURALINK V1"
    TESLA_NEURALINK_X = "TESLA NEURALINK X"
    TESLA_NEURALINK_GT = "TESLA NEURALINK GT"

class InteriorColorEnum(str, enum.Enum):
    ALL_BLACK = "ALL BLACK"
    BLACK_AND_WHITE = "BLACK AND WHITE"
    PREMIUM_TAN = "PREMIUM TAN"

class ExteriorColorEnum(str, enum.Enum):
    DEEP_BLUE_METALLIC = "DEEP BLUE METALLIC"
    PEARL_WHITE_MULTI_COAT = "PEARL WHITE MULTI COAT"
    SOLID_BLACK = "SOLID BLACK"
    RED_MULTI_COAT = "RED MULTI COAT"
    MIDNIGHT_SHOW_METALLIC = "MIDNIGHT SILVER METALLIC"
    QUANTUM_GRAY = "QUANTUM GRAY"

class PackagesEnum(str, enum.Enum):
    PREMIUM_INTERIOR = "PREMIUM INTERIOR"
    ENHANCED_AUTOPILOT = "ENHANCE PILOT"
    FULL_SELF_DRIVING = "Full Self Driving"
    COLD_WEATHER = "Cold Weather"
    TOWING = "Towing"
    TRACK = "Track"

class PaymentMethod(str, enum.Enum):
    TRANSFER = "Transfer"
    BITCOIN = "Bitcoin"
    ETHEREUM = "Ethereum"
    USDT = "Usdt"
