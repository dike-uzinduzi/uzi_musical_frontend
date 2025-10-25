import { useState, useRef, useEffect } from "react";
import {
  Menu,
  ChevronDown,
  Phone,
  MapPin,
  Edit2,
  Save,
  X,
  Camera,
  Image as ImageIcon,
  IdCard,
  Smartphone,
  Flag,
  CalendarDays,
} from "lucide-react";
import Sidebar from "../components/sidebar";
import profileService from "../services/profile_service"; // ✅ Service connected

// ✅ Fallback profile if backend has none yet
const fallbackProfile = {
  firstName: "John",
  lastName: "Doe",
  national_id_number: "63-1234567X89",
  phone_number: "+263771234567",
  whatsapp_number: "+263771234567",
  dateOfBirth: "1990-05-15",
  gender: "male",
  address: "123 Music Avenue, Milton Park, Harare, Zimbabwe",
  country_of_residence: "Zimbabwe",
  email: "john.doe@example.com",
  joinDate: "2023-06-15",
  profile_pic:
    "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&w=800&q=80",
  cover_photo:
    "https://images.unsplash.com/photo-1524666041070-9d87656c25bb?auto=format&w=1600&q=80",
};

const ProfileScreen = () => {
  const [isDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true); // Sidebar open by default
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const avatarFileRef = useRef<HTMLInputElement>(null);
  const coverFileRef = useRef<HTMLInputElement>(null);

  const [profile, setProfile] = useState(fallbackProfile);
  const [editedProfile, setEditedProfile] = useState(fallbackProfile);

  // ✅ Load profile from backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await profileService.getMyProfile();
        if (data) {
          setProfile(data);
          setEditedProfile(data);
        }
      } catch (err) {
        console.warn("No profile found. Using fallback UI profile.");
      }
      setLoading(false);
    };

    fetchProfile();
  }, []);

  const handleInput = (field: string, value: string) =>
    setEditedProfile((prev) => ({ ...prev, [field]: value }));

  const handleSave = async () => {
    setSaving(true);
    try {
      const updated = await profileService.updateMyProfile(editedProfile);
      setProfile(updated);
      setIsEditing(false);
    } catch (error) {
      console.error("Save failed:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () =>
      setEditedProfile((prev) => ({ ...prev, [field]: reader.result as string }));
    reader.readAsDataURL(file);
  };

  const fullName = `${profile.firstName} ${profile.lastName}`;
  const initials = `${profile.firstName[0]}${profile.lastName[0]}`;

  const themeClasses = {
    bg: "bg-red-500/10",
    card: isDarkMode ? "bg-gray-800" : "bg-white",
    text: isDarkMode ? "text-white" : "text-gray-900",
    textSecondary: isDarkMode ? "text-gray-400" : "text-gray-600",
    border: isDarkMode ? "border-gray-700" : "border-gray-200",
    input: isDarkMode
      ? "bg-gray-700 border-gray-600 text-white"
      : "bg-white border-gray-300 text-gray-900",
  };

  return (
    <div className={`flex h-screen ${themeClasses.bg}`}>
      {/* Sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={`fixed inset-y-0 left-0 z-50 lg:hidden transition-transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header
          className={`${themeClasses.card} shadow-sm border-b ${themeClasses.border} p-4`}
        >
          <div className="flex justify-between items-center">
            <button
              className="lg:hidden p-2 bg-gray-200 rounded-lg"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
            <h2 className="font-semibold text-lg">Profile</h2>
            <div className="flex items-center gap-3">
              <p className="font-semibold text-sm hidden sm:block">{fullName}</p>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 space-y-6 relative">
          {/* Loading spinner only in main content */}
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <>
              {/* === COVER & PROFILE PHOTO SECTION === */}
              <div
                className={`${themeClasses.card} rounded-2xl overflow-hidden border ${themeClasses.border}`}
              >
                <div className="relative h-48 bg-gray-300">
                  {editedProfile.cover_photo && (
                    <img
                      src={editedProfile.cover_photo}
                      className="w-full h-full object-cover"
                    />
                  )}

                  <div className="absolute inset-0 bg-red-600/20 mix-blend-multiply pointer-events-none" />

                  {isEditing && (
                    <>
                      <input
                        ref={coverFileRef}
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, "cover_photo")}
                      />
                      <button
                        onClick={() => coverFileRef.current?.click()}
                        className="absolute bottom-3 right-3 bg-black/60 text-white px-3 py-1 rounded-lg text-xs flex gap-2"
                      >
                        <ImageIcon size={16} /> Change Cover
                      </button>
                    </>
                  )}
                </div>

                <div className="p-6 -mt-16 flex items-end justify-between">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-2xl border-4 border-white overflow-hidden shadow-lg bg-gray-400 flex items-center justify-center text-3xl font-bold text-white">
                      {editedProfile.profile_pic ? (
                        <img
                          src={editedProfile.profile_pic}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        initials
                      )}
                    </div>

                    {isEditing && (
                      <>
                        <input
                          ref={avatarFileRef}
                          type="file"
                          hidden
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, "profile_pic")}
                        />
                        <button
                          className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 text-white flex items-center justify-center text-xs rounded-2xl"
                          onClick={() => avatarFileRef.current?.click()}
                        >
                          <Camera size={16} className="mr-1" /> Change
                        </button>
                      </>
                    )}
                  </div>

                  {!isEditing ? (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="px-5 py-3 bg-blue-600 text-white rounded-xl"
                    >
                      <Edit2 size={16} className="inline mr-2" /> Edit Profile
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button
                        onClick={() => setIsEditing(false)}
                        className="px-5 py-3 bg-gray-300 rounded-xl"
                      >
                        <X size={16} className="inline mr-2" /> Cancel
                      </button>
                      <button
                        onClick={handleSave}
                        disabled={saving}
                        className="px-5 py-3 bg-green-600 text-white rounded-xl"
                      >
                        {saving ? "Saving..." : <Save size={16} className="inline mr-2" />} Save
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* === CONTACT + PERSONAL INFO SECTION === */}
              <div
                className={`${themeClasses.card} border ${themeClasses.border} rounded-2xl p-6 space-y-5`}
              >
                <Field
                  icon={<IdCard className="text-blue-600" />}
                  label="National ID Number"
                  value={editedProfile.national_id_number}
                  disabled={!isEditing}
                  onChange={(v: string) => handleInput("national_id_number", v)}
                />

                <Field
                  icon={<Phone className="text-blue-600" />}
                  label="Phone Number"
                  value={editedProfile.phone_number}
                  disabled={!isEditing}
                  onChange={(v: string) => handleInput("phone_number", v)}
                />

                <Field
                  icon={<Smartphone className="text-green-600" />}
                  label="WhatsApp Number"
                  value={editedProfile.whatsapp_number}
                  disabled={!isEditing}
                  onChange={(v: string) => handleInput("whatsapp_number", v)}
                />

                <Field
                  icon={<MapPin className="text-red-600" />}
                  label="Address"
                  value={editedProfile.address}
                  disabled={!isEditing}
                  onChange={(v: string) => handleInput("address", v)}
                />

                <Field
                  icon={<Flag className="text-purple-600" />}
                  label="Country of Residence"
                  value={editedProfile.country_of_residence}
                  disabled={!isEditing}
                  onChange={(v: string) => handleInput("country_of_residence", v)}
                />

                <Field
                  icon={<CalendarDays className="text-orange-600" />}
                  label="Date of Birth"
                  value={editedProfile.dateOfBirth}
                  disabled={!isEditing}
                  type="date"
                  onChange={(v: string) => handleInput("dateOfBirth", v)}
                />

                <Field
                  label="Gender"
                  value={editedProfile.gender}
                  disabled={!isEditing}
                  onChange={(v: string) => handleInput("gender", v)}
                />
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

// ✅ Input field component
const Field = ({ icon, value, disabled, onChange, type = "text" }: any) => (
  <div className="flex items-center gap-3">
    {icon && <div className="p-2 bg-gray-100 rounded-lg">{icon}</div>}
    {disabled ? (
      <div className="text-gray-700 text-sm">{value}</div>
    ) : (
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 px-3 py-2 border rounded-lg"
      />
    )}
  </div>
);

export default ProfileScreen;
