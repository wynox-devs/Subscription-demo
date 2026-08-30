// ==================== CURRENCY DATABASE ====================
const CURRENCIES = {
  // Major World Currencies
  USD: { symbol: '$', name: 'US Dollar', flag: '🇺🇸', rate: 1, decimals: 2 },
  EUR: { symbol: '€', name: 'Euro', flag: '🇪🇺', rate: 0.92, decimals: 2 },
  GBP: { symbol: '£', name: 'British Pound', flag: '🇬🇧', rate: 0.79, decimals: 2 },
  JPY: { symbol: '¥', name: 'Japanese Yen', flag: '🇯🇵', rate: 149.5, decimals: 0 },
  CNY: { symbol: '¥', name: 'Chinese Yuan', flag: '🇨🇳', rate: 7.24, decimals: 2 },
  KRW: { symbol: '₩', name: 'South Korean Won', flag: '🇰🇷', rate: 1330.5, decimals: 0 },
  INR: { symbol: '₹', name: 'Indian Rupee', flag: '🇮🇳', rate: 83.1, decimals: 2 },
  RUB: { symbol: '₽', name: 'Russian Ruble', flag: '🇷🇺', rate: 91.5, decimals: 2 },
  BRL: { symbol: 'R$', name: 'Brazilian Real', flag: '🇧🇷', rate: 4.97, decimals: 2 },
  AUD: { symbol: 'A$', name: 'Australian Dollar', flag: '🇦🇺', rate: 1.52, decimals: 2 },
  CAD: { symbol: 'C$', name: 'Canadian Dollar', flag: '🇨🇦', rate: 1.36, decimals: 2 },
  CHF: { symbol: 'Fr', name: 'Swiss Franc', flag: '🇨🇭', rate: 0.88, decimals: 2 },
  SGD: { symbol: 'S$', name: 'Singapore Dollar', flag: '🇸🇬', rate: 1.34, decimals: 2 },
  HKD: { symbol: 'HK$', name: 'Hong Kong Dollar', flag: '🇭🇰', rate: 7.82, decimals: 2 },
  NZD: { symbol: 'NZ$', name: 'New Zealand Dollar', flag: '🇳🇿', rate: 1.63, decimals: 2 },
  SEK: { symbol: 'kr', name: 'Swedish Krona', flag: '🇸🇪', rate: 10.45, decimals: 2 },
  NOK: { symbol: 'kr', name: 'Norwegian Krone', flag: '🇳🇴', rate: 10.67, decimals: 2 },
  DKK: { symbol: 'kr', name: 'Danish Krone', flag: '🇩🇰', rate: 6.87, decimals: 2 },
  PLN: { symbol: 'zł', name: 'Polish Złoty', flag: '🇵🇱', rate: 3.98, decimals: 2 },
  MXN: { symbol: 'Mex$', name: 'Mexican Peso', flag: '🇲🇽', rate: 17.1, decimals: 2 },
  TRY: { symbol: '₺', name: 'Turkish Lira', flag: '🇹🇷', rate: 31.2, decimals: 2 },
  ZAR: { symbol: 'R', name: 'South African Rand', flag: '🇿🇦', rate: 18.9, decimals: 2 },
  AED: { symbol: 'د.إ', name: 'UAE Dirham', flag: '🇦🇪', rate: 3.67, decimals: 2 },
  SAR: { symbol: '﷼', name: 'Saudi Riyal', flag: '🇸🇦', rate: 3.75, decimals: 2 },
  THB: { symbol: '฿', name: 'Thai Baht', flag: '🇹🇭', rate: 35.9, decimals: 2 },
  IDR: { symbol: 'Rp', name: 'Indonesian Rupiah', flag: '🇮🇩', rate: 15750, decimals: 0 },
  MYR: { symbol: 'RM', name: 'Malaysian Ringgit', flag: '🇲🇾', rate: 4.73, decimals: 2 },
  PHP: { symbol: '₱', name: 'Philippine Peso', flag: '🇵🇭', rate: 56.2, decimals: 2 },
  VND: { symbol: '₫', name: 'Vietnamese Dong', flag: '🇻🇳', rate: 24750, decimals: 0 },
  EGP: { symbol: 'E£', name: 'Egyptian Pound', flag: '🇪🇬', rate: 47.9, decimals: 2 },
  NGN: { symbol: '₦', name: 'Nigerian Naira', flag: '🇳🇬', rate: 1600, decimals: 2 },
  KES: { symbol: 'KSh', name: 'Kenyan Shilling', flag: '🇰🇪', rate: 131.5, decimals: 2 },
  PKR: { symbol: '₨', name: 'Pakistani Rupee', flag: '🇵🇰', rate: 279.5, decimals: 2 },
  BDT: { symbol: '৳', name: 'Bangladeshi Taka', flag: '🇧🇩', rate: 109.8, decimals: 2 },
  UAH: { symbol: '₴', name: 'Ukrainian Hryvnia', flag: '🇺🇦', rate: 39.1, decimals: 2 },
  ILS: { symbol: '₪', name: 'Israeli Shekel', flag: '🇮🇱', rate: 3.65, decimals: 2 },
  CLP: { symbol: 'CLP$', name: 'Chilean Peso', flag: '🇨🇱', rate: 975, decimals: 0 },
  COP: { symbol: 'Col$', name: 'Colombian Peso', flag: '🇨🇴', rate: 3920, decimals: 0 },
  ARS: { symbol: 'AR$', name: 'Argentine Peso', flag: '🇦🇷', rate: 870, decimals: 2 },
  PEN: { symbol: 'S/', name: 'Peruvian Sol', flag: '🇵🇪', rate: 3.71, decimals: 2 },
  RON: { symbol: 'lei', name: 'Romanian Leu', flag: '🇷🇴', rate: 4.58, decimals: 2 },
  CZK: { symbol: 'Kč', name: 'Czech Koruna', flag: '🇨🇿', rate: 23.4, decimals: 2 },
  HUF: { symbol: 'Ft', name: 'Hungarian Forint', flag: '🇭🇺', rate: 360, decimals: 0 },
  ISK: { symbol: 'kr', name: 'Icelandic Króna', flag: '🇮🇸', rate: 138, decimals: 0 },
  QAR: { symbol: 'QR', name: 'Qatari Riyal', flag: '🇶🇦', rate: 3.64, decimals: 2 },
  KWD: { symbol: 'KD', name: 'Kuwaiti Dinar', flag: '🇰🇼', rate: 0.31, decimals: 3 },
  BHD: { symbol: 'BD', name: 'Bahraini Dinar', flag: '🇧🇭', rate: 0.376, decimals: 3 },
  OMR: { symbol: 'OR', name: 'Omani Rial', flag: '🇴🇲', rate: 0.385, decimals: 3 },
  JOD: { symbol: 'JD', name: 'Jordanian Dinar', flag: '🇯🇴', rate: 0.709, decimals: 3 },
  LBP: { symbol: 'L£', name: 'Lebanese Pound', flag: '🇱🇧', rate: 89500, decimals: 0 },
  MAD: { symbol: 'MAD', name: 'Moroccan Dirham', flag: '🇲🇦', rate: 10.1, decimals: 2 },
  TND: { symbol: 'DT', name: 'Tunisian Dinar', flag: '🇹🇳', rate: 3.12, decimals: 3 },
  DZD: { symbol: 'DA', name: 'Algerian Dinar', flag: '🇩🇿', rate: 134.6, decimals: 2 },
  ETB: { symbol: 'Br', name: 'Ethiopian Birr', flag: '🇪🇹', rate: 57.2, decimals: 2 },
  GHS: { symbol: 'GH₵', name: 'Ghanaian Cedi', flag: '🇬🇭', rate: 13.1, decimals: 2 },
  TZS: { symbol: 'TSh', name: 'Tanzanian Shilling', flag: '🇹🇿', rate: 2550, decimals: 0 },
  UGX: { symbol: 'USh', name: 'Ugandan Shilling', flag: '🇺🇬', rate: 3820, decimals: 0 },
  XAF: { symbol: 'FCFA', name: 'Central African CFA Franc', flag: '🇨🇲', rate: 603.5, decimals: 0 },
  XOF: { symbol: 'CFA', name: 'West African CFA Franc', flag: '🇸🇳', rate: 603.5, decimals: 0 },
  RSD: { symbol: 'RSD', name: 'Serbian Dinar', flag: '🇷🇸', rate: 108.2, decimals: 2 },
  HRK: { symbol: 'kn', name: 'Croatian Kuna', flag: '🇭🇷', rate: 6.93, decimals: 2 },
  BGN: { symbol: 'лв', name: 'Bulgarian Lev', flag: '🇧🇬', rate: 1.8, decimals: 2 },
  LKR: { symbol: 'Rs', name: 'Sri Lankan Rupee', flag: '🇱🇰', rate: 303, decimals: 2 },
  NPR: { symbol: '₨', name: 'Nepalese Rupee', flag: '🇳🇵', rate: 133.5, decimals: 2 },
  MMK: { symbol: 'K', name: 'Myanmar Kyat', flag: '🇲🇲', rate: 2100, decimals: 0 },
  KHR: { symbol: '៛', name: 'Cambodian Riel', flag: '🇰🇭', rate: 4075, decimals: 0 },
  LAK: { symbol: '₭', name: 'Lao Kip', flag: '🇱🇦', rate: 21000, decimals: 0 },
  MNT: { symbol: '₮', name: 'Mongolian Tögrög', flag: '🇲🇳', rate: 3400, decimals: 0 },
  KZT: { symbol: '₸', name: 'Kazakhstani Tenge', flag: '🇰🇿', rate: 450, decimals: 2 },
  UZS: { symbol: 'soʻm', name: 'Uzbekistani Som', flag: '🇺🇿', rate: 12400, decimals: 0 },
  AZN: { symbol: '₼', name: 'Azerbaijani Manat', flag: '🇦🇿', rate: 1.7, decimals: 2 },
  GEL: { symbol: '₾', name: 'Georgian Lari', flag: '🇬🇪', rate: 2.68, decimals: 2 },
  AMD: { symbol: '֏', name: 'Armenian Dram', flag: '🇦🇲', rate: 405, decimals: 0 },
  BYN: { symbol: 'Br', name: 'Belarusian Ruble', flag: '🇧🇾', rate: 3.27, decimals: 2 },
  MDL: { symbol: 'L', name: 'Moldovan Leu', flag: '🇲🇩', rate: 17.8, decimals: 2 },
  BAM: { symbol: 'KM', name: 'Bosnia Convertible Mark', flag: '🇧🇦', rate: 1.8, decimals: 2 },
  MKD: { symbol: 'ден', name: 'Macedonian Denar', flag: '🇲🇰', rate: 56.5, decimals: 2 },
  ALL: { symbol: 'L', name: 'Albanian Lek', flag: '🇦🇱', rate: 95.5, decimals: 0 },
  BOB: { symbol: 'Bs', name: 'Bolivian Boliviano', flag: '🇧🇴', rate: 6.91, decimals: 2 },
  PYG: { symbol: '₲', name: 'Paraguayan Guaraní', flag: '🇵🇾', rate: 7300, decimals: 0 },
  UYU: { symbol: '$U', name: 'Uruguayan Peso', flag: '🇺🇾', rate: 39.2, decimals: 2 },
  VES: { symbol: 'Bs', name: 'Venezuelan Bolívar', flag: '🇻🇪', rate: 36.2, decimals: 2 },
  CRC: { symbol: '₡', name: 'Costa Rican Colón', flag: '🇨🇷', rate: 520, decimals: 0 },
  DOP: { symbol: 'RD$', name: 'Dominican Peso', flag: '🇩🇴', rate: 58.9, decimals: 2 },
  GTQ: { symbol: 'Q', name: 'Guatemalan Quetzal', flag: '🇬🇹', rate: 7.82, decimals: 2 },
  HNL: { symbol: 'L', name: 'Honduran Lempira', flag: '🇭🇳', rate: 24.7, decimals: 2 },
  NIO: { symbol: 'C$', name: 'Nicaraguan Córdoba', flag: '🇳🇮', rate: 36.8, decimals: 2 },
  PAB: { symbol: 'B/.', name: 'Panamanian Balboa', flag: '🇵🇦', rate: 1, decimals: 2 },
  JMD: { symbol: 'J$', name: 'Jamaican Dollar', flag: '🇯🇲', rate: 155, decimals: 2 },
  TTD: { symbol: 'TT$', name: 'Trinidad Dollar', flag: '🇹🇹', rate: 6.79, decimals: 2 },
  BBD: { symbol: 'Bds$', name: 'Barbadian Dollar', flag: '🇧🇧', rate: 2, decimals: 2 },
  BSD: { symbol: 'B$', name: 'Bahamian Dollar', flag: '🇧🇸', rate: 1, decimals: 2 },
  BZD: { symbol: 'BZ$', name: 'Belize Dollar', flag: '🇧🇿', rate: 2.02, decimals: 2 },
  GYD: { symbol: 'G$', name: 'Guyanese Dollar', flag: '🇬🇾', rate: 209, decimals: 0 },
  SRD: { symbol: 'SRD$', name: 'Surinamese Dollar', flag: '🇸🇷', rate: 36.5, decimals: 2 },
  FJD: { symbol: 'FJ$', name: 'Fijian Dollar', flag: '🇫🇯', rate: 2.25, decimals: 2 },
  PGK: { symbol: 'K', name: 'Papua New Guinean Kina', flag: '🇵🇬', rate: 3.78, decimals: 2 },
  SBD: { symbol: 'SI$', name: 'Solomon Islands Dollar', flag: '🇸🇧', rate: 8.42, decimals: 2 },
  TOP: { symbol: 'T$', name: 'Tongan Paʻanga', flag: '🇹🇴', rate: 2.37, decimals: 2 },
  WST: { symbol: 'WS$', name: 'Samoan Tālā', flag: '🇼🇸', rate: 2.73, decimals: 2 },
  VUV: { symbol: 'VT', name: 'Vanuatu Vatu', flag: '🇻🇺', rate: 119, decimals: 0 },
  MOP: { symbol: 'MOP$', name: 'Macanese Pataca', flag: '🇲🇴', rate: 8.05, decimals: 2 },
  BND: { symbol: 'B$', name: 'Brunei Dollar', flag: '🇧🇳', rate: 1.34, decimals: 2 },
  KPW: { symbol: '₩', name: 'North Korean Won', flag: '🇰🇵', rate: 900, decimals: 0 },
  MMK: { symbol: 'K', name: 'Myanmar Kyat', flag: '🇲🇲', rate: 2100, decimals: 0 },
  IRR: { symbol: '﷼', name: 'Iranian Rial', flag: '🇮🇷', rate: 42000, decimals: 0 },
  IQD: { symbol: 'د.ع', name: 'Iraqi Dinar', flag: '🇮🇶', rate: 1310, decimals: 0 },
  SYP: { symbol: '£S', name: 'Syrian Pound', flag: '🇸🇾', rate: 13000, decimals: 0 },
  YER: { symbol: '﷼', name: 'Yemeni Rial', flag: '🇾🇪', rate: 250, decimals: 0 },
  AFN: { symbol: '؋', name: 'Afghan Afghani', flag: '🇦🇫', rate: 71.5, decimals: 2 },
  MVR: { symbol: 'Rf', name: 'Maldivian Rufiyaa', flag: '🇲🇻', rate: 15.4, decimals: 2 },
  BTN: { symbol: 'Nu.', name: 'Bhutanese Ngultrum', flag: '🇧🇹', rate: 83.1, decimals: 2 },
  MUR: { symbol: '₨', name: 'Mauritian Rupee', flag: '🇲🇺', rate: 46.2, decimals: 2 },
  SCR: { symbol: '₨', name: 'Seychellois Rupee', flag: '🇸🇨', rate: 13.5, decimals: 2 },
  MGA: { symbol: 'Ar', name: 'Malagasy Ariary', flag: '🇲🇬', rate: 4500, decimals: 0 },
  MZN: { symbol: 'MT', name: 'Mozambican Metical', flag: '🇲🇿', rate: 63.9, decimals: 2 },
  ZMW: { symbol: 'ZK', name: 'Zambian Kwacha', flag: '🇿🇲', rate: 25.6, decimals: 2 },
  MWK: { symbol: 'MK', name: 'Malawian Kwacha', flag: '🇲🇼', rate: 1730, decimals: 0 },
  BWP: { symbol: 'P', name: 'Botswana Pula', flag: '🇧🇼', rate: 13.7, decimals: 2 },
  NAD: { symbol: 'N$', name: 'Namibian Dollar', flag: '🇳🇦', rate: 18.9, decimals: 2 },
  LSL: { symbol: 'L', name: 'Lesotho Loti', flag: '🇱🇸', rate: 18.9, decimals: 2 },
  SZL: { symbol: 'E', name: 'Swazi Lilangeni', flag: '🇸🇿', rate: 18.9, decimals: 2 },
  AOA: { symbol: 'Kz', name: 'Angolan Kwanza', flag: '🇦🇴', rate: 832, decimals: 2 },
  BIF: { symbol: 'FBu', name: 'Burundian Franc', flag: '🇧🇮', rate: 2850, decimals: 0 },
  CDF: { symbol: 'FC', name: 'Congolese Franc', flag: '🇨🇩', rate: 2760, decimals: 0 },
  DJF: { symbol: 'Fdj', name: 'Djiboutian Franc', flag: '🇩🇯', rate: 178, decimals: 0 },
  ERN: { symbol: 'Nfk', name: 'Eritrean Nakfa', flag: '🇪🇷', rate: 15, decimals: 2 },
  GMD: { symbol: 'D', name: 'Gambian Dalasi', flag: '🇬🇲', rate: 67.5, decimals: 2 },
  GNF: { symbol: 'FG', name: 'Guinean Franc', flag: '🇬🇳', rate: 8600, decimals: 0 },
  LRD: { symbol: 'L$', name: 'Liberian Dollar', flag: '🇱🇷', rate: 191, decimals: 2 },
  SDG: { symbol: 'ج.س.', name: 'Sudanese Pound', flag: '🇸🇩', rate: 600, decimals: 2 },
  SOS: { symbol: 'Sh', name: 'Somali Shilling', flag: '🇸🇴', rate: 571, decimals: 0 },
  SSP: { symbol: 'SS£', name: 'South Sudanese Pound', flag: '🇸🇸', rate: 1000, decimals: 2 },
  STN: { symbol: 'Db', name: 'São Tomé Dobra', flag: '🇸🇹', rate: 22.5, decimals: 2 },
  SLL: { symbol: 'Le', name: 'Sierra Leonean Leone', flag: '🇸🇱', rate: 22500, decimals: 0 },
  CVE: { symbol: 'Esc', name: 'Cape Verdean Escudo', flag: '🇨🇻', rate: 100.5, decimals: 2 },
  KMF: { symbol: 'CF', name: 'Comorian Franc', flag: '🇰🇲', rate: 452, decimals: 0 },
  SHP: { symbol: '£', name: 'Saint Helena Pound', flag: '🇸🇭', rate: 0.79, decimals: 2 },
  GIP: { symbol: '£', name: 'Gibraltar Pound', flag: '🇬🇮', rate: 0.79, decimals: 2 },
  FKP: { symbol: '£', name: 'Falkland Islands Pound', flag: '🇫🇰', rate: 0.79, decimals: 2 },
  IMP: { symbol: '£', name: 'Manx Pound', flag: '🇮🇲', rate: 0.79, decimals: 2 },
  JEP: { symbol: '£', name: 'Jersey Pound', flag: '🇯🇪', rate: 0.79, decimals: 2 },
  GGP: { symbol: '£', name: 'Guernsey Pound', flag: '🇬🇬', rate: 0.79, decimals: 2 },
  ANG: { symbol: 'ƒ', name: 'Netherlands Antillean Guilder', flag: '🇨🇼', rate: 1.79, decimals: 2 },
  AWG: { symbol: 'ƒ', name: 'Aruban Florin', flag: '🇦🇼', rate: 1.79, decimals: 2 },
  BMD: { symbol: '$', name: 'Bermudian Dollar', flag: '🇧🇲', rate: 1, decimals: 2 },
  KYD: { symbol: '$', name: 'Cayman Islands Dollar', flag: '🇰🇾', rate: 0.83, decimals: 2 },
  XCD: { symbol: '$', name: 'East Caribbean Dollar', flag: '🇦🇬', rate: 2.7, decimals: 2 },
  TMT: { symbol: 'm', name: 'Turkmenistan Manat', flag: '🇹🇲', rate: 3.5, decimals: 2 },
  KGS: { symbol: 'сом', name: 'Kyrgyzstani Som', flag: '🇰🇬', rate: 89.3, decimals: 2 },
  TJS: { symbol: 'ЅМ', name: 'Tajikistani Somoni', flag: '🇹🇯', rate: 10.9, decimals: 2 },
  LYD: { symbol: 'LD', name: 'Libyan Dinar', flag: '🇱🇾', rate: 4.85, decimals: 3 },
  MRU: { symbol: 'UM', name: 'Mauritanian Ouguiya', flag: '🇲🇷', rate: 39.5, decimals: 2 },
  RWF: { symbol: 'FRw', name: 'Rwandan Franc', flag: '🇷🇼', rate: 1280, decimals: 0 },
  HTG: { symbol: 'G', name: 'Haitian Gourde', flag: '🇭🇹', rate: 132, decimals: 2 },
  CUP: { symbol: '$MN', name: 'Cuban Peso', flag: '🇨🇺', rate: 24, decimals: 2 },
  CUC: { symbol: 'CUC$', name: 'Cuban Convertible Peso', flag: '🇨🇺', rate: 1, decimals: 2 }
};

// ==================== BASE PRICES (USD) ====================
const BASE_PRICES = {
  free: 0,
  student: 1,
  pro: 19,
  family: 25
};

// ==================== STATE MANAGEMENT ====================
let currentCurrency = localStorage.getItem('wynox_currency') || 'USD';
let exchangeRates = { ...CURRENCIES };
let selectedPlan = null;

// ==================== CURRENCY FORMATTER ====================
function formatCurrency(amount, currencyCode) {
  const currency = CURRENCIES[currencyCode];
  if (!currency) return `${amount.toFixed(2)} USD`;
  
  const formattedAmount = amount.toFixed(currency.decimals);
  
  // Handle different currency symbol positions
  const symbolPosition = getSymbolPosition(currencyCode);
  
  if (symbolPosition === 'prefix') {
    return `${currency.symbol}${formattedAmount}`;
  } else if (symbolPosition === 'suffix') {
    return `${formattedAmount} ${currency.symbol}`;
  } else {
    return `${formattedAmount} ${currency.code || currencyCode}`;
  }
}

function getSymbolPosition(currencyCode) {
  const prefixCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'CNY', 'KRW', 'INR', 'RUB', 'BRL', 'AUD', 'CAD', 'CHF', 'SGD', 'HKD', 'NZD', 'MXN', 'TRY', 'ZAR', 'AED', 'SAR', 'THB', 'IDR', 'MYR', 'PHP', 'VND', 'EGP', 'NGN', 'KES', 'PKR', 'BDT', 'UAH', 'ILS', 'CLP', 'COP', 'ARS', 'PEN', 'RON', 'CZK', 'HUF', 'ISK', 'QAR', 'KWD', 'BHD', 'OMR', 'JOD', 'LBP', 'MAD', 'TND', 'DZD', 'ETB', 'GHS', 'TZS', 'UGX', 'XAF', 'XOF', 'RSD', 'HRK', 'BGN', 'LKR', 'NPR', 'MMK', 'KHR', 'LAK', 'MNT', 'KZT', 'UZS', 'AZN', 'GEL', 'AMD', 'BYN', 'MDL', 'BAM', 'MKD', 'ALL', 'BOB', 'PYG', 'UYU', 'VES', 'CRC', 'DOP', 'GTQ', 'HNL', 'NIO', 'PAB', 'JMD', 'TTD', 'BBD', 'BSD', 'BZD', 'GYD', 'SRD', 'FJD', 'PGK', 'SBD', 'TOP', 'WST', 'VUV', 'MOP', 'BND', 'KPW', 'IRR', 'IQD', 'SYP', 'YER', 'AFN', 'MVR', 'BTN', 'MUR', 'SCR', 'MGA', 'MZN', 'ZMW', 'MWK', 'BWP', 'NAD', 'LSL', 'SZL', 'AOA', 'BIF', 'CDF', 'DJF', 'ERN', 'GMD', 'GNF', 'LRD', 'SDG', 'SOS', 'SSP', 'STN', 'SLL', 'CVE', 'KMF', 'SHP', 'GIP', 'FKP', 'IMP', 'JEP', 'GGP', 'ANG', 'AWG', 'BMD', 'KYD', 'XCD', 'TMT', 'KGS', 'TJS', 'LYD', 'MRU', 'RWF', 'HTG', 'CUP', 'CUC'];
  
  return prefixCurrencies.includes(currencyCode) ? 'prefix' : 'suffix';
}

// ==================== PRICE CONVERTER ====================
function convertPrice(usdPrice, targetCurrency = currentCurrency) {
  const currency = CURRENCIES[targetCurrency];
  if (!currency) return usdPrice;
  return usdPrice * currency.rate;
}

// ==================== UI UPDATER ====================
function updateAllPrices() {
  const priceElements = document.querySelectorAll('.price');
  const freeButtons = document.querySelectorAll('.btn.filled');
  
  priceElements.forEach((priceElement, index) => {
    const planType = getPlanTypeFromIndex(index);
    if (planType && BASE_PRICES[planType] !== undefined) {
      const usdPrice = BASE_PRICES[planType];
      const convertedPrice = convertPrice(usdPrice);
      
      if (usdPrice === 0) {
        priceElement.innerHTML = `<span class="amount">${formatCurrency(0, currentCurrency)}</span>`;
      } else {
        priceElement.innerHTML = `
          <span class="amount">${formatCurrency(convertedPrice, currentCurrency)}/</span>
          <span class="period">month</span>
        `;
      }
    }
  });
  
  // Update free buttons
  freeButtons.forEach(button => {
    if (button.textContent.trim() === 'Free' || button.textContent.trim() === '$0') {
      button.textContent = formatCurrency(0, currentCurrency);
    }
  });
  
  // Update currency selector display
  updateCurrencySelectorUI();
}

function getPlanTypeFromIndex(index) {
  const planOrder = ['free', 'student', 'pro', 'family'];
  return planOrder[index];
}

// ==================== CURRENCY SELECTOR ====================
function createCurrencySelector() {
  // Create selector container
  const selectorContainer = document.createElement('div');
  selectorContainer.className = 'currency-selector-container';
  selectorContainer.id = 'currency-selector-container';
  
  // Create trigger button
  const triggerButton = document.createElement('button');
  triggerButton.className = 'currency-trigger';
  triggerButton.id = 'currency-trigger';
  triggerButton.setAttribute('aria-label', 'Select currency');
  triggerButton.innerHTML = `
    <span class="currency-flag">${CURRENCIES[currentCurrency].flag}</span>
    <span class="currency-code">${currentCurrency}</span>
    <span class="currency-symbol">${CURRENCIES[currentCurrency].symbol}</span>
    <svg class="currency-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  `;
  
  // Create dropdown
  const dropdown = document.createElement('div');
  dropdown.className = 'currency-dropdown';
  dropdown.id = 'currency-dropdown';
  dropdown.style.display = 'none';
  
  // Add search input
  const searchContainer = document.createElement('div');
  searchContainer.className = 'currency-search-container';
  searchContainer.innerHTML = `
    <input type="text" class="currency-search" id="currency-search" placeholder="Search currency...">
    <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  `;
  
  dropdown.appendChild(searchContainer);
  
  // Add currency list
  const currencyList = document.createElement('div');
  currencyList.className = 'currency-list';
  currencyList.id = 'currency-list';
  
  // Populate currency list
  Object.entries(CURRENCIES).forEach(([code, currency]) => {
    const currencyOption = document.createElement('button');
    currencyOption.className = 'currency-option';
    currencyOption.setAttribute('data-currency', code);
    currencyOption.innerHTML = `
      <span class="currency-flag">${currency.flag}</span>
      <span class="currency-name">${currency.name}</span>
      <span class="currency-code-small">${code}</span>
    `;
    
    if (code === currentCurrency) {
      currencyOption.classList.add('active');
    }
    
    currencyOption.addEventListener('click', () => {
      selectCurrency(code);
    });
    
    currencyList.appendChild(currencyOption);
  });
  
  dropdown.appendChild(currencyList);
  
  // Assemble selector
  selectorContainer.appendChild(triggerButton);
  selectorContainer.appendChild(dropdown);
  
  // Add to DOM
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    heroSection.insertBefore(selectorContainer, heroSection.querySelector('.signup'));
  }
  
  // Event listeners
  triggerButton.addEventListener('click', toggleDropdown);
  
  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!selectorContainer.contains(e.target)) {
      closeDropdown();
    }
  });
  
  // Search functionality
  const searchInput = document.getElementById('currency-search');
  if (searchInput) {
    searchInput.addEventListener('input', filterCurrencies);
  }
  
  // Keyboard navigation
  selectorContainer.addEventListener('keydown', handleKeyboardNavigation);
}

function toggleDropdown() {
  const dropdown = document.getElementById('currency-dropdown');
  const trigger = document.getElementById('currency-trigger');
  
  if (dropdown.style.display === 'none') {
    dropdown.style.display = 'block';
    trigger.classList.add('open');
    // Focus search input
    setTimeout(() => {
      const searchInput = document.getElementById('currency-search');
      if (searchInput) searchInput.focus();
    }, 100);
  } else {
    closeDropdown();
  }
}

function closeDropdown() {
  const dropdown = document.getElementById('currency-dropdown');
  const trigger = document.getElementById('currency-trigger');
  
  if (dropdown) dropdown.style.display = 'none';
  if (trigger) trigger.classList.remove('open');
}

function filterCurrencies(event) {
  const searchTerm = event.target.value.toLowerCase();
  const currencyOptions = document.querySelectorAll('.currency-option');
  
  currencyOptions.forEach(option => {
    const currencyName = option.querySelector('.currency-name').textContent.toLowerCase();
    const currencyCode = option.querySelector('.currency-code-small').textContent.toLowerCase();
    
    if (currencyName.includes(searchTerm) || currencyCode.includes(searchTerm)) {
      option.style.display = 'flex';
    } else {
      option.style.display = 'none';
    }
  });
}

function handleKeyboardNavigation(event) {
  if (event.key === 'Escape') {
    closeDropdown();
  }
  
  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    event.preventDefault();
    const options = Array.from(document.querySelectorAll('.currency-option'))
      .filter(option => option.style.display !== 'none');
    
    if (options.length === 0) return;
    
    const currentIndex = options.findIndex(option => option.classList.contains('highlighted'));
    let nextIndex;
    
    if (event.key === 'ArrowDown') {
      nextIndex = currentIndex < options.length - 1 ? currentIndex + 1 : 0;
    } else {
      nextIndex = currentIndex > 0 ? currentIndex - 1 : options.length - 1;
    }
    
    options.forEach(option => option.classList.remove('highlighted'));
    options[nextIndex].classList.add('highlighted');
    options[nextIndex].scrollIntoView({ block: 'nearest' });
  }
  
  if (event.key === 'Enter') {
    const highlighted = document.querySelector('.currency-option.highlighted');
    if (highlighted) {
      const currencyCode = highlighted.getAttribute('data-currency');
      selectCurrency(currencyCode);
    }
  }
}

function selectCurrency(currencyCode) {
  currentCurrency = currencyCode;
  localStorage.setItem('wynox_currency', currencyCode);
  
  // Update prices
  updateAllPrices();
  
  // Update selector UI
  updateCurrencySelectorUI();
  
  // Close dropdown
  closeDropdown();
  
  // Dispatch event for other scripts
  window.dispatchEvent(new CustomEvent('currencyChange', {
    detail: { currency: currencyCode }
  }));
}

function updateCurrencySelectorUI() {
  const trigger = document.getElementById('currency-trigger');
  if (trigger) {
    const currency = CURRENCIES[currentCurrency];
    trigger.innerHTML = `
      <span class="currency-flag">${currency.flag}</span>
      <span class="currency-code">${currentCurrency}</span>
      <span class="currency-symbol">${currency.symbol}</span>
      <svg class="currency-chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    `;
  }
  
  // Update active state in dropdown
  const options = document.querySelectorAll('.currency-option');
  options.forEach(option => {
    if (option.getAttribute('data-currency') === currentCurrency) {
      option.classList.add('active');
    } else {
      option.classList.remove('active');
    }
  });
}

// ==================== INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
  createCurrencySelector();
  updateAllPrices();
  
  // Listen for currency changes from other scripts
  window.addEventListener('currencyChange', (e) => {
    if (e.detail && e.detail.currency) {
      currentCurrency = e.detail.currency;
      updateAllPrices();
    }
  });
});
