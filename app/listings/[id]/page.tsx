'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import ThemeToggle from '@/components/ThemeToggle';
import { MapPin, ShieldCheck, Wifi, Snowflake, Utensils, Clock, CheckCircle2, ChevronDown } from 'lucide-react';

interface Listing {
  _id: string;
  roomDetails: string;
  price: number;
  pgName?: string;
  address?: string;
  amenities?: string[];
  userId: {
    name: string;
    email?: string;
    phoneNumber?: string;
  };
}

export default function DetailedPGView() {
  const params = useParams();
  const id = params.id as string;
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Interactive state for the booking card
  const [sharingType, setSharingFilter] = useState<'Single' | 'Double' | 'Triple'>('Double');

  useEffect(() => {
    fetchListing();
  }, [id]);

  const fetchListing = async () => {
    try {
      const res = await fetch(`/api/listings/${id}`);
      const data = await res.json();
      setListing(data);
    } catch (error) {
      console.error('Failed to fetch listing:', error);
    } finally {
      setLoading(false);
    }
  };

  // Derive price based on sharing type for demonstration
  const basePrice = listing?.price || 8500;
  const calculatedPrice = sharingType === 'Single' 
    ? basePrice * 1.5 
    : sharingType === 'Double' 
    ? basePrice 
    : basePrice * 0.8;

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F4F5F7] dark:bg-[#091E42] flex items-center justify-center text-[#172B4D] dark:text-[#F4F5F7]">
        Loading PG Details...
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-[#F4F5F7] dark:bg-[#091E42] flex flex-col items-center justify-center text-[#172B4D] dark:text-[#F4F5F7]">
        <h1 className="text-2xl font-bold mb-4">Property Not Found</h1>
        <Link href="/browse" className="text-[#0052CC] dark:text-[#4C9AFF] hover:underline font-medium">Back to Listings</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F5F7] dark:bg-[#091E42] text-[#172B4D] dark:text-[#F4F5F7] font-sans transition-colors duration-200">
      {/* Top Header */}
      <nav className="sticky top-0 z-50 bg-[#FFFFFF]/90 dark:bg-[#1D2736]/90 backdrop-blur-md border-b border-[#DFE1E6] dark:border-[#2C3E50]">
        <div className="w-full px-4 md:px-8 py-3 flex justify-between items-center max-w-7xl mx-auto">
          <Link href="/browse" className="text-sm font-bold text-[#5E6C84] dark:text-[#97A0AF] hover:text-[#172B4D] dark:hover:text-[#F4F5F7] transition-colors flex items-center gap-2">
            ← Back to Market
          </Link>
          <div className="flex items-center gap-4">
            <ThemeToggle />
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        
        {/* Header Section */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-[#172B4D] dark:bg-[#F4F5F7] text-[#FFFFFF] dark:text-[#091E42] px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest rounded-sm">
              Boys PG
            </span>
            <span className="bg-[#00875A]/10 text-[#00875A] dark:bg-[#36B37E]/10 dark:text-[#36B37E] border border-[#00875A]/20 dark:border-[#36B37E]/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest rounded-sm flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> Verified Property
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight mb-2">
            {listing.pgName || 'Premium Student Accommodation'}
          </h1>
          <div className="flex items-center gap-1 text-sm text-[#5E6C84] dark:text-[#97A0AF]">
            <MapPin className="w-4 h-4" />
            {listing.address || 'Central University Road'}
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Details */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            
            {/* Mock Image Gallery */}
            <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[400px]">
              <div className="col-span-4 md:col-span-3 row-span-2 bg-[#E2E4E9] dark:bg-[#132A55] rounded-sm border border-[#DFE1E6] dark:border-[#2C3E50] flex items-center justify-center relative overflow-hidden">
                 <span className="text-[#5E6C84] dark:text-[#97A0AF] text-sm font-bold uppercase tracking-widest">Main Room View</span>
              </div>
              <div className="hidden md:flex col-span-1 row-span-1 bg-[#E2E4E9] dark:bg-[#132A55] rounded-sm border border-[#DFE1E6] dark:border-[#2C3E50] items-center justify-center relative">
                 <span className="text-[#5E6C84] dark:text-[#97A0AF] text-[10px] font-bold uppercase tracking-widest">Washroom</span>
              </div>
              <div className="hidden md:flex col-span-1 row-span-1 bg-[#E2E4E9] dark:bg-[#132A55] rounded-sm border border-[#DFE1E6] dark:border-[#2C3E50] items-center justify-center relative">
                 <span className="text-[#5E6C84] dark:text-[#97A0AF] text-[10px] font-bold uppercase tracking-widest">Mess Area</span>
              </div>
            </div>

            {/* Description */}
            <div className="bg-[#FFFFFF] dark:bg-[#1D2736] p-6 rounded-sm border border-[#DFE1E6] dark:border-[#2C3E50] shadow-sm">
              <h2 className="text-lg font-bold mb-4 border-b border-[#DFE1E6] dark:border-[#2C3E50] pb-2">Property Overview</h2>
              <p className="text-[#5E6C84] dark:text-[#97A0AF] text-sm leading-relaxed whitespace-pre-wrap">
                {listing.roomDetails}
              </p>
            </div>

            {/* Amenities Grid */}
            <div className="bg-[#FFFFFF] dark:bg-[#1D2736] p-6 rounded-sm border border-[#DFE1E6] dark:border-[#2C3E50] shadow-sm">
              <h2 className="text-lg font-bold mb-4 border-b border-[#DFE1E6] dark:border-[#2C3E50] pb-2">Top Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Fixed Mocked Amenities for UI completeness */}
                <div className="flex flex-col items-center justify-center p-4 bg-[#F4F5F7] dark:bg-[#091E42] border border-[#DFE1E6] dark:border-[#2C3E50] rounded-sm gap-2 text-center">
                  <Wifi className="w-6 h-6 text-[#0052CC] dark:text-[#4C9AFF]" />
                  <span className="text-xs font-bold text-[#172B4D] dark:text-[#F4F5F7]">High-Speed Wi-Fi</span>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-[#F4F5F7] dark:bg-[#091E42] border border-[#DFE1E6] dark:border-[#2C3E50] rounded-sm gap-2 text-center">
                  <Snowflake className="w-6 h-6 text-[#0052CC] dark:text-[#4C9AFF]" />
                  <span className="text-xs font-bold text-[#172B4D] dark:text-[#F4F5F7]">Air Conditioning</span>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-[#F4F5F7] dark:bg-[#091E42] border border-[#DFE1E6] dark:border-[#2C3E50] rounded-sm gap-2 text-center">
                  <Utensils className="w-6 h-6 text-[#0052CC] dark:text-[#4C9AFF]" />
                  <span className="text-xs font-bold text-[#172B4D] dark:text-[#F4F5F7]">Mess Facility</span>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-[#F4F5F7] dark:bg-[#091E42] border border-[#DFE1E6] dark:border-[#2C3E50] rounded-sm gap-2 text-center">
                  <CheckCircle2 className="w-6 h-6 text-[#0052CC] dark:text-[#4C9AFF]" />
                  <span className="text-xs font-bold text-[#172B4D] dark:text-[#F4F5F7]">Daily Cleaning</span>
                </div>
              </div>
            </div>

            {/* Meal Matrix */}
            <div className="bg-[#FFFFFF] dark:bg-[#1D2736] p-6 rounded-sm border border-[#DFE1E6] dark:border-[#2C3E50] shadow-sm">
              <h2 className="text-lg font-bold mb-4 border-b border-[#DFE1E6] dark:border-[#2C3E50] pb-2 flex items-center gap-2">
                <Utensils className="w-5 h-5 text-[#0052CC] dark:text-[#4C9AFF]" /> Meal Matrix
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-[#F4F5F7] dark:bg-[#091E42] text-[#5E6C84] dark:text-[#97A0AF] border-b border-[#DFE1E6] dark:border-[#2C3E50]">
                    <tr>
                      <th className="p-3 font-bold uppercase tracking-wide text-[10px]">Meal</th>
                      <th className="p-3 font-bold uppercase tracking-wide text-[10px]">Timing</th>
                      <th className="p-3 font-bold uppercase tracking-wide text-[10px]">Sample Menu</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#DFE1E6] dark:divide-[#2C3E50]">
                    <tr className="hover:bg-[#F4F5F7] dark:hover:bg-[#091E42] transition-colors">
                      <td className="p-3 font-bold">Breakfast</td>
                      <td className="p-3 text-[#5E6C84] dark:text-[#97A0AF] font-mono">08:00 - 10:00</td>
                      <td className="p-3">Poha, Parni, Tea/Coffee</td>
                    </tr>
                    <tr className="hover:bg-[#F4F5F7] dark:hover:bg-[#091E42] transition-colors">
                      <td className="p-3 font-bold">Lunch</td>
                      <td className="p-3 text-[#5E6C84] dark:text-[#97A0AF] font-mono">13:00 - 15:00</td>
                      <td className="p-3">Roti, Dal, Sabzi, Rice</td>
                    </tr>
                    <tr className="hover:bg-[#F4F5F7] dark:hover:bg-[#091E42] transition-colors">
                      <td className="p-3 font-bold">Dinner</td>
                      <td className="p-3 text-[#5E6C84] dark:text-[#97A0AF] font-mono">20:00 - 22:00</td>
                      <td className="p-3">Paneer, Dal Tadka, Dessert</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* House Rules */}
            <div className="bg-[#FFFFFF] dark:bg-[#1D2736] p-6 rounded-sm border border-[#DFE1E6] dark:border-[#2C3E50] shadow-sm">
              <h2 className="text-lg font-bold mb-4 border-b border-[#DFE1E6] dark:border-[#2C3E50] pb-2 flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#0052CC] dark:text-[#4C9AFF]" /> House Rules
              </h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-[#172B4D] dark:text-[#F4F5F7]">
                <li className="flex items-start gap-2">
                  <span className="text-[#DE350B] dark:text-[#FF5630] font-bold">•</span>
                  <span>Gate closes at strictly <span className="font-mono font-bold">10:30 PM</span>.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00875A] dark:text-[#36B37E] font-bold">•</span>
                  <span>1-month notice period before vacating.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#DE350B] dark:text-[#FF5630] font-bold">•</span>
                  <span>No alcohol or smoking allowed on premises.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#00875A] dark:text-[#36B37E] font-bold">•</span>
                  <span>Visitors allowed only in common areas.</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Right Column: Sticky Booking Card */}
          <aside className="lg:col-span-4 relative">
            <div className="sticky top-24 bg-[#FFFFFF] dark:bg-[#1D2736] border border-[#DFE1E6] dark:border-[#2C3E50] rounded-sm shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-sm font-bold text-[#5E6C84] dark:text-[#97A0AF] uppercase tracking-wider mb-4">Pricing Configuration</h3>
                
                {/* Sharing Dropdown */}
                <div className="mb-6 relative">
                  <label className="block text-[10px] font-bold text-[#172B4D] dark:text-[#F4F5F7] uppercase tracking-widest mb-1.5">Sharing Type</label>
                  <select 
                    value={sharingType}
                    onChange={(e) => setSharingFilter(e.target.value as any)}
                    className="w-full appearance-none bg-[#F4F5F7] dark:bg-[#091E42] border border-[#DFE1E6] dark:border-[#2C3E50] text-[#172B4D] dark:text-[#F4F5F7] font-semibold text-sm rounded-sm px-4 py-2.5 outline-none focus:border-[#0052CC] dark:focus:border-[#4C9AFF] transition-colors cursor-pointer"
                  >
                    <option value="Single">Single Room</option>
                    <option value="Double">2-Sharing</option>
                    <option value="Triple">3+ Sharing</option>
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#5E6C84] dark:text-[#97A0AF] absolute right-4 bottom-3 pointer-events-none" />
                </div>

                <div className="w-full h-px bg-[#DFE1E6] dark:bg-[#2C3E50] mb-6" />

                {/* Price Breakdown */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-[#5E6C84] dark:text-[#97A0AF]">Monthly Rent</span>
                    <span className="font-bold">₹{calculatedPrice.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-[#5E6C84] dark:text-[#97A0AF]">Security Deposit <span className="text-[10px]">(Refundable)</span></span>
                    <span className="font-bold">₹{(calculatedPrice * 1.5).toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-[#5E6C84] dark:text-[#97A0AF]">Maintenance Fee</span>
                    <span className="font-bold">₹500</span>
                  </div>
                </div>

                <div className="w-full h-px bg-[#DFE1E6] dark:bg-[#2C3E50] mb-6" />

                {/* Total */}
                <div className="flex justify-between items-end mb-8">
                  <span className="text-sm font-bold text-[#172B4D] dark:text-[#F4F5F7] uppercase tracking-wider">Move-in Total</span>
                  <div className="text-[#00875A] dark:text-[#36B37E] font-black text-2xl">
                    ₹{((calculatedPrice * 2.5) + 500).toLocaleString('en-IN')}
                  </div>
                </div>

                <button className="w-full py-3 bg-[#0052CC] dark:bg-[#4C9AFF] text-[#FFFFFF] dark:text-[#091E42] font-bold text-sm uppercase tracking-widest rounded-sm hover:opacity-90 transition-opacity active:scale-[0.98]">
                  Book Visit
                </button>
                <p className="text-center text-[10px] font-bold text-[#5E6C84] dark:text-[#97A0AF] mt-3 uppercase tracking-widest">
                  No payment required to book visit
                </p>
              </div>
            </div>
          </aside>

        </div>
      </main>
    </div>
  );
}
