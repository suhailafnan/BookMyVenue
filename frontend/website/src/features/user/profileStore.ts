export type UserProfile = {
  name: string;
  email: string;
  phone: string;
  address: string;
  photo: string;
};

export const defaultUserProfile: UserProfile = {
  name: "User",
  email: "user@example.com",
  phone: "+91 98765 43210",
  address: "Kochi, Kerala, India",
  photo: "",
};

const storageKey = "bookmyvenue.userProfile";

export function getStoredUserProfile(): UserProfile {
  if (typeof window === "undefined") {
    return defaultUserProfile;
  }

  const storedProfile = window.localStorage.getItem(storageKey);

  if (!storedProfile) {
    return defaultUserProfile;
  }

  try {
    return {
      ...defaultUserProfile,
      ...JSON.parse(storedProfile),
    };
  } catch {
    return defaultUserProfile;
  }
}

export function saveStoredUserProfile(profile: UserProfile) {
  window.localStorage.setItem(storageKey, JSON.stringify(profile));
  window.dispatchEvent(new Event("bookmyvenue:user-profile-updated"));
}
