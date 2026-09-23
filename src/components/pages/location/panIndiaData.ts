export interface CityItem {
  name: string;
  slug: string;
  tier: "Tier 1" | "Tier 2" | "Tier 3";
  state: string;
}

export const CITIES_DATA: CityItem[] = [
  // Tier 1
  { name: "Mumbai", slug: "mumbai", tier: "Tier 1", state: "Maharashtra" },
  { name: "Delhi", slug: "delhi", tier: "Tier 1", state: "Delhi" },
  { name: "Bangalore", slug: "bangalore", tier: "Tier 1", state: "Karnataka" },
  { name: "Hyderabad", slug: "hyderabad", tier: "Tier 1", state: "Telangana" },
  { name: "Chennai", slug: "chennai", tier: "Tier 1", state: "Tamil Nadu" },
  { name: "Kolkata", slug: "kolkata", tier: "Tier 1", state: "West Bengal" },
  { name: "Pune", slug: "pune", tier: "Tier 1", state: "Maharashtra" },
  { name: "Ahmedabad", slug: "ahmedabad", tier: "Tier 1", state: "Gujarat" },
  
  // Tier 2
  { name: "Jaipur", slug: "jaipur", tier: "Tier 2", state: "Rajasthan" },
  { name: "Surat", slug: "surat", tier: "Tier 2", state: "Gujarat" },
  { name: "Lucknow", slug: "lucknow", tier: "Tier 2", state: "Uttar Pradesh" },
  { name: "Kanpur", slug: "kanpur", tier: "Tier 2", state: "Uttar Pradesh" },
  { name: "Nagpur", slug: "nagpur", tier: "Tier 2", state: "Maharashtra" },
  { name: "Indore", slug: "indore", tier: "Tier 2", state: "Madhya Pradesh" },
  { name: "Thane", slug: "thane", tier: "Tier 2", state: "Maharashtra" },
  { name: "Bhopal", slug: "bhopal", tier: "Tier 2", state: "Madhya Pradesh" },
  { name: "Visakhapatnam", slug: "visakhapatnam", tier: "Tier 2", state: "Andhra Pradesh" },
  { name: "Patna", slug: "patna", tier: "Tier 2", state: "Bihar" },
  { name: "Vadodara", slug: "vadodara", tier: "Tier 2", state: "Gujarat" },
  { name: "Ludhiana", slug: "ludhiana", tier: "Tier 2", state: "Punjab" },
  { name: "Agra", slug: "agra", tier: "Tier 2", state: "Uttar Pradesh" },
  { name: "Nashik", slug: "nashik", tier: "Tier 2", state: "Maharashtra" },
  { name: "Varanasi", slug: "varanasi", tier: "Tier 2", state: "Uttar Pradesh" },
  { name: "Amritsar", slug: "amritsar", tier: "Tier 2", state: "Punjab" },
  { name: "Coimbatore", slug: "coimbatore", tier: "Tier 2", state: "Tamil Nadu" },
  { name: "Chandigarh", slug: "chandigarh", tier: "Tier 2", state: "Chandigarh" },
  { name: "Guwahati", slug: "guwahati", tier: "Tier 2", state: "Assam" },
  { name: "Bhubaneswar", slug: "bhubaneswar", tier: "Tier 2", state: "Odisha" },
  
  // Tier 3
  { name: "Udaipur", slug: "udaipur", tier: "Tier 3", state: "Rajasthan" },
  { name: "Dehradun", slug: "dehradun", tier: "Tier 3", state: "Uttarakhand" },
  { name: "Jalandhar", slug: "jalandhar", tier: "Tier 3", state: "Punjab" },
  { name: "Guntur", slug: "guntur", tier: "Tier 3", state: "Andhra Pradesh" },
  { name: "Bikaner", slug: "bikaner", tier: "Tier 3", state: "Rajasthan" },
  { name: "Noida", slug: "noida", tier: "Tier 3", state: "Uttar Pradesh" },
  { name: "Mangalore", slug: "mangalore", tier: "Tier 3", state: "Karnataka" },
  { name: "Belgaum", slug: "belgaum", tier: "Tier 3", state: "Karnataka" },
  { name: "Trivandrum", slug: "trivandrum", tier: "Tier 3", state: "Kerala" },
  { name: "Kochi", slug: "kochi", tier: "Tier 3", state: "Kerala" },
];
