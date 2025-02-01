import { useExpand, useInitData } from "@vkruglikov/react-telegram-web-app";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { getProfile, updateProfile } from "../../services/UserService.ts";
import LoadingScreen from "../loading-screen/LoadingScreen.tsx";



const RootPage = () => {
    const [isExpanded, expand] = useExpand();
    if (!isExpanded) expand();

    const [, initData] = useInitData();
    const [isLoading, setLoading] = useState(true);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const navigate = useNavigate()

    // Если нет данных Telegram, показываем страницу перенаправления
// const initData = `user=%7B%22id%22%3A1742336847%2C%22first_name%22%3A%22Zafar%22%2C%22last_name%22%3A%22Norkulov%22%2C%22username%22%3A%22Zafar_Norkulov%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2F4OQHgqkBTQzZX8WGfD-hlRPvpUjXNuMNwFMpYDjE2pQ.svg%22%7D&auth_date=1738397696&signature=n17j-FeozqpC9-OBhm-0yTvuGL3LzB84MM9EqNacUIc42JPSjcwD16ElmtUij2H7EAST0fj5XtCeQjvy6H7NDA&hash=a42ba7c1f3bbad4bbc6b36e80ad1ec377a8ff12a814e827852ca0d5515f24704
// `
    useEffect(() => {
        if (!initData) return;

        // Начинаем с 0%
        setLoadingProgress(0);

        // Анимируем до 80% за 5 секунд
        const progressInterval = setInterval(() => {
            setLoadingProgress(prev => Math.min(prev + 2, 80));
        }, 125);

        getProfile(initData).then((res) => {
            console.log(res, "root")
            updateProfile(initData);
            setTimeout(() => {
                if (!res) navigate("/register");
                setLoading(false);
            }, 2000);
            // Очищаем интервал
            clearInterval(progressInterval);

            // Анимируем до 100% за 1 секунду
            setLoadingProgress(100);

        });
    }, [initData]);



    return isLoading ? <LoadingScreen progress={loadingProgress} /> : <Navigate to={"/main"} replace />
};

export default RootPage;
