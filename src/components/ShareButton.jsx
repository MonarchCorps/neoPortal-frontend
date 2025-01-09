/* eslint-disable react/prop-types */
import { FaFacebook, FaLinkedin, FaTwitter, FaWhatsapp } from "react-icons/fa";

function ShareButton({ url }) {
    const shareToPlatform = (platform) => {
        switch (platform) {
            case "whatsapp":
                window.open(`https://wa.me/?text=${encodeURIComponent(url)}`, "_blank");
                break;
            case "facebook":
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank");
                break;
            case "twitter":
                window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`, "_blank");
                break;
            case "linkedin":
                window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}`, "_blank");
                break;
            default:
                console.error("Unsupported platform");
        }
    };

    return (
        <div className="w-full grid grid-cols-4 gap-4">
            <button
                className="bg-[#3a6d23] px-3 py-2 grid place-content-center rounded-md text-xl text-[#eee]"
                onClick={() => shareToPlatform("whatsapp")}
            >
                <FaWhatsapp />
            </button>
            <button
                className="bg-[#1c395c] px-3 py-2 grid place-content-center rounded-md text-xl text-[#eee]"
                onClick={() => shareToPlatform("facebook")}
            >
                <FaFacebook />
            </button>
            <button
                className="bg-[#1b1a1a] px-3 py-2 grid place-content-center rounded-md text-xl text-[#eee]"
                onClick={() => shareToPlatform("twitter")}
            >
                <FaTwitter />
            </button>
            <button
                className="bg-[#3f6bd1] px-3 py-2 grid place-content-center rounded-md text-xl text-[#eee]"
                onClick={() => shareToPlatform("linkedin")}
            >
                <FaLinkedin />
            </button>
        </div>
    );
}

export default ShareButton;
