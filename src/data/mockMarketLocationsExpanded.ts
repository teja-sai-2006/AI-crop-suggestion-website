/**
 * Comprehensive Mock Market Locations Data
 * Covering all major Indian states and cities
 * Frontend-first implementation for KM farming assistant
 */

import { MarketLocation } from '../types/marketPrices.types';

export const comprehensiveMarketLocations: MarketLocation[] = [
  // Maharashtra
  {
    id: 'loc_mumbai_apmc',
    name: 'Agricultural Market Mumbai',
    city: 'Mumbai',
    state: 'Maharashtra',
    region: 'Western India',
    marketType: 'wholesale',
    isActive: true,
    coordinates: { lat: 19.0760, lng: 72.8777 }
  },
  {
    id: 'loc_pune_hadapsar',
    name: 'Agricultural Market Pune',
    city: 'Pune',
    state: 'Maharashtra',
    region: 'Western India',
    marketType: 'mandi',
    isActive: true,
    coordinates: { lat: 18.5204, lng: 73.8567 }
  },
  {
    id: 'loc_nagpur_cotton',
    name: 'Agricultural Market Nagpur',
    city: 'Nagpur',
    state: 'Maharashtra',
    region: 'Central India',
    marketType: 'wholesale',
    isActive: true,
    coordinates: { lat: 21.1458, lng: 79.0882 }
  },
  {
    id: 'loc_nashik_onion',
    name: 'Agricultural Market Nashik',
    city: 'Nashik',
    state: 'Maharashtra',
    region: 'Western India',
    marketType: 'mandi',
    isActive: true,
    coordinates: { lat: 19.9975, lng: 73.7898 }
  },
  {
    id: 'loc_aurangabad_agri',
    name: 'Agricultural Market Aurangabad',
    city: 'Aurangabad',
    state: 'Maharashtra',
    region: 'Western India',
    marketType: 'wholesale',
    isActive: true,
    coordinates: { lat: 19.8762, lng: 75.3433 }
  },
  {
    id: 'loc_solapur_cotton',
    name: 'Agricultural Market Solapur',
    city: 'Solapur',
    state: 'Maharashtra',
    region: 'Western India',
    marketType: 'mandi',
    isActive: true,
    coordinates: { lat: 17.6599, lng: 75.9064 }
  },

  // Gujarat
  {
    id: 'loc_ahmedabad_jamalpur',
    name: 'Agricultural Market Ahmedabad',
    city: 'Ahmedabad',
    state: 'Gujarat',
    region: 'Western India',
    marketType: 'mandi',
    isActive: true,
    coordinates: { lat: 23.0225, lng: 72.5714 }
  },
  {
    id: 'loc_surat_textile',
    name: 'Agricultural Market Surat',
    city: 'Surat',
    state: 'Gujarat',
    region: 'Western India',
    marketType: 'wholesale',
    isActive: true,
    coordinates: { lat: 21.1702, lng: 72.8311 }
  },
  {
    id: 'loc_rajkot_cotton',
    name: 'Agricultural Market Rajkot',
    city: 'Rajkot',
    state: 'Gujarat',
    region: 'Western India',
    marketType: 'mandi',
    isActive: true,
    coordinates: { lat: 22.3039, lng: 70.8022 }
  },
  {
    id: 'loc_vadodara_agri',
    name: 'Agricultural Market Vadodara',
    city: 'Vadodara',
    state: 'Gujarat',
    region: 'Western India',
    marketType: 'wholesale',
    isActive: true,
    coordinates: { lat: 22.3072, lng: 73.1812 }
  },
  {
    id: 'loc_bhavnagar_cotton',
    name: 'Agricultural Market Bhavnagar',
    city: 'Bhavnagar',
    state: 'Gujarat',
    region: 'Western India',
    marketType: 'mandi',
    isActive: true,
    coordinates: { lat: 21.7645, lng: 72.1519 }
  },

  // Rajasthan
  {
    id: 'loc_jaipur_chomu',
    name: 'Agricultural Market Jaipur',
    city: 'Jaipur',
    state: 'Rajasthan',
    region: 'North India',
    marketType: 'mandi',
    isActive: true,
    coordinates: { lat: 26.9124, lng: 75.7873 }
  },
  {
    id: 'loc_jodhpur_spice',
    name: 'Agricultural Market Jodhpur',
    city: 'Jodhpur',
    state: 'Rajasthan',
    region: 'North India',
    marketType: 'wholesale',
    isActive: true,
    coordinates: { lat: 26.2389, lng: 73.0243 }
  },
  {
    id: 'loc_udaipur_grain',
    name: 'Agricultural Market Udaipur',
    city: 'Udaipur',
    state: 'Rajasthan',
    region: 'North India',
    marketType: 'mandi',
    isActive: true,
    coordinates: { lat: 24.5854, lng: 73.7125 }
  },
  {
    id: 'loc_kota_agricultural',
    name: 'Agricultural Market Kota',
    city: 'Kota',
    state: 'Rajasthan',
    region: 'North India',
    marketType: 'wholesale',
    isActive: true,
    coordinates: { lat: 25.2138, lng: 75.8648 }
  },
  {
    id: 'loc_bikaner_mustard',
    name: 'Agricultural Market Bikaner',
    city: 'Bikaner',
    state: 'Rajasthan',
    region: 'North India',
    marketType: 'mandi',
    isActive: true,
    coordinates: { lat: 28.0229, lng: 73.3119 }
  },

  // Uttar Pradesh
  {
    id: 'loc_lucknow_aminabad',
    name: 'Agricultural Market Lucknow',
    city: 'Lucknow',
    state: 'Uttar Pradesh',
    region: 'North India',
    marketType: 'retail',
    isActive: true,
    coordinates: { lat: 26.8467, lng: 80.9462 }
  },
  {
    id: 'loc_kanpur_grain',
    name: 'Agricultural Market Kanpur',
    city: 'Kanpur',
    state: 'Uttar Pradesh',
    region: 'North India',
    marketType: 'wholesale',
    isActive: true,
    coordinates: { lat: 26.4499, lng: 80.3319 }
  },
  {
    id: 'loc_agra_vegetable',
    name: 'Agricultural Market Agra',
    city: 'Agra',
    state: 'Uttar Pradesh',
    region: 'North India',
    marketType: 'mandi',
    isActive: true,
    coordinates: { lat: 27.1767, lng: 78.0081 }
  },
  {
    id: 'loc_varanasi_agricultural',
    name: 'Agricultural Market Varanasi',
    city: 'Varanasi',
    state: 'Uttar Pradesh',
    region: 'North India',
    marketType: 'wholesale',
    isActive: true,
    coordinates: { lat: 25.3176, lng: 82.9739 }
  },
  {
    id: 'loc_meerut_sugarcane',
    name: 'Agricultural Market Meerut',
    city: 'Meerut',
    state: 'Uttar Pradesh',
    region: 'North India',
    marketType: 'mandi',
    isActive: true,
    coordinates: { lat: 28.9845, lng: 77.7064 }
  },
  {
    id: 'loc_allahabad_grain',
    name: 'Agricultural Market Allahabad',
    city: 'Allahabad',
    state: 'Uttar Pradesh',
    region: 'North India',
    marketType: 'wholesale',
    isActive: true,
    coordinates: { lat: 25.4358, lng: 81.8463 }
  },

  // Madhya Pradesh
  {
    id: 'loc_bhopal_chowk',
    name: 'Agricultural Market Bhopal',
    city: 'Bhopal',
    state: 'Madhya Pradesh',
    region: 'Central India',
    marketType: 'wholesale',
    isActive: true,
    coordinates: { lat: 23.2599, lng: 77.4126 }
  },
  {
    id: 'loc_indore_krishi',
    name: 'Agricultural Market Indore',
    city: 'Indore',
    state: 'Madhya Pradesh',
    region: 'Central India',
    marketType: 'mandi',
    isActive: true,
    coordinates: { lat: 22.7196, lng: 75.8577 }
  },
  {
    id: 'loc_gwalior_agricultural',
    name: 'Agricultural Market Gwalior',
    city: 'Gwalior',
    state: 'Madhya Pradesh',
    region: 'Central India',
    marketType: 'wholesale',
    isActive: true,
    coordinates: { lat: 26.2183, lng: 78.1828 }
  },
  {
    id: 'loc_jabalpur_grain',
    name: 'Agricultural Market Jabalpur',
    city: 'Jabalpur',
    state: 'Madhya Pradesh',
    region: 'Central India',
    marketType: 'mandi',
    isActive: true,
    coordinates: { lat: 23.1815, lng: 79.9864 }
  },
  {
    id: 'loc_ujjain_agricultural',
    name: 'Agricultural Market Ujjain',
    city: 'Ujjain',
    state: 'Madhya Pradesh',
    region: 'Central India',
    marketType: 'wholesale',
    isActive: true,
    coordinates: { lat: 23.1765, lng: 75.7885 }
  },

  // Telangana
  {
    id: 'loc_hyderabad_begum',
    name: 'Agricultural Market Hyderabad',
    city: 'Hyderabad',
    state: 'Telangana',
    region: 'South India',
    marketType: 'wholesale',
    isActive: true,
    coordinates: { lat: 17.3850, lng: 78.4867 }
  },
  {
    id: 'loc_warangal_cotton',
    name: 'Agricultural Market Warangal',
    city: 'Warangal',
    state: 'Telangana',
    region: 'South India',
    marketType: 'mandi',
    isActive: true,
    coordinates: { lat: 17.9689, lng: 79.5941 }
  },
  {
    id: 'loc_nizamabad_turmeric',
    name: 'Agricultural Market Nizamabad',
    city: 'Nizamabad',
    state: 'Telangana',
    region: 'South India',
    marketType: 'wholesale',
    isActive: true,
    coordinates: { lat: 18.6725, lng: 78.0941 }
  },
  {
    id: 'loc_karimnagar_rice',
    name: 'Agricultural Market Karimnagar',
    city: 'Karimnagar',
    state: 'Telangana',
    region: 'South India',
    marketType: 'mandi',
    isActive: true,
    coordinates: { lat: 18.4386, lng: 79.1288 }
  },

  // Andhra Pradesh
  {
    id: 'loc_vijayawada_agri',
    name: 'Agricultural Market Vijayawada',
    city: 'Vijayawada',
    state: 'Andhra Pradesh',
    region: 'South India',
    marketType: 'wholesale',
    isActive: true,
    coordinates: { lat: 16.5062, lng: 80.6480 }
  },
  {
    id: 'loc_visakhapatnam_fish',
    name: 'Agricultural Market Visakhapatnam',
    city: 'Visakhapatnam',
    state: 'Andhra Pradesh',
    region: 'South India',
    marketType: 'retail',
    isActive: true,
    coordinates: { lat: 17.6868, lng: 83.2185 }
  },
  {
    id: 'loc_guntur_chilli',
    name: 'Agricultural Market Guntur',
    city: 'Guntur',
    state: 'Andhra Pradesh',
    region: 'South India',
    marketType: 'mandi',
    isActive: true,
    coordinates: { lat: 16.3067, lng: 80.4365 }
  },
  {
    id: 'loc_tirupati_vegetable',
    name: 'Agricultural Market Tirupati',
    city: 'Tirupati',
    state: 'Andhra Pradesh',
    region: 'South India',
    marketType: 'retail',
    isActive: true,
    coordinates: { lat: 13.6288, lng: 79.4192 }
  },

  // Tamil Nadu
  {
    id: 'loc_chennai_koyambedu',
    name: 'Agricultural Market Chennai',
    city: 'Chennai',
    state: 'Tamil Nadu',
    region: 'South India',
    marketType: 'wholesale',
    isActive: true,
    coordinates: { lat: 13.0827, lng: 80.2707 }
  },
  {
    id: 'loc_coimbatore_textile',
    name: 'Agricultural Market Coimbatore',
    city: 'Coimbatore',
    state: 'Tamil Nadu',
    region: 'South India',
    marketType: 'wholesale',
    isActive: true,
    coordinates: { lat: 11.0168, lng: 76.9558 }
  },
  {
    id: 'loc_madurai_flower',
    name: 'Agricultural Market Madurai',
    city: 'Madurai',
    state: 'Tamil Nadu',
    region: 'South India',
    marketType: 'retail',
    isActive: true,
    coordinates: { lat: 9.9252, lng: 78.1198 }
  },
  {
    id: 'loc_salem_mango',
    name: 'Agricultural Market Salem',
    city: 'Salem',
    state: 'Tamil Nadu',
    region: 'South India',
    marketType: 'mandi',
    isActive: true,
    coordinates: { lat: 11.6643, lng: 78.1460 }
  },
  {
    id: 'loc_trichy_rice',
    name: 'Agricultural Market Tiruchirappalli',
    city: 'Tiruchirappalli',
    state: 'Tamil Nadu',
    region: 'South India',
    marketType: 'wholesale',
    isActive: true,
    coordinates: { lat: 10.7905, lng: 78.7047 }
  },

  // Karnataka
  {
    id: 'loc_bengaluru_yeswanthpur',
    name: 'Agricultural Market Bengaluru',
    city: 'Bengaluru',
    state: 'Karnataka',
    region: 'South India',
    marketType: 'wholesale',
    isActive: true,
    coordinates: { lat: 13.0358, lng: 77.5540 }
  },
  {
    id: 'loc_mysuru_silk',
    name: 'Agricultural Market Mysuru',
    city: 'Mysuru',
    state: 'Karnataka',
    region: 'South India',
    marketType: 'mandi',
    isActive: true,
    coordinates: { lat: 12.2958, lng: 76.6394 }
  },
  {
    id: 'loc_hubli_cotton',
    name: 'Agricultural Market Hubli',
    city: 'Hubli',
    state: 'Karnataka',
    region: 'South India',
    marketType: 'wholesale',
    isActive: true,
    coordinates: { lat: 15.3647, lng: 75.1240 }
  },
  {
    id: 'loc_mangaluru_spice',
    name: 'Agricultural Market Mangaluru',
    city: 'Mangaluru',
    state: 'Karnataka',
    region: 'South India',
    marketType: 'retail',
    isActive: true,
    coordinates: { lat: 12.9141, lng: 74.8560 }
  },
  {
    id: 'loc_bellary_rice',
    name: 'Agricultural Market Bellary',
    city: 'Bellary',
    state: 'Karnataka',
    region: 'South India',
    marketType: 'mandi',
    isActive: true,
    coordinates: { lat: 15.1394, lng: 76.9214 }
  },

  // Kerala
  {
    id: 'loc_kochi_spice',
    name: 'Agricultural Market Kochi',
    city: 'Kochi',
    state: 'Kerala',
    region: 'South India',
    marketType: 'wholesale',
    isActive: true,
    coordinates: { lat: 9.9312, lng: 76.2673 }
  },
  {
    id: 'loc_thiruvananthapuram_vegetable',
    name: 'Agricultural Market Thiruvananthapuram',
    city: 'Thiruvananthapuram',
    state: 'Kerala',
    region: 'South India',
    marketType: 'retail',
    isActive: true,
    coordinates: { lat: 8.5241, lng: 76.9366 }
  },
  {
    id: 'loc_kozhikode_coconut',
    name: 'Agricultural Market Kozhikode',
    city: 'Kozhikode',
    state: 'Kerala',
    region: 'South India',
    marketType: 'mandi',
    isActive: true,
    coordinates: { lat: 11.2588, lng: 75.7804 }
  },
  {
    id: 'loc_thrissur_rice',
    name: 'Agricultural Market Thrissur',
    city: 'Thrissur',
    state: 'Kerala',
    region: 'South India',
    marketType: 'wholesale',
    isActive: true,
    coordinates: { lat: 10.5276, lng: 76.2144 }
  },

  // Punjab
  {
    id: 'loc_chandigarh_grain',
    name: 'Agricultural Market Chandigarh',
    city: 'Chandigarh',
    state: 'Punjab',
    region: 'North India',
    marketType: 'wholesale',
    isActive: true,
    coordinates: { lat: 30.7333, lng: 76.7794 }
  },
  {
    id: 'loc_ludhiana_wheat',
    name: 'Agricultural Market Ludhiana',
    city: 'Ludhiana',
    state: 'Punjab',
    region: 'North India',
    marketType: 'mandi',
    isActive: true,
    coordinates: { lat: 30.9010, lng: 75.8573 }
  },
  {
    id: 'loc_amritsar_agricultural',
    name: 'Agricultural Market Amritsar',
    city: 'Amritsar',
    state: 'Punjab',
    region: 'North India',
    marketType: 'wholesale',
    isActive: true,
    coordinates: { lat: 31.6340, lng: 74.8723 }
  },
  {
    id: 'loc_jalandhar_rice',
    name: 'Agricultural Market Jalandhar',
    city: 'Jalandhar',
    state: 'Punjab',
    region: 'North India',
    marketType: 'mandi',
    isActive: true,
    coordinates: { lat: 31.3260, lng: 75.5762 }
  },
  {
    id: 'loc_patiala_wheat',
    name: 'Agricultural Market Patiala',
    city: 'Patiala',
    state: 'Punjab',
    region: 'North India',
    marketType: 'wholesale',
    isActive: true,
    coordinates: { lat: 30.3398, lng: 76.3869 }
  },

  // Haryana
  {
    id: 'loc_gurgaon_vegetable',
    name: 'Agricultural Market Gurgaon',
    city: 'Gurgaon',
    state: 'Haryana',
    region: 'North India',
    marketType: 'retail',
    isActive: true,
    coordinates: { lat: 28.4595, lng: 77.0266 }
  },
  {
    id: 'loc_faridabad_grain',
    name: 'Agricultural Market Faridabad',
    city: 'Faridabad',
    state: 'Haryana',
    region: 'North India',
    marketType: 'wholesale',
    isActive: true,
    coordinates: { lat: 28.4089, lng: 77.3178 }
  },
  {
    id: 'loc_panipat_agricultural',
    name: 'Agricultural Market Panipat',
    city: 'Panipat',
    state: 'Haryana',
    region: 'North India',
    marketType: 'mandi',
    isActive: true,
    coordinates: { lat: 29.3909, lng: 76.9635 }
  },
  {
    id: 'loc_hisar_cotton',
    name: 'Agricultural Market Hisar',
    city: 'Hisar',
    state: 'Haryana',
    region: 'North India',
    marketType: 'wholesale',
    isActive: true,
    coordinates: { lat: 29.1492, lng: 75.7217 }
  },

  // Delhi
  {
    id: 'loc_delhi_azadpur',
    name: 'Agricultural Market Delhi',
    city: 'Delhi',
    state: 'Delhi',
    region: 'North India',
    marketType: 'wholesale',
    isActive: true,
    coordinates: { lat: 28.7041, lng: 77.1025 }
  },
  {
    id: 'loc_delhi_ghazipur',
    name: 'Agricultural Market Delhi',
    city: 'Delhi',
    state: 'Delhi',
    region: 'North India',
    marketType: 'wholesale',
    isActive: true,
    coordinates: { lat: 28.6692, lng: 77.3082 }
  },
  {
    id: 'loc_delhi_okhla',
    name: 'Okhla Agricultural Market Delhi',
    city: 'Delhi',
    state: 'Delhi',
    region: 'North India',
    marketType: 'retail',
    isActive: true,
    coordinates: { lat: 28.5355, lng: 77.2730 }
  },

  // West Bengal
  {
    id: 'loc_kolkata_sealdah',
    name: 'Agricultural Market Kolkata',
    city: 'Kolkata',
    state: 'West Bengal',
    region: 'East India',
    marketType: 'wholesale',
    isActive: true,
    coordinates: { lat: 22.5726, lng: 88.3639 }
  },
  {
    id: 'loc_howrah_vegetable',
    name: 'Agricultural Market Howrah',
    city: 'Howrah',
    state: 'West Bengal',
    region: 'East India',
    marketType: 'retail',
    isActive: true,
    coordinates: { lat: 22.5958, lng: 88.2636 }
  },
  {
    id: 'loc_siliguri_tea',
    name: 'Agricultural Market Siliguri',
    city: 'Siliguri',
    state: 'West Bengal',
    region: 'East India',
    marketType: 'mandi',
    isActive: true,
    coordinates: { lat: 26.7271, lng: 88.3953 }
  },
  {
    id: 'loc_durgapur_grain',
    name: 'Agricultural Market Durgapur',
    city: 'Durgapur',
    state: 'West Bengal',
    region: 'East India',
    marketType: 'wholesale',
    isActive: true,
    coordinates: { lat: 23.5204, lng: 87.3119 }
  },

  // Bihar
  {
    id: 'loc_patna_grain',
    name: 'Agricultural Market Patna',
    city: 'Patna',
    state: 'Bihar',
    region: 'East India',
    marketType: 'wholesale',
    isActive: true,
    coordinates: { lat: 25.5941, lng: 85.1376 }
  },
  {
    id: 'loc_gaya_agricultural',
    name: 'Agricultural Market Gaya',
    city: 'Gaya',
    state: 'Bihar',
    region: 'East India',
    marketType: 'mandi',
    isActive: true,
    coordinates: { lat: 24.7914, lng: 85.0002 }
  },
  {
    id: 'loc_muzaffarpur_litchi',
    name: 'Agricultural Market Muzaffarpur',
    city: 'Muzaffarpur',
    state: 'Bihar',
    region: 'East India',
    marketType: 'retail',
    isActive: true,
    coordinates: { lat: 26.1209, lng: 85.3647 }
  },
  {
    id: 'loc_bhagalpur_vegetable',
    name: 'Agricultural Market Bhagalpur',
    city: 'Bhagalpur',
    state: 'Bihar',
    region: 'East India',
    marketType: 'wholesale',
    isActive: true,
    coordinates: { lat: 25.2425, lng: 86.9842 }
  },

  // Jharkhand
  {
    id: 'loc_ranchi_vegetable',
    name: 'Agricultural Market Ranchi',
    city: 'Ranchi',
    state: 'Jharkhand',
    region: 'East India',
    marketType: 'wholesale',
    isActive: true,
    coordinates: { lat: 23.3441, lng: 85.3096 }
  },
  {
    id: 'loc_jamshedpur_grain',
    name: 'Agricultural Market Jamshedpur',
    city: 'Jamshedpur',
    state: 'Jharkhand',
    region: 'East India',
    marketType: 'mandi',
    isActive: true,
    coordinates: { lat: 22.8046, lng: 86.2029 }
  },
  {
    id: 'loc_dhanbad_vegetable',
    name: 'Agricultural Market Dhanbad',
    city: 'Dhanbad',
    state: 'Jharkhand',
    region: 'East India',
    marketType: 'retail',
    isActive: true,
    coordinates: { lat: 23.7957, lng: 86.4304 }
  },

  // Odisha
  {
    id: 'loc_bhubaneswar_rice',
    name: 'Agricultural Market Bhubaneswar',
    city: 'Bhubaneswar',
    state: 'Odisha',
    region: 'East India',
    marketType: 'wholesale',
    isActive: true,
    coordinates: { lat: 20.2961, lng: 85.8245 }
  },
  {
    id: 'loc_cuttack_vegetable',
    name: 'Agricultural Market Cuttack',
    city: 'Cuttack',
    state: 'Odisha',
    region: 'East India',
    marketType: 'retail',
    isActive: true,
    coordinates: { lat: 20.4625, lng: 85.8828 }
  },
  {
    id: 'loc_rourkela_grain',
    name: 'Agricultural Market Rourkela',
    city: 'Rourkela',
    state: 'Odisha',
    region: 'East India',
    marketType: 'mandi',
    isActive: true,
    coordinates: { lat: 22.2604, lng: 84.8536 }
  },

  // Chhattisgarh
  {
    id: 'loc_raipur_agricultural',
    name: 'Agricultural Market Raipur',
    city: 'Raipur',
    state: 'Chhattisgarh',
    region: 'Central India',
    marketType: 'wholesale',
    isActive: true,
    coordinates: { lat: 21.2514, lng: 81.6296 }
  },
  {
    id: 'loc_bilaspur_rice',
    name: 'Agricultural Market Bilaspur',
    city: 'Bilaspur',
    state: 'Chhattisgarh',
    region: 'Central India',
    marketType: 'mandi',
    isActive: true,
    coordinates: { lat: 22.0797, lng: 82.1391 }
  },
  {
    id: 'loc_durg_vegetable',
    name: 'Agricultural Market Durg',
    city: 'Durg',
    state: 'Chhattisgarh',
    region: 'Central India',
    marketType: 'retail',
    isActive: true,
    coordinates: { lat: 21.1938, lng: 81.2849 }
  },

  // Assam
  {
    id: 'loc_guwahati_tea',
    name: 'Agricultural Market Guwahati',
    city: 'Guwahati',
    state: 'Assam',
    region: 'East India',
    marketType: 'wholesale',
    isActive: true,
    coordinates: { lat: 26.1445, lng: 91.7362 }
  },
  {
    id: 'loc_dibrugarh_agricultural',
    name: 'Agricultural Market Dibrugarh',
    city: 'Dibrugarh',
    state: 'Assam',
    region: 'East India',
    marketType: 'mandi',
    isActive: true,
    coordinates: { lat: 27.4728, lng: 94.9120 }
  },
  {
    id: 'loc_silchar_rice',
    name: 'Agricultural Market Silchar',
    city: 'Silchar',
    state: 'Assam',
    region: 'East India',
    marketType: 'retail',
    isActive: true,
    coordinates: { lat: 24.8333, lng: 92.7789 }
  },

  // Himachal Pradesh
  {
    id: 'loc_shimla_apple',
    name: 'Agricultural Market Shimla',
    city: 'Shimla',
    state: 'Himachal Pradesh',
    region: 'North India',
    marketType: 'retail',
    isActive: true,
    coordinates: { lat: 31.1048, lng: 77.1734 }
  },
  {
    id: 'loc_kullu_fruit',
    name: 'Agricultural Market Kullu',
    city: 'Kullu',
    state: 'Himachal Pradesh',
    region: 'North India',
    marketType: 'mandi',
    isActive: true,
    coordinates: { lat: 31.9578, lng: 77.1092 }
  },
  {
    id: 'loc_mandi_vegetable',
    name: 'Agricultural Market Mandi',
    city: 'Mandi',
    state: 'Himachal Pradesh',
    region: 'North India',
    marketType: 'wholesale',
    isActive: true,
    coordinates: { lat: 31.7084, lng: 76.9319 }
  },

  // Uttarakhand
  {
    id: 'loc_dehradun_vegetable',
    name: 'Agricultural Market Dehradun',
    city: 'Dehradun',
    state: 'Uttarakhand',
    region: 'North India',
    marketType: 'wholesale',
    isActive: true,
    coordinates: { lat: 30.3165, lng: 78.0322 }
  },
  {
    id: 'loc_haridwar_grain',
    name: 'Agricultural Market Haridwar',
    city: 'Haridwar',
    state: 'Uttarakhand',
    region: 'North India',
    marketType: 'mandi',
    isActive: true,
    coordinates: { lat: 29.9457, lng: 78.1642 }
  },
  {
    id: 'loc_haldwani_fruit',
    name: 'Agricultural Market Haldwani',
    city: 'Haldwani',
    state: 'Uttarakhand',
    region: 'North India',
    marketType: 'retail',
    isActive: true,
    coordinates: { lat: 29.2183, lng: 79.5130 }
  },

  // Jammu & Kashmir
  {
    id: 'loc_srinagar_saffron',
    name: 'Agricultural Market Srinagar',
    city: 'Srinagar',
    state: 'Jammu & Kashmir',
    region: 'North India',
    marketType: 'wholesale',
    isActive: true,
    coordinates: { lat: 34.0837, lng: 74.7973 }
  },
  {
    id: 'loc_jammu_agricultural',
    name: 'Agricultural Market Jammu',
    city: 'Jammu',
    state: 'Jammu & Kashmir',
    region: 'North India',
    marketType: 'mandi',
    isActive: true,
    coordinates: { lat: 32.7266, lng: 74.8570 }
  },

  // Goa
  {
    id: 'loc_panaji_spice',
    name: 'Agricultural Market Panaji',
    city: 'Panaji',
    state: 'Goa',
    region: 'Western India',
    marketType: 'retail',
    isActive: true,
    coordinates: { lat: 15.4909, lng: 73.8278 }
  },
  {
    id: 'loc_margao_vegetable',
    name: 'Agricultural Market Margao',
    city: 'Margao',
    state: 'Goa',
    region: 'Western India',
    marketType: 'wholesale',
    isActive: true,
    coordinates: { lat: 15.2993, lng: 74.1240 }
  }
];

// Updated region mappings with comprehensive crop varieties
export const getCropsByRegion = (region: string): string[] => {
  const regionCrops: Record<string, string[]> = {
    'Western India': [
      // Maharashtra, Gujarat, Goa specialties
      'Cotton', 'Sugarcane', 'Onion', 'Grapes', 'Wheat', 'Soybean', 'Chilli', 
      'Turmeric', 'Groundnut', 'Sunflower', 'Pomegranate', 'Banana', 'Mango',
      'Tomato', 'Brinjal', 'Okra', 'Cabbage', 'Cauliflower', 'Potato', 'Jowar',
      'Bajra', 'Gram', 'Safflower', 'Sesame', 'Castor', 'Cumin', 'Fennel'
    ],
    'North India': [
      // Punjab, Haryana, UP, Rajasthan, Delhi, HP, Uttarakhand, J&K specialties
      'Wheat', 'Rice', 'Potato', 'Mustard', 'Barley', 'Peas', 'Apple', 
      'Saffron', 'Maize', 'Bajra', 'Gram', 'Lentil', 'Carrot', 'Radish',
      'Spinach', 'Coriander', 'Fenugreek', 'Onion', 'Garlic', 'Ginger',
      'Sugarcane', 'Cotton', 'Sunflower', 'Mustard Seed', 'Cumin', 'Ajwain'
    ],
    'South India': [
      // Tamil Nadu, Karnataka, Kerala, Andhra Pradesh, Telangana specialties
      'Rice', 'Coconut', 'Coffee', 'Tea', 'Millets', 'Sugarcane', 'Banana',
      'Turmeric', 'Cardamom', 'Black Pepper', 'Vanilla', 'Rubber', 'Areca Nut',
      'Coriander', 'Ragi', 'Jowar', 'Tamarind', 'Mango', 'Papaya', 'Grapes',
      'Tomato', 'Brinjal', 'Okra', 'Chilli', 'Ginger', 'Garlic', 'Cashew'
    ],
    'East India': [
      // West Bengal, Bihar, Jharkhand, Odisha, Assam specialties
      'Rice', 'Jute', 'Tea', 'Potato', 'Wheat', 'Maize', 'Mustard',
      'Sesame', 'Lentil', 'Banana', 'Litchi', 'Pineapple', 'Cabbage',
      'Cauliflower', 'Brinjal', 'Lady Finger', 'Bottle Gourd', 'Ridge Gourd',
      'Sugarcane', 'Tobacco', 'Black Gram', 'Green Gram', 'Groundnut'
    ],
    'Central India': [
      // Madhya Pradesh, Chhattisgarh specialties
      'Cotton', 'Soybean', 'Wheat', 'Gram', 'Mustard', 'Rice', 'Maize',
      'Groundnut', 'Sesame', 'Safflower', 'Onion', 'Garlic', 'Coriander',
      'Fenugreek', 'Cumin', 'Fennel', 'Ajwain', 'Black Gram', 'Green Gram',
      'Tomato', 'Potato', 'Brinjal', 'Okra', 'Chilli', 'Turmeric'
    ]
  };
  
  return regionCrops[region] || [];
};

export const getLocationsByState = (state: string): MarketLocation[] => {
  return comprehensiveMarketLocations.filter(location => location.state === state);
};

export const getAvailableStates = (): string[] => {
  const stateSet = new Set(comprehensiveMarketLocations.map(location => location.state));
  const uniqueStates = Array.from(stateSet);
  console.log(`🏪 Market Locations: ${uniqueStates.length} states, ${comprehensiveMarketLocations.length} total markets`);
  return uniqueStates;
};

export const getAvailableRegions = (): string[] => {
  const regionSet = new Set(comprehensiveMarketLocations.map(location => location.region));
  return Array.from(regionSet);
};

export const getLocationsByRegion = (region: string): MarketLocation[] => {
  return comprehensiveMarketLocations.filter(location => location.region === region);
};

export const getLocationsByMarketType = (marketType: 'mandi' | 'wholesale' | 'retail'): MarketLocation[] => {
  return comprehensiveMarketLocations.filter(location => location.marketType === marketType);
};