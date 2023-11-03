export const Api = {
  // Restaurant Menu;
  GetRestaurantMenuList: "/restaurants/api/MenuItem",
  RestaurantMenuCreate: "/restaurants/api/MenuItem",
  RestaurantMenuUpdate: "/restaurants/api/MenuItem/",
  RestaurantMenuDelete: "/restaurants/api/MenuItem/",
  GetSingleRestaurantMenu: "/restaurants/api/MenuItem/",
  GetRestaurantMenuBranch: "/restaurants/api/Branch/GetBranchNames",
  GetRestaurantMenuCategory: "/restaurants/api/Category/GetNamesByBranchIds",
  GetRestaurantMenuTimeSlot:
    "/restaurants/api/MenuItemTimeSlot/GetMenuItemTimeSlotNamesByBranchId",
  GetRestaurantMenuPreset: "/restaurants/api/AddOnCategory/GetNamesWithPreset",

  //   PromoCode
  PromoCodeList: "/restaurants/api/promocode",
  PromoCodeTypes: "/restaurants/api/PromoCodeType/GetAllPromoCodeType",
  PromoCodeCreate: "/restaurants/api/PromoCode",
  GetSinglePromoCode: "/restaurants/api/PromoCode/", // Shift swap status

  // Promotion
  Promotion: "/restaurants/api/Promotion",

  // Campaign
  Campaign: "/system-operations/api/Campaign",
  // Shift swap status
  GetShiftSwapStatusList: "/riders/api/ShiftSwapStatus",
  // batch level
  GetBatchLevelList: "/riders/api/BatchLevel",
  // reward level settings
  GetRewardLevelList: "/user-accounting/reward-level-setting",
  // Add ons category
  GetAddOnsCategoryList: "/restaurants/api/AddOnCategory",
  // Payment Type
  GetPaymentTypeList: "/riders/api/PaymentType",
  //Menu Item TimeSlot
  GetMenuTimeSlotList: "/restaurants/api/MenuItemTimeSlot",
  GetSingleMenuTimeSlotList: "/restaurants/api/MenuItemTimeSlot/",
  TimeSlotMenuCreate: "/restaurants/api/MenuItemTimeSlot",
  TimeSlotMenuUpdate: "/restaurants/api/MenuItemTimeSlot/",
  RemoveTimeSlotMenu: "/restaurants/api/MenuItemTimeSlot/",
  BranchListOfTimeSlotMenu: "/restaurants/api/Branch/GetBranchNames",

  //Restaurant Review & Ratings
  ReviewList: "/restaurants/api/Review",
  RemoveReviewList: "/restaurants/api/Review/",

  //Rider Review & Ratings
  RiderReviewList: "/riders/api/Review",
  RemoveRiderReview: "/riders/api/Review/",

  //Rider Wallet
  RiderWalletList: "/riders/api/Wallet",

  //System on/off reason
  GetReasonListOfSystemOnOff: "/system-operations/api/SystemOnOffReason",
  GetReasonIdOfSystemOnOff: "/system-operations/api/SystemOnOffReason/",
  CreateReasonOfSystemOnOff: "/system-operations/api/SystemOnOffReason",
  UpdateListOfSystemOnOff: "/system-operations/api/SystemOnOffReason/",
  RemoveListOfSystemOnOff: "/system-operations/api/SystemOnOffReason/",

  //Advertisement
  GetListOfAdvertisement: "/system-operations/api/Advertisement",
  GetIdOfAdvertisement: "/system-operations/api/Advertisement/",
  CreateAdvertimentList: "/system-operations/api/Advertisement",
  UpdateAdvertisementList: "/system-operations/api/Advertisement/",
  RemoveListOfAdvertisement: "/system-operations/api/Advertisement/",

  //Amount Threshold
  GetThresholdList: "/orders/amount-thresholds",
  GetThresholdListId: "/orders/amount-thresholds/",
  CreateThresholdList: "/orders/amount-thresholds",
  UpdateThresholdList: "/orders/amount-thresholds/",
  RemoveThresholdList: "/orders/amount-thresholds/",

  //Special Hour Type
  GetListOfSpecialHourType: "/system-operations/api/SpecialHourType",
  GetIdOfSpecialHourType: "/system-operations/api/SpecialHourType/",
  CreateSpecialHourType: "/system-operations/api/SpecialHourType",
  UpdateSpecialHourType: "/system-operations/api/SpecialHourType/",
  RemoveSpecialHourType: "/system-operations/api/SpecialHourType/",

  //Weekday
  GetListOfWeekDay: "/system-operations/api/WeekDay",
  GetIdOfWeekDay: "/system-operations/api/WeekDay/",
  CreateWeekDay: "/system-operations/api/WeekDay",
  UpdateWeekday: "/system-operations/api/WeekDay/",
  RemoveWeekDay: "/system-operations/api/WeekDay/",

  //BagType
  GetListOfBagTypes: "/riders/api/BagType",
  GetIdOfBagTypes: "/riders/api/BagType/",
  CreateBagTypes: "/riders/api/BagType",
  updateBagTypes: "/riders/api/BagType/",
  RemoveBagTypes: "/riders/api/BagType/",

  //RiderType
  GetListOfRiderTypes: "/riders/api/RiderType",

  //Category
  GetCategoryList: "/restaurants/api/Category",
  // Zone
  ZoneList: "/system-operations/api/Zone",
  ZoneDelete: "/system-operations/api/Zone/",
  ZoneCityOptionList: "/system-operations/api/City/Option",
  ZoneCreate: "/system-operations/api/Zone",
  GetSingleZone: "/system-operations/api/Zone/",
  UpdateSingleZone: "/system-operations/api/Zone/",

  // City
  City: "/system-operations/api/City",

  // Branch Attribute
  BranchAttribute: "/restaurants/api/BranchAttribute",

  // User
  User: "/users/api/User",

  // Campaign
  Campaign: "/restaurants/api/Campaign",

  // User Type
  UserType: "/users/api/UserType",

  // Popup Banner
  PopupBanner: "/system-operations/api/PopUpBanner",

  // Km Wise delivery charge
  GetKmWiseChargeList: "/riders/api/KilometerWiseDeliveryCharge",
  KmWiseDeliveryChargeList: "/riders/api/KilometerWiseDeliveryCharge",
  GetKmWiseDeliveryCharge: "/riders/api/KilometerWiseDeliveryCharge",
  KmWiseDeliveryChargeCreate: "/riders/api/KilometerWiseDeliveryCharge",
  KmWiseDeliveryChargeEdit: "/riders/api/KilometerWiseDeliveryCharge",
  KmWiseDeliveryChargeDelete: "/riders/api/KilometerWiseDeliveryCharge",

  // Night shift delivery charge
  GetNightShiftDeliveryChargeList: "/riders/api/NightShiftDeliveryCharge",
  NightShiftDeliveryChargeList: "/riders/api/NightShiftDeliveryCharge",
  GetNightShiftDeliveryCharge: "/riders/api/NightShiftDeliveryCharge",
  NightShiftDeliveryChargeCreate: "/riders/api/NightShiftDeliveryCharge",
  NightShiftDeliveryChargeEdit: "/riders/api/NightShiftDeliveryCharge",
  NightShiftDeliveryChargeDelete: "/riders/api/NightShiftDeliveryCharge",

  // Rider delivery charge
  RiderdeliveryChargeList: "/riders/api/RiderDeliveryCharge",
  GetRiderdeliveryCharge: "/riders/api/RiderDeliveryCharge",
  RiderDeliveryChargeCreate: "/riders/api/RiderDeliveryCharge",
  RiderDeliveryChargeEdit: "/riders/api/RiderDeliveryCharge",
  RiderDeliveryChargeDelete: "/riders/api/RiderDeliveryCharge",

  //  **************
  // ALL OPTIONS API
  //  **************
  GetCityOptions: "/system-operations/api/City/Option",
  GetZoneOptions: "/system-operations/api/Zone/Option",
  GetRestaurantOptions: "/restaurants/api/Restaurant/GetAllNames",
  GetSubscriptionTypeOptions: "/user-accounting/subscription-type",
  GetUserOptions: "/users/api/User/GetUserNames",
  GetBranchOptions: "/restaurants/api/Branch/GetBranchNames",
  GetCuisineOptions: "/restaurants/api/Cuisine/GetAllNames",
  GetMenuItemOptionsByBranch: "/restaurants/api/MenuItem/GetNamesByBranchIds",
  GetCategoriesByBranch: "restaurants/api/Category/GetNamesByBranchIds",

  //  ***********

  // Reward point settings
  GetRewardPointSettingsList: "/user-accounting/reward-point-setting",
  DeleteRewardPointSettings: "/user-accounting/reward-point-setting",
  CreateRewardPointSettings: "/user-accounting/reward-point-setting",
  GetRewardPointSettings: "/user-accounting/reward-point-setting",
  EditRewardPointSettings: "/user-accounting/reward-point-setting",
  GetRewardLevelList: "/user-accounting/reward-level-setting",

  // Rider leave request
  GetRiderLeaveRequestList: "/riders/api/RiderLeaveRequest",
  CreateRiderLeaveRequest: "/riders/api/RiderLeaveRequest",
  DeleteRiderLeaveRequest: "/riders/api/RiderLeaveRequest",
  GetRiderLeaveRequest: "/riders/api/RiderLeaveRequest",

  // Faqs
  GetFaqLists: "/system-operations/api/FAQ",
  AddFaq: "/system-operations/api/FAQ",
  GetFaqById: "/system-operations/api/FAQ",
  DeleteFaq: "/system-operations/api/FAQ",
  UpdateFaq: "/system-operations/api/FAQ",
  GetUserOptions: "/users/api/User/GetUserNames",

  // Roles
  GetRolesList: "/users/api/Role",
  CreateRole: "/users/api/Role",
  DeleteRole: "/users/api/Role",
  UpdateRole: "/users/api/Role",
  GetRoleById: "/users/api/Role",

  // Add on Category

  GettAddonCategory: "/restaurants/api/AddOnCategory",
  CreateAddonCategory: "/restaurants/api/AddOnCategory",
  DeleteAddonCategory: "/restaurants/api/AddOnCategory",
  UpdateAddonCategory: "/restaurants/api/AddOnCategory",

  // System operation time slot
  GetPlatformTimeSlot: "/system-operations/api/PlatformOperationTimeSlot",
  DeleteTimeSlot: "/system-operations/api/PlatformOperationTimeSlot",
  CreateTimeSlot: "/system-operations/api/PlatformOperationTimeSlot",
  UpdateTimeSlot: "/system-operations/api/PlatformOperationTimeSlot",
  GetTimeSlotById: "/system-operations/api/PlatformOperationTimeSlot",
  ZoneOptions: "/system-operations/api/Zone/Option",
  WeekdayOptions: "/system-operations/api/WeekDay/Option",

  //  Dine in gallery
  DineInGallery: "/restaurants/api/DineInGallery",

  // Voucher Request
  VoucherRequest: "/user-accounting/voucher-request",

  //Rider Auto Assigner Service
  GetAutoAssignerServiceSettings: "/rider-auto-assigner/settings",
  UpdateAutoAssignerList: "/rider-auto-assigner/settings",
  // Cuisine
  Cuisine: "/restaurants/api/Cuisine",

  // Cuisine
  Restaurant: "/restaurants/api/Restaurant",
};
