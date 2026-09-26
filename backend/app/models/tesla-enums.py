import enum 

class WheelsEnum(str, enum.Enum):
    AERO_19 = "aero_19"
    SPORT_20 = "sport_20"
    PERFORMANCE_21 = "performance_21"
    TURBINE_22 = "turbine_22"

class CarModelEnum(str, enum.Enum):
    TESLA_NEURALINK_V1 = "tesla_neuralink_v1"
    TESLA_NEURALINK_X = "tesla_neuralink_x"
    TESLA_NEURALINK_GT = "tesla_neuralink_gt"

class InteriorColorEnum(str, enum.Enum):
    ALL_BLACK = "all_black"
    BLACK_AND_WHITE = "black_and_white"
    PREMIUM_TAN = "premium_tan"

class ExteriorColorEnum(str, enum.Enum):
    DEEP_BLUE_METALLIC = "deep_blue_metallic"
    PEARL_WHITE_MULTI_COAT = "pearl_white_multi_coat"
    SOLID_BLACK = "solid_black"
    RED_MULTI_COAT = "red_multi_coat"
    MIDNIGHT_SHOW_METALLIC = "midnight_silver_metallic"
    QUANTUM_GRAY = "quantum_gray"

class PackagesEnum(str, enum.Enum):
    PREMIUM_INTERIOR = "premium_interior"
    ENHANCED_AUTOPILOT = "enhanced_autopilot"
    FULL_SELF_DRIVING = "full_self_driving"
    COLD_WEATHER = "cold_weather"
    TOWING = "towing"
    TRACK = "track"