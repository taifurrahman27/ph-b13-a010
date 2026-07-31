import axios from "axios";

export async function uploadImage(file) {
    const formData = new FormData();

    formData.append("image", file);

    const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        formData
    );

    return res.data.data.url;
}

