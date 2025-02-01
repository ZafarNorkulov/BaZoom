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
  console.log(initData)

  const resp = await fetch(`/api/users/profile`, {
    method: "GET",
    headers: {
      "Init-Data": `user=%7B%22id%22%3A1742336847%2C%22first_name%22%3A%22Zafar%22%2C%22last_name%22%3A%22Norkulov%22%2C%22username%22%3A%22Zafar_Norkulov%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2F4OQHgqkBTQzZX8WGfD-hlRPvpUjXNuMNwFMpYDjE2pQ.svg%22%7D&auth_date=1738397696&signature=n17j-FeozqpC9-OBhm-0yTvuGL3LzB84MM9EqNacUIc42JPSjcwD16ElmtUij2H7EAST0fj5XtCeQjvy6H7NDA&hash=a42ba7c1f3bbad4bbc6b36e80ad1ec377a8ff12a814e827852ca0d5515f24704`,
    },
  });
  if (!resp.ok) return null;
  return await (resp.json() as Promise<UserProfileContract>);
}

async function updateProfile(
  initData: string,
): Promise<UserProfileContract | null> {
  console.log(initData)
  const resp = await fetch(`/api/users/profile`, {
    method: "POST",
    headers: {
      "Init-Data": `user=%7B%22id%22%3A1742336847%2C%22first_name%22%3A%22Zafar%22%2C%22last_name%22%3A%22Norkulov%22%2C%22username%22%3A%22Zafar_Norkulov%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2F4OQHgqkBTQzZX8WGfD-hlRPvpUjXNuMNwFMpYDjE2pQ.svg%22%7D&auth_date=1738397696&signature=n17j-FeozqpC9-OBhm-0yTvuGL3LzB84MM9EqNacUIc42JPSjcwD16ElmtUij2H7EAST0fj5XtCeQjvy6H7NDA&hash=a42ba7c1f3bbad4bbc6b36e80ad1ec377a8ff12a814e827852ca0d5515f24704`,
      "Content-Type": "application/json",
    },
  });
  if (!resp.ok) return null;
  return await (resp.json() as Promise<UserProfileContract>);
}

async function registerUser(initData: string, verificationPhoto: string | undefined) {
  const formData = new FormData();
  const blob = photoToBlob(verificationPhoto);
  formData.append("verification_photo", blob);
  const resp = await fetch(`https://game.bazoom.ru/api/users/register`, {
    method: "POST",
    headers: {
      "Init-Data": initData,
    },
    body: formData,
  });
  if (!resp.ok) return null;
  return await (resp.json() as Promise<UserProfileContract>);
}

async function getProfilePhotoUrl(
  initData: string,
  userId: number,
): Promise<string | null> {
  console.log(initData)
  const resp = await fetch(`/api/users/profile/photo/${userId}`, {
    method: "GET",
    headers: {
      "Init-Data": `user=%7B%22id%22%3A1742336847%2C%22first_name%22%3A%22Zafar%22%2C%22last_name%22%3A%22Norkulov%22%2C%22username%22%3A%22Zafar_Norkulov%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2F4OQHgqkBTQzZX8WGfD-hlRPvpUjXNuMNwFMpYDjE2pQ.svg%22%7D&auth_date=1738397696&signature=n17j-FeozqpC9-OBhm-0yTvuGL3LzB84MM9EqNacUIc42JPSjcwD16ElmtUij2H7EAST0fj5XtCeQjvy6H7NDA&hash=a42ba7c1f3bbad4bbc6b36e80ad1ec377a8ff12a814e827852ca0d5515f24704`,
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
