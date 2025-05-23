"use client";

import { getBookedSchedule } from "@/actions/useBookServiceAction";
import { getUser } from "@/actions/useUserAction";
import AppointmentList from "@/components/dashboard/AppointmentList";
import UserProfile from "@/components/dashboard/UserProfile";
import SearchBar from "@/components/layout/SearchBar";
import { getUserIdFromCookie } from "@/lib/userData";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ConfirmationDialog from "@/components/layout/ConfirmationDialog";

const page = () => {
  const searchParams = useSearchParams();
  const open = searchParams.get("open");
  const type = searchParams.get("type");
  const id = searchParams.get("id");

  const [appointment, setAppointment] = useState([]);
  const [userData, setUserData] = useState(null);
  const [activeTab, setActiveTab] = useState("appointments");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = await getUserIdFromCookie();
      if (!userId) {
        window.location.href = "/login";
      }

      const data = await getBookedSchedule(userId);
      if (!data) {
        console.error("BookedSchedule data not found");
        return;
      }
      setAppointment(data.data);

      const userData = await getUser(userId);
      if (!userData) {
        console.error("User data not found");
        return;
      }
      setUserData(userData);
    };
    fetchUserData();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <>
      <ConfirmationDialog open={open} type={type} id={id} />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="flex flex-wrap gap-2 justify-between items-center mb-6">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                  <button
                    onClick={() => setActiveTab("appointments")}
                    suppressHydrationWarning={true}
                    className={`${
                      activeTab === "appointments"
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                  >
                    Appointments
                  </button>
                  <button
                    onClick={() => setActiveTab("profile")}
                    suppressHydrationWarning={true}
                    className={`${
                      activeTab === "profile"
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                  >
                    Profile
                  </button>
                </nav>
              </div>
              {activeTab === "appointments" && (
                <SearchBar
                  onSearch={handleSearch}
                  placeholder="Search appointments..."
                />
              )}
            </div>

            <div className="mt-6">
              {activeTab === "appointments" ? (
                <AppointmentList
                  searchQuery={searchQuery}
                  appointmentData={appointment}
                  userRole={userData?.data?.user}
                />
              ) : (
                <UserProfile userData={userData} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
