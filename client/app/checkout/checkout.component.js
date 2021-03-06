'use strict';
const angular = require('angular');
const template = require('ngtemplate!html!./checkout.html');
var braintree = require('braintree-web');
const mask = require('./mask.js');

import $ from "jquery";

export class checkoutComponent {
  /*@ngInject*/
  constructor(ngCart, $http, $state, $timeout) {
    this.$http = $http;
    this.$state = $state;
    this.$timeout = $timeout;
    this.ngCart = ngCart;
    this.message = 'World';
    this.totalCost = this.ngCart.totalCost();
    this.form = $('#checkout-form');
    this.zipcodeInput = $('#zipcode');
    this.state = $('#state');
    this.city = $('#city');
    this.country = $('#country');
    this.checkoutButton = $('#checkoutBtn');
    this.nonceInput = $('#payment-method-nonce');
    $('#phone').mask('(000) 000-0000');

    this.countries = [
      {
        'value': 'US',
        'name': 'United States',
      },
      {
        'value': 'CA',
        'name': 'Canada',
      },
      {
        'value': 'BD',
        'name': 'Bangladesh',
      },
      {
        'value': 'BE',
        'name': 'Belgium',
      },
      {
        'value': 'BF',
        'name': 'Burkina Faso',
      },
      {
        'value': 'BG',
        'name': 'Bulgaria',
      },
      {
        'value': 'BA',
        'name': 'Bosnia and Herzegovina',
      },
      {
        'value': 'BB',
        'name': 'Barbados',
      },
      {
        'value': 'WF',
        'name': 'Wallis and Futuna',
      },
      {
        'value': 'BL',
        'name': 'Saint Barthelemy',
      },
      {
        'value': 'BM',
        'name': 'Bermuda',
      },
      {
        'value': 'BN',
        'name': 'Brunei',
      },
      {
        'value': 'BO',
        'name': 'Bolivia',
      },
      {
        'value': 'BH',
        'name': 'Bahrain',
      },
      {
        'value': 'BI',
        'name': 'Burundi',
      },
      {
        'value': 'BJ',
        'name': 'Benin',
      },
      {
        'value': 'BT',
        'name': 'Bhutan',
      },
      {
        'value': 'JM',
        'name': 'Jamaica',
      },
      {
        'value': 'BV',
        'name': 'Bouvet Island',
      },
      {
        'value': 'BW',
        'name': 'Botswana',
      },
      {
        'value': 'WS',
        'name': 'Samoa',
      },
      {
        'value': 'BQ',
        'name': 'Bonaire, Saint Eustatius and Saba ',
      },
      {
        'value': 'BR',
        'name': 'Brazil',
      },
      {
        'value': 'BS',
        'name': 'Bahamas',
      },
      {
        'value': 'JE',
        'name': 'Jersey',
      },
      {
        'value': 'BY',
        'name': 'Belarus',
      },
      {
        'value': 'BZ',
        'name': 'Belize',
      },
      {
        'value': 'RU',
        'name': 'Russia',
      },
      {
        'value': 'RW',
        'name': 'Rwanda',
      },
      {
        'value': 'RS',
        'name': 'Serbia',
      },
      {
        'value': 'TL',
        'name': 'East Timor',
      },
      {
        'value': 'RE',
        'name': 'Reunion',
      },
      {
        'value': 'TM',
        'name': 'Turkmenistan',
      },
      {
        'value': 'TJ',
        'name': 'Tajikistan',
      },
      {
        'value': 'RO',
        'name': 'Romania',
      },
      {
        'value': 'TK',
        'name': 'Tokelau',
      },
      {
        'value': 'GW',
        'name': 'Guinea-Bissau',
      },
      {
        'value': 'GU',
        'name': 'Guam',
      },
      {
        'value': 'GT',
        'name': 'Guatemala',
      },
      {
        'value': 'GS',
        'name': 'South Georgia and the South Sandwich Islands',
      },
      {
        'value': 'GR',
        'name': 'Greece',
      },
      {
        'value': 'GQ',
        'name': 'Equatorial Guinea',
      },
      {
        'value': 'GP',
        'name': 'Guadeloupe',
      },
      {
        'value': 'JP',
        'name': 'Japan',
      },
      {
        'value': 'GY',
        'name': 'Guyana',
      },
      {
        'value': 'GG',
        'name': 'Guernsey',
      },
      {
        'value': 'GF',
        'name': 'French Guiana',
      },
      {
        'value': 'GE',
        'name': 'Georgia',
      },
      {
        'value': 'GD',
        'name': 'Grenada',
      },
      {
        'value': 'GB',
        'name': 'United Kingdom',
      },
      {
        'value': 'GA',
        'name': 'Gabon',
      },
      {
        'value': 'SV',
        'name': 'El Salvador',
      },
      {
        'value': 'GN',
        'name': 'Guinea',
      },
      {
        'value': 'GM',
        'name': 'Gambia',
      },
      {
        'value': 'GL',
        'name': 'Greenland',
      },
      {
        'value': 'GI',
        'name': 'Gibraltar',
      },
      {
        'value': 'GH',
        'name': 'Ghana',
      },
      {
        'value': 'OM',
        'name': 'Oman',
      },
      {
        'value': 'TN',
        'name': 'Tunisia',
      },
      {
        'value': 'JO',
        'name': 'Jordan',
      },
      {
        'value': 'HR',
        'name': 'Croatia',
      },
      {
        'value': 'HT',
        'name': 'Haiti',
      },
      {
        'value': 'HU',
        'name': 'Hungary',
      },
      {
        'value': 'HK',
        'name': 'Hong Kong',
      },
      {
        'value': 'HN',
        'name': 'Honduras',
      },
      {
        'value': 'HM',
        'name': 'Heard Island and McDonald Islands',
      },
      {
        'value': 'VE',
        'name': 'Venezuela',
      },
      {
        'value': 'PR',
        'name': 'Puerto Rico',
      },
      {
        'value': 'PS',
        'name': 'Palestinian Territory',
      },
      {
        'value': 'PW',
        'name': 'Palau',
      },
      {
        'value': 'PT',
        'name': 'Portugal',
      },
      {
        'value': 'SJ',
        'name': 'Svalbard and Jan Mayen',
      },
      {
        'value': 'PY',
        'name': 'Paraguay',
      },
      {
        'value': 'IQ',
        'name': 'Iraq',
      },
      {
        'value': 'PA',
        'name': 'Panama',
      },
      {
        'value': 'PF',
        'name': 'French Polynesia',
      },
      {
        'value': 'PG',
        'name': 'Papua New Guinea',
      },
      {
        'value': 'PE',
        'name': 'Peru',
      },
      {
        'value': 'PK',
        'name': 'Pakistan',
      },
      {
        'value': 'PH',
        'name': 'Philippines',
      },
      {
        'value': 'PN',
        'name': 'Pitcairn',
      },
      {
        'value': 'PL',
        'name': 'Poland',
      },
      {
        'value': 'PM',
        'name': 'Saint Pierre and Miquelon',
      },
      {
        'value': 'ZM',
        'name': 'Zambia',
      },
      {
        'value': 'EH',
        'name': 'Western Sahara',
      },
      {
        'value': 'EE',
        'name': 'Estonia',
      },
      {
        'value': 'EG',
        'name': 'Egypt',
      },
      {
        'value': 'ZA',
        'name': 'South Africa',
      },
      {
        'value': 'EC',
        'name': 'Ecuador',
      },
      {
        'value': 'IT',
        'name': 'Italy',
      },
      {
        'value': 'VN',
        'name': 'Vietnam',
      },
      {
        'value': 'SB',
        'name': 'Solomon Islands',
      },
      {
        'value': 'ET',
        'name': 'Ethiopia',
      },
      {
        'value': 'SO',
        'name': 'Somalia',
      },
      {
        'value': 'ZW',
        'name': 'Zimbabwe',
      },
      {
        'value': 'SA',
        'name': 'Saudi Arabia',
      },
      {
        'value': 'ES',
        'name': 'Spain',
      },
      {
        'value': 'ER',
        'name': 'Eritrea',
      },
      {
        'value': 'ME',
        'name': 'Montenegro',
      },
      {
        'value': 'MD',
        'name': 'Moldova',
      },
      {
        'value': 'MG',
        'name': 'Madagascar',
      },
      {
        'value': 'MF',
        'name': 'Saint Martin',
      },
      {
        'value': 'MA',
        'name': 'Morocco',
      },
      {
        'value': 'MC',
        'name': 'Monaco',
      },
      {
        'value': 'UZ',
        'name': 'Uzbekistan',
      },
      {
        'value': 'MM',
        'name': 'Myanmar',
      },
      {
        'value': 'ML',
        'name': 'Mali',
      },
      {
        'value': 'MO',
        'name': 'Macao',
      },
      {
        'value': 'MN',
        'name': 'Mongolia',
      },
      {
        'value': 'MH',
        'name': 'Marshall Islands',
      },
      {
        'value': 'MK',
        'name': 'Macedonia',
      },
      {
        'value': 'MU',
        'name': 'Mauritius',
      },
      {
        'value': 'MT',
        'name': 'Malta',
      },
      {
        'value': 'MW',
        'name': 'Malawi',
      },
      {
        'value': 'MV',
        'name': 'Maldives',
      },
      {
        'value': 'MQ',
        'name': 'Martinique',
      },
      {
        'value': 'MP',
        'name': 'Northern Mariana Islands',
      },
      {
        'value': 'MS',
        'name': 'Montserrat',
      },
      {
        'value': 'MR',
        'name': 'Mauritania',
      },
      {
        'value': 'IM',
        'name': 'Isle of Man',
      },
      {
        'value': 'UG',
        'name': 'Uganda',
      },
      {
        'value': 'TZ',
        'name': 'Tanzania',
      },
      {
        'value': 'MY',
        'name': 'Malaysia',
      },
      {
        'value': 'MX',
        'name': 'Mexico',
      },
      {
        'value': 'IL',
        'name': 'Israel',
      },
      {
        'value': 'FR',
        'name': 'France',
      },
      {
        'value': 'IO',
        'name': 'British Indian Ocean Territory',
      },
      {
        'value': 'SH',
        'name': 'Saint Helena',
      },
      {
        'value': 'FI',
        'name': 'Finland',
      },
      {
        'value': 'FJ',
        'name': 'Fiji',
      },
      {
        'value': 'FK',
        'name': 'Falkland Islands',
      },
      {
        'value': 'FM',
        'name': 'Micronesia',
      },
      {
        'value': 'FO',
        'name': 'Faroe Islands',
      },
      {
        'value': 'NI',
        'name': 'Nicaragua',
      },
      {
        'value': 'NL',
        'name': 'Netherlands',
      },
      {
        'value': 'NO',
        'name': 'Norway',
      },
      {
        'value': 'NA',
        'name': 'Namibia',
      },
      {
        'value': 'VU',
        'name': 'Vanuatu',
      },
      {
        'value': 'NC',
        'name': 'New Caledonia',
      },
      {
        'value': 'NE',
        'name': 'Niger',
      },
      {
        'value': 'NF',
        'name': 'Norfolk Island',
      },
      {
        'value': 'NG',
        'name': 'Nigeria',
      },
      {
        'value': 'NZ',
        'name': 'New Zealand',
      },
      {
        'value': 'NP',
        'name': 'Nepal',
      },
      {
        'value': 'NR',
        'name': 'Nauru',
      },
      {
        'value': 'NU',
        'name': 'Niue',
      },
      {
        'value': 'CK',
        'name': 'Cook Islands',
      },
      {
        'value': 'XK',
        'name': 'Kosovo',
      },
      {
        'value': 'CI',
        'name': 'Ivory Coast',
      },
      {
        'value': 'CH',
        'name': 'Switzerland',
      },
      {
        'value': 'CO',
        'name': 'Colombia',
      },
      {
        'value': 'CN',
        'name': 'China',
      },
      {
        'value': 'CM',
        'name': 'Cameroon',
      },
      {
        'value': 'CL',
        'name': 'Chile',
      },
      {
        'value': 'CC',
        'name': 'Cocos Islands',
      },
      {
        'value': 'CG',
        'name': 'Republic of the Congo',
      },
      {
        'value': 'CF',
        'name': 'Central African Republic',
      },
      {
        'value': 'CD',
        'name': 'Democratic Republic of the Congo',
      },
      {
        'value': 'CZ',
        'name': 'Czech Republic',
      },
      {
        'value': 'CY',
        'name': 'Cyprus',
      },
      {
        'value': 'CX',
        'name': 'Christmas Island',
      },
      {
        'value': 'CR',
        'name': 'Costa Rica',
      },
      {
        'value': 'CW',
        'name': 'Curacao',
      },
      {
        'value': 'CV',
        'name': 'Cape Verde',
      },
      {
        'value': 'CU',
        'name': 'Cuba',
      },
      {
        'value': 'SZ',
        'name': 'Swaziland',
      },
      {
        'value': 'SY',
        'name': 'Syria',
      },
      {
        'value': 'SX',
        'name': 'Sint Maarten',
      },
      {
        'value': 'KG',
        'name': 'Kyrgyzstan',
      },
      {
        'value': 'KE',
        'name': 'Kenya',
      },
      {
        'value': 'SS',
        'name': 'South Sudan',
      },
      {
        'value': 'SR',
        'name': 'Suriname',
      },
      {
        'value': 'KI',
        'name': 'Kiribati',
      },
      {
        'value': 'KH',
        'name': 'Cambodia',
      },
      {
        'value': 'KN',
        'name': 'Saint Kitts and Nevis',
      },
      {
        'value': 'KM',
        'name': 'Comoros',
      },
      {
        'value': 'ST',
        'name': 'Sao Tome and Principe',
      },
      {
        'value': 'SK',
        'name': 'Slovakia',
      },
      {
        'value': 'KR',
        'name': 'South Korea',
      },
      {
        'value': 'SI',
        'name': 'Slovenia',
      },
      {
        'value': 'KP',
        'name': 'North Korea',
      },
      {
        'value': 'KW',
        'name': 'Kuwait',
      },
      {
        'value': 'SN',
        'name': 'Senegal',
      },
      {
        'value': 'SM',
        'name': 'San Marino',
      },
      {
        'value': 'SL',
        'name': 'Sierra Leone',
      },
      {
        'value': 'SC',
        'name': 'Seychelles',
      },
      {
        'value': 'KZ',
        'name': 'Kazakhstan',
      },
      {
        'value': 'KY',
        'name': 'Cayman Islands',
      },
      {
        'value': 'SG',
        'name': 'Singapore',
      },
      {
        'value': 'SE',
        'name': 'Sweden',
      },
      {
        'value': 'SD',
        'name': 'Sudan',
      },
      {
        'value': 'DO',
        'name': 'Dominican Republic',
      },
      {
        'value': 'DM',
        'name': 'Dominica',
      },
      {
        'value': 'DJ',
        'name': 'Djibouti',
      },
      {
        'value': 'DK',
        'name': 'Denmark',
      },
      {
        'value': 'VG',
        'name': 'British Virgin Islands',
      },
      {
        'value': 'DE',
        'name': 'Germany',
      },
      {
        'value': 'YE',
        'name': 'Yemen',
      },
      {
        'value': 'DZ',
        'name': 'Algeria',
      },
      {
        'value': 'UY',
        'name': 'Uruguay',
      },
      {
        'value': 'YT',
        'name': 'Mayotte',
      },
      {
        'value': 'UM',
        'name': 'United States Minor Outlying Islands',
      },
      {
        'value': 'LB',
        'name': 'Lebanon',
      },
      {
        'value': 'LC',
        'name': 'Saint Lucia',
      },
      {
        'value': 'LA',
        'name': 'Laos',
      },
      {
        'value': 'TV',
        'name': 'Tuvalu',
      },
      {
        'value': 'TW',
        'name': 'Taiwan',
      },
      {
        'value': 'TT',
        'name': 'Trinidad and Tobago',
      },
      {
        'value': 'TR',
        'name': 'Turkey',
      },
      {
        'value': 'LK',
        'name': 'Sri Lanka',
      },
      {
        'value': 'LI',
        'name': 'Liechtenstein',
      },
      {
        'value': 'LV',
        'name': 'Latvia',
      },
      {
        'value': 'TO',
        'name': 'Tonga',
      },
      {
        'value': 'LT',
        'name': 'Lithuania',
      },
      {
        'value': 'LU',
        'name': 'Luxembourg',
      },
      {
        'value': 'LR',
        'name': 'Liberia',
      },
      {
        'value': 'LS',
        'name': 'Lesotho',
      },
      {
        'value': 'TH',
        'name': 'Thailand',
      },
      {
        'value': 'TF',
        'name': 'French Southern Territories',
      },
      {
        'value': 'TG',
        'name': 'Togo',
      },
      {
        'value': 'TD',
        'name': 'Chad',
      },
      {
        'value': 'TC',
        'name': 'Turks and Caicos Islands',
      },
      {
        'value': 'LY',
        'name': 'Libya',
      },
      {
        'value': 'VA',
        'name': 'Vatican',
      },
      {
        'value': 'VC',
        'name': 'Saint Vincent and the Grenadines',
      },
      {
        'value': 'AE',
        'name': 'United Arab Emirates',
      },
      {
        'value': 'AD',
        'name': 'Andorra',
      },
      {
        'value': 'AG',
        'name': 'Antigua and Barbuda',
      },
      {
        'value': 'AF',
        'name': 'Afghanistan',
      },
      {
        'value': 'AI',
        'name': 'Anguilla',
      },
      {
        'value': 'VI',
        'name': 'U.S. Virgin Islands',
      },
      {
        'value': 'IS',
        'name': 'Iceland',
      },
      {
        'value': 'IR',
        'name': 'Iran',
      },
      {
        'value': 'AM',
        'name': 'Armenia',
      },
      {
        'value': 'AL',
        'name': 'Albania',
      },
      {
        'value': 'AO',
        'name': 'Angola',
      },
      {
        'value': 'AQ',
        'name': 'Antarctica',
      },
      {
        'value': 'AS',
        'name': 'American Samoa',
      },
      {
        'value': 'AR',
        'name': 'Argentina',
      },
      {
        'value': 'AU',
        'name': 'Australia',
      },
      {
        'value': 'AT',
        'name': 'Austria',
      },
      {
        'value': 'AW',
        'name': 'Aruba',
      },
      {
        'value': 'IN',
        'name': 'India',
      },
      {
        'value': 'AX',
        'name': 'Aland Islands',
      },
      {
        'value': 'AZ',
        'name': 'Azerbaijan',
      },
      {
        'value': 'IE',
        'name': 'Ireland',
      },
      {
        'value': 'ID',
        'name': 'Indonesia',
      },
      {
        'value': 'UA',
        'name': 'Ukraine',
      },
      {
        'value': 'QA',
        'name': 'Qatar',
      },
      {
        'value': 'MZ',
        'name': 'Mozambique'
      }
    ]

    this.states = [
      {
        name: "Alabama",
        value: "AL"
      },
      {
        name: "Alaska",
        value: "AK"
      },
      {
        name: "American Samoa",
        value: "AS"
      },
      {
        name: "Arizona",
        value: "AZ"
      },
      {
        name: "Arkansas",
        value: "AR"
      },
      {
        name: "California",
        value: "CA"
      },
      {
        name: "Colorado",
        value: "CO"
      },
      {
        name: "Connecticut",
        value: "CT"
      },
      {
        name: "Delaware",
        value: "DE"
      },
      {
        name: "District Of Columbia",
        value: "DC"
      },
      {
        name: "Federated States Of Micronesia",
        value: "FM"
      },
      {
        name: "Florida",
        value: "FL"
      },
      {
        name: "Georgia",
        value: "GA"
      },
      {
        name: "Guam",
        value: "GU"
      },
      {
        name: "Hawaii",
        value: "HI"
      },
      {
        name: "Idaho",
        value: "ID"
      },
      {
        name: "Illinois",
        value: "IL"
      },
      {
        name: "Indiana",
        value: "IN"
      },
      {
        name: "Iowa",
        value: "IA"
      },
      {
        name: "Kansas",
        value: "KS"
      },
      {
        name: "Kentucky",
        value: "KY"
      },
      {
        name: "Louisiana",
        value: "LA"
      },
      {
        name: "Maine",
        value: "ME"
      },
      {
        name: "Marshall Islands",
        value: "MH"
      },
      {
        name: "Maryland",
        value: "MD"
      },
      {
        name: "Massachusetts",
        value: "MA"
      },
      {
        name: "Michigan",
        value: "MI"
      },
      {
        name: "Minnesota",
        value: "MN"
      },
      {
        name: "Mississippi",
        value: "MS"
      },
      {
        name: "Missouri",
        value: "MO"
      },
      {
        name: "Montana",
        value: "MT"
      },
      {
        name: "Nebraska",
        value: "NE"
      },
      {
        name: "Nevada",
        value: "NV"
      },
      {
        name: "New Hampshire",
        value: "NH"
      },
      {
        name: "New Jersey",
        value: "NJ"
      },
      {
        name: "New Mexico",
        value: "NM"
      },
      {
        name: "New York",
        value: "NY"
      },
      {
        name: "North Carolina",
        value: "NC"
      },
      {
        name: "North Dakota",
        value: "ND"
      },
      {
        name: "Northern Mariana Islands",
        value: "MP"
      },
      {
        name: "Ohio",
        value: "OH"
      },
      {
        name: "Oklahoma",
        value: "OK"
      },
      {
        name: "Oregon",
        value: "OR"
      },
      {
        name: "Palau",
        value: "PW"
      },
      {
        name: "Pennsylvania",
        value: "PA"
      },
      {
        name: "Puerto Rico",
        value: "PR"
      },
      {
        name: "Rhode Island",
        value: "RI"
      },
      {
        name: "South Carolina",
        value: "SC"
      },
      {
        name: "South Dakota",
        value: "SD"
      },
      {
        name: "Tennessee",
        value: "TN"
      },
      {
        name: "Texas",
        value: "TX"
      },
      {
        name: "Utah",
        value: "UT"
      },
      {
        name: "Vermont",
        value: "VT"
      },
      {
        name: "Virgin Islands",
        value: "VI"
      },
      {
        name: "Virginia",
        value: "VA"
      },
      {
        name: "Washington",
        value: "WA"
      },
      {
        name: "West Virginia",
        value: "WV"
      },
      {
        name: "Wisconsin",
        value: "WI"
      },
      {
        name: "Wyoming",
        value: "WY"
      },
      {
        "name": "Alberta",
        "value": "AB"
      },
      {
        "name": "British Columbia",
        "value": "BC"
      },
      {
        "name": "Manitoba",
        "value": "MB"
      },
      {
        "name": "New Brunswick",
        "value": "NB"
      },
      {
        "name": "Newfoundland and Labrador",
        "value": "NL"
      },
      {
        "name": "Nova Scotia",
        "value": "NS"
      },
      {
        "name": "Ontario",
        "value": "ON"
      },
      {
        "name": "Prince Edward Island",
        "value": "PE"
      },
      {
        "name": "Quebec",
        "value": "QC"
      },
      {
        "name": "Saskatchewan",
        "value": "SK"
      },
      {
        "name": "Northwest Territories",
        "value": "NT"
      },
      {
        "name": "Nunavut",
        "value": "NU"
      },
      {
        "name": "Yukon",
        "value": "YT"
      }
    ]
  }

  $onInit() {
    var _this = this;

    this.zipcodeInput.on('blur', function() {
      var dataUrl = 'https://api.zippopotam.us/us/' + this.value;
      _this.$http.get(dataUrl)
        .success(function (res){
          // console.log(res);
          var place = res.places[0];
          _this.country.val(res['country abbreviation']);
          _this.city.val(place['place name']);
          _this.state.val(place['state abbreviation']);
          _this.$timeout(function() {
            _this.country.trigger('change');
            _this.city.trigger('change');
            _this.state.trigger('change');
          });

        })
        .error(function (error, status){
          // Zipcode not found
          var fetchError = { message: error, status: status};
          // console.log(fetchError);
        });
    });

    this.state.change(function(event) {
      if (event.currentTarget.value == "RI") {
        _this.ngCart.setTaxRate(7.5);
      } else {
        _this.ngCart.setTaxRate(0);
      };
    });

    this.setupBraintree();
  }

  setupBraintree(controller) {
    var _this = this;

    _this.$http({
      method: 'GET',
      url: '/api/checkouts/token'
    }).then(function successCallback(response) {
        console.log('Token retreived');
        var token = response.data;
        var submit = _this.checkoutButton;
        var nonce = _this.nonce;

        braintree.client.create({
          authorization: token
        }, function (clientErr, clientInstance) {
          if (clientErr) { return; }

          braintree.hostedFields.create({
            client: clientInstance,
            styles: {
              'input': { 'font-size': '14px' },
              'input.invalid': { 'color': 'red' },
              'input.valid': { 'color': 'green' }
            },
            fields: {
              number: {
                selector: '#card-number',
                placeholder: ''
              },
              cvv: {
                selector: '#cvv',
                placeholder: ''
              },
              expirationDate: {
                selector: '#expiration-date',
                placeholder: ''
              }
            }
          }, function (hostedFieldsErr, hostedFieldsInstance) {
            if (hostedFieldsErr) {
              // Handle error in Hosted Fields creation
              console.log(hostedFieldsErr);
              return;
            }

            submit.prop("disabled", false);

            _this.form.on('submit', function(event) {
              event.preventDefault();
              submit.prop("disabled", true);

              hostedFieldsInstance.tokenize(function (tokenizeErr, payload) {
                if (tokenizeErr) { return; }

                var formData = JSON.parse(JSON.stringify(_this.form.serializeArray()));
                var cartData = _this.ngCart.getCart();

                var req = {
                  method: 'POST',
                  url: '/api/checkouts',
                  data: {
                    formData: formData,
                    totalCost: _this.ngCart.totalCost(),
                    payload: payload,
                    cartData: cartData
                  }
                }
                _this.$http(req).then(function(response){
                  // Successful order
                  // console.log('Successful transaction respsonse: ', response);
                  _this.ngCart.empty();
                  _this.redirectToOrder({orderId: response.data.transaction.id, stick: response.data.items[0]._data});
                }, function(response){                  
                  // Error
                  // console.log('Error transaction respsonse: ', response);
                  var error = {msg: 'Error: ' + response.data.errorMsg}
                  _this.errors = [];
                  _this.errors.push(error);
                  console.log(response);
                  console.log(_this.errors);
                  submit.prop("disabled", false);
                });
              });
            });
          })
        });
    });
  }

  redirectToOrder(params) {
    this.$state.go('orders', params);
  }
}

export default angular.module('customizerApp.checkout', [])
  .component('checkout', {
    templateUrl: template,
    bindings: { message: '<' },
    controller: checkoutComponent,
    controllerAs: 'checkout'
  })
  .name;
