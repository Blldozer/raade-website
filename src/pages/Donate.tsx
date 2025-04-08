
import { Helmet } from "react-helmet";
import DonationForm from "@/components/donation/DonationForm";

/**
 * Donate Page
 * 
 * Main page for the donation feature that includes:
 * - Page metadata
 * - Donation form component
 * - Supporting content
 */
const Donate = () => {
  return (
    <>
      <Helmet>
        <title>Support RAADE - Make a Donation | RAADE</title>
        <meta
          name="description"
          content="Support RAADE's mission to pioneer innovative approaches to African development through your donation."
        />
      </Helmet>

      <div className="container mx-auto py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-[#274675] dark:text-[#FBB03B]">
              Support Our Mission
            </h1>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Your donation helps RAADE connect students with African organizations to create 
              scalable solutions for pressing development challenges.
            </p>
          </div>

          <DonationForm />

          <div className="mt-16 bg-gray-50 dark:bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-[#274675] dark:text-[#FBB03B] mb-4">
              Your Impact
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-[#274675] dark:text-[#FBB03B]">100+</div>
                <p className="mt-2">Rice students engaged annually</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#274675] dark:text-[#FBB03B]">8</div>
                <p className="mt-2">Active projects with African organizations</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#274675] dark:text-[#FBB03B]">6</div>
                <p className="mt-2">Faculty mentors involved</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Donate;
