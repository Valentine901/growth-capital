import enum 

class WheelsEnum(str, enum.Enum):
    AERO_19 = '19" Aero Wheels'
    SPORT_20 = '20" Cyber Wheels'
    PERFORMANCE_21 = '21" Performance Wheels'
    TURBINE_22 = '22" Turbine Wheels',

class CarModelEnum(str, enum.Enum):
    TESLA_NEURALINK_V1 = "TESLA NEURALINK V1"
    TESLA_NEURALINK_X = "TESLA NEURALINK X"
    TESLA_NEURALINK_GT = "TESLA NEURALINK GT"

class InteriorColorEnum(str, enum.Enum):
    ALL_BLACK = "All Black"
    BLACK_AND_WHITE = "Black and White"
    PREMIUM_TAN = "Premium Tan"

class ExteriorColorEnum(str, enum.Enum):
    DEEP_BLUE_METALLIC = "Deep Blue Metallic"
    PEARL_WHITE_MULTI_COAT = "Pearl White Multi Coat"
    SOLID_BLACK = "Solid Black"
    RED_MULTI_COAT = "Red Multi Coat"
    MIDNIGHT_SHOW_METALLIC = "Midnight Silver Metallic"
    QUANTUM_GRAY = "Quantum Gray"

class PackagesEnum(str, enum.Enum):
    PREMIUM_INTERIOR = 'Premium Interior Package'
    ENHANCED_AUTOPILOT = 'Enhanced Autopilot'
    FULL_SELF_DRIVING = 'Full Self-Driving Capability'
    COLD_WEATHER = 'Cold Weather Package'
    TOWING = 'Towing Package'
    TRACK = 'Track Package'

class PaymentMethod(str, enum.Enum):
    BITCOIN = "Bitcoin"
    ETHEREUM = "Ethereum"
    BNB = "bnb"
    TRON = "Tron"

class PaymentStatus(str, enum.Enum):
    SUCCESS = "success"
    PENDING = "pending"
    DECLINED = "declined"