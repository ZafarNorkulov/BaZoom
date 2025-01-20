import { photoToBlob } from "./PhotoService";

interface UserProfileContract {
  id: number;
  name: string;
  balance: number;
  profile_photo_url?: string;
  virusBalance?: number;
  taxiBalance?: number;
  diceBalance?: number;
}

async function getProfile(
  initData: string,
): Promise<UserProfileContract | null> {
  const resp = await fetch("/api/users/profile", {
    method: "GET",
    headers: {
      "Init-Data": initData,
    },
  });
  if (!resp.ok) return null;
  return await (resp.json() as Promise<UserProfileContract>);
}

async function updateProfile(
  initData: string,
): Promise<UserProfileContract | null> {
  const resp = await fetch("/api/users/profile", {
    method: "POST",
    headers: {
      "Init-Data": initData,
      "Content-Type": "application/json",
    },
  });
  if (!resp.ok) return null;
  return await (resp.json() as Promise<UserProfileContract>);
}

async function registerUser(initData: string, verificationPhoto: string) {
  const formData = new FormData();
  const blob = photoToBlob(verificationPhoto);
  formData.append("verification_photo", blob);
  const resp = await fetch("/api/users/register", {
    method: "POST",
    headers: {
      "Init-Data": initData,
    },
    body: formData,
  });
  if (!resp.ok) return null;
  return await (resp.json() as Promise<UserProfileContract>);
}

async function getProfilePhotoUrl(initData: string, userId: number) {
  const resp = await fetch(`/api/users/profile/photo/${userId}`, {
    method: "GET",
    headers: {
      "Init-Data": initData,
    },
  });
  if (!resp.ok) return null;
  const blob = await resp.blob();
  return blob;
}

export { getProfile, registerUser, getProfilePhotoUrl, updateProfile };
export type { UserProfileContract };
