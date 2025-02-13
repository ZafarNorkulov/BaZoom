import { photoToBlob } from "./PhotoService";

interface UserProfileContract {
  id: number;
  name: string;
  balance: number;
  profile_photo_url?: string;
  has_verification_photo: boolean;
  virusBalance?: number;
  taxiBalance?: number;
  diceBalance?: number;
}

async function getProfile(
  initData: string,
): Promise<UserProfileContract | null> {
  console.log(initData);

  const resp = await fetch(`/api/users/profile`, {
    method: "GET",
    headers: {
      "Init-Data": initData
    },
  });
  if (!resp.ok) return null;
  return await (resp.json() as Promise<UserProfileContract>);
}

async function updateProfile(
  initData: string,
): Promise<UserProfileContract | null> {
  console.log(initData);
  const resp = await fetch(`https://game.bazoom.ru/api/users/profile`, {
    method: "POST",
    headers: {
      "Init-Data": initData,
      "Content-Type": "application/json",
    },
  });
  if (!resp.ok) return null;
  return await (resp.json() as Promise<UserProfileContract>);
}

async function registerUser(
  initData: string,
  verificationPhoto: string | undefined,
): Promise<UserProfileContract | null> {
  if (!verificationPhoto) {
    const resp = await fetch("https://game.bazoom.ru/api/users/register", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${initData}`,
        "Access-Control-Allow-Origin": "*",
      },
    });
    if (!resp.ok) return null;
    return await ((await resp.json()) as Promise<UserProfileContract>);
  }

  const formData = new FormData();
  const blob = photoToBlob(verificationPhoto);
  formData.append("verification_photo", blob);

  const resp = await fetch("https://game.bazoom.ru/api/users/register", {
    method: "POST",
    headers: {
      "Init-Data": initData,
    },
    body: formData,
  });
  if (!resp.ok) return null;
  return await ((await resp.json()) as Promise<UserProfileContract>);
}

async function getProfilePhotoUrl(
  initData: string,
  userId: number,
): Promise<string | null> {
  const resp = await fetch(`/api/users/profile/photo/${userId}`, {
    method: "GET",
    headers: {
      "Init-Data": initData,
    },
  });
  if (!resp.ok) return null;

  const blob = await resp.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = () => reject(null);
    reader.readAsDataURL(blob);
  });
}

export { getProfile, registerUser, getProfilePhotoUrl, updateProfile };
export type { UserProfileContract };
