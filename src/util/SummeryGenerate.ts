import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000"
})

export const getSummery = () => (
    async ({ summary, jwt_token }: { summary: string, jwt_token: string }) => {
        try {
            // Pass the summary as a query parameter for a GET request
            const response = await api.get("/note/generateSummary", {
                params: { summary }, // Pass as params instead of body
                headers: {
                    Authorization: `Bearer ${jwt_token}`,
                },
            });

            return response.data; // Return the response data if needed
        } catch (error) {
            console.error("Error fetching summary:", error);
            throw error; // Throw the error to be caught in the slice/reducer
        }
    }
);