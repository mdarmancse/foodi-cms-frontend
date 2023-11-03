import { routeNames } from "./constants/route-names";
import { Unauthorized } from "./features/403";
import { NotFound } from "./features/404";
import { AdminMenu, AdminMneuForm } from "./features/admin-menu";
import { Login } from "./features/auth";
import { BatchLevel } from "./features/batch-level";
import { CampaignCreate, CampaignList } from "./features/campaign";
import { City, Zone, ZoneCreate } from "./features/city-and-zone";
import {
  // DineInVoucherSetting,
  // DineInVoucherSettingCreate,
  RewardLabelSetting,
  RewardPointSetting,
  VoucherSetting,
  VoucherSettingCreate,
} from "./features/crm";
import { Dashboard } from "./features/dashboard";
import { DineInGallery, DineInGalleryCreate } from "./features/dine-in-gallery";
// import { DineInGallery, DineInGalleryCreate } from "./features/dine-in-gallery";
import { Dummy, DummyCreate } from "./features/dummy";
import { NotificationCreate, Notifications } from "./features/notification";
import { PopupBanner, PopupBannerCreate } from "./features/popup-banner";
import {
  AmountThreashold,
  Order,
  PreOrder,
  UpdateOrder,
} from "./features/order-service";
import { PromoCodeCreate, PromoCodeList } from "./features/promo-code";
import { PromotionCreate, PromotionList } from "./features/promotion";
import { Refunds } from "./features/refunds";
import {
  AddonsCategory,
  AddonsCategoryCreate,
  BranchAttribute,
  Category,
  FeaturedFood,
  FeaturedFoodForm,
  RestaurantCreate,
  RestaurantList,
  Voucher,
  VoucherForm,
  DineInVoucher,
  DineInGalleryForm,
  Timeslot,
  TimeslotForm,
} from "./features/restaurant";
import { RiderAutoAssinerServiceSettings } from "./features/rider-auto-assigner";
import { BranchCreate, BranchList } from "./features/restaurant/branch";
import { CuisineCreate, CuisineList } from "./features/restaurant/cuisine";
import {
  RestaurantMenu,
  RestaurantMenuCreate,
} from "./features/restaurant/restaurant-menu";
import { ReviewandRatings } from "./features/review-and-ratings";
import { RiderAndZone } from "./features/rider-and-zone";
import {
  AddQuest,
  BagType,
  BatchWiseShiftBooking,
  KmWiseDeliveryCharge,
  NightShiftDeliveryCharge,
  PaymentType,
  QuestsList,
  ReferrerGoalSetting,
  Rider,
  RiderCreate,
  RiderDeliveryCharge,
  RiderLeaveRequest,
  RiderLeaveRequestCreate,
  RiderShiftBooking,
  RiderShiftBookingForm,
  ShiftDutySetup,
  ShiftDutySetupForm,
  RiderReview,
  RiderWallet,
} from "./features/rider-settings";
import { RestaurantReview } from "./features/restaurant";
import { RiderType, RiderTypeCreate } from "./features/rider-type";
import {
  PermissionCreate,
  Permissions,
  Roles,
} from "./features/roles-and-permission";
import { RoleUser } from "./features/roles-and-permission/role-user";
import { OperationTimeSlot, Reason, SystemOption } from "./features/settings";
import { ShiftSwapStatus } from "./features/shift-swap-status";
import {
  Advertisement,
  AdvertisementForm,
  Faq,
  FaqCreate,
  RebootForm,
  SpecialHourType,
  SystemOnOffReason,
  TimeSlotCreate,
  Weekday,
  SystemOnOffOption,
  SystemOnOffOptionForm,
} from "./features/system-operations";
// import { SystemTimeslot } from "./features/system-operations/time-slot/time-slot.component";
import { SystemTimeslot } from "./features/system-operations";
import {
  SubscriptionType,
  SubscriptionTypeCreate,
  User,
  UserCreate,
  UserType,
  VehicleType,
} from "./features/users";
import { VoucherRequest } from "./features/voucher-request";
import { Wallets } from "./features/wallet";

export const publicRoutes = [{ path: "/auth/login", element: <Login /> }];

export const routes = [
  { path: "/", element: <Dashboard /> },
  { path: "/dummy", element: <Dummy /> },
  { path: "/dummy/create", element: <DummyCreate /> },
  { path: "/quests", element: <QuestsList /> },
  { path: "quests/create", element: <AddQuest /> },
  { path: "quests/edit/:id", element: <AddQuest /> },
  { path: "/notification", element: <Notifications /> },
  { path: "/add-notification", element: <NotificationCreate /> },
  { path: "/popup-banner", element: <PopupBanner /> },
  { path: "/review", element: <ReviewandRatings /> },
  { path: "/refund", element: <Refunds /> },
  { path: "/wallet", element: <Wallets /> },
  { path: "/reason", element: <Reason /> },
  { path: "/operation-time-slot", element: <OperationTimeSlot /> },
  { path: "/system-option", element: <SystemOption /> },
  { path: "/roles", element: <Roles /> },
  { path: "/permission", element: <Permissions /> },
  // Role user
  { path: "/role-user", element: <RoleUser /> },
  // Rider type
  { path: "/rider-type", element: <RiderType /> },
  { path: "/rider-type/create", element: <RiderTypeCreate /> },
  { path: "/rider-type/edit/:id", element: <RiderTypeCreate /> },

  //Referrer Goals Setting
  { path: "/referrer-goals", element: <ReferrerGoalSetting /> },

  //Batch Wise Shift Booking Config
  { path: "/batch-shift-booking-config", element: <BatchWiseShiftBooking /> },

  //Shift Duty Setup
  { path: "/shift-duty-setup", element: <ShiftDutySetup /> },
  { path: "/shift-duty-setup/create", element: <ShiftDutySetupForm /> },
  { path: "/shift-duty-setup/edit/:id", element: <ShiftDutySetupForm /> },

  // rolewise menu permissions
  { path: "/permission", element: <Permissions /> },
  { path: "/permission/create", element: <PermissionCreate /> },
  { path: "/permission/edit/:id", element: <PermissionCreate /> },

  // admin menu
  { path: "admin-menu", element: <AdminMenu /> },
  { path: "admin-menu/create", element: <AdminMneuForm /> },
  { path: "admin-menu/edit/:id", element: <AdminMneuForm /> },
  { path: "/vehicle-type", element: <VehicleType /> },
  // city & zone

  // city
  { path: "/city", element: <City /> },
  { path: "/city2", element: <City /> },

  //Weekday
  { path: routeNames.weekday, element: <Weekday /> },

  //Order Dispatch
  { path: "/order-dispatch", element: <Order /> },
  { path: "/order-dispatch/edit/:id", element: <UpdateOrder /> },

  // pre order
  { path: "/pre-order", element: <PreOrder /> },

  //Amount Threashold
  { path: "/amount-threshold", element: <AmountThreashold /> },

  //Bag Type
  { path: routeNames.bagtype, element: <BagType /> },

  //Special Hour Type
  { path: routeNames.overtime, element: <SpecialHourType /> },

  // zone
  { path: "/zone", element: <Zone /> },
  { path: "/zone/create", element: <ZoneCreate /> },
  { path: "/zone/edit/:id", element: <ZoneCreate /> },

  // all kind of user

  // user
  { path: "/users", element: <User /> },
  { path: "/users/create", element: <UserCreate /> },
  { path: "/users/edit/:id", element: <UserCreate /> },

  // subscription type
  { path: "/subscription-type", element: <SubscriptionType /> },
  { path: "/subscription-type/create", element: <SubscriptionTypeCreate /> },
  { path: "/subscription-type/edit/:id", element: <SubscriptionTypeCreate /> },

  // vehicle type
  { path: "/vehicle-type", element: <VehicleType /> },

  // rider
  { path: "/rider", element: <Rider /> },
  { path: "/rider/create", element: <RiderCreate /> },
  { path: "/rider/edit/:id", element: <RiderCreate /> },

  // crm

  // reward label setting
  { path: "/reward-label-setting", element: <RewardLabelSetting /> },

  // reward point setting
  { path: "/reward-point-setting", element: <RewardPointSetting /> },

  // voucher setting
  { path: "/voucher-setting", element: <VoucherSetting /> },
  { path: "/voucher-setting/create", element: <VoucherSettingCreate /> },

  // // dine in voucher setting
  // { path: "/dine-in-voucher-setting", element: <DineInVoucherSetting /> },
  // {
  //   path: "/dine-in-voucher-setting/create",
  //   element: <DineInVoucherSettingCreate />,
  // },

  // Restaurant

  // Branch Attribute
  { path: "/branch-attribute", element: <BranchAttribute /> },

  // Category
  { path: "/category", element: <Category /> },

  //Rider Auto Assigner Service
  { path: "/settings", element: <RiderAutoAssinerServiceSettings /> },

  // Addons Category
  { path: "/addons-category", element: <AddonsCategory /> },
  { path: "/addons-category/create", element: <AddonsCategoryCreate /> },
  { path: "/addons-category/edit/:id", element: <AddonsCategoryCreate /> },
  // Timeslot
  { path: routeNames.timeslot, element: <Timeslot /> },
  { path: routeNames.timeslot_create, element: <TimeslotForm /> },
  { path: routeNames.timeslot_update, element: <TimeslotForm /> },

  //System On Off Option

  { path: "system-on-off-option", element: <SystemOnOffOption /> },
  { path: "system-on-off-option/create", element: <SystemOnOffOptionForm /> },
  { path: "system-on-off-option/edit/:id", element: <SystemOnOffOptionForm /> },

  //System On&Off Reason
  { path: routeNames.reboot, element: <SystemOnOffReason /> },
  { path: routeNames.reboot_create, element: <RebootForm /> },
  { path: routeNames.reboot_update, element: <RebootForm /> },

  //Advertisement
  { path: routeNames.advertisement, element: <Advertisement /> },
  { path: routeNames.advertisement_create, element: <AdvertisementForm /> },
  { path: routeNames.advertisement_update, element: <AdvertisementForm /> },

  //Restaurant Review
  { path: "/restaurant-review", element: <RestaurantReview /> },

  //Rider Review
  { path: "/rider-review", element: <RiderReview /> },

  //Rider Wallet
  { path: "/rider-wallet", element: <RiderWallet /> },

  // Featured Food
  { path: "/featured-food", element: <FeaturedFood /> },
  { path: "/featured-food/create", element: <FeaturedFoodForm /> },
  { path: "/featured-food/edit/:id", element: <FeaturedFoodForm /> },

  // Voucher

  { path: "/voucher", element: <Voucher /> },
  { path: "/voucher/create", element: <VoucherForm /> },
  { path: "/voucher/edit/:id", element: <VoucherForm /> },

  // Dine In Gallery Voucher
  { path: "/dine-in-gallery-voucher", element: <DineInVoucher /> },
  { path: "/dine-in-gallery-voucher/create", element: <DineInGalleryForm /> },
  {
    path: "/dine-in-gallery-voucher/edit/:id",
    element: <DineInGalleryForm />,
  },

  // Rider Shift Booking
  { path: "/rider-shift-booking", element: <RiderShiftBooking /> },
  { path: "/rider-shift-booking/create", element: <RiderShiftBookingForm /> },
  { path: "/rider-shift-booking/edit/:id", element: <RiderShiftBookingForm /> },

  // ***********
  // restaurant-menu
  {
    path: "/restaurant-menu",
    element: <RestaurantMenu />,
  },
  {
    path: "/restaurant-menu/create",
    element: <RestaurantMenuCreate />,
  },
  {
    path: "/restaurant-menu/edit/:id",
    element: <RestaurantMenuCreate />,
  },
  { path: routeNames.restaurant, element: <RestaurantList /> },
  { path: routeNames.restaurant_create, element: <RestaurantCreate /> },
  { path: `${routeNames.restaurant_edit}/:id`, element: <RestaurantCreate /> },

  { path: "/nonauth", element: <Unauthorized /> },
  { path: "*", element: <NotFound /> },

  { path: "/batch-level", element: <BatchLevel /> },
  { path: "/rider-zone", element: <RiderAndZone /> },

  // branch
  { path: routeNames.branch, element: <BranchList /> },
  { path: routeNames.branch_create, element: <BranchCreate /> },

  // cuisine
  { path: routeNames.cuisine, element: <CuisineList /> },
  { path: routeNames.cuisine_create, element: <CuisineCreate /> },
  { path: `${routeNames.cuisine_edit}/:id`, element: <CuisineCreate /> },

  // promotion
  { path: routeNames.promotion, element: <PromotionList /> },
  { path: routeNames.promotion_create, element: <PromotionCreate /> },
  { path: `${routeNames.promotion_edit}/:id`, element: <PromotionCreate /> },

  // campaign
  { path: routeNames.campaign, element: <CampaignList /> },
  { path: routeNames.campaign_create, element: <CampaignCreate /> },
  { path: routeNames.campaign_edit, element: <CampaignCreate /> },

  // Shift swap status
  { path: "/shift-swap-status", element: <ShiftSwapStatus /> },
  // Promo Code
  { path: "/promo-code", element: <PromoCodeList /> },
  { path: "/promo-code/create", element: <PromoCodeCreate /> },
  { path: "/promo-code/edit/:id", element: <PromoCodeCreate /> },

  //Payment Type
  { path: "/payment-type", element: <PaymentType /> },

  // km wise delivery charge
  { path: "/Kilometer-wise-deliveryCharge", element: <KmWiseDeliveryCharge /> },

  // night shift delivery charge
  {
    path: "/night-shift-deliveryCharge",
    element: <NightShiftDeliveryCharge />,
  },

  // rider delivery charge
  { path: "/rider-delivery-charge", element: <RiderDeliveryCharge /> },

  //rider leave request
  { path: "/rider-leave-request", element: <RiderLeaveRequest /> },
  { path: "/rider-leave-request/create", element: <RiderLeaveRequestCreate /> },
  {
    path: "/rider-leave-request/edit/:id",
    element: <RiderLeaveRequestCreate />,
  },

  // Faq
  { path: "/faq", element: <Faq /> },
  { path: "/faq/create", element: <FaqCreate /> },
  { path: "/faq/edit/:id", element: <FaqCreate /> },

  //Time slot
  { path: "/systemOperation/time-slot", element: <SystemTimeslot /> },
  { path: "/systemOperation/time-slot/create", element: <TimeSlotCreate /> },
  { path: "/systemOperation/time-slot/edit/:id", element: <TimeSlotCreate /> },
  //User Type
  { path: "/user-type", element: <UserType /> },

  // PopupBanner
  { path: "/popup-banner", element: <PopupBanner /> },
  { path: "/popup-banner/create", element: <PopupBannerCreate /> },
  { path: "/popup-banner/edit/:id", element: <PopupBannerCreate /> },

  // DineInGallery
  { path: "/dine-in-gallery", element: <DineInGallery /> },
  { path: "/dine-in-gallery/create", element: <DineInGalleryCreate /> },
  { path: "/dine-in-gallery/edit/:id", element: <DineInGalleryCreate /> },

  // VoucherRequest
  { path: "/voucher-request", element: <VoucherRequest /> },
];
